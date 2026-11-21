import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStateProvider } from '../context/AppStateContext';
import AllCheatsScreen from '../../app/(tabs)/index';
import CategoriesScreen from '../../app/(tabs)/categories';
import FavoritesScreen from '../../app/(tabs)/favorites';
import SettingsScreen from '../../app/(tabs)/settings';
import CheatDetailScreen from '../../app/cheat/[id]';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();
let mockParams: Record<string, string> = {};

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: mockReplace,
    canGoBack: () => true,
  }),
  useLocalSearchParams: () => mockParams,
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('expo-linear-gradient', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: (props: Record<string, unknown>) =>
      mockReact.createElement(View, props),
  };
});

describe('End-to-end screen integration tests', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    mockPush.mockClear();
    mockBack.mockClear();
    mockReplace.mockClear();
    mockParams = {};
  });

  it('renders All screen with PS/Xbox/PC tabbed view, real GTA V cheats, and search empty state', async () => {
    await AsyncStorage.setItem('@gtavi_cheats/active_game', 'gta5');
    const { getByText, getByTestId } = await render(
      <AppStateProvider>
        <AllCheatsScreen />
      </AppStateProvider>
    );

    expect(getByText('ALL CHEAT CODES')).toBeTruthy();
    expect(getByTestId('platform-tab-playstation')).toBeTruthy();
    expect(getByTestId('platform-tab-xbox')).toBeTruthy();
    expect(getByTestId('platform-tab-pc')).toBeTruthy();
    expect(getByTestId('brand-logo-playstation')).toBeTruthy();
    expect(getByTestId('brand-logo-xbox')).toBeTruthy();
    expect(getByTestId('brand-logo-pc')).toBeTruthy();

    await waitFor(() =>
      expect(getByTestId('cheat-card-max-health-armor')).toBeTruthy()
    );

    // Switch to PC tab and verify TURTLE renders inline
    await fireEvent.press(getByTestId('platform-tab-pc'));
    await waitFor(() => expect(getByText('TURTLE')).toBeTruthy());

    // Search empty state
    const input = getByTestId('all-search-input');
    await fireEvent.changeText(input, 'zzzzzz-not-a-cheat');
    await waitFor(() => expect(getByText(/No cheats matching/i)).toBeTruthy());
  }, 15000);

  it('renders Categories screen with cheat codes grouped per category', async () => {
    const { getByText, getByTestId } = await render(
      <AppStateProvider>
        <CategoriesScreen />
      </AppStateProvider>
    );

    expect(getByText('CATEGORIES')).toBeTruthy();
    expect(getByTestId('category-card-weapons-ammo')).toBeTruthy();
    expect(getByTestId('category-card-vehicles')).toBeTruthy();
    expect(getByTestId('category-card-health-armor')).toBeTruthy();
  });

  it('renders Favorites empty state when no favorites are saved', async () => {
    const { getByText } = await render(
      <AppStateProvider>
        <FavoritesScreen />
      </AppStateProvider>
    );

    expect(getByText('No Favorites Yet')).toBeTruthy();
  });

  it('renders minimal flat Settings with Rockstar disclaimer, button size controls, and theme toggles', async () => {
    const { getByText, getByTestId, queryByText } = await render(
      <AppStateProvider>
        <SettingsScreen />
      </AppStateProvider>
    );

    expect(getByText('v1.0.0')).toBeTruthy();
    expect(getByText(/not affiliated with.*Rockstar Games/i)).toBeTruthy();
    expect(queryByText('ACTIVE CHEAT DATASET')).toBeNull();
    expect(queryByText('OPEN SOURCE LICENSES & ATTRIBUTION')).toBeNull();
    expect(getByTestId('button-size-sm')).toBeTruthy();
    expect(getByTestId('button-size-md')).toBeTruthy();
    expect(getByTestId('button-size-lg')).toBeTruthy();

    await fireEvent.press(getByTestId('button-size-lg'));
    await fireEvent.press(getByTestId('theme-light-btn'));
    await fireEvent.press(getByTestId('theme-dark-btn'));
  });

  it('renders live GTA V PlayStation, Xbox PNG icons and PC command on Cheat Details', async () => {
    mockParams = { id: 'max-health-armor' };

    const screen = await render(
      <AppStateProvider>
        <CheatDetailScreen />
      </AppStateProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('controller-combo-playstation')).toBeTruthy()
    );
    expect(screen.getByTestId('combo-step-0-ps_circle')).toBeTruthy();
    expect(screen.getByTestId('combo-step-1-ps_l1')).toBeTruthy();

    // Switch inline to Xbox
    await fireEvent.press(screen.getByTestId('platform-tab-xbox'));
    await waitFor(() =>
      expect(screen.getByTestId('controller-combo-xbox')).toBeTruthy()
    );
    expect(screen.getByTestId('combo-step-0-xb_b')).toBeTruthy();
    expect(screen.getByTestId('combo-step-1-xb_lb')).toBeTruthy();

    // Switch inline to PC
    await fireEvent.press(screen.getByTestId('platform-tab-pc'));
    await waitFor(() =>
      expect(screen.getByTestId('pc-command-text').props.children).toBe('TURTLE')
    );
  });
});
