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
  | 'bay-jetskis'
  | 'gta6-boobie-phone'
  | 'gta6-real-dimez'
  | 'gta6-lucia-training'
  | 'gta6-jason-lucia'
  | 'gta6-tuning'
  | 'gta6-lucia-nightclub'
  | 'gta6-vice-city-night'
  | 'gta6-boat-party';

export type SortOption = 'popularity' | 'category' | 'alphabetical';
export type ThemeMode = 'dark' | 'light';
export type ButtonSizePreset = 'sm' | 'md' | 'lg';

export interface CheatCombinations {
  playstation?: GamepadButtonId[];
  xbox?: GamepadButtonId[];
  pc?: string;
  phone?: string;
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
  phoneNumber?: string;
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
