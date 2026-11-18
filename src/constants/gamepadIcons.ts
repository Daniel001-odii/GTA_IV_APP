import { ImageSourcePropType } from 'react-native';
import { ControllerPlatform, GamepadButtonId } from '../types/cheat';

export interface GamepadAssetMeta {
  source: ImageSourcePropType;
  /** Exact source pixel width / height from flat-gamepad-icons 300 DPI exports */
  aspectRatio: number;
  isWide: boolean;
  label: string;
  assetName: string;
}

const WIDE_ASPECT = 264 / 139;
const SQUARE_ASPECT = 1;

const PLAYSTATION_ASSETS: Record<GamepadButtonId, GamepadAssetMeta> = {
  TRIANGLE: {
    source: require('../../assets/icons/gamepad/ps_triangle.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'Triangle',
    assetName: 'ps_triangle',
  },
  SQUARE: {
    source: require('../../assets/icons/gamepad/ps_square.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'Square',
    assetName: 'ps_square',
  },
  CROSS: {
    source: require('../../assets/icons/gamepad/ps_x.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'Cross',
    assetName: 'ps_x',
  },
  CIRCLE: {
    source: require('../../assets/icons/gamepad/ps_circle.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'Circle',
    assetName: 'ps_circle',
  },
  L1: {
    source: require('../../assets/icons/gamepad/ps_l1.png'),
    aspectRatio: WIDE_ASPECT,
    isWide: true,
    label: 'L1',
    assetName: 'ps_l1',
  },
  R1: {
    source: require('../../assets/icons/gamepad/ps_r1.png'),
    aspectRatio: WIDE_ASPECT,
    isWide: true,
    label: 'R1',
    assetName: 'ps_r1',
  },
  L2: {
    source: require('../../assets/icons/gamepad/ps_l2.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'L2',
    assetName: 'ps_l2',
  },
  R2: {
    source: require('../../assets/icons/gamepad/ps_r2.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'R2',
    assetName: 'ps_r2',
  },
  START: {
    source: require('../../assets/icons/gamepad/generic_start.png'),
    aspectRatio: WIDE_ASPECT,
    isWide: true,
    label: 'Start / Options',
    assetName: 'generic_start',
  },
  SELECT: {
    source: require('../../assets/icons/gamepad/generic_select.png'),
    aspectRatio: WIDE_ASPECT,
    isWide: true,
    label: 'Select / Create',
    assetName: 'generic_select',
  },
  DPAD_UP: {
    source: require('../../assets/icons/gamepad/generic_dpad_up.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Up',
    assetName: 'generic_dpad_up',
  },
  DPAD_DOWN: {
    source: require('../../assets/icons/gamepad/generic_dpad_down.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Down',
    assetName: 'generic_dpad_down',
  },
  DPAD_LEFT: {
    source: require('../../assets/icons/gamepad/generic_dpad_left.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Left',
    assetName: 'generic_dpad_left',
  },
  DPAD_RIGHT: {
    source: require('../../assets/icons/gamepad/generic_dpad_right.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Right',
    assetName: 'generic_dpad_right',
  },
  L3: {
    source: require('../../assets/icons/gamepad/generic_l3.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'L3',
    assetName: 'generic_l3',
  },
  R3: {
    source: require('../../assets/icons/gamepad/generic_r3.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'R3',
    assetName: 'generic_r3',
  },
};

const XBOX_ASSETS: Record<GamepadButtonId, GamepadAssetMeta> = {
  TRIANGLE: {
    source: require('../../assets/icons/gamepad/xb_y.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'Y',
    assetName: 'xb_y',
  },
  SQUARE: {
    source: require('../../assets/icons/gamepad/xb_x.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'X',
    assetName: 'xb_x',
  },
  CROSS: {
    source: require('../../assets/icons/gamepad/xb_a.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'A',
    assetName: 'xb_a',
  },
  CIRCLE: {
    source: require('../../assets/icons/gamepad/xb_b.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'B',
    assetName: 'xb_b',
  },
  L1: {
    source: require('../../assets/icons/gamepad/xb_lb.png'),
    aspectRatio: WIDE_ASPECT,
    isWide: true,
    label: 'LB',
    assetName: 'xb_lb',
  },
  R1: {
    source: require('../../assets/icons/gamepad/xb_rb.png'),
    aspectRatio: WIDE_ASPECT,
    isWide: true,
    label: 'RB',
    assetName: 'xb_rb',
  },
  L2: {
    source: require('../../assets/icons/gamepad/xb_lt.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'LT',
    assetName: 'xb_lt',
  },
  R2: {
    source: require('../../assets/icons/gamepad/xb_rt.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'RT',
    assetName: 'xb_rt',
  },
  START: {
    source: require('../../assets/icons/gamepad/xb_start.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'Menu',
    assetName: 'xb_start',
  },
  SELECT: {
    source: require('../../assets/icons/gamepad/xb_select.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'View',
    assetName: 'xb_select',
  },
  DPAD_UP: {
    source: require('../../assets/icons/gamepad/generic_dpad_up.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Up',
    assetName: 'generic_dpad_up',
  },
  DPAD_DOWN: {
    source: require('../../assets/icons/gamepad/generic_dpad_down.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Down',
    assetName: 'generic_dpad_down',
  },
  DPAD_LEFT: {
    source: require('../../assets/icons/gamepad/generic_dpad_left.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Left',
    assetName: 'generic_dpad_left',
  },
  DPAD_RIGHT: {
    source: require('../../assets/icons/gamepad/generic_dpad_right.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'D-Pad Right',
    assetName: 'generic_dpad_right',
  },
  L3: {
    source: require('../../assets/icons/gamepad/generic_l3.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'LS Click',
    assetName: 'generic_l3',
  },
  R3: {
    source: require('../../assets/icons/gamepad/generic_r3.png'),
    aspectRatio: SQUARE_ASPECT,
    isWide: false,
    label: 'RS Click',
    assetName: 'generic_r3',
  },
};

export const ALL_GAMEPAD_BUTTON_IDS: GamepadButtonId[] = Object.keys(
  PLAYSTATION_ASSETS
) as GamepadButtonId[];

export function getGamepadAsset(
  platform: ControllerPlatform,
  button: GamepadButtonId
): GamepadAssetMeta {
  return platform === 'xbox' ? XBOX_ASSETS[button] : PLAYSTATION_ASSETS[button];
}
