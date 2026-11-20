import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as Clipboard from 'expo-clipboard';
import { AppStateProvider } from '../../context/AppStateContext';
import { PcCommandDisplay } from '../PcCommandDisplay';

describe('<PcCommandDisplay />', () => {
  it('renders the PC command and copies it to clipboard with visual feedback', async () => {
    const { getByTestId, getByText } = await render(
      <AppStateProvider>
        <PcCommandDisplay command="VICEHEAL" />
      </AppStateProvider>
    );

    expect(getByTestId('pc-command-text').props.children).toBe('VICEHEAL');

    await fireEvent.press(getByTestId('pc-copy-button'));

    await waitFor(() => {
      expect(Clipboard.setStringAsync).toHaveBeenCalledWith('VICEHEAL');
      expect(getByText('Copied')).toBeTruthy();
    });
  });
});
