import React, { useCallback, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchStatus } from 'iconsax-react-nativejs';
import { AdBannerSlot } from '../../src/components/AdBannerSlot';
import { CategoryCard } from '../../src/components/CategoryCard';
import { CategoryIcon } from '../../src/components/CategoryIcon';
import { CheatCard } from '../../src/components/CheatCard';
import { EmptyState } from '../../src/components/EmptyState';
import { PlatformSelector } from '../../src/components/PlatformSelector';
import { SearchBar } from '../../src/components/SearchBar';
import { useActiveGame, usePreferences, useTheme } from '../../src/context/AppStateContext';
import { FONTS, RADII, SPACING } from '../../src/theme/tokens';
import { CheatCategory, CheatCategoryId, CheatCode } from '../../src/types/cheat';
import { triggerSelectionHaptic } from '../../src/utils/haptics';

interface CategorySection {
  category: CheatCategory;
  sectionIndex: number;
  data: CheatCode[];
}

export default function CategoriesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { preferredPlatform, setPreferredPlatform } = usePreferences();
  const { repository, activeGame } = useActiveGame();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CheatCategoryId | 'all'>('all');

  const categories = useMemo(() => repository.getVisibleCategories(), [repository]);

  const sections = useMemo<CategorySection[]>(() => {
    const filteredCategories =
      selectedCategory === 'all'
        ? categories
        : categories.filter((c) => c.id === selectedCategory);

    return filteredCategories
      .map((category) => {
        const items = repository.queryCheats({
          search,
          category: category.id,
          platform: preferredPlatform,
          sort: 'popularity',
          onlyAvailableOnPlatform: true,
        });
        return { category, data: items };
      })
      .filter((section) => section.data.length > 0)
      .map((section, sectionIndex) => ({ ...section, sectionIndex }));
  }, [repository, categories, selectedCategory, search, preferredPlatform]);

  const openCheat = useCallback(
    (cheat: CheatCode) => {
      router.push(`/cheat/${cheat.id}`);
    },
    [router]
  );

  const keyExtractor = useCallback((item: CheatCode) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: CheatCode }) => (
      <View style={styles.cardPad}>
        <CheatCard
          cheat={item}
          platform={preferredPlatform}
          showCategory={false}
          showInlineCombo
          onPress={openCheat}
        />
      </View>
    ),
    [preferredPlatform, openCheat]
  );

  const handleCategoryPress = (category: CheatCategory) => {
    triggerSelectionHaptic();
    setSelectedCategory((prev) => (prev === category.id ? 'all' : category.id));
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
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'ios'}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>
                CATEGORIES
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {categories.length} categories • Tap a card to focus or browse all grouped below
              </Text>
            </View>

            <View style={styles.controls}>
              <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder="Filter cheats within categories..."
                testID="categories-search-input"
              />
              <PlatformSelector
                value={preferredPlatform}
                onChange={setPreferredPlatform}
                compact
              />
            </View>

            {/* Portrait Category Artwork Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryCarousel}
            >
              {categories.map((cat) => (
                <View
                  key={cat.id}
                  style={[
                    styles.cardWrap,
                    selectedCategory === cat.id && {
                      borderColor: colors.accentPrimary,
                      borderWidth: 2,
                      borderRadius: RADII.lg + 2,
                    },
                  ]}
                >
                  <CategoryCard
                    category={cat}
                    count={repository.getCheatCountByCategory(cat.id)}
                    onPress={handleCategoryPress}
                  />
                </View>
              ))}
            </ScrollView>

            {selectedCategory !== 'all' && (
              <View style={styles.activeFilterRow}>
                <Text style={[styles.activeFilterText, { color: colors.textSecondary }]}>
                  Showing category:{' '}
                  <Text style={{ color: colors.accentPrimary, fontFamily: FONTS.bodyBold }}>
                    {repository.getCategoryById(selectedCategory)?.name}
                  </Text>
                </Text>
                <Pressable
                  onPress={() => {
                    triggerSelectionHaptic();
                    setSelectedCategory('all');
                  }}
                  style={[
                    styles.showAllBtn,
                    {
                      backgroundColor: colors.bgCard,
                      borderColor: colors.borderSubtle,
                    },
                  ]}
                >
                  <Text style={[styles.showAllText, { color: colors.accentCyan }]}>
                    Show all
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        }
        renderSectionHeader={({ section: { category, data } }) => (
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.sectionIconBox,
                {
                  backgroundColor: `${category.accentColor}22`,
                  borderColor: `${category.accentColor}66`,
                },
              ]}
            >
              <CategoryIcon
                name={category.iconName}
                size={18}
                color={category.accentColor}
                variant="Bulk"
              />
            </View>
            <View style={styles.sectionTitleBlock}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                {category.name}
              </Text>
              <Text style={[styles.sectionDesc, { color: colors.textMuted }]} numberOfLines={1}>
                {category.description}
              </Text>
            </View>
            <View
              style={[
                styles.countPill,
                { backgroundColor: colors.bgCard, borderColor: colors.borderSubtle },
              ]}
            >
              <Text style={[styles.countPillText, { color: category.accentColor }]}>
                {data.length}
              </Text>
            </View>
          </View>
        )}
        renderItem={renderItem}
        renderSectionFooter={({ section }) => {
          const isEverySecond = (section.sectionIndex + 1) % 2 === 0;
          const isFocusedSingle =
            selectedCategory !== 'all' && section.data.length >= 2;

          if (!isEverySecond && !isFocusedSingle) {
            return null;
          }

          return (
            <View style={[styles.cardPad, { marginTop: 18 }]}>
              <AdBannerSlot placement={`category-${section.category.id}`} />
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.cardPad}>
            <EmptyState
              icon={
                <SearchStatus
                  size={28}
                  color={colors.accentSecondary}
                  variant="Bulk"
                />
              }
              title="No Cheats Found"
              description="No cheats matched your filter inside the selected category."
              actionLabel="Reset Filters"
              onAction={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
            />
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
  listContent: {
    paddingBottom: 110,
  },
  headerBlock: {
    gap: 14,
    paddingBottom: 8,
  },
  titleRow: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
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
  controls: {
    paddingHorizontal: SPACING.lg,
    gap: 10,
  },
  categoryCarousel: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
    paddingVertical: 2,
  },
  cardWrap: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: RADII.lg + 2,
  },
  activeFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  activeFilterText: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13,
  },
  showAllBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADII.pill,
    borderWidth: 1,
  },
  showAllText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: SPACING.lg,
    paddingTop: 18,
    paddingBottom: 10,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleBlock: {
    flex: 1,
    gap: 1,
  },
  sectionTitle: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 23,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  sectionDesc: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12,
  },
  countPill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countPillText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
  },
  cardPad: {
    paddingHorizontal: SPACING.lg,
  },
});
