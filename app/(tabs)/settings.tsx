import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Game,
  InfoCircle,
  Lock,
  Moon,
  Sun1,
} from 'iconsax-react-nativejs';
import { ControllerCombo } from '../../src/components/ControllerCombo';
import { PlatformSelector } from '../../src/components/PlatformSelector';
import { APP_INFO } from '../../src/constants/legal';
import { useAds } from '../../src/context/AdsContext';
import { usePreferences, useTheme } from '../../src/context/AppStateContext';
import { FONTS, RADII, SPACING } from '../../src/theme/tokens';
import { ButtonSizePreset, GamepadButtonId } from '../../src/types/cheat';
import { triggerSelectionHaptic } from '../../src/utils/haptics';

const BUTTON_SIZE_OPTIONS: { id: ButtonSizePreset; label: string }[] = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Medium' },
  { id: 'lg', label: 'Large' },
];

const PREVIEW_BUTTONS: GamepadButtonId[] = [
  'L1',
  'R1',
  'TRIANGLE',
  'DPAD_LEFT',
  'CIRCLE',
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { themeMode, setThemeMode, colors } = useTheme();
  const { preferredPlatform, setPreferredPlatform, buttonSize, setButtonSize } =
    usePreferences();
  const { privacyOptionsRequired, openPrivacyOptions } = useAds();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.bgPrimary }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: Math.max(insets.top, 14) + 8 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          SETTINGS
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Preferences saved locally on your device — no login required
        </Text>
      </View>

      {/* Preferred Gaming Platform */}
      <View
        style={[
          styles.section,
          { borderBottomColor: colors.borderSubtle },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          PREFERRED GAMING PLATFORM
        </Text>
        <Text style={[styles.sectionDesc, { color: colors.textMuted }]}>
          Sets the default platform shown across All, Categories, Favorites, and
          Details.
        </Text>
        <PlatformSelector
          value={preferredPlatform}
          onChange={setPreferredPlatform}
        />
      </View>

      {/* Cheat Button Size Setting */}
      <View
        style={[
          styles.section,
          { borderBottomColor: colors.borderSubtle },
        ]}
      >
        <View style={styles.iconHeading}>
          <Game size={18} color={colors.accentCyan} variant="Bulk" />
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            CHEAT BUTTON SIZE
          </Text>
        </View>
        <Text style={[styles.sectionDesc, { color: colors.textMuted }]}>
          Adjust how large controller button icons appear on cheat cards and
          detail screens.
        </Text>

        <View style={styles.sizeRow}>
          {BUTTON_SIZE_OPTIONS.map((opt) => {
            const active = buttonSize === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => {
                  triggerSelectionHaptic();
                  setButtonSize(opt.id);
                }}
                testID={`button-size-${opt.id}`}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={[
                  styles.sizeOption,
                  {
                    backgroundColor: active
                      ? colors.accentPrimaryMuted
                      : colors.bgSecondary,
                    borderColor: active
                      ? colors.accentPrimary
                      : colors.borderSubtle,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sizeOptionText,
                    {
                      color: active
                        ? colors.accentPrimary
                        : colors.textPrimary,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.previewWrap}>
          <Text style={[styles.previewLabel, { color: colors.textMuted }]}>
            LIVE PREVIEW
          </Text>
          <ControllerCombo
            platform={preferredPlatform === 'xbox' ? 'xbox' : 'playstation'}
            buttons={PREVIEW_BUTTONS}
            variant="card"
            layout="wrap"
            interactive={false}
            showControls={false}
          />
        </View>
      </View>

      {/* Theme Mode */}
      <View
        style={[
          styles.section,
          { borderBottomColor: colors.borderSubtle },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          APPEARANCE
        </Text>
        <View style={styles.themeRow}>
          <Pressable
            onPress={() => {
              triggerSelectionHaptic();
              setThemeMode('dark');
            }}
            testID="theme-dark-btn"
            style={[
              styles.themeOption,
              {
                backgroundColor:
                  themeMode === 'dark'
                    ? colors.accentPurpleMuted
                    : colors.bgSecondary,
                borderColor:
                  themeMode === 'dark'
                    ? colors.accentPurple
                    : colors.borderSubtle,
              },
            ]}
          >
            <Moon
              size={19}
              color={
                themeMode === 'dark'
                  ? colors.accentPurple
                  : colors.textSecondary
              }
              variant={themeMode === 'dark' ? 'Bold' : 'Linear'}
            />
            <Text
              style={[
                styles.themeOptionText,
                {
                  color:
                    themeMode === 'dark'
                      ? colors.accentPurple
                      : colors.textPrimary,
                },
              ]}
            >
              Dark (Default)
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              triggerSelectionHaptic();
              setThemeMode('light');
            }}
            testID="theme-light-btn"
            style={[
              styles.themeOption,
              {
                backgroundColor:
                  themeMode === 'light'
                    ? colors.accentSecondaryMuted
                    : colors.bgSecondary,
                borderColor:
                  themeMode === 'light'
                    ? colors.accentSecondary
                    : colors.borderSubtle,
              },
            ]}
          >
            <Sun1
              size={19}
              color={
                themeMode === 'light'
                  ? colors.accentSecondary
                  : colors.textSecondary
              }
              variant={themeMode === 'light' ? 'Bold' : 'Linear'}
            />
            <Text
              style={[
                styles.themeOptionText,
                {
                  color:
                    themeMode === 'light'
                      ? colors.accentSecondary
                      : colors.textPrimary,
                },
              ]}
            >
              Light
            </Text>
          </Pressable>
        </View>
      </View>

      {/* About & Disclaimer */}
      <View
        style={[
          styles.section,
          { borderBottomColor: colors.borderSubtle },
        ]}
      >
        <View style={styles.iconHeading}>
          <InfoCircle size={18} color={colors.accentPrimary} variant="Bulk" />
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            ABOUT THE APP
          </Text>
        </View>

        <View style={styles.versionRow}>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>
            {APP_INFO.name}
          </Text>
          <View
            style={[
              styles.versionPill,
              { backgroundColor: colors.accentPrimaryMuted },
            ]}
          >
            <Text style={[styles.versionText, { color: colors.accentPrimary }]}>
              v{APP_INFO.version}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          {APP_INFO.tagline}
        </Text>

        <View style={styles.disclaimerWrap}>
          <Text
            style={[styles.disclaimerHeading, { color: colors.accentSecondary }]}
          >
            UNOFFICIAL FAN DISCLAIMER
          </Text>
          <Text style={[styles.disclaimerText, { color: colors.textMuted }]}>
            {APP_INFO.disclaimer}
          </Text>
        </View>
      </View>

      {/* Privacy Information */}
      <View style={styles.lastSection}>
        <View style={styles.iconHeading}>
          <Lock size={18} color={colors.accentCyan} variant="Bulk" />
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            PRIVACY & OFFLINE STORAGE
          </Text>
        </View>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          {APP_INFO.privacySummary}
        </Text>
        {privacyOptionsRequired && (
          <Pressable
            onPress={() => {
              triggerSelectionHaptic();
              openPrivacyOptions();
            }}
            testID="manage-ad-privacy-btn"
            style={[
              styles.privacyBtn,
              {
                backgroundColor: colors.accentCyanMuted,
                borderColor: colors.accentCyan,
              },
            ]}
          >
            <Text style={[styles.privacyBtnText, { color: colors.accentCyan }]}>
              Manage Ad Privacy Preferences
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 110,
    gap: 22,
  },
  header: {
    gap: 2,
  },
  title: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 34,
    letterSpacing: 0.8,
  },
  subtitle: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13,
  },
  section: {
    paddingBottom: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  lastSection: {
    gap: 10,
  },
  sectionLabel: {
    fontFamily: FONTS.bodyBold,
    fontSize: 11.5,
    letterSpacing: 1,
  },
  iconHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  sectionDesc: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 13.5,
    lineHeight: 20,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: RADII.lg,
    borderWidth: 1.5,
  },
  sizeOptionText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13.5,
  },
  previewWrap: {
    paddingTop: 4,
    gap: 8,
  },
  previewLabel: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10,
    letterSpacing: 1,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: RADII.lg,
    borderWidth: 1.5,
  },
  themeOptionText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13.5,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  appName: {
    fontFamily: FONTS.displayBold,
    fontSize: 22,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  versionPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.pill,
  },
  versionText: {
    fontFamily: FONTS.monoBold,
    fontSize: 12,
  },
  disclaimerWrap: {
    gap: 4,
    marginTop: 4,
  },
  disclaimerHeading: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10.5,
    letterSpacing: 0.9,
  },
  disclaimerText: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12.5,
    lineHeight: 18,
  },
  privacyBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADII.lg,
    borderWidth: 1,
    marginTop: 4,
  },
  privacyBtnText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
  },
});
