import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCheatDataset, CheatDatasetConfig, CheatDatasetKey } from '../data/cheatCodesConfig';
import { getCheatRepository, LocalCheatRepository } from '../data/cheatRepository';
import { getThemeColors, ThemeColors } from '../theme/tokens';
import { ButtonSizePreset, PlatformId, ThemeMode } from '../types/cheat';

const STORAGE_KEYS = {
  PLATFORM: '@gtavi_cheats/preferred_platform',
  THEME: '@gtavi_cheats/theme_mode',
  BUTTON_SIZE: '@gtavi_cheats/button_size',
  FAVORITES_GTA5: '@gtavi_cheats/favorites_gta5',
  FAVORITES_GTA6: '@gtavi_cheats/favorites_gta6',
  /** Legacy fallback key for one-time migration */
  FAVORITES_LEGACY: '@gtavi_cheats/favorites',
  RECENTLY_VIEWED: '@gtavi_cheats/recently_viewed',
  ACTIVE_GAME: '@gtavi_cheats/active_game',
} as const;

const MAX_RECENTLY_VIEWED = 8;

interface AppStateContextValue {
  hydrated: boolean;
  activeGame: CheatDatasetKey;
  setActiveGame: (game: CheatDatasetKey) => void;
  activeDataset: CheatDatasetConfig;
  repository: LocalCheatRepository;
  preferredPlatform: PlatformId;
  setPreferredPlatform: (platform: PlatformId) => void;
  buttonSize: ButtonSizePreset;
  setButtonSize: (size: ButtonSizePreset) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
  favoriteIds: string[];
  isFavorite: (cheatId: string) => boolean;
  toggleFavorite: (cheatId: string) => void;
  recentlyViewedIds: string[];
  recordRecentlyViewed: (cheatId: string) => void;
  clearRecentlyViewed: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

function isValidPlatform(value: string | null): value is PlatformId {
  return value === 'playstation' || value === 'xbox' || value === 'pc';
}

function isValidTheme(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

function isValidButtonSize(value: string | null): value is ButtonSizePreset {
  return value === 'sm' || value === 'md' || value === 'lg';
}

function isValidGame(value: string | null): value is CheatDatasetKey {
  return value === 'gta5' || value === 'gta6';
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [activeGame, setActiveGameState] = useState<CheatDatasetKey>('gta6');
  const [preferredPlatform, setPreferredPlatformState] =
    useState<PlatformId>('playstation');
  const [buttonSize, setButtonSizeState] = useState<ButtonSizePreset>('md');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [gta5FavoriteIds, setGta5FavoriteIds] = useState<string[]>([]);
  const [gta6FavoriteIds, setGta6FavoriteIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    async function hydrate() {
      try {
        const entries = await AsyncStorage.multiGet([
          STORAGE_KEYS.PLATFORM,
          STORAGE_KEYS.THEME,
          STORAGE_KEYS.BUTTON_SIZE,
          STORAGE_KEYS.ACTIVE_GAME,
          STORAGE_KEYS.FAVORITES_GTA5,
          STORAGE_KEYS.FAVORITES_GTA6,
          STORAGE_KEYS.FAVORITES_LEGACY,
          STORAGE_KEYS.RECENTLY_VIEWED,
        ]);

        if (!active) return;

        const map = new Map(entries);

        const savedGame = map.get(STORAGE_KEYS.ACTIVE_GAME) ?? null;
        if (isValidGame(savedGame)) {
          setActiveGameState(savedGame);
        } else {
          // Default to GTA 6
          setActiveGameState('gta6');
        }

        const savedPlatform = map.get(STORAGE_KEYS.PLATFORM) ?? null;
        if (isValidPlatform(savedPlatform)) {
          setPreferredPlatformState(savedPlatform);
        }

        const savedTheme = map.get(STORAGE_KEYS.THEME) ?? null;
        if (isValidTheme(savedTheme)) {
          setThemeModeState(savedTheme);
        }

        const savedButtonSize = map.get(STORAGE_KEYS.BUTTON_SIZE) ?? null;
        if (isValidButtonSize(savedButtonSize)) {
          setButtonSizeState(savedButtonSize);
        }

        // Favorites for GTA 5 & migration from legacy
        const savedGta5Favs = map.get(STORAGE_KEYS.FAVORITES_GTA5);
        const legacyFavs = map.get(STORAGE_KEYS.FAVORITES_LEGACY);
        if (savedGta5Favs) {
          const parsed = JSON.parse(savedGta5Favs);
          if (Array.isArray(parsed)) {
            setGta5FavoriteIds(parsed.filter((id): id is string => typeof id === 'string'));
          }
        } else if (legacyFavs) {
          const parsed = JSON.parse(legacyFavs);
          if (Array.isArray(parsed)) {
            const list = parsed.filter((id): id is string => typeof id === 'string');
            setGta5FavoriteIds(list);
            AsyncStorage.setItem(STORAGE_KEYS.FAVORITES_GTA5, JSON.stringify(list)).catch(() => {});
          }
        }

        // Favorites for GTA 6
        const savedGta6Favs = map.get(STORAGE_KEYS.FAVORITES_GTA6);
        if (savedGta6Favs) {
          const parsed = JSON.parse(savedGta6Favs);
          if (Array.isArray(parsed)) {
            setGta6FavoriteIds(parsed.filter((id): id is string => typeof id === 'string'));
          }
        }

        const savedRecent = map.get(STORAGE_KEYS.RECENTLY_VIEWED);
        if (savedRecent) {
          const parsed = JSON.parse(savedRecent);
          if (Array.isArray(parsed)) {
            setRecentlyViewedIds(
              parsed
                .filter((id): id is string => typeof id === 'string')
                .slice(0, MAX_RECENTLY_VIEWED)
            );
          }
        }
      } catch {
        // Fallback cleanly to defaults if storage is unavailable
      } finally {
        if (active) {
          setHydrated(true);
        }
      }
    }

    hydrate();
    return () => {
      active = false;
    };
  }, []);

  const setActiveGame = useCallback((game: CheatDatasetKey) => {
    setActiveGameState((prev) => {
      if (prev === game) return prev;
      AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_GAME, game).catch(() => {});
      return game;
    });
  }, []);

  const setPreferredPlatform = useCallback((platform: PlatformId) => {
    setPreferredPlatformState((prev) => {
      if (prev === platform) return prev;
      AsyncStorage.setItem(STORAGE_KEYS.PLATFORM, platform).catch(() => {});
      return platform;
    });
  }, []);

  const setButtonSize = useCallback((size: ButtonSizePreset) => {
    setButtonSizeState((prev) => {
      if (prev === size) return prev;
      AsyncStorage.setItem(STORAGE_KEYS.BUTTON_SIZE, size).catch(() => {});
      return size;
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState((prev) => {
      if (prev === mode) return prev;
      AsyncStorage.setItem(STORAGE_KEYS.THEME, mode).catch(() => {});
      return mode;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(STORAGE_KEYS.THEME, next).catch(() => {});
      return next;
    });
  }, []);

  const favoriteIds = useMemo(() => {
    return activeGame === 'gta6' ? gta6FavoriteIds : gta5FavoriteIds;
  }, [activeGame, gta6FavoriteIds, gta5FavoriteIds]);

  const isFavorite = useCallback(
    (cheatId: string) => favoriteIds.includes(cheatId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (cheatId: string) => {
      if (activeGame === 'gta6') {
        setGta6FavoriteIds((prev) => {
          const next = prev.includes(cheatId)
            ? prev.filter((id) => id !== cheatId)
            : [cheatId, ...prev];
          AsyncStorage.setItem(STORAGE_KEYS.FAVORITES_GTA6, JSON.stringify(next)).catch(() => {});
          return next;
        });
      } else {
        setGta5FavoriteIds((prev) => {
          const next = prev.includes(cheatId)
            ? prev.filter((id) => id !== cheatId)
            : [cheatId, ...prev];
          AsyncStorage.setItem(STORAGE_KEYS.FAVORITES_GTA5, JSON.stringify(next)).catch(() => {});
          return next;
        });
      }
    },
    [activeGame]
  );

  const recordRecentlyViewed = useCallback((cheatId: string) => {
    setRecentlyViewedIds((prev) => {
      const next = [cheatId, ...prev.filter((id) => id !== cheatId)].slice(
        0,
        MAX_RECENTLY_VIEWED
      );
      AsyncStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(next)).catch(
        () => {}
      );
      return next;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewedIds([]);
    AsyncStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED).catch(() => {});
  }, []);

  const colors = useMemo(() => getThemeColors(themeMode), [themeMode]);
  const activeDataset = useMemo(() => getCheatDataset(activeGame), [activeGame]);
  const repository = useMemo(() => getCheatRepository(activeGame), [activeGame]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      hydrated,
      activeGame,
      setActiveGame,
      activeDataset,
      repository,
      preferredPlatform,
      setPreferredPlatform,
      buttonSize,
      setButtonSize,
      themeMode,
      setThemeMode,
      toggleTheme,
      colors,
      favoriteIds,
      isFavorite,
      toggleFavorite,
      recentlyViewedIds,
      recordRecentlyViewed,
      clearRecentlyViewed,
    }),
    [
      hydrated,
      activeGame,
      setActiveGame,
      activeDataset,
      repository,
      preferredPlatform,
      setPreferredPlatform,
      buttonSize,
      setButtonSize,
      themeMode,
      setThemeMode,
      toggleTheme,
      colors,
      favoriteIds,
      isFavorite,
      toggleFavorite,
      recentlyViewedIds,
      recordRecentlyViewed,
      clearRecentlyViewed,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}

export function useActiveGame() {
  const { activeGame, setActiveGame, activeDataset, repository } = useAppState();
  return { activeGame, setActiveGame, activeDataset, repository };
}

export function useCheatRepository() {
  const { repository, activeGame } = useAppState();
  return { repository, activeGame };
}

export function useTheme() {
  const { themeMode, setThemeMode, toggleTheme, colors } = useAppState();
  return { themeMode, setThemeMode, toggleTheme, colors };
}

export function usePreferences() {
  const {
    hydrated,
    preferredPlatform,
    setPreferredPlatform,
    buttonSize,
    setButtonSize,
  } = useAppState();
  return {
    hydrated,
    preferredPlatform,
    setPreferredPlatform,
    buttonSize,
    setButtonSize,
  };
}

export function useFavorites() {
  const { favoriteIds, isFavorite, toggleFavorite } = useAppState();
  return { favoriteIds, isFavorite, toggleFavorite };
}

export function useRecentlyViewed() {
  const { recentlyViewedIds, recordRecentlyViewed, clearRecentlyViewed } =
    useAppState();
  return { recentlyViewedIds, recordRecentlyViewed, clearRecentlyViewed };
}
