import fs from 'fs';
import path from 'path';
import {
  ALL_GAMEPAD_BUTTON_IDS,
  getGamepadAsset,
} from '../gamepadIcons';
import { GamepadButtonId } from '../../types/cheat';

describe('gamepadIcons mapping & bundled 300 DPI PNGs', () => {
  const iconDir = path.resolve(__dirname, '../../../assets/icons/gamepad');

  it('maps PRD PlayStation and Xbox identifiers accurately', () => {
    const expectedMappings: [GamepadButtonId, string, string][] = [
      ['TRIANGLE', 'ps_triangle', 'xb_y'],
      ['SQUARE', 'ps_square', 'xb_x'],
      ['CROSS', 'ps_x', 'xb_a'],
      ['CIRCLE', 'ps_circle', 'xb_b'],
      ['L1', 'ps_l1', 'xb_lb'],
      ['R1', 'ps_r1', 'xb_rb'],
      ['L2', 'ps_l2', 'xb_lt'],
      ['R2', 'ps_r2', 'xb_rt'],
      ['START', 'generic_start', 'xb_start'],
      ['SELECT', 'generic_select', 'xb_select'],
      ['DPAD_UP', 'generic_dpad_up', 'generic_dpad_up'],
      ['DPAD_DOWN', 'generic_dpad_down', 'generic_dpad_down'],
      ['DPAD_LEFT', 'generic_dpad_left', 'generic_dpad_left'],
      ['DPAD_RIGHT', 'generic_dpad_right', 'generic_dpad_right'],
    ];

    for (const [id, psName, xbName] of expectedMappings) {
      expect(getGamepadAsset('playstation', id).assetName).toBe(psName);
      expect(getGamepadAsset('xbox', id).assetName).toBe(xbName);
    }
  });

  it('preserves wide aspect ratios for shoulder and generic start/select buttons', () => {
    const expectedWide = 264 / 139;
    expect(getGamepadAsset('playstation', 'L1').aspectRatio).toBeCloseTo(expectedWide, 4);
    expect(getGamepadAsset('playstation', 'R1').aspectRatio).toBeCloseTo(expectedWide, 4);
    expect(getGamepadAsset('xbox', 'L1').aspectRatio).toBeCloseTo(expectedWide, 4);
    expect(getGamepadAsset('xbox', 'R1').aspectRatio).toBeCloseTo(expectedWide, 4);
    expect(getGamepadAsset('playstation', 'START').aspectRatio).toBeCloseTo(expectedWide, 4);

    expect(getGamepadAsset('playstation', 'TRIANGLE').aspectRatio).toBe(1);
    expect(getGamepadAsset('xbox', 'TRIANGLE').aspectRatio).toBe(1);
    expect(getGamepadAsset('xbox', 'START').aspectRatio).toBe(1);
  });

  it('has every mapped PNG file physically present in assets/icons/gamepad', () => {
    for (const id of ALL_GAMEPAD_BUTTON_IDS) {
      const psAsset = getGamepadAsset('playstation', id);
      const xbAsset = getGamepadAsset('xbox', id);
      expect(fs.existsSync(path.join(iconDir, `${psAsset.assetName}.png`))).toBe(true);
      expect(fs.existsSync(path.join(iconDir, `${xbAsset.assetName}.png`))).toBe(true);
    }
  });
});
