import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MagicStar, SearchStatus } from 'iconsax-react-nativejs';
import { AdBannerSlot } from '../../src/components/AdBannerSlot';
import { CheatCard } from '../../src/components/CheatCard';
import { EmptyState } from '../../src/components/EmptyState';
import { PlatformSelector } from '../../src/components/PlatformSelector';
import { SearchBar } from '../../src/components/SearchBar';
import { SkeletonCard } from '../../src/components/Skeleton';
import { AD_PACING } from '../../src/config/admobConfig';
import { ARTWORK_SOURCES } from '../../src/constants/artwork';
import { usePreferences, useTheme } from '../../src/context/AppStateContext';
import { getActiveCheatDataset } from '../../src/data/cheatCodesConfig';
import { cheatRepository } from '../../src/data/cheatRepository';
import { FONTS, RADII, SPACING } from '../../src/theme/tokens';
import { CheatCode } from '../../src/types/cheat';

type ListRow =
  | { kind: 'sticky-controls'; id: string }
  | { kind: 'skeleton'; id: string }
  | { kind: 'empty'; id: string }
  | { kind: 'ad'; id: string }
  | { kind: 'cheat'; id: string; cheat: CheatCode };

export default function AllCheatsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { hydrated, preferredPlatform, setPreferredPlatform } =
    usePreferences();
  const [search, setSearch] = useState('');

  const activeDataset = useMemo(() => getActiveCheatDataset(), []);

  const cheats = useMemo(
    () =>
      cheatRepository.queryCheats({
        search,
        category: 'all',
        platform: preferredPlatform,
        sort: 'popularity',
        onlyAvailableOnPlatform: true,
      }),
    [search, preferredPlatform]
  );

  const rows = useMemo<ListRow[]>(() => {
    const items: ListRow[] = [{ kind: 'sticky-controls', id: 'sticky-controls' }];

    if (!hydrated) {
      for (let i = 0; i < 4; i++) {
        items.push({ kind: 'skeleton', id: `skeleton-${i}` });
      }
      return items;
    }

    if (cheats.length === 0) {
      items.push({ kind: 'empty', id: 'empty-state' });
      return items;
    }

    cheats.forEach((cheat, idx) => {
      items.push({ kind: 'cheat', id: cheat.id, cheat });
      const position = idx + 1;
      if (
        position % AD_PACING.bannerIntervalInList === 0 &&
        position < cheats.length
      ) {
        items.push({ kind: 'ad', id: `ad-all-${position}` });
      }
    });
    return items;
  }, [hydrated, cheats]);

  const openCheat = (cheat: CheatCode) => {
    router.push(`/cheat/${cheat.id}`);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bgPrimary }]}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        stickyHeaderIndices={[1]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.heroContainer}>
            <Image
              source={ARTWORK_SOURCES['hero-vice']}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              contentPosition="top"
              transition={280}
              cachePolicy="memory-disk"
            />
            <LinearGradient
              colors={[
                colors.heroScrimTop,
                colors.heroScrimMid,
                colors.heroScrimBottom,
              ]}
              locations={[0, 0.55, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View
              style={[
                styles.heroOverlay,
                { paddingTop: Math.max(insets.top, 14) + 10 },
              ]}
            >
              <View style={styles.datasetPill}>
                <MagicStar size={13} color="#2CE5E0" variant="Bold" />
                <Text style={styles.datasetPillText}>
                  {activeDataset.badgeLabel.toUpperCase()} • {cheats.length} CODES
                </Text>
              </View>

              <Animated.View
                entering={FadeInDown.duration(320)}
                style={styles.heroTextBlock}
              >
                <Text style={styles.heroEyebrow}>GRAND THEFT AUTO VI</Text>
                <Text style={styles.heroTitle}>ALL CHEAT CODES</Text>
                <Text style={styles.heroSubtitle}>
                  Pick your platform below for instant controller combos or PC commands.
                </Text>
              </Animated.View>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          if (item.kind === 'sticky-controls') {
            return (
              <View
                testID="home-sticky-controls"
                style={[
                  styles.stickyControls,
                  {
                    backgroundColor: colors.bgPrimary,
                    borderBottomColor: colors.borderSubtle,
                    paddingTop: Math.max(insets.top, 10),
                  },
                ]}
              >
                <SearchBar
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search any cheat or PC command..."
                  testID="all-search-input"
                />

                <PlatformSelector
                  value={preferredPlatform}
                  onChange={setPreferredPlatform}
                />
              </View>
            );
          }

          if (item.kind === 'skeleton') {
            return (
              <View style={styles.rowPad}>
                <SkeletonCard />
              </View>
            );
          }

          if (item.kind === 'empty') {
            return (
              <View style={styles.rowPad}>
                <EmptyState
                  icon={
                    <SearchStatus
                      size={28}
                      color={colors.accentSecondary}
                      variant="Bulk"
                    />
                  }
                  title="No Matching Cheats"
                  description="Try searching by cheat name, keyword, or PC command like TURTLE, BUZZOFF, or COMET."
                  actionLabel="Clear Search"
                  onAction={() => setSearch('')}
                />
              </View>
            );
          }

          if (item.kind === 'ad') {
            return (
              <View style={styles.rowPad}>
                <AdBannerSlot placement={item.id} />
              </View>
            );
          }

          return (
            <View style={styles.rowPad}>
              <CheatCard
                cheat={item.cheat}
                platform={preferredPlatform}
                showCategory={false}
                showInlineCombo
                onPress={openCheat}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 110,
  },
  heroContainer: {
    height: 254,
    width: '100%',
    position: 'relative',
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  datasetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(11, 9, 20, 0.76)',
    borderWidth: 1,
    borderColor: 'rgba(44, 229, 224, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.pill,
  },
  datasetPillText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10.5,
    letterSpacing: 1,
    color: '#2CE5E0',
  },
  heroTextBlock: {
    gap: 2,
  },
  heroEyebrow: {
    fontFamily: FONTS.bodyBold,
    fontSize: 11.5,
    letterSpacing: 2,
    color: '#FF4FA3',
  },
  heroTitle: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 42,
    lineHeight: 43,
    letterSpacing: 0.9,
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13.5,
    lineHeight: 19,
    color: 'rgba(255, 255, 255, 0.86)',
    marginTop: 2,
  },
  stickyControls: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 12,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  rowPad: {
    paddingHorizontal: SPACING.lg,
    marginBottom: 20,
  },
});
