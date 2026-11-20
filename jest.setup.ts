jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(() => Promise.resolve()),
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(() => Promise.resolve(true)),
  getStringAsync: jest.fn(() => Promise.resolve('')),
}));

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    executionEnvironment: 'storeClient',
  },
  ExecutionEnvironment: {
    Bare: 'bare',
    Standalone: 'standalone',
    StoreClient: 'storeClient',
  },
}));

jest.mock('react-native-google-mobile-ads', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () => ({
      initialize: jest.fn(() => Promise.resolve([])),
    }),
    BannerAd: (props: Record<string, unknown>) =>
      mockReact.createElement(View, { testID: 'mock-banner-ad', ...props }),
    BannerAdSize: {
      ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
    },
    InterstitialAd: {
      createForAdRequest: jest.fn(() => ({
        load: jest.fn(),
        show: jest.fn(() => Promise.resolve()),
        addAdEventListener: jest.fn(() => jest.fn()),
      })),
    },
    AdEventType: {
      LOADED: 'loaded',
      CLOSED: 'closed',
      ERROR: 'error',
    },
    AdsConsent: {
      gatherConsent: jest.fn(() =>
        Promise.resolve({
          canRequestAds: true,
          privacyOptionsRequirementStatus: 'NOT_REQUIRED',
        })
      ),
      showPrivacyOptionsForm: jest.fn(() =>
        Promise.resolve({
          canRequestAds: true,
          privacyOptionsRequirementStatus: 'NOT_REQUIRED',
        })
      ),
    },
    AdsConsentPrivacyOptionsRequirementStatus: {
      REQUIRED: 'REQUIRED',
      NOT_REQUIRED: 'NOT_REQUIRED',
      UNKNOWN: 'UNKNOWN',
    },
    TestIds: {
      ADAPTIVE_BANNER: 'ca-app-pub-3940256099942544/9214589741',
      INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
    },
  };
});

jest.mock('expo-image', () => {
  const mockReact = require('react');
  const { Image } = require('react-native');
  return {
    Image: (props: Record<string, unknown>) =>
      mockReact.createElement(Image, props),
  };
});

jest.mock('iconsax-react-nativejs', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') return true;
        return (props: Record<string, unknown>) =>
          mockReact.createElement(View, { testID: `icon-${String(prop)}`, ...props });
      },
    }
  );
});

jest.mock('react-native-reanimated', () => {
  const { View, Text, ScrollView } = require('react-native');
  const makeChain = () => {
    const chain: Record<string, unknown> = {};
    chain.delay = () => chain;
    chain.duration = () => chain;
    chain.springify = () => chain;
    chain.damping = () => chain;
    return chain;
  };
  return {
    __esModule: true,
    default: {
      View,
      Text,
      ScrollView,
      createAnimatedComponent: (Comp: unknown) => Comp,
    },
    useSharedValue: (init: unknown) => ({ value: init }),
    useAnimatedStyle: (fn: () => Record<string, unknown>) => fn(),
    withSpring: (val: unknown) => val,
    withTiming: (val: unknown) => val,
    withDelay: (_delay: number, val: unknown) => val,
    withSequence: (...vals: unknown[]) => vals[vals.length - 1],
    withRepeat: (val: unknown) => val,
    FadeIn: makeChain(),
    FadeInDown: makeChain(),
  };
});
