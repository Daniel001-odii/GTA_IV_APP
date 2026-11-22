import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { RotateLeft } from 'iconsax-react-nativejs';
import { getGamepadAsset } from '../constants/gamepadIcons';
import { usePreferences, useTheme } from '../context/AppStateContext';
import { FONTS, RADII, SPACING } from '../theme/tokens';
import {
  ButtonSizePreset,
  ControllerPlatform,
  GamepadButtonId,
} from '../types/cheat';
import { triggerLightImpact, triggerSelectionHaptic } from '../utils/haptics';

export interface ControllerComboProps {
  platform: ControllerPlatform;
  buttons: GamepadButtonId[];
  /** 'card' for inline cheat cards, 'detail' for full cheat detail screens */
  variant?: 'card' | 'detail';
  /** Optional explicit override; otherwise uses user's persisted buttonSize setting */
  sizePreset?: ButtonSizePreset;
  /** 'wrap' shows all buttons at once across lines; 'scroll' keeps a single horizontal rail */
  layout?: 'wrap' | 'scroll';
  interactive?: boolean;
  showControls?: boolean;
}

const CARD_SIZES: Record<
  ButtonSizePreset,
  { square: number; wideWidth: number; slotHeight: number; slotMinWidth: number; gap: number; paddingH: number }
> = {
  sm: { square: 20, wideWidth: 28, slotHeight: 28, slotMinWidth: 28, gap: 5, paddingH: 4 },
  md: { square: 26, wideWidth: 36, slotHeight: 36, slotMinWidth: 34, gap: 6, paddingH: 5 },
  lg: { square: 34, wideWidth: 46, slotHeight: 46, slotMinWidth: 42, gap: 7, paddingH: 6 },
};

const DETAIL_SIZES: Record<
  ButtonSizePreset,
  { square: number; wideWidth: number; slotHeight: number; slotMinWidth: number; gap: number; paddingH: number }
> = {
  sm: { square: 34, wideWidth: 46, slotHeight: 46, slotMinWidth: 44, gap: 8, paddingH: 6 },
  md: { square: 44, wideWidth: 60, slotHeight: 58, slotMinWidth: 54, gap: 10, paddingH: 8 },
  lg: { square: 54, wideWidth: 74, slotHeight: 70, slotMinWidth: 64, gap: 11, paddingH: 9 },
};

interface StaticButtonStepProps {
  platform: ControllerPlatform;
  button: GamepadButtonId;
  index: number;
  dims: (typeof CARD_SIZES)['md'];
  chipBg: string;
  chipBorder: string;
}

const StaticButtonStep = React.memo(function StaticButtonStep({
  platform,
  button,
  index,
  dims,
  chipBg,
  chipBorder,
}: StaticButtonStepProps) {
  const asset = getGamepadAsset(platform, button);
  const imageWidth = asset.isWide ? dims.wideWidth : dims.square;
  const imageHeight = Math.round(imageWidth / asset.aspectRatio);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Step ${index + 1}: ${asset.label}`}
      testID={`combo-step-${index}-${asset.assetName}`}
      style={[
        styles.stepPill,
        styles.stepPillCompact,
        {
          minWidth: Math.max(dims.slotMinWidth, imageWidth + dims.paddingH * 2),
          height: dims.slotHeight,
          paddingHorizontal: dims.paddingH,
          backgroundColor: chipBg,
          borderColor: chipBorder,
        },
      ]}
    >
      <Image
        source={asset.source}
        style={{ width: imageWidth, height: imageHeight }}
        contentFit="contain"
        transition={0}
        cachePolicy="memory-disk"
        accessibilityLabel={asset.label}
      />
    </View>
  );
});

interface ButtonStepProps {
  platform: ControllerPlatform;
  button: GamepadButtonId;
  index: number;
  dims: (typeof CARD_SIZES)['md'];
  isCompactCard: boolean;
  interactive: boolean;
  isActive: boolean;
  isCompleted: boolean;
  onPress: (index: number) => void;
}

function ControllerButtonStep({
  platform,
  button,
  index,
  dims,
  isCompactCard,
  interactive,
  isActive,
  isCompleted,
  onPress,
}: ButtonStepProps) {
  const { colors } = useTheme();
  const asset = getGamepadAsset(platform, button);

  const imageWidth = asset.isWide ? dims.wideWidth : dims.square;
  const imageHeight = Math.round(imageWidth / asset.aspectRatio);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (!interactive) return;
    scale.value = withSequence(
      withSpring(0.88, { damping: 12, stiffness: 320 }),
      withSpring(1.06, { damping: 12, stiffness: 260 }),
      withSpring(1, { damping: 14, stiffness: 240 })
    );
    triggerLightImpact();
    onPress(index);
  };

  const pillContent = (
    <Pressable
      disabled={!interactive}
      onPress={handlePress}
      accessibilityRole={interactive ? 'button' : 'image'}
      accessibilityLabel={`Step ${index + 1}: ${asset.label}`}
      testID={`combo-step-${index}-${asset.assetName}`}
      style={[
        styles.stepPill,
        isCompactCard && styles.stepPillCompact,
        {
          minWidth: Math.max(dims.slotMinWidth, imageWidth + dims.paddingH * 2),
          height: dims.slotHeight,
          paddingHorizontal: dims.paddingH,
          backgroundColor: isActive
            ? colors.gamepadChipActiveBg
            : colors.gamepadChipBg,
          borderColor: isActive
            ? colors.accentPrimary
            : isCompleted
              ? colors.accentCyan
              : colors.gamepadChipBorder,
          opacity: isCompleted && !isActive ? 0.58 : 1,
        },
      ]}
    >
      <Image
        source={asset.source}
        style={{ width: imageWidth, height: imageHeight }}
        contentFit="contain"
        transition={0}
        cachePolicy="memory-disk"
        accessibilityLabel={asset.label}
      />
      {interactive && (
        <View
          style={[
            styles.stepIndexDot,
            {
              backgroundColor: isActive
                ? colors.accentPrimary
                : isCompleted
                  ? colors.accentCyan
                  : colors.bgCardElevated,
            },
          ]}
        >
          <Text
            style={[
              styles.stepIndexText,
              {
                color: isActive
                  ? '#FFFFFF'
                  : isCompleted
                    ? '#0B0914'
                    : colors.textMuted,
              },
            ]}
          >
            {index + 1}
          </Text>
        </View>
      )}
    </Pressable>
  );

  if (isCompactCard && !interactive) {
    return pillContent;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index * 40, 420))
        .duration(250)
        .springify()
        .damping(15)}
    >
      <Animated.View style={animatedStyle}>{pillContent}</Animated.View>
    </Animated.View>
  );
}

export const ControllerCombo = React.memo(function ControllerCombo({
  platform,
  buttons,
  variant = 'detail',
  sizePreset,
  layout = 'wrap',
  interactive = true,
  showControls = true,
}: ControllerComboProps) {
  const { colors } = useTheme();
  const { buttonSize } = usePreferences();
  const effectiveSize = sizePreset ?? buttonSize;
  const isCompactCard = variant === 'card';
  const dims = isCompactCard
    ? CARD_SIZES[effectiveSize]
    : DETAIL_SIZES[effectiveSize];

  if (isCompactCard && !interactive) {
    return (
      <View style={styles.wrapper} testID={`controller-combo-${platform}`}>
        <View
          testID="controller-combo-wrap"
          style={[
            styles.wrapGrid,
            {
              gap: dims.gap,
              paddingTop: 2,
            },
          ]}
        >
          {buttons.map((button, index) => (
            <StaticButtonStep
              key={`${platform}-${button}-${index}`}
              platform={platform}
              button={button}
              index={index}
              dims={dims}
              chipBg={colors.gamepadChipBg}
              chipBorder={colors.gamepadChipBorder}
            />
          ))}
        </View>
      </View>
    );
  }

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    setActiveStep(null);
    setReplayKey((k) => k + 1);
  }, [platform, buttons]);

  const handleStepPress = (index: number) => {
    setActiveStep((prev) => (prev === index ? null : index));
  };

  const handleReplay = () => {
    triggerSelectionHaptic();
    setActiveStep(null);
    setReplayKey((k) => k + 1);
  };

  const platformTitle = platform === 'xbox' ? 'Xbox' : 'PlayStation';

  const steps = buttons.map((button, index) => (
    <ControllerButtonStep
      key={`${platform}-${button}-${index}`}
      platform={platform}
      button={button}
      index={index}
      dims={dims}
      isCompactCard={isCompactCard}
      interactive={interactive}
      isActive={activeStep === index}
      isCompleted={activeStep !== null && index < activeStep}
      onPress={handleStepPress}
    />
  ));

  return (
    <View style={styles.wrapper} testID={`controller-combo-${platform}`}>
      {showControls && (
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>
              {platformTitle.toUpperCase()} SEQUENCE ({buttons.length} INPUTS)
            </Text>
            {interactive && activeStep !== null ? (
              <Text style={[styles.trackerText, { color: colors.accentCyan }]}>
                Step {activeStep + 1} of {buttons.length}
              </Text>
            ) : interactive ? (
              <Text style={[styles.helperText, { color: colors.textMuted }]}>
                Tap icons to track progress
              </Text>
            ) : null}
          </View>

          {interactive && (
            <View style={styles.actionsRow}>
              {activeStep !== null && (
                <Pressable
                  onPress={() => {
                    triggerSelectionHaptic();
                    setActiveStep(null);
                  }}
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.borderSubtle,
                    },
                  ]}
                  accessibilityLabel="Clear tracked step"
                >
                  <Text
                    style={[styles.actionBtnText, { color: colors.textSecondary }]}
                  >
                    Reset
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={handleReplay}
                style={[
                  styles.actionBtn,
                  {
                    backgroundColor: colors.bgSecondary,
                    borderColor: colors.borderSubtle,
                  },
                ]}
                accessibilityLabel="Replay button sequence animation"
              >
                <RotateLeft size={13} color={colors.accentPrimary} variant="Linear" />
                <Text
                  style={[styles.actionBtnText, { color: colors.accentPrimary }]}
                >
                  Replay
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}

      {layout === 'wrap' ? (
        <View
          key={`${platform}-${replayKey}`}
          testID="controller-combo-wrap"
          style={[
            styles.wrapGrid,
            {
              gap: dims.gap,
              paddingTop: interactive ? 6 : 2,
            },
          ]}
        >
          {steps}
        </View>
      ) : (
        <ScrollView
          key={`${platform}-${replayKey}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { gap: dims.gap, paddingVertical: isCompactCard ? 2 : 6 },
          ]}
        >
          {steps}
        </ScrollView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  headerLeft: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1,
  },
  trackerText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
  },
  helperText: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.pill,
    borderWidth: 1,
  },
  actionBtnText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 11,
  },
  wrapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  stepPill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADII.md,
    borderWidth: 1.5,
    position: 'relative',
  },
  stepPillCompact: {
    borderRadius: RADII.sm,
    borderWidth: 1,
  },
  stepIndexDot: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  stepIndexText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10,
  },
});
