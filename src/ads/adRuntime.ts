import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

export type GoogleMobileAdsModule = typeof import('react-native-google-mobile-ads');

let cachedModule: GoogleMobileAdsModule | null | undefined;

/**
 * Safely checks whether native Google Mobile Ads is available in the current
 * runtime. Returns `null` on Expo Go and Web so development never crashes.
 */
export function getGoogleMobileAdsModule(): GoogleMobileAdsModule | null {
  if (cachedModule !== undefined) {
    return cachedModule;
  }

  if (Platform.OS === 'web') {
    cachedModule = null;
    return null;
  }

  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    cachedModule = null;
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('react-native-google-mobile-ads') as GoogleMobileAdsModule;
    cachedModule = mod;
    return mod;
  } catch {
    cachedModule = null;
    return null;
  }
}

export function resetGoogleMobileAdsCacheForTests() {
  cachedModule = undefined;
}
