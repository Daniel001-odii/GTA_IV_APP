import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../context/AppStateContext';
import { RADII } from '../theme/tokens';

export function SkeletonCard() {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.95, { duration: 700 }),
        withTiming(0.45, { duration: 700 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        pulseStyle,
        {
          backgroundColor: colors.bgCard,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={[styles.thumb, { backgroundColor: colors.skeletonHighlight }]} />
      <View style={styles.lines}>
        <View style={[styles.lineShort, { backgroundColor: colors.skeletonHighlight }]} />
        <View style={[styles.lineTitle, { backgroundColor: colors.skeletonHighlight }]} />
        <View style={[styles.lineBody, { backgroundColor: colors.skeletonHighlight }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: RADII.lg,
    borderWidth: 1,
    gap: 12,
  },
  thumb: {
    width: 62,
    height: 82,
    borderRadius: RADII.md,
  },
  lines: {
    flex: 1,
    gap: 8,
  },
  lineShort: {
    width: '38%',
    height: 10,
    borderRadius: 5,
  },
  lineTitle: {
    width: '72%',
    height: 16,
    borderRadius: 6,
  },
  lineBody: {
    width: '92%',
    height: 12,
    borderRadius: 5,
  },
});
