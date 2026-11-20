import { ThemeMode } from '../types/cheat';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  bgCardElevated: string;
  bgInput: string;
  /** Neon Pink — primary interactive highlight */
  accentPrimary: string;
  accentPrimaryMuted: string;
  /** Sunset Orange — warm secondary energy & favorites */
  accentSecondary: string;
  accentSecondaryMuted: string;
  /** Vice Teal/Cyan — crisp technical/PC/verified accents */
  accentCyan: string;
  accentCyanMuted: string;
  /** Electric Purple — atmospheric Vice City accent */
  accentPurple: string;
  accentPurpleMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnAccent: string;
  borderSubtle: string;
  borderStrong: string;
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  info: string;
  infoMuted: string;
  tabBarBg: string;
  tabBarBorder: string;
  heroScrimTop: string;
  heroScrimMid: string;
  heroScrimBottom: string;
  gamepadChipBg: string;
  gamepadChipActiveBg: string;
  gamepadChipBorder: string;
  skeletonBase: string;
  skeletonHighlight: string;
}

export const DARK_COLORS: ThemeColors = {
  bgPrimary: '#0B0914',
  bgSecondary: '#151126',
  bgCard: '#1B1630',
  bgCardElevated: '#251E42',
  bgInput: '#151126',
  accentPrimary: '#FF4FA3',
  accentPrimaryMuted: 'rgba(255, 79, 163, 0.17)',
  accentSecondary: '#FF7A3D',
  accentSecondaryMuted: 'rgba(255, 122, 61, 0.18)',
  accentCyan: '#2CE5E0',
  accentCyanMuted: 'rgba(44, 229, 224, 0.15)',
  accentPurple: '#9B5CFF',
  accentPurpleMuted: 'rgba(155, 92, 255, 0.18)',
  textPrimary: '#FFFFFF',
  textSecondary: '#BCB4D1',
  textMuted: '#7E7599',
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(176, 145, 255, 0.14)',
  borderStrong: 'rgba(255, 79, 163, 0.34)',
  success: '#2CE5E0',
  successMuted: 'rgba(44, 229, 224, 0.15)',
  warning: '#FF7A3D',
  warningMuted: 'rgba(255, 122, 61, 0.18)',
  info: '#2CE5E0',
  infoMuted: 'rgba(44, 229, 224, 0.15)',
  tabBarBg: '#130F24',
  tabBarBorder: 'rgba(176, 145, 255, 0.18)',
  heroScrimTop: 'rgba(11, 9, 20, 0.22)',
  heroScrimMid: 'rgba(27, 16, 48, 0.56)',
  heroScrimBottom: '#0B0914',
  gamepadChipBg: '#141025',
  gamepadChipActiveBg: 'rgba(255, 79, 163, 0.22)',
  gamepadChipBorder: 'rgba(176, 145, 255, 0.16)',
  skeletonBase: '#1B1630',
  skeletonHighlight: '#292149',
};

export const LIGHT_COLORS: ThemeColors = {
  bgPrimary: '#F7F4FB',
  bgSecondary: '#ECE6F6',
  bgCard: '#FFFFFF',
  bgCardElevated: '#FBF9FE',
  bgInput: '#FFFFFF',
  accentPrimary: '#DF2981',
  accentPrimaryMuted: 'rgba(223, 41, 129, 0.13)',
  accentSecondary: '#E85D24',
  accentSecondaryMuted: 'rgba(232, 93, 36, 0.14)',
  accentCyan: '#0D9494',
  accentCyanMuted: 'rgba(13, 148, 148, 0.12)',
  accentPurple: '#7C3AED',
  accentPurpleMuted: 'rgba(124, 58, 237, 0.12)',
  textPrimary: '#151026',
  textSecondary: '#51496B',
  textMuted: '#7B7396',
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(124, 58, 237, 0.12)',
  borderStrong: 'rgba(223, 41, 129, 0.3)',
  success: '#0D9494',
  successMuted: 'rgba(13, 148, 148, 0.12)',
  warning: '#E85D24',
  warningMuted: 'rgba(232, 93, 36, 0.13)',
  info: '#7C3AED',
  infoMuted: 'rgba(124, 58, 237, 0.12)',
  tabBarBg: '#FFFFFF',
  tabBarBorder: 'rgba(124, 58, 237, 0.13)',
  heroScrimTop: 'rgba(11, 9, 20, 0.18)',
  heroScrimMid: 'rgba(27, 16, 48, 0.52)',
  heroScrimBottom: '#F7F4FB',
  gamepadChipBg: '#F1ECF9',
  gamepadChipActiveBg: 'rgba(223, 41, 129, 0.16)',
  gamepadChipBorder: 'rgba(124, 58, 237, 0.14)',
  skeletonBase: '#E7E1F2',
  skeletonHighlight: '#F2EEF9',
};

export const FONTS = {
  displayBold: 'BarlowCondensed_700Bold',
  displayExtraBold: 'BarlowCondensed_800ExtraBold',
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  monoSemiBold: 'JetBrainsMono_600SemiBold',
  monoBold: 'JetBrainsMono_700Bold',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const RADII = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
} as const;

export function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === 'light' ? LIGHT_COLORS : DARK_COLORS;
}
