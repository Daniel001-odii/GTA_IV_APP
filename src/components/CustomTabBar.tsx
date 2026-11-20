import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useFavorites, useTheme } from '../context/AppStateContext';
import { FONTS } from '../theme/tokens';
import { triggerSelectionHaptic } from '../utils/haptics';
import {
  AnimatedCategoriesIcon,
  AnimatedGamepadIcon,
  AnimatedHeartIcon,
  AnimatedSettingsIcon,
} from './AnimatedNavIcons';

type ExpoTabBarProps = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>
>[0];

const DOCK_PADDING = 7;
const TAB_GAP = 6;

function renderAnimatedTabIcon(
  routeName: string,
  focused: boolean,
  color: string
) {
  switch (routeName) {
    case 'index':
      return <AnimatedGamepadIcon active={focused} color={color} size={24} />;
    case 'categories':
      return (
        <AnimatedCategoriesIcon active={focused} color={color} size={22} />
      );
    case 'favorites':
      return <AnimatedHeartIcon active={focused} color={color} size={23} />;
    case 'settings':
      return <AnimatedSettingsIcon active={focused} color={color} size={23} />;
    default:
      return <AnimatedGamepadIcon active={focused} color={color} size={24} />;
  }
}

export function CustomTabBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
  insets,
}: ExpoTabBarProps) {
  const { colors, themeMode } = useTheme();
  const { favoriteIds } = useFavorites();
  const [dockWidth, setDockWidth] = useState(0);

  const visibleRoutes = useMemo(
    () => state.routes.filter((r) => !descriptors[r.key]?.options?.hidden),
    [state.routes, descriptors]
  );

  const activeRouteKey = state.routes[state.index]?.key;
  const activeVisibleIndex = Math.max(
    0,
    visibleRoutes.findIndex((r) => r.key === activeRouteKey)
  );

  const count = Math.max(1, visibleRoutes.length);
  const tabWidth =
    dockWidth > 0
      ? (dockWidth - DOCK_PADDING * 2 - TAB_GAP * (count - 1)) / count
      : 0;

  const translateX = useSharedValue(0);

  useEffect(() => {
    if (tabWidth > 0) {
      translateX.value = withSpring(
        activeVisibleIndex * (tabWidth + TAB_GAP),
        {
          damping: 18,
          stiffness: 230,
          mass: 0.78,
        }
      );
    }
  }, [activeVisibleIndex, tabWidth, translateX]);

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDockLayout = (event: LayoutChangeEvent) => {
    setDockWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.outerWrapper,
        {
          paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 18 : 12),
          backgroundColor: 'transparent',
        },
      ]}
    >
      <View
        onLayout={handleDockLayout}
        style={[
          styles.dock,
          {
            backgroundColor: colors.tabBarBg,
            borderColor: colors.tabBarBorder,
            shadowColor: themeMode === 'dark' ? '#000000' : '#4C1D95',
          },
        ]}
      >
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            testID="tab-bar-sliding-pill"
            style={[
              styles.slidingPill,
              sliderStyle,
              {
                width: tabWidth,
                borderColor: colors.borderStrong,
              },
            ]}
          >
            <LinearGradient
              colors={
                themeMode === 'dark'
                  ? ['rgba(255, 79, 163, 0.24)', 'rgba(155, 92, 255, 0.2)']
                  : ['rgba(223, 41, 129, 0.16)', 'rgba(124, 58, 237, 0.12)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        )}

        {visibleRoutes.map((route) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarAccessibilityLabel === 'string'
              ? options.tabBarAccessibilityLabel
              : typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : typeof options.title === 'string'
                  ? options.title
                  : route.name;

          const isFocused = route.key === activeRouteKey;
          const color = isFocused ? colors.accentPrimary : colors.textMuted;
          const showFavBadge =
            route.name === 'favorites' && favoriteIds.length > 0;

          const onPress = () => {
            const event = emitter.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              triggerSelectionHaptic();
              navigateToTab(route.key);
            }
          };

          const onLongPress = () => {
            emitter.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}
              testID={`bottom-tab-${route.name}`}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <View style={styles.iconWrap}>
                {renderAnimatedTabIcon(route.name, isFocused, color)}
                {showFavBadge && (
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: colors.accentSecondary },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {favoriteIds.length > 99 ? '99+' : favoriteIds.length}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: DOCK_PADDING,
    borderRadius: 28,
    borderWidth: 1,
    gap: TAB_GAP,
    position: 'relative',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.36,
    shadowRadius: 22,
    elevation: 14,
  },
  slidingPill: {
    position: 'absolute',
    top: DOCK_PADDING,
    bottom: DOCK_PADDING,
    left: DOCK_PADDING,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    zIndex: 1,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -11,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 9.5,
    color: '#FFFFFF',
  },
});
