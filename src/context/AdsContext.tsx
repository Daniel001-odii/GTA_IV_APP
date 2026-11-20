import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getInterstitialUnitId } from '../config/admobConfig';
import { getGoogleMobileAdsModule } from '../ads/adRuntime';
import {
  evaluateDetailOpen,
  INITIAL_PACING_STATE,
  InterstitialPacingState,
} from '../ads/interstitialPacing';

interface AdsContextValue {
  isNativeAdsAvailable: boolean;
  adsInitialized: boolean;
  canRequestAds: boolean;
  privacyOptionsRequired: boolean;
  recordCheatDetailOpen: () => void;
  openPrivacyOptions: () => Promise<boolean>;
}

const AdsContext = createContext<AdsContextValue>({
  isNativeAdsAvailable: false,
  adsInitialized: false,
  canRequestAds: false,
  privacyOptionsRequired: false,
  recordCheatDetailOpen: () => {},
  openPrivacyOptions: async () => false,
});

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const [isNativeAdsAvailable, setIsNativeAdsAvailable] = useState(false);
  const [adsInitialized, setAdsInitialized] = useState(false);
  const [canRequestAds, setCanRequestAds] = useState(false);
  const [privacyOptionsRequired, setPrivacyOptionsRequired] = useState(false);

  const pacingRef = useRef<InterstitialPacingState>(INITIAL_PACING_STATE);
  const interstitialRef = useRef<{
    load: () => void;
    show: () => Promise<void>;
  } | null>(null);
  const interstitialLoadedRef = useRef(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadInterstitial = useCallback(() => {
    const adsMod = getGoogleMobileAdsModule();
    if (!adsMod) return;

    const unitId = getInterstitialUnitId();
    const ad = adsMod.InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    interstitialLoadedRef.current = false;
    interstitialRef.current = ad;

    const unsubLoaded = ad.addAdEventListener(adsMod.AdEventType.LOADED, () => {
      interstitialLoadedRef.current = true;
    });

    const unsubClosed = ad.addAdEventListener(adsMod.AdEventType.CLOSED, () => {
      interstitialLoadedRef.current = false;
      unsubLoaded();
      unsubClosed();
      unsubError();
      loadInterstitial();
    });

    const unsubError = ad.addAdEventListener(adsMod.AdEventType.ERROR, () => {
      interstitialLoadedRef.current = false;
      unsubLoaded();
      unsubClosed();
      unsubError();
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
      retryTimerRef.current = setTimeout(() => {
        loadInterstitial();
      }, 30_000);
    });

    ad.load();
  }, []);

  useEffect(() => {
    let active = true;

    async function bootstrapAds() {
      const adsMod = getGoogleMobileAdsModule();
      if (!adsMod) {
        return;
      }

      if (active) {
        setIsNativeAdsAvailable(true);
      }

      try {
        // 1. Gather UMP GDPR / privacy consent before initializing AdMob SDK
        let consentCanRequest = true;
        try {
          const consentInfo = await adsMod.AdsConsent.gatherConsent();
          if (!active) return;

          consentCanRequest = consentInfo.canRequestAds;
          setPrivacyOptionsRequired(
            consentInfo.privacyOptionsRequirementStatus ===
              adsMod.AdsConsentPrivacyOptionsRequirementStatus.REQUIRED
          );
        } catch {
          // If UMP form is not configured yet in AdMob console, still initialize
          // cleanly with Test IDs during development without crashing.
          consentCanRequest = true;
        }

        if (!active) return;
        setCanRequestAds(consentCanRequest);

        if (consentCanRequest) {
          await adsMod.default().initialize();
          if (!active) return;
          setAdsInitialized(true);
          loadInterstitial();
        }
      } catch {
        // Fail silently so ads never disrupt core cheat lookup UX
      }
    }

    bootstrapAds();

    return () => {
      active = false;
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, [loadInterstitial]);

  const recordCheatDetailOpen = useCallback(() => {
    if (!adsInitialized || !canRequestAds) return;

    const { shouldShow, nextState } = evaluateDetailOpen(
      pacingRef.current,
      Date.now()
    );

    if (shouldShow && interstitialLoadedRef.current && interstitialRef.current) {
      pacingRef.current = nextState;
      interstitialLoadedRef.current = false;
      interstitialRef.current.show().catch(() => {
        loadInterstitial();
      });
    } else if (!shouldShow) {
      pacingRef.current = nextState;
    }
  }, [adsInitialized, canRequestAds, loadInterstitial]);

  const openPrivacyOptions = useCallback(async () => {
    const adsMod = getGoogleMobileAdsModule();
    if (!adsMod) return false;

    try {
      const updated = await adsMod.AdsConsent.showPrivacyOptionsForm();
      setCanRequestAds(updated.canRequestAds);
      setPrivacyOptionsRequired(
        updated.privacyOptionsRequirementStatus ===
          adsMod.AdsConsentPrivacyOptionsRequirementStatus.REQUIRED
      );
      return true;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo<AdsContextValue>(
    () => ({
      isNativeAdsAvailable,
      adsInitialized,
      canRequestAds,
      privacyOptionsRequired,
      recordCheatDetailOpen,
      openPrivacyOptions,
    }),
    [
      isNativeAdsAvailable,
      adsInitialized,
      canRequestAds,
      privacyOptionsRequired,
      recordCheatDetailOpen,
      openPrivacyOptions,
    ]
  );

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}

export function useAds() {
  return useContext(AdsContext);
}
