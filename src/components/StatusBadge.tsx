import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Clock, TickCircle } from 'iconsax-react-nativejs';
import { useTheme } from '../context/AppStateContext';
import { FONTS, RADII } from '../theme/tokens';

interface StatusBadgeProps {
  mode: 'verified' | 'pending';
  label?: string;
  compact?: boolean;
}

export function StatusBadge({ mode, label, compact = false }: StatusBadgeProps) {
  const { colors } = useTheme();

  const isVerified = mode === 'verified';
  const bg = isVerified ? colors.successMuted : colors.warningMuted;
  const fg = isVerified ? colors.success : colors.warning;
  const text =
    label ??
    (isVerified
      ? compact
        ? 'Verified'
        : 'Verified Code'
      : compact
        ? 'Pending'
        : 'Pending Verification');

  return (
    <View
      style={[
        styles.badge,
        compact && styles.badgeCompact,
        { backgroundColor: bg },
      ]}
    >
      {isVerified ? (
        <TickCircle size={compact ? 12 : 14} color={fg} variant="Bold" />
      ) : (
        <Clock size={compact ? 12 : 14} color={fg} variant="Bold" />
      )}
      <Text
        style={[
          styles.label,
          compact && styles.labelCompact,
          { color: fg },
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.pill,
  },
  badgeCompact: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  label: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: 0.2,
  },
  labelCompact: {
    fontSize: 11,
  },
});
