import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AppStateProvider } from '../../context/AppStateContext';
import { ControllerCombo } from '../ControllerCombo';
import { GamepadButtonId } from '../../types/cheat';

const SAMPLE_BUTTONS: GamepadButtonId[] = [
  'L1',
  'R1',
  'TRIANGLE',
  'DPAD_LEFT',
  'CIRCLE',
];

async function renderWithProvider(ui: React.ReactElement) {
  return render(<AppStateProvider>{ui}</AppStateProvider>);
}

describe('<ControllerCombo />', () => {
  it('renders PlayStation PNG button icons for the given platform-independent identifiers', async () => {
    const { getByTestId } = await renderWithProvider(
      <ControllerCombo platform="playstation" buttons={SAMPLE_BUTTONS} />
    );

    expect(getByTestId('combo-step-0-ps_l1')).toBeTruthy();
    expect(getByTestId('combo-step-1-ps_r1')).toBeTruthy();
    expect(getByTestId('combo-step-2-ps_triangle')).toBeTruthy();
    expect(getByTestId('combo-step-3-generic_dpad_left')).toBeTruthy();
    expect(getByTestId('combo-step-4-ps_circle')).toBeTruthy();
  });

  it('automatically translates the same identifiers into Xbox PNG icons', async () => {
    const { getByTestId } = await renderWithProvider(
      <ControllerCombo platform="xbox" buttons={SAMPLE_BUTTONS} />
    );

    expect(getByTestId('combo-step-0-xb_lb')).toBeTruthy();
    expect(getByTestId('combo-step-1-xb_rb')).toBeTruthy();
    expect(getByTestId('combo-step-2-xb_y')).toBeTruthy();
    expect(getByTestId('combo-step-3-generic_dpad_left')).toBeTruthy();
    expect(getByTestId('combo-step-4-xb_b')).toBeTruthy();
  });

  it('tracks step progress when the user taps a button icon in the sequence', async () => {
    const { getByTestId, getByText } = await renderWithProvider(
      <ControllerCombo platform="playstation" buttons={SAMPLE_BUTTONS} />
    );

    await fireEvent.press(getByTestId('combo-step-2-ps_triangle'));
    expect(getByText('Step 3 of 5')).toBeTruthy();
  });
});
