import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Heart } from 'iconsax-react-nativejs';
import { useFavorites, useTheme } from '../context/AppStateContext';
import { triggerLightImpact } from '../utils/haptics';

interface FavoriteButtonProps {
  cheatId: string;
  size?: number;
  overlay?: boolean;
}

export function FavoriteButton({
  cheatId,
  size = 19,
  overlay = false,
}: FavoriteButtonProps) {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(cheatId);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.8, { damping: 10, stiffness: 320 }),
      withSpring(1.22, { damping: 10, stiffness: 260 }),
      withSpring(1, { damping: 14, stiffness: 220 })
    );
    triggerLightImpact();
    toggleFavorite(cheatId);
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={active ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityState={{ selected: active }}
        testID={`favorite-btn-${cheatId}`}
        style={[
          styles.button,
          overlay
            ? styles.overlayButton
            : {
                backgroundColor: active
                  ? colors.accentSecondaryMuted
                  : colors.bgSecondary,
                borderColor: active ? colors.accentSecondary : colors.borderSubtle,
              },
        ]}
      >
        <Heart
          size={size}
          color={
            active
              ? colors.accentSecondary
              : overlay
                ? '#FFFFFF'
                : colors.textSecondary
          }
          variant={active ? 'Bold' : 'Linear'}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  overlayButton: {
    backgroundColor: 'rgba(9, 11, 16, 0.58)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
});
