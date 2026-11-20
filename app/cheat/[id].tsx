import React, { useEffect, useMemo, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import {
  ArrowLeft2,
  Clock,
  InfoCircle,
  Warning2,
} from 'iconsax-react-nativejs';
import { AdBannerSlot } from '../../src/components/AdBannerSlot';
import { CheatCard } from '../../src/components/CheatCard';
import { ControllerCombo } from '../../src/components/ControllerCombo';
import { EmptyState } from '../../src/components/EmptyState';
import { FavoriteButton } from '../../src/components/FavoriteButton';
import { PcCommandDisplay } from '../../src/components/PcCommandDisplay';
import { PlatformSelector } from '../../src/components/PlatformSelector';
import { StatusBadge } from '../../src/components/StatusBadge';
import { ARTWORK_SOURCES, getPlatformMeta } from '../../src/constants/artwork';
import { useAds } from '../../src/context/AdsContext';
import {
  usePreferences,
  useRecentlyViewed,
  useTheme,
} from '../../src/context/AppStateContext';
import { getActiveCheatDataset } from '../../src/data/cheatCodesConfig';
import {
  cheatRepository,
  resolveCheatInstruction,
} from '../../src/data/cheatRepository';
import { FONTS, RADII, SPACING } from '../../src/theme/tokens';
import { CheatCode } from '../../src/types/cheat';

export default function CheatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { preferredPlatform, setPreferredPlatform } = usePreferences();
  const { recordRecentlyViewed } = useRecentlyViewed();
  const { recordCheatDetailOpen } = useAds();
  const activeDataset = useMemo(() => getActiveCheatDataset(), []);
  const recordedOpenIdRef = useRef<string | null>(null);

  const cheat = useMemo(
    () => (typeof id === 'string' ? cheatRepository.getCheatById(id) : undefined),
    [id]
  );

  useEffect(() => {
    if (cheat) {
      recordRecentlyViewed(cheat.id);
      if (recordedOpenIdRef.current !== cheat.id) {
        recordedOpenIdRef.current = cheat.id;
        recordCheatDetailOpen();
      }
    }
  }, [cheat, recordRecentlyViewed, recordCheatDetailOpen]);

  if (!cheat) {
    return (
      <View
        style={[
          styles.notFoundScreen,
          { backgroundColor: colors.bgPrimary, paddingTop: insets.top + 40 },
        ]}
      >
        <EmptyState
          icon={
            <Warning2
              size={28}
              color={colors.accentSecondary}
              variant="Bulk"
            />
          }
          title="Cheat Not Found"
          description="We couldn't find that cheat code in the offline catalog."
          actionLabel="Back to All Cheats"
          onAction={() => router.replace('/')}
        />
      </View>
    );
  }

  const category = cheatRepository.getCategoryById(cheat.category);
  const relatedCheats = cheatRepository.getRelatedCheats(cheat, 4);
  const resolved = resolveCheatInstruction(cheat, preferredPlatform);
  const platformMeta = getPlatformMeta(preferredPlatform);

  const openRelated = (nextCheat: CheatCode) => {
    router.push(`/cheat/${nextCheat.id}`);
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.bgPrimary }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Portrait Hero Header */}
      <View style={styles.heroHeader}>
        <Image
          source={ARTWORK_SOURCES[cheat.imageKey]}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="top"
          transition={280}
          cachePolicy="memory-disk"
        />
        <LinearGradient
          colors={[
            'rgba(11, 9, 20, 0.48)',
            'rgba(27, 16, 48, 0.3)',
            colors.bgPrimary,
          ]}
          locations={[0, 0.48, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Floating Top Nav */}
        <View
          style={[
            styles.floatingNav,
            { paddingTop: Math.max(insets.top, 14) + 6 },
          ]}
        >
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
            accessibilityLabel="Go back"
            testID="detail-back-btn"
            style={styles.backBtn}
          >
            <ArrowLeft2 size={20} color="#FFFFFF" variant="Linear" />
          </Pressable>

          <FavoriteButton cheatId={cheat.id} size={20} overlay />
        </View>

        {/* Title Overlay */}
        <Animated.View entering={FadeInDown.duration(300)} style={styles.heroInfo}>
          <View style={styles.heroMetaRow}>
            <View
              style={[
                styles.categoryBadge,
                { borderColor: category?.accentColor ?? colors.accentPrimary },
              ]}
            >
              <Text
                style={[
                  styles.categoryBadgeText,
                  { color: category?.accentColor ?? colors.accentPrimary },
                ]}
              >
                {(category?.name ?? cheat.category).toUpperCase()}
              </Text>
            </View>
            <StatusBadge
              mode={resolved.mode === 'verified' ? 'verified' : 'pending'}
              label={
                resolved.mode === 'verified'
                  ? activeDataset.badgeLabel
                  : 'Pending Verification'
              }
            />
          </View>

          <Text style={styles.cheatTitle}>{cheat.title}</Text>
        </Animated.View>
      </View>

      {/* Main Detail Content */}
      <Animated.View entering={FadeIn.duration(280)} style={styles.body}>
        {/* Inline Platform Switcher */}
        <View style={styles.section}>
          <Text style={[styles.microLabel, { color: colors.textSecondary }]}>
            SWITCH PLATFORM
          </Text>
          <PlatformSelector
            value={preferredPlatform}
            onChange={setPreferredPlatform}
          />
        </View>

        {/* Platform Instructions Section (flat, no card box) */}
        <View
          style={[
            styles.flatSection,
            {
              borderBottomColor: colors.borderSubtle,
            },
          ]}
        >
          {resolved.mode === 'verified' &&
          preferredPlatform !== 'pc' &&
          resolved.buttons ? (
            <ControllerCombo
              platform={preferredPlatform}
              buttons={resolved.buttons}
              variant="detail"
              layout="wrap"
            />
          ) : resolved.mode === 'verified' &&
            preferredPlatform === 'pc' &&
            resolved.pcCommand ? (
            <PcCommandDisplay command={resolved.pcCommand} />
          ) : (
            <View style={styles.unavailableBox} testID="pending-verification-card">
              <View
                style={[
                  styles.unavailableIcon,
                  { backgroundColor: colors.warningMuted },
                ]}
              >
                <Clock size={24} color={colors.warning} variant="Bulk" />
              </View>
              <Text
                style={[styles.unavailableTitle, { color: colors.textPrimary }]}
              >
                {platformMeta.label} Code Unavailable
              </Text>
              <Text
                style={[
                  styles.unavailableDesc,
                  { color: colors.textSecondary },
                ]}
              >
                No verified code is currently configured for {platformMeta.label}{' '}
                on this entry.
              </Text>
            </View>
          )}
        </View>

        {/* Description Section (flat, no card box) */}
        <View
          style={[
            styles.flatSection,
            { borderBottomColor: colors.borderSubtle },
          ]}
        >
          <Text style={[styles.microLabel, { color: colors.textSecondary }]}>
            WHAT THIS CHEAT DOES
          </Text>
          <Text style={[styles.description, { color: colors.textPrimary }]}>
            {cheat.description}
          </Text>

          <View
            style={[
              styles.noteBox,
              {
                backgroundColor: colors.bgSecondary,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            <InfoCircle size={17} color={colors.accentCyan} variant="Bulk" />
            <Text style={[styles.noteText, { color: colors.textSecondary }]}>
              {cheat.usageNote ??
                'Activating cheats disables achievements/trophies for the current play session.'}
            </Text>
          </View>
        </View>

        {/* Inline Adaptive Banner Ad */}
        <AdBannerSlot placement={`detail-${cheat.id}`} />

        {/* Related Cheats */}
        {relatedCheats.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              RELATED CHEATS
            </Text>
            <View style={styles.relatedList}>
              {relatedCheats.map((rel) => (
                <CheatCard
                  key={rel.id}
                  cheat={rel}
                  platform={preferredPlatform}
                  showCategory={false}
                  showInlineCombo={false}
                  onPress={openRelated}
                />
              ))}
            </View>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  notFoundScreen: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    paddingBottom: 42,
  },
  heroHeader: {
    height: 360,
    width: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  floatingNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 9, 20, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInfo: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: 10,
  },
  heroMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(11, 9, 20, 0.74)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.pill,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10.5,
    letterSpacing: 0.9,
  },
  cheatTitle: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 38,
    lineHeight: 40,
    letterSpacing: 0.7,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  body: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  section: {
    gap: SPACING.sm,
  },
  microLabel: {
    fontFamily: FONTS.bodyBold,
    fontSize: 11,
    letterSpacing: 1.1,
  },
  flatSection: {
    paddingBottom: SPACING.xl,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  unavailableBox: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: 10,
  },
  unavailableIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableTitle: {
    fontFamily: FONTS.displayBold,
    fontSize: 22,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  unavailableDesc: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 320,
  },
  description: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 15,
    lineHeight: 23,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    padding: SPACING.md,
    borderRadius: RADII.md,
    borderWidth: 1,
    marginTop: 4,
  },
  noteText: {
    flex: 1,
    fontFamily: FONTS.bodyRegular,
    fontSize: 12.5,
    lineHeight: 18,
  },
  relatedSection: {
    gap: SPACING.md,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 24,
    letterSpacing: 0.8,
  },
  relatedList: {
    gap: 18,
  },
});
