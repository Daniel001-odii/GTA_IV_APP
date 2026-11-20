import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ARTWORK_SOURCES } from '../constants/artwork';
import { useTheme } from '../context/AppStateContext';
import { FONTS, RADII, SPACING } from '../theme/tokens';
import { CheatCategory } from '../types/cheat';
import { CategoryIcon } from './CategoryIcon';

interface CategoryCardProps {
  category: CheatCategory;
  count: number;
  onPress: (category: CheatCategory) => void;
}

export function CategoryCard({ category, count, onPress }: CategoryCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => onPress(category)}
        onPressIn={() => {
          scale.value = withSpring(0.96, { damping: 16, stiffness: 320 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 16, stiffness: 280 });
        }}
        testID={`category-card-${category.id}`}
        style={[
          styles.card,
          {
            backgroundColor: colors.bgCard,
            borderColor: colors.borderSubtle,
          },
        ]}
      >
        <Image
          source={ARTWORK_SOURCES[category.imageKey]}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="top"
          transition={240}
          cachePolicy="memory-disk"
        />
        <LinearGradient
          colors={[
            'rgba(9, 11, 16, 0.25)',
            'rgba(9, 11, 16, 0.6)',
            'rgba(9, 11, 16, 0.94)',
          ]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={[
            styles.iconBadge,
            { backgroundColor: `${category.accentColor}26`, borderColor: `${category.accentColor}66` },
          ]}
        >
          <CategoryIcon name={category.iconName} size={18} color={category.accentColor} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.title} numberOfLines={2}>
            {category.name}
          </Text>
          <Text style={[styles.count, { color: category.accentColor }]}>
            {count} {count === 1 ? 'cheat' : 'cheats'}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 146,
    height: 190,
    borderRadius: RADII.lg,
    overflow: 'hidden',
    borderWidth: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    gap: 3,
  },
  title: {
    fontFamily: FONTS.displayBold,
    fontSize: 19,
    lineHeight: 20,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  count: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 11.5,
  },
});
