import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'iconsax-react-nativejs';
import { CheatCard } from '../../src/components/CheatCard';
import { EmptyState } from '../../src/components/EmptyState';
import { PlatformSelector } from '../../src/components/PlatformSelector';
import {
  useFavorites,
  usePreferences,
  useTheme,
} from '../../src/context/AppStateContext';
import { cheatRepository } from '../../src/data/cheatRepository';
import { FONTS, SPACING } from '../../src/theme/tokens';
import { CheatCode } from '../../src/types/cheat';

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { favoriteIds } = useFavorites();
  const { preferredPlatform, setPreferredPlatform } = usePreferences();

  const favoriteCheats = useMemo(() => {
    return favoriteIds
      .map((id) => cheatRepository.getCheatById(id))
      .filter((c): c is CheatCode => Boolean(c));
  }, [favoriteIds]);

  const openCheat = (cheat: CheatCode) => {
    router.push(`/cheat/${cheat.id}`);
  };

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
            ? 'Save your go-to cheats for instant offline access'
            : `${favoriteCheats.length} saved ${favoriteCheats.length === 1 ? 'cheat' : 'cheats'} stored on device`}
        </Text>
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <CheatCard
            cheat={item}
            platform={preferredPlatform}
            showCategory
            showInlineCombo
            onPress={openCheat}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={
              <Heart
                size={28}
                color={colors.accentSecondary}
                variant="Bulk"
              />
            }
            title="No Favorites Yet"
            description="Tap the heart icon on any cheat card or detail screen to pin it here for quick mid-game access — no account needed."
            actionLabel="Browse All Cheats"
            onAction={() => router.push('/')}
          />
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
    paddingBottom: SPACING.md,
    gap: 2,
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
  platformRow: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 110,
  },
});
