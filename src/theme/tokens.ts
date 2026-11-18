import { ThemeMode } from '../types/cheat';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  bgCardElevated: string;
  bgInput: string;
  accentPrimary: string;
  accentPrimaryMuted: string;
  accentSecondary: string;
  accentSecondaryMuted: string;
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
  bgPrimary: '#090B10',
  bgSecondary: '#141821',
  bgCard: '#1B202B',
  bgCardElevated: '#232938',
  bgInput: '#141821',
  accentPrimary: '#F4B942',
  accentPrimaryMuted: 'rgba(244, 185, 66, 0.16)',
  accentSecondary: '#E85B4A',
  accentSecondaryMuted: 'rgba(232, 91, 74, 0.16)',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textOnAccent: '#090B10',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',
  success: '#34D399',
  successMuted: 'rgba(52, 211, 153, 0.16)',
  warning: '#F4B942',
  warningMuted: 'rgba(244, 185, 66, 0.16)',
  info: '#60A5FA',
  infoMuted: 'rgba(96, 165, 250, 0.16)',
  tabBarBg: '#0D1017',
  tabBarBorder: 'rgba(255, 255, 255, 0.08)',
  heroScrimTop: 'rgba(9, 11, 16, 0.18)',
  heroScrimMid: 'rgba(9, 11, 16, 0.55)',
  heroScrimBottom: '#090B10',
  gamepadChipBg: '#141821',
  gamepadChipActiveBg: 'rgba(244, 185, 66, 0.2)',
  gamepadChipBorder: 'rgba(255, 255, 255, 0.08)',
  skeletonBase: '#1B202B',
  skeletonHighlight: '#272E3D',
};

export const LIGHT_COLORS: ThemeColors = {
  bgPrimary: '#F4F5F8',
  bgSecondary: '#E8EBF2',
  bgCard: '#FFFFFF',
  bgCardElevated: '#F9FAFC',
  bgInput: '#FFFFFF',
  accentPrimary: '#D4941A',
  accentPrimaryMuted: 'rgba(212, 148, 26, 0.14)',
  accentSecondary: '#D94636',
  accentSecondaryMuted: 'rgba(217, 70, 54, 0.13)',
  textPrimary: '#0F141F',
  textSecondary: '#4B5565',
  textMuted: '#6B7280',
  textOnAccent: '#FFFFFF',
  borderSubtle: 'rgba(15, 20, 31, 0.09)',
  borderStrong: 'rgba(15, 20, 31, 0.18)',
  success: '#059669',
  successMuted: 'rgba(5, 150, 105, 0.12)',
  warning: '#B45309',
  warningMuted: 'rgba(180, 83, 9, 0.12)',
  info: '#2563EB',
  infoMuted: 'rgba(37, 99, 235, 0.12)',
  tabBarBg: '#FFFFFF',
  tabBarBorder: 'rgba(15, 20, 31, 0.09)',
  heroScrimTop: 'rgba(9, 11, 16, 0.15)',
  heroScrimMid: 'rgba(9, 11, 16, 0.55)',
  heroScrimBottom: '#F4F5F8',
  gamepadChipBg: '#EEF1F6',
  gamepadChipActiveBg: 'rgba(212, 148, 26, 0.18)',
  gamepadChipBorder: 'rgba(15, 20, 31, 0.09)',
  skeletonBase: '#E2E6EF',
  skeletonHighlight: '#EEF1F7',
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
