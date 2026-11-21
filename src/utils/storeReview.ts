import { Linking, NativeModules, Platform } from 'react-native';

const APP_STORE_URL =
  'https://apps.apple.com/app/id6740000000?action=write-review';
const PLAY_STORE_URL =
  'market://details?id=com.gtavicheats.companion';

/**
 * Checks whether the current native binary includes the ExpoStoreReview native module.
 * If the app is running in a dev client built before expo-store-review was installed,
 * this prevents the unhandled 'Cannot find native module ExpoStoreReview' error.
 */
function isNativeStoreReviewInstalled(): boolean {
  try {
    const g = globalThis as Record<string, any>;
    if (g?.expo?.modules?.ExpoStoreReview) {
      return true;
    }
    if (NativeModules?.ExpoStoreReview || NativeModules?.NativeUncompiled?.ExpoStoreReview) {
      return true;
    }
  } catch {
    // Fall back to direct store link
  }
  return false;
}

export async function requestAppRating(): Promise<void> {
  const storeUrl = Platform.OS === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;

  // 1. If native module is compiled into the binary, attempt native StoreKit review prompt
  if (isNativeStoreReviewInstalled()) {
    try {
      // Dynamic import to avoid top-level requireNativeModule crash
      const StoreReview = require('expo-store-review');
      if (StoreReview?.isAvailableAsync) {
        const isAvailable = await StoreReview.isAvailableAsync();
        if (isAvailable && StoreReview.requestReview) {
          await StoreReview.requestReview();
          return;
        }
      }
    } catch {
      // Proceed to link fallback
    }
  }

  // 2. Fallback: Open direct store page for review
  try {
    const canOpen = await Linking.canOpenURL(storeUrl);
    if (canOpen) {
      await Linking.openURL(storeUrl);
    } else {
      // Fallback for devices without Store app installed (e.g. simulator)
      const webUrl =
        Platform.OS === 'ios'
          ? 'https://apps.apple.com/app/id6740000000'
          : 'https://play.google.com/store/apps/details?id=com.gtavicheats.companion';
      await Linking.openURL(webUrl);
    }
  } catch {
    // Graceful silent fallback
  }
}
