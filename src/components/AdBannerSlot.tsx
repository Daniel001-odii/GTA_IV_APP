import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getGoogleMobileAdsModule } from '../ads/adRuntime';
import { getBannerUnitId } from '../config/admobConfig';
import { useAds } from '../context/AdsContext';
import { useTheme } from '../context/AppStateContext';
import { FONTS, RADII } from '../theme/tokens';

interface AdBannerSlotProps {
  placement?: string;
}

/**
 * Self-collapsing inline Adaptive Banner ad slot.
 * - Native Dev/Prod builds: renders Google AdMob ANCHORED_ADAPTIVE_BANNER.
 * - Expo Go / Web in __DEV__: shows a compact dev placeholder so spacing is
 *   easy to verify without crashing on missing native AdMob modules.
 * - Production Web or failed ad fill: collapses cleanly to null.
 */
export function AdBannerSlot({ placement = 'inline' }: AdBannerSlotProps) {
  const { colors } = useTheme();
  const { isNativeAdsAvailable, adsInitialized, canRequestAds } = useAds();
  const [failed, setFailed] = useState(false);

  const adsMod = useMemo(
    () => (isNativeAdsAvailable ? getGoogleMobileAdsModule() : null),
    [isNativeAdsAvailable]
  );

  if (failed) {
    return null;
  }

  if (adsMod && adsInitialized && canRequestAds) {
    const BannerAd = adsMod.BannerAd;
    const unitId = getBannerUnitId();

    return (
      <View
        testID={`ad-banner-${placement}`}
        style={[
          styles.nativeWrap,
          { borderBottomColor: colors.borderSubtle },
        ]}
      >
        <Text style={[styles.sponsoredTag, { color: colors.textMuted }]}>
          SPONSORED
        </Text>
        <View style={styles.bannerCenter}>
          <BannerAd
            unitId={unitId}
            size={adsMod.BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: false,
            }}
            onAdFailedToLoad={() => setFailed(true)}
          />
        </View>
      </View>
    );
  }

  if (!__DEV__) {
    return null;
  }

  return (
    <View
      testID={`ad-banner-preview-${placement}`}
      style={[
        styles.devPreviewBox,
        {
          backgroundColor: colors.bgSecondary,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <View
        style={[
          styles.devBadge,
          { backgroundColor: colors.accentPurpleMuted },
        ]}
      >
        <Text style={[styles.devBadgeText, { color: colors.accentPurple }]}>
          AD
        </Text>
      </View>
      <Text style={[styles.devPreviewText, { color: colors.textMuted }]}>
        AdMob Adaptive Banner • Dev Build Preview
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nativeWrap: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sponsoredTag: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 9.5,
    letterSpacing: 1.2,
  },
  bannerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  devPreviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 54,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingHorizontal: 12,
  },
  devBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  devBadgeText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
  },
  devPreviewText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
  },
});
