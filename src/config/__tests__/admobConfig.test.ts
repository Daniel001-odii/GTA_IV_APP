import {
  AD_PACING,
  getBannerUnitId,
  getInterstitialUnitId,
  GOOGLE_TEST_IDS,
} from '../admobConfig';

describe('admobConfig', () => {
  it('always returns official Google Test IDs in __DEV__ mode for Android and iOS', () => {
    expect(getBannerUnitId({ os: 'android', isDev: true })).toBe(
      GOOGLE_TEST_IDS.android.adaptiveBanner
    );
    expect(getBannerUnitId({ os: 'ios', isDev: true })).toBe(
      GOOGLE_TEST_IDS.ios.adaptiveBanner
    );
    expect(getInterstitialUnitId({ os: 'android', isDev: true })).toBe(
      GOOGLE_TEST_IDS.android.interstitial
    );
    expect(getInterstitialUnitId({ os: 'ios', isDev: true })).toBe(
      GOOGLE_TEST_IDS.ios.interstitial
    );
  });

  it('safely falls back to Test IDs when production unit IDs are not filled in yet', () => {
    expect(getBannerUnitId({ os: 'android', isDev: false })).toBe(
      GOOGLE_TEST_IDS.android.adaptiveBanner
    );
    expect(getInterstitialUnitId({ os: 'ios', isDev: false })).toBe(
      GOOGLE_TEST_IDS.ios.interstitial
    );
  });

  it('uses agreed light-touch pacing defaults', () => {
    expect(AD_PACING.bannerIntervalInList).toBe(6);
    expect(AD_PACING.interstitialEveryNOpens).toBe(5);
    expect(AD_PACING.interstitialCooldownMs).toBe(120_000);
  });
});
