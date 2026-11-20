import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { CommandSquare, Copy, CopySuccess } from 'iconsax-react-nativejs';
import { useTheme } from '../context/AppStateContext';
import { FONTS, RADII, SPACING } from '../theme/tokens';
import { triggerSuccessHaptic } from '../utils/haptics';

interface PcCommandDisplayProps {
  command: string;
  compact?: boolean;
}

export function PcCommandDisplay({
  command,
  compact = false,
}: PcCommandDisplayProps) {
  const { colors } = useTheme();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scale = useSharedValue(1);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleCopy = async () => {
    scale.value = withSequence(
      withSpring(0.92, { damping: 14, stiffness: 320 }),
      withSpring(1, { damping: 14, stiffness: 260 })
    );
    try {
      await Clipboard.setStringAsync(command);
    } catch {
      // Clipboard fallback ignored if restricted in browser context
    }
    triggerSuccessHaptic();
    setCopied(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <View
        style={[
          styles.compactBar,
          {
            backgroundColor: colors.bgSecondary,
            borderColor: copied ? colors.accentCyan : colors.borderSubtle,
          },
        ]}
      >
        <View style={styles.commandLeft}>
          <Text style={[styles.compactPrompt, { color: colors.accentCyan }]}>
            ~
          </Text>
          <Text
            style={[styles.compactCommandText, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {command}
          </Text>
        </View>
        <Pressable
          onPress={handleCopy}
          hitSlop={6}
          accessibilityLabel={`Copy command ${command}`}
          style={[
            styles.compactCopyBtn,
            {
              backgroundColor: copied
                ? colors.accentCyan
                : colors.accentPrimary,
            },
          ]}
        >
          {copied ? (
            <CopySuccess size={14} color="#0B0914" variant="Bold" />
          ) : (
            <Copy size={14} color="#FFFFFF" variant="Bold" />
          )}
          <Text
            style={[
              styles.compactCopyText,
              { color: copied ? '#0B0914' : '#FFFFFF' },
            ]}
          >
            {copied ? 'Copied' : 'Copy'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(220)} style={styles.wrapper}>
      <View style={styles.headerRow}>
        <CommandSquare size={15} color={colors.accentCyan} variant="Bulk" />
        <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>
          PC KEYBOARD COMMAND
        </Text>
      </View>

      <View
        style={[
          styles.commandBar,
          {
            backgroundColor: colors.bgSecondary,
            borderColor: copied ? colors.accentCyan : colors.borderStrong,
          },
        ]}
      >
        <View style={styles.commandLeft}>
          <Text style={[styles.promptPrefix, { color: colors.accentCyan }]}>
            ~
          </Text>
          <Text
            selectable
            testID="pc-command-text"
            style={[styles.commandText, { color: colors.textPrimary }]}
          >
            {command}
          </Text>
        </View>

        <Animated.View style={btnAnimatedStyle}>
          <Pressable
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel={`Copy command ${command}`}
            testID="pc-copy-button"
            style={[
              styles.copyBtn,
              {
                backgroundColor: copied
                  ? colors.accentCyan
                  : colors.accentPrimary,
              },
            ]}
          >
            {copied ? (
              <CopySuccess size={16} color="#0B0914" variant="Bold" />
            ) : (
              <Copy size={16} color="#FFFFFF" variant="Bold" />
            )}
            <Text
              style={[
                styles.copyBtnText,
                { color: copied ? '#0B0914' : '#FFFFFF' },
              ]}
            >
              {copied ? 'Copied' : 'Copy'}
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      <Text style={[styles.hintText, { color: colors.textMuted }]}>
        Press the tilde (~) key in-game to open the console, enter the command, and press Enter.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1,
  },
  commandBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: RADII.lg,
    borderWidth: 1.5,
    gap: SPACING.md,
  },
  commandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  promptPrefix: {
    fontFamily: FONTS.monoBold,
    fontSize: 18,
  },
  commandText: {
    fontFamily: FONTS.monoBold,
    fontSize: 18,
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADII.md,
  },
  copyBtnText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 13,
  },
  hintText: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12,
    lineHeight: 17,
  },
  compactBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
    borderRadius: RADII.md,
    borderWidth: 1,
    gap: 8,
  },
  compactPrompt: {
    fontFamily: FONTS.monoBold,
    fontSize: 14,
  },
  compactCommandText: {
    fontFamily: FONTS.monoBold,
    fontSize: 14,
    letterSpacing: 1.2,
    flexShrink: 1,
  },
  compactCopyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.sm,
  },
  compactCopyText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 11.5,
  },
});
