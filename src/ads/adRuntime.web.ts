import type { GoogleMobileAdsModule } from './adRuntime';

/**
 * Web runtime stub: keeps react-native-google-mobile-ads native code completely
 * out of the Expo Web bundle.
 */
export function getGoogleMobileAdsModule(): GoogleMobileAdsModule | null {
  return null;
}

export function resetGoogleMobileAdsCacheForTests() {
  // No-op on web
}
