import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CloseCircle, SearchNormal1 } from 'iconsax-react-nativejs';
import { useTheme } from '../context/AppStateContext';
import { FONTS, RADII } from '../theme/tokens';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
  testID?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search cheats, vehicles, weapons, or PC code...',
  onSubmitEditing,
  autoFocus = false,
  testID = 'search-input',
}: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgInput,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <SearchNormal1 size={18} color={colors.textSecondary} variant="Linear" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        testID={testID}
        style={[styles.input, { color: colors.textPrimary }]}
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          accessibilityLabel="Clear search"
          hitSlop={10}
        >
          <CloseCircle size={19} color={colors.textMuted} variant="Bold" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: RADII.lg,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.bodyRegular,
    fontSize: 15,
    paddingVertical: 0,
  },
});
