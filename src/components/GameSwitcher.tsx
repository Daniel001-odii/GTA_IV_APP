import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowDown2, MagicStar, TickCircle } from 'iconsax-react-nativejs';
import { GAME_LOGOS } from '../constants/artwork';
import { useActiveGame, useTheme } from '../context/AppStateContext';
import { CheatDatasetKey } from '../data/cheatCodesConfig';
import { FONTS, RADII, SPACING } from '../theme/tokens';
import { triggerImpactHaptic, triggerSelectionHaptic } from '../utils/haptics';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DISMISS_THRESHOLD = 110;

interface GameOption {
  id: CheatDatasetKey;
  title: string;
  subtitle: string;
  tag: string;
  badgeBg: string;
  badgeColor: string;
  accentGlow: string;
}

const GAMES: GameOption[] = [
  {
    id: 'gta6',
    title: 'Grand Theft Auto VI',
    subtitle: 'Vice City & Leonida • 18 verified D-pad codes',
    tag: 'DEFAULT • GTA VI',
    badgeBg: 'rgba(255, 79, 163, 0.16)',
    badgeColor: '#FF4FA3',
    accentGlow: '#FF4FA3',
  },
  {
    id: 'gta5',
    title: 'Grand Theft Auto V',
    subtitle: 'Los Santos • 30+ controller & PC codes',
    tag: 'LOS SANTOS • GTA V',
    badgeBg: 'rgba(56, 142, 60, 0.16)',
    badgeColor: '#4CAF50',
    accentGlow: '#4CAF50',
  },
];

interface GameLibraryDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export function GameLibraryDrawer({ visible, onClose }: GameLibraryDrawerProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { activeGame, setActiveGame } = useActiveGame();

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 24,
        stiffness: 260,
        mass: 0.9,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      callback?.();
    });
  };

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 4,
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward drag
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.7) {
          triggerImpactHaptic();
          animateOut();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            damping: 22,
            stiffness: 250,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleSelect = (id: CheatDatasetKey) => {
    triggerSelectionHaptic();
    setActiveGame(id);
    animateOut();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => animateOut()}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => animateOut()}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.backdrop,
              { opacity: backdropOpacity },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.drawerContainer,
            {
              backgroundColor: colors.bgSecondary,
              borderColor: colors.borderSubtle,
              paddingBottom: Math.max(insets.bottom, 16) + 12,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Gesture Drag Bar Header */}
          <View {...panResponder.panHandlers} style={styles.gestureHeader}>
            <View
              style={[
                styles.handleBar,
                { backgroundColor: colors.borderStrong },
              ]}
            />
            <View style={styles.drawerTitleRow}>
              <View>
                <Text style={[styles.drawerTitle, { color: colors.textPrimary }]}>
                  SELECT GAME LIBRARY
                </Text>
                <Text style={[styles.drawerSubtitle, { color: colors.textMuted }]}>
                  Swipe down or tap a game below to switch cheat catalog
                </Text>
              </View>
            </View>
          </View>

          {/* Game Selection Cards */}
          <View style={styles.cardsContainer}>
            {GAMES.map((game) => {
              const isSelected = activeGame === game.id;
              const logo = GAME_LOGOS[game.id];

              return (
                <Pressable
                  key={game.id}
                  onPress={() => handleSelect(game.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${game.title}`}
                  accessibilityState={{ selected: isSelected }}
                  style={[
                    styles.gameCard,
                    {
                      backgroundColor: isSelected
                        ? colors.accentPrimaryMuted
                        : colors.bgCardElevated,
                      borderColor: isSelected
                        ? game.accentGlow
                        : colors.borderSubtle,
                    },
                  ]}
                >
                  {/* Game Official Logo */}
                  <View style={styles.logoWrap}>
                    <Image
                      source={logo}
                      style={styles.gameLogo}
                      contentFit="contain"
                      transition={200}
                    />
                  </View>

                  {/* Game Details */}
                  <View style={styles.gameTextWrap}>
                    <Text
                      style={[
                        styles.gameTitleText,
                        { color: colors.textPrimary },
                      ]}
                      numberOfLines={1}
                    >
                      {game.title}
                    </Text>
                    <Text
                      style={[
                        styles.gameSubtitleText,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {game.subtitle}
                    </Text>
                  </View>

                  {/* Radio / Selection Indicator */}
                  <View style={styles.indicatorWrap}>
                    {isSelected ? (
                      <TickCircle
                        size={24}
                        color={game.badgeColor}
                        variant="Bold"
                      />
                    ) : (
                      <View
                        style={[
                          styles.emptyRadio,
                          { borderColor: colors.borderStrong },
                        ]}
                      />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export function HeroGameDropdown({ cheatCount }: { cheatCount?: number }) {
  const { activeGame } = useActiveGame();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => {
          triggerSelectionHaptic();
          setDrawerOpen(true);
        }}
        accessibilityRole="button"
        accessibilityLabel="Active game library selector. Tap to open game drawer."
        style={styles.heroPill}
      >
        <Image
          source={GAME_LOGOS[activeGame]}
          style={styles.heroMiniLogo}
          contentFit="contain"
        />
        <Text style={styles.heroPillText}>
          {activeGame === 'gta6' ? 'GTA VI' : 'GTA V'}
        </Text>
        <ArrowDown2 size={13} color="rgba(255, 255, 255, 0.85)" variant="Linear" />
      </Pressable>

      <GameLibraryDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

export function GameSegmentedControl() {
  const { activeGame, setActiveGame } = useActiveGame();
  const { colors } = useTheme();

  return (
    <View style={styles.segmentedContainer}>
      {GAMES.map((game) => {
        const isSelected = activeGame === game.id;
        return (
          <Pressable
            key={game.id}
            onPress={() => {
              triggerSelectionHaptic();
              setActiveGame(game.id);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            style={[
              styles.segmentItem,
              {
                backgroundColor: isSelected
                  ? colors.accentPrimary
                  : colors.bgSecondary,
                borderColor: isSelected
                  ? colors.accentPrimary
                  : colors.borderSubtle,
              },
            ]}
          >
            {isSelected && (
              <LinearGradient
                colors={[colors.accentPrimary, colors.accentSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            )}
            <View style={styles.segmentInner}>
              <Image
                source={GAME_LOGOS[game.id]}
                style={styles.segmentLogo}
                contentFit="contain"
              />
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: isSelected ? '#FFFFFF' : colors.textPrimary,
                  },
                ]}
              >
                {game.id === 'gta6' ? 'GTA VI' : 'GTA V'}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 8,
    backgroundColor: 'rgba(15, 12, 25, 0.75)',
    paddingLeft: 8,
    paddingRight: 14,
    paddingVertical: 6,
    borderRadius: RADII.pill,
  },
  heroMiniLogo: {
    width: 36,
    height: 28,
  },
  heroPillText: {
    fontFamily: FONTS.displayBold,
    fontSize: 13,
    letterSpacing: 0.8,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  drawerContainer: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 20,
  },
  gestureHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  handleBar: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    marginBottom: 16,
  },
  drawerTitleRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerTitle: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 20,
    letterSpacing: 0.8,
  },
  drawerSubtitle: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12.5,
    marginTop: 2,
  },
  cardsContainer: {
    gap: 12,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: RADII.xl,
    borderWidth: 1.5,
    gap: 14,
  },
  logoWrap: {
    width: 68,
    height: 68,
    borderRadius: RADII.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  gameLogo: {
    width: '100%',
    height: '100%',
  },
  gameTextWrap: {
    flex: 1,
    gap: 4,
  },
  gameTitleText: {
    fontFamily: FONTS.displayBold,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  gameSubtitleText: {
    fontFamily: FONTS.bodyRegular,
    fontSize: 12,
    lineHeight: 16,
  },
  indicatorWrap: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.8,
  },
  segmentedContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADII.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  segmentInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  segmentLogo: {
    width: 22,
    height: 18,
  },
  segmentText: {
    fontFamily: FONTS.displayBold,
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
