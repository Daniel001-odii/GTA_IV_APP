import React, { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PLATFORMS } from '../constants/artwork';
import { useTheme } from '../context/AppStateContext';
import { RADII } from '../theme/tokens';
import { PlatformId } from '../types/cheat';
import { triggerSelectionHaptic } from '../utils/haptics';
import { PlatformBrandIcon } from './PlatformBrandIcon';

interface PlatformSelectorProps {
  value: PlatformId;
  onChange: (platform: PlatformId) => void;
  compact?: boolean;
}

const PADDING = 4;

export function PlatformSelector({
  value,
  onChange,
  compact = false,
}: PlatformSelectorProps) {
  const { colors } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = Math.max(
    0,
    PLATFORMS.findIndex((p) => p.id === value)
  );
  const translateX = useSharedValue(0);

  const segmentWidth =
    containerWidth > 0 ? (containerWidth - PADDING * 2) / PLATFORMS.length : 0;

  useEffect(() => {
    if (segmentWidth > 0) {
      translateX.value = withSpring(activeIndex * segmentWidth, {
        damping: 18,
        stiffness: 220,
        mass: 0.8,
      });
    }
  }, [activeIndex, segmentWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
      accessibilityRole="tablist"
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSecondary,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      {segmentWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            indicatorStyle,
            {
              width: segmentWidth,
            },
          ]}
        >
          <LinearGradient
            colors={[colors.accentPrimary, colors.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}

      {PLATFORMS.map((platform) => {
        const isActive = platform.id === value;
        const iconColor = isActive ? '#FFFFFF' : colors.textSecondary;

        return (
          <Pressable
            key={platform.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={platform.label}
            testID={`platform-tab-${platform.id}`}
            onPress={() => {
              if (!isActive) {
                triggerSelectionHaptic();
                const idx = PLATFORMS.findIndex((p) => p.id === platform.id);
                if (segmentWidth > 0 && idx >= 0) {
                  translateX.value = withSpring(idx * segmentWidth, {
                    damping: 18,
                    stiffness: 220,
                    mass: 0.8,
                  });
                }
                onChange(platform.id);
              }
            }}
            style={[styles.segment, compact && styles.segmentCompact]}
          >
            <PlatformBrandIcon
              platform={platform.id}
              size={compact ? 22 : 25}
              color={iconColor}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    padding: PADDING,
    borderRadius: RADII.lg,
    borderWidth: 1,
  },
  indicator: {
    position: 'absolute',
    top: PADDING,
    bottom: PADDING,
    left: PADDING,
    borderRadius: RADII.md,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 1,
  },
  segmentCompact: {
    paddingVertical: 8,
  },
});
