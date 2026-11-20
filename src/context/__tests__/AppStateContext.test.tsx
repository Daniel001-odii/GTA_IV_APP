import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppStateProvider,
  useFavorites,
  usePreferences,
  useRecentlyViewed,
  useTheme,
} from '../AppStateContext';

function TestConsumer() {
  const {
    preferredPlatform,
    setPreferredPlatform,
    buttonSize,
    setButtonSize,
    hydrated,
  } = usePreferences();
  const { themeMode, toggleTheme } = useTheme();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { recentlyViewedIds, recordRecentlyViewed } = useRecentlyViewed();

  return (
    <View>
      <Text testID="hydrated">{String(hydrated)}</Text>
      <Text testID="platform">{preferredPlatform}</Text>
      <Text testID="buttonSize">{buttonSize}</Text>
      <Text testID="theme">{themeMode}</Text>
      <Text testID="favorites">{favoriteIds.join(',')}</Text>
      <Text testID="recent">{recentlyViewedIds.join(',')}</Text>

      <Pressable testID="set-xbox" onPress={() => setPreferredPlatform('xbox')} />
      <Pressable testID="set-btn-lg" onPress={() => setButtonSize('lg')} />
      <Pressable testID="toggle-theme" onPress={toggleTheme} />
      <Pressable
        testID="fav-health"
        onPress={() => toggleFavorite('max-health-armor')}
      />
      <Pressable
        testID="view-health"
        onPress={() => recordRecentlyViewed('max-health-armor')}
      />
    </View>
  );
}

describe('AppStateContext offline persistence', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('defaults to dark theme and playstation platform and persists changes across restarts', async () => {
    const first = await render(
      <AppStateProvider>
        <TestConsumer />
      </AppStateProvider>
    );

    await waitFor(() =>
      expect(first.getByTestId('hydrated').props.children).toBe('true')
    );
    expect(first.getByTestId('theme').props.children).toBe('dark');
    expect(first.getByTestId('platform').props.children).toBe('playstation');
    expect(first.getByTestId('buttonSize').props.children).toBe('md');

    await fireEvent.press(first.getByTestId('set-xbox'));
    await fireEvent.press(first.getByTestId('set-btn-lg'));
    await fireEvent.press(first.getByTestId('toggle-theme'));
    await fireEvent.press(first.getByTestId('fav-health'));
    await fireEvent.press(first.getByTestId('view-health'));

    await first.unmount();

    const second = await render(
      <AppStateProvider>
        <TestConsumer />
      </AppStateProvider>
    );

    await waitFor(() =>
      expect(second.getByTestId('hydrated').props.children).toBe('true')
    );
    expect(second.getByTestId('platform').props.children).toBe('xbox');
    expect(second.getByTestId('buttonSize').props.children).toBe('lg');
    expect(second.getByTestId('theme').props.children).toBe('light');
    expect(second.getByTestId('favorites').props.children).toBe(
      'max-health-armor'
    );
    expect(second.getByTestId('recent').props.children).toBe(
      'max-health-armor'
    );
  });
});
