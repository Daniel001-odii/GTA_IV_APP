import { Platform } from 'react-native';

/**
 * ============================================================================
 * GOOGLE ADMOB CONFIGURATION
 * ============================================================================
 * Replace the production unit IDs below (and `androidAppId` / `iosAppId` in
 * `app.json`) when you are ready to publish to Google Play / App Store.
 *
 * Safety rule: Whenever `__DEV__` is true OR a production unit ID is left empty,
 * Google's official Test Ad Unit IDs are used automatically so you never risk
 * an AdMob policy violation during testing.
 */

export const GOOGLE_TEST_IDS = {
  android: {
    appId: 'ca-app-pub-3940256099942544~3347511713',
    adaptiveBanner: 'ca-app-pub-3940256099942544/9214589741',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
  },
  ios: {
    appId: 'ca-app-pub-3940256099942544~1458002511',
    adaptiveBanner: 'ca-app-pub-3940256099942544/2435281174',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
  },
} as const;

export const ADMOB_PRODUCTION_IDS = {
  android: {
    appId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ?? '',
    adaptiveBanner: process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID ?? '',
    interstitial: process.env.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID ?? '',
  },
  ios: {
    appId: process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID ?? '',
    adaptiveBanner: process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID ?? '',
    interstitial: process.env.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID ?? '',
  },
};

export const AD_PACING = {
  /** Insert one inline adaptive banner after every N cheats in scrollable lists */
  bannerIntervalInList: 6,
  /** Show an interstitial at most once every N cheat detail screen opens */
  interstitialEveryNOpens: 5,
  /** Minimum wait time between interstitial ads (2 minutes) */
  interstitialCooldownMs: 2 * 60 * 1000,
} as const;

type MobileOs = 'android' | 'ios';

function resolveMobileOs(os?: string): MobileOs {
  return (os ?? Platform.OS) === 'ios' ? 'ios' : 'android';
}

export function getBannerUnitId(options?: {
  os?: string;
  isDev?: boolean;
}): string {
  const os = resolveMobileOs(options?.os);
  const isDev = options?.isDev ?? __DEV__;
  const prodId = ADMOB_PRODUCTION_IDS[os].adaptiveBanner.trim();

  if (isDev || prodId.length === 0) {
    return GOOGLE_TEST_IDS[os].adaptiveBanner;
  }
  return prodId;
}

export function getInterstitialUnitId(options?: {
  os?: string;
  isDev?: boolean;
}): string {
  const os = resolveMobileOs(options?.os);
  const isDev = options?.isDev ?? __DEV__;
  const prodId = ADMOB_PRODUCTION_IDS[os].interstitial.trim();

  if (isDev || prodId.length === 0) {
    return GOOGLE_TEST_IDS[os].interstitial;
  }
  return prodId;
}
