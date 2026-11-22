import React, { useCallback, useMemo } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'iconsax-react-nativejs';
import { CheatCard } from '../../src/components/CheatCard';
import { GameSegmentedControl } from '../../src/components/GameSwitcher';
import { PlatformSelector } from '../../src/components/PlatformSelector';
import {
  useActiveGame,
  useFavorites,
  usePreferences,
  useTheme,
} from '../../src/context/AppStateContext';
import { FONTS, SPACING } from '../../src/theme/tokens';
import { CheatCode } from '../../src/types/cheat';

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { favoriteIds } = useFavorites();
  const { preferredPlatform, setPreferredPlatform } = usePreferences();
  const { activeGame, activeDataset, repository } = useActiveGame();

  const favoriteCheats = useMemo(() => {
    return favoriteIds
      .map((id) => repository.getCheatById(id))
      .filter((c): c is CheatCode => Boolean(c));
  }, [favoriteIds, repository]);

  const openCheat = useCallback(
    (cheat: CheatCode) => {
      router.push(`/cheat/${cheat.id}`);
    },
    [router]
  );

  const keyExtractor = useCallback((item: CheatCode) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: CheatCode }) => (
      <CheatCard
        cheat={item}
        platform={preferredPlatform}
        showCategory
        showInlineCombo
        onPress={openCheat}
      />
    ),
    [preferredPlatform, openCheat]
  );

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.bgPrimary,
          paddingTop: Math.max(insets.top, 14),
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          FAVORITES
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {favoriteCheats.length === 0
            ? `Save your go-to ${activeDataset.gameTitle} cheats for instant offline access`
            : `${favoriteCheats.length} saved ${favoriteCheats.length === 1 ? 'cheat' : 'cheats'} for ${activeDataset.gameTitle}`}
        </Text>
      </View>

      <View style={styles.gameSwitcherWrap}>
        <GameSegmentedControl />
      </View>

      {favoriteCheats.length > 0 && (
        <View style={styles.platformRow}>
          <PlatformSelector
            value={preferredPlatform}
            onChange={setPreferredPlatform}
            compact
          />
        </View>
      )}

      <FlatList
        data={favoriteCheats}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'ios'}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View
              style={[
                styles.emptyIconCircle,
                { backgroundColor: 'rgba(255, 79, 163, 0.12)' },
              ]}
            >
              <Heart
                size={28}
                color={colors.accentSecondary}
                variant="Bulk"
              />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              No Favorites Yet
            </Text>
            <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
              Tap the heart icon on any cheat code to pin it here for quick offline access.
            </Text>
            <Pressable
              onPress={() => router.push('/')}
              style={[styles.emptyCta, { backgroundColor: colors.accentPrimary }]}
            >
              <Text style={[styles.emptyCtaText, { color: colors.textOnAccent }]}>
                Browse All Cheats
              </Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    gap: 4,
  },
  title: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 34,
    letterSpacing: 0.8,
  },
  subtitle: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13,
  },
  gameSwitcherWrap: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  platformRow: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 110,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: FONTS.displayBold,
    fontSize: 19,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  emptyDescription: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13,
    lineHeight: 18.5,
    textAlign: 'center',
    maxWidth: 280,
  },
  emptyCta: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  emptyCtaText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12.5,
    letterSpacing: 0.4,
  },
});
