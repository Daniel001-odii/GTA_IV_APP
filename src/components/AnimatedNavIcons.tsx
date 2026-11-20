import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedNavIconProps {
  active: boolean;
  color: string;
  size?: number;
}

/**
 * Gamepad icon (All Cheats tab):
 * Triggers a playful controller tilt-wiggle + spring pop whenever the tab becomes active.
 */
export function AnimatedGamepadIcon({
  active,
  color,
  size = 24,
}: AnimatedNavIconProps) {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      rotate.value = withSequence(
        withTiming(-13, { duration: 90 }),
        withTiming(11, { duration: 100 }),
        withTiming(-6, { duration: 85 }),
        withSpring(0, { damping: 12, stiffness: 240 })
      );
      scale.value = withSequence(
        withSpring(1.18, { damping: 10, stiffness: 280 }),
        withSpring(1.05, { damping: 14, stiffness: 220 })
      );
    } else {
      rotate.value = withTiming(0, { duration: 140 });
      scale.value = withSpring(1, { damping: 16, stiffness: 240 });
    }
  }, [active, rotate, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle} testID="animated-nav-icon-gamepad">
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
          stroke={color}
          strokeWidth={active ? 2.1 : 1.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? `${color}28` : 'none'}
        />
        <Line
          x1="6"
          y1="11"
          x2="10"
          y2="11"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Line
          x1="8"
          y1="9"
          x2="8"
          y2="13"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Circle cx="15" cy="12" r="1" fill={color} />
        <Circle cx="18" cy="10" r="1" fill={color} />
      </Svg>
    </Animated.View>
  );
}

/**
 * LayoutGrid icon (Categories tab):
 * 4 rounded tiles perform a staggered spring pop wave when the tab becomes active.
 */
export function AnimatedCategoriesIcon({
  active,
  color,
  size = 24,
}: AnimatedNavIconProps) {
  const s0 = useSharedValue(1);
  const s1 = useSharedValue(1);
  const s2 = useSharedValue(1);
  const s3 = useSharedValue(1);

  useEffect(() => {
    const tiles = [s0, s1, s2, s3];
    if (active) {
      tiles.forEach((tile, i) => {
        tile.value = withDelay(
          i * 50,
          withSequence(
            withSpring(1.28, { damping: 9, stiffness: 320 }),
            withSpring(1, { damping: 13, stiffness: 240 })
          )
        );
      });
    } else {
      tiles.forEach((tile) => {
        tile.value = withSpring(1, { damping: 16, stiffness: 240 });
      });
    }
  }, [active, s0, s1, s2, s3]);

  const style0 = useAnimatedStyle(() => ({ transform: [{ scale: s0.value }] }));
  const style1 = useAnimatedStyle(() => ({ transform: [{ scale: s1.value }] }));
  const style2 = useAnimatedStyle(() => ({ transform: [{ scale: s2.value }] }));
  const style3 = useAnimatedStyle(() => ({ transform: [{ scale: s3.value }] }));

  const tileSize = Math.round((size - 4) / 2);
  const tileStyles = [style0, style1, style2, style3];

  return (
    <View
      testID="animated-nav-icon-categories"
      style={[
        styles.gridWrap,
        { width: size, height: size },
      ]}
    >
      {tileStyles.map((tileStyle, idx) => (
        <Animated.View key={idx} style={tileStyle}>
          <Svg width={tileSize} height={tileSize} viewBox="0 0 10 10" fill="none">
            <Rect
              x="1"
              y="1"
              width="8"
              height="8"
              rx="2.2"
              stroke={color}
              strokeWidth={active ? 1.8 : 1.6}
              fill={active ? `${color}33` : 'none'}
            />
          </Svg>
        </Animated.View>
      ))}
    </View>
  );
}

/**
 * Heart icon (Favorites tab):
 * Performs a lively double-heartbeat pulse with filled core when active.
 */
export function AnimatedHeartIcon({
  active,
  color,
  size = 24,
}: AnimatedNavIconProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withSequence(
        withSpring(1.26, { damping: 9, stiffness: 340 }),
        withTiming(0.92, { duration: 90 }),
        withSpring(1.16, { damping: 10, stiffness: 290 }),
        withSpring(1.04, { damping: 14, stiffness: 220 })
      );
    } else {
      scale.value = withSpring(1, { damping: 16, stiffness: 240 });
    }
  }, [active, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle} testID="animated-nav-icon-favorites">
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          stroke={color}
          strokeWidth={active ? 2.1 : 1.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? color : 'none'}
        />
      </Svg>
    </Animated.View>
  );
}

/**
 * Settings Cog icon (Settings tab):
 * Rotates smoothly by 120° with spring physics whenever the tab becomes active.
 */
export function AnimatedSettingsIcon({
  active,
  color,
  size = 24,
}: AnimatedNavIconProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      rotation.value = withSpring(rotation.value + 120, {
        damping: 14,
        stiffness: 170,
        mass: 0.9,
      });
      scale.value = withSequence(
        withSpring(1.14, { damping: 11, stiffness: 280 }),
        withSpring(1.04, { damping: 14, stiffness: 220 })
      );
    } else {
      scale.value = withSpring(1, { damping: 16, stiffness: 240 });
    }
  }, [active, rotation, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle} testID="animated-nav-icon-settings">
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          stroke={color}
          strokeWidth={active ? 2.05 : 1.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? `${color}28` : 'none'}
        />
        <Circle
          cx="12"
          cy="12"
          r="3"
          stroke={color}
          strokeWidth={active ? 2.05 : 1.85}
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
});
