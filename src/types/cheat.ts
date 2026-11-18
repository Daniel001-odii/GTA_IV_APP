export type PlatformId = 'playstation' | 'xbox' | 'pc';
export type ControllerPlatform = 'playstation' | 'xbox';

export type GamepadButtonId =
  | 'TRIANGLE'
  | 'SQUARE'
  | 'CROSS'
  | 'CIRCLE'
  | 'L1'
  | 'R1'
  | 'L2'
  | 'R2'
  | 'START'
  | 'SELECT'
  | 'DPAD_UP'
  | 'DPAD_DOWN'
  | 'DPAD_LEFT'
  | 'DPAD_RIGHT'
  | 'L3'
  | 'R3';

export type CheatCategoryId =
  | 'weapons-ammo'
  | 'vehicles'
  | 'health-armor'
  | 'player-abilities'
  | 'wanted-level'
  | 'weather-environment'
  | 'gameplay-world'
  | 'miscellaneous';

export type ArtworkKey =
  | 'hero-vice'
  | 'collage-cover'
  | 'convertible-skyline'
  | 'street-duo'
  | 'bay-jetskis';

export type SortOption = 'popularity' | 'category' | 'alphabetical';
export type ThemeMode = 'dark' | 'light';

export interface CheatCombinations {
  playstation?: GamepadButtonId[];
  xbox?: GamepadButtonId[];
  pc?: string;
}

export interface CheatCategory {
  id: CheatCategoryId;
  name: string;
  shortName: string;
  description: string;
  imageKey: ArtworkKey;
  iconName: string;
  accentColor: string;
}

export interface CheatCode {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CheatCategoryId;
  imageKey: ArtworkKey;
  keywords: string[];
  popularityScore: number;
  featured?: boolean;
  combinations: CheatCombinations;
  /**
   * Sample placeholder combinations displayed ONLY when the user explicitly
   * enables Demo Preview Mode in Settings. Never presented as verified GTA VI codes.
   */
  demoCombinations?: CheatCombinations;
  verified: boolean;
  isAvailable: boolean;
  usageNote?: string;
}

export interface PlatformMeta {
  id: PlatformId;
  label: string;
  shortLabel: string;
  inputType: 'controller' | 'keyboard';
}
