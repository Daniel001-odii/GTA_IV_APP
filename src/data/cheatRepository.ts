import categoriesData from './categories.json';
import {
  CHEAT_CODE_DATASETS,
  CheatDatasetKey,
  getActiveCheatDataset,
} from './cheatCodesConfig';
import {
  CheatCategory,
  CheatCategoryId,
  CheatCode,
  GamepadButtonId,
  PlatformId,
  SortOption,
} from '../types/cheat';

/**
 * Abstract data repository contract so a remote API or CMS can replace
 * the local object source later without modifying any UI screens.
 */
export interface CheatRepository {
  getAllCheats(): CheatCode[];
  getCheatById(id: string): CheatCode | undefined;
  getAllCategories(): CheatCategory[];
  getVisibleCategories(): CheatCategory[];
  getCategoryById(id: CheatCategoryId): CheatCategory | undefined;
  getFeaturedCheats(): CheatCode[];
  getPopularCheats(limit?: number): CheatCode[];
  getRelatedCheats(cheat: CheatCode, limit?: number): CheatCode[];
  getCheatsByCategory(categoryId: CheatCategoryId): CheatCode[];
  queryCheats(params: {
    search?: string;
    category?: CheatCategoryId | 'all';
    platform?: PlatformId;
    sort?: SortOption;
    onlyAvailableOnPlatform?: boolean;
  }): CheatCode[];
}

export interface ResolvedCheatInstruction {
  platform: PlatformId;
  mode: 'verified' | 'unavailable' | 'tbd';
  buttons?: GamepadButtonId[];
  pcCommand?: string;
}

export function resolveCheatInstruction(
  cheat: CheatCode,
  platform: PlatformId
): ResolvedCheatInstruction {
  if (cheat.verified && cheat.isAvailable) {
    if (platform === 'pc') {
      if (cheat.combinations.pc) {
        return {
          platform,
          mode: 'verified',
          pcCommand: cheat.combinations.pc,
        };
      }
      return {
        platform,
        mode: 'tbd',
      };
    }

    const buttons = cheat.combinations[platform];
    if (buttons && buttons.length > 0) {
      return {
        platform,
        mode: 'verified',
        buttons,
      };
    }
  }

  return {
    platform,
    mode: 'unavailable',
  };
}

export class LocalCheatRepository implements CheatRepository {
  private readonly cheats: CheatCode[];
  private readonly categories: CheatCategory[];
  private readonly categoryMap: Map<CheatCategoryId, CheatCategory>;

  constructor(
    cheats: CheatCode[] = getActiveCheatDataset().cheats,
    categories: CheatCategory[] = categoriesData as CheatCategory[]
  ) {
    this.cheats = cheats;
    this.categories = categories;
    this.categoryMap = new Map(categories.map((c) => [c.id, c]));
  }

  getAllCheats(): CheatCode[] {
    return this.cheats;
  }

  getCheatById(id: string): CheatCode | undefined {
    return this.cheats.find((c) => c.id === id);
  }

  getAllCategories(): CheatCategory[] {
    return this.categories;
  }

  /**
   * Returns only categories that have available verified cheats.
   */
  getVisibleCategories(): CheatCategory[] {
    const verifiedCategoryIds = new Set(
      this.cheats
        .filter((c) => c.verified && c.isAvailable)
        .map((c) => c.category)
    );
    return this.categories.filter((cat) => verifiedCategoryIds.has(cat.id));
  }

  getCategoryById(id: CheatCategoryId): CheatCategory | undefined {
    return this.categoryMap.get(id);
  }

  getFeaturedCheats(): CheatCode[] {
    return this.cheats
      .filter((c) => c.featured)
      .sort((a, b) => b.popularityScore - a.popularityScore);
  }

  getPopularCheats(limit = 6): CheatCode[] {
    return [...this.cheats]
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
  }

  getRelatedCheats(cheat: CheatCode, limit = 4): CheatCode[] {
    return this.cheats
      .filter((c) => c.id !== cheat.id && c.category === cheat.category)
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
  }

  getCheatsByCategory(categoryId: CheatCategoryId): CheatCode[] {
    return this.cheats
      .filter((c) => c.category === categoryId)
      .sort((a, b) => b.popularityScore - a.popularityScore);
  }

  getCheatCountByCategory(categoryId: CheatCategoryId): number {
    return this.cheats.filter((c) => c.category === categoryId).length;
  }

  queryCheats(params: {
    search?: string;
    category?: CheatCategoryId | 'all';
    platform?: PlatformId;
    sort?: SortOption;
    onlyAvailableOnPlatform?: boolean;
  }): CheatCode[] {
    const {
      search = '',
      category = 'all',
      platform = 'playstation',
      sort = 'popularity',
      onlyAvailableOnPlatform = false,
    } = params;

    const normalizedQuery = search.trim().toLowerCase();

    let results = this.cheats.filter((cheat) => {
      if (category !== 'all' && cheat.category !== category) {
        return false;
      }

      if (onlyAvailableOnPlatform) {
        const resolved = resolveCheatInstruction(cheat, platform);
        if (resolved.mode === 'unavailable') {
          return false;
        }
      }

      if (normalizedQuery.length > 0) {
        const categoryMeta = this.categoryMap.get(cheat.category);
        const haystack = [
          cheat.title,
          cheat.shortDescription,
          cheat.description,
          cheat.combinations.pc ?? '',
          cheat.phoneNumber ?? '',
          cheat.combinations.phone ?? '',
          categoryMeta?.name ?? '',
          categoryMeta?.shortName ?? '',
          ...cheat.keywords,
        ]
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });

    results = [...results].sort((a, b) => {
      if (sort === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      if (sort === 'category') {
        const catA = this.categoryMap.get(a.category)?.name ?? a.category;
        const catB = this.categoryMap.get(b.category)?.name ?? b.category;
        const cmp = catA.localeCompare(catB);
        return cmp !== 0 ? cmp : b.popularityScore - a.popularityScore;
      }
      return b.popularityScore - a.popularityScore;
    });

    return results;
  }
}

const repositories: Record<CheatDatasetKey, LocalCheatRepository> = {
  gta5: new LocalCheatRepository(CHEAT_CODE_DATASETS.gta5.cheats),
  gta6: new LocalCheatRepository(CHEAT_CODE_DATASETS.gta6.cheats),
};

export function getCheatRepository(game: CheatDatasetKey = 'gta6'): LocalCheatRepository {
  return repositories[game] ?? repositories.gta6;
}

export function findCheatAnywhere(id: string): { cheat: CheatCode; game: CheatDatasetKey } | undefined {
  const gta6Cheat = repositories.gta6.getCheatById(id);
  if (gta6Cheat) {
    return { cheat: gta6Cheat, game: 'gta6' };
  }
  const gta5Cheat = repositories.gta5.getCheatById(id);
  if (gta5Cheat) {
    return { cheat: gta5Cheat, game: 'gta5' };
  }
  return undefined;
}

export const cheatRepository = repositories.gta6;
