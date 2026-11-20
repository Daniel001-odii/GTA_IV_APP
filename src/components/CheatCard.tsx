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
import { usePreferences, useTheme } from '../context/AppStateContext';
import {
  cheatRepository,
  resolveCheatInstruction,
} from '../data/cheatRepository';
import { FONTS, RADII } from '../theme/tokens';
import { CheatCode, PlatformId } from '../types/cheat';
import { ControllerCombo } from './ControllerCombo';
import { FavoriteButton } from './FavoriteButton';
import { PcCommandDisplay } from './PcCommandDisplay';

interface CheatCardProps {
  cheat: CheatCode;
  onPress: (cheat: CheatCode) => void;
  platform?: PlatformId;
  showCategory?: boolean;
  showInlineCombo?: boolean;
}

export function CheatCard({
  cheat,
  onPress,
  platform,
  showCategory = false,
  showInlineCombo = true,
}: CheatCardProps) {
  const { colors } = useTheme();
  const { preferredPlatform } = usePreferences();
  const activePlatform = platform ?? preferredPlatform;
  const category = cheatRepository.getCategoryById(cheat.category);
  const resolved = resolveCheatInstruction(cheat, activePlatform);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 16, stiffness: 320 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 16, stiffness: 280 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => onPress(cheat)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        testID={`cheat-card-${cheat.id}`}
        style={[
          styles.card,
          {
            borderBottomColor: colors.borderSubtle,
          },
        ]}
      >
        <View style={styles.topRow}>
          <View style={styles.thumbWrapper}>
            <Image
              source={ARTWORK_SOURCES[cheat.imageKey]}
              style={styles.thumb}
              contentFit="cover"
              contentPosition="top"
              transition={220}
              cachePolicy="memory-disk"
            />
            <LinearGradient
              colors={['transparent', 'rgba(11, 9, 20, 0.6)']}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                styles.thumbAccentBar,
                {
                  backgroundColor: category?.accentColor ?? colors.accentPrimary,
                },
              ]}
            />
          </View>

          <View style={styles.textBlock}>
            {showCategory && category && (
              <Text
                style={[styles.categoryLabel, { color: category.accentColor }]}
              >
                {category.name.toUpperCase()}
              </Text>
            )}
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {cheat.title}
            </Text>
            <Text
              style={[styles.desc, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {cheat.shortDescription}
            </Text>
          </View>

          <FavoriteButton cheatId={cheat.id} size={18} />
        </View>

        {showInlineCombo && resolved.mode === 'verified' && (
          <View style={styles.comboStrip}>
            {activePlatform === 'pc' && resolved.pcCommand ? (
              <PcCommandDisplay command={resolved.pcCommand} compact />
            ) : activePlatform !== 'pc' && resolved.buttons ? (
              <ControllerCombo
                platform={activePlatform}
                buttons={resolved.buttons}
                variant="card"
                layout="wrap"
                interactive={false}
                showControls={false}
              />
            ) : null}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    paddingBottom: 18,
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumbWrapper: {
    width: 48,
    height: 60,
    borderRadius: RADII.md,
    overflow: 'hidden',
    position: 'relative',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbAccentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  categoryLabel: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10,
    letterSpacing: 0.9,
  },
  title: {
    fontFamily: FONTS.bodyBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  desc: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12,
    lineHeight: 16.5,
  },
  comboStrip: {
    paddingTop: 2,
  },
});
