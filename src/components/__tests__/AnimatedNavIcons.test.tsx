import React from 'react';
import { render } from '@testing-library/react-native';
import {
  AnimatedCategoriesIcon,
  AnimatedGamepadIcon,
  AnimatedHeartIcon,
  AnimatedSettingsIcon,
} from '../AnimatedNavIcons';

describe('AnimatedNavIcons', () => {
  it('renders all 4 animated mobile nav icons cleanly in active and inactive states', async () => {
    const { getByTestId, rerender } = await render(
      <>
        <AnimatedGamepadIcon active={false} color="#7E7599" />
        <AnimatedCategoriesIcon active={false} color="#7E7599" />
        <AnimatedHeartIcon active={false} color="#7E7599" />
        <AnimatedSettingsIcon active={false} color="#7E7599" />
      </>
    );

    expect(getByTestId('animated-nav-icon-gamepad')).toBeTruthy();
    expect(getByTestId('animated-nav-icon-categories')).toBeTruthy();
    expect(getByTestId('animated-nav-icon-favorites')).toBeTruthy();
    expect(getByTestId('animated-nav-icon-settings')).toBeTruthy();

    await rerender(
      <>
        <AnimatedGamepadIcon active color="#FF4FA3" />
        <AnimatedCategoriesIcon active color="#FF4FA3" />
        <AnimatedHeartIcon active color="#FF4FA3" />
        <AnimatedSettingsIcon active color="#FF4FA3" />
      </>
    );

    expect(getByTestId('animated-nav-icon-gamepad')).toBeTruthy();
    expect(getByTestId('animated-nav-icon-categories')).toBeTruthy();
    expect(getByTestId('animated-nav-icon-favorites')).toBeTruthy();
    expect(getByTestId('animated-nav-icon-settings')).toBeTruthy();
  });
});
