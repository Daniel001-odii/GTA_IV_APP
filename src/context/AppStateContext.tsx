import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors, ThemeColors } from '../theme/tokens';
import { ButtonSizePreset, PlatformId, ThemeMode } from '../types/cheat';

const STORAGE_KEYS = {
  PLATFORM: '@gtavi_cheats/preferred_platform',
  THEME: '@gtavi_cheats/theme_mode',
  BUTTON_SIZE: '@gtavi_cheats/button_size',
  FAVORITES: '@gtavi_cheats/favorites',
  RECENTLY_VIEWED: '@gtavi_cheats/recently_viewed',
} as const;

const MAX_RECENTLY_VIEWED = 8;

interface AppStateContextValue {
  hydrated: boolean;
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

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [preferredPlatform, setPreferredPlatformState] =
    useState<PlatformId>('playstation');
  const [buttonSize, setButtonSizeState] = useState<ButtonSizePreset>('md');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    async function hydrate() {
      try {
        const entries = await AsyncStorage.multiGet([
          STORAGE_KEYS.PLATFORM,
          STORAGE_KEYS.THEME,
          STORAGE_KEYS.BUTTON_SIZE,
          STORAGE_KEYS.FAVORITES,
          STORAGE_KEYS.RECENTLY_VIEWED,
        ]);

        if (!active) return;

        const map = new Map(entries);
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

        const savedFavorites = map.get(STORAGE_KEYS.FAVORITES);
        if (savedFavorites) {
          const parsed = JSON.parse(savedFavorites);
          if (Array.isArray(parsed)) {
            setFavoriteIds(parsed.filter((id): id is string => typeof id === 'string'));
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

  const setPreferredPlatform = useCallback((platform: PlatformId) => {
    setPreferredPlatformState(platform);
    AsyncStorage.setItem(STORAGE_KEYS.PLATFORM, platform).catch(() => {});
  }, []);

  const setButtonSize = useCallback((size: ButtonSizePreset) => {
    setButtonSizeState(size);
    AsyncStorage.setItem(STORAGE_KEYS.BUTTON_SIZE, size).catch(() => {});
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(STORAGE_KEYS.THEME, mode).catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(STORAGE_KEYS.THEME, next).catch(() => {});
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (cheatId: string) => favoriteIds.includes(cheatId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback((cheatId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(cheatId)
        ? prev.filter((id) => id !== cheatId)
        : [cheatId, ...prev];
      AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

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

  const value = useMemo<AppStateContextValue>(
    () => ({
      hydrated,
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

function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
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
