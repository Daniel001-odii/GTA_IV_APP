export const APP_INFO = {
  name: 'GTA VI Cheat Codes',
  version: '1.0.0',
  tagline: 'Fast, offline-first GTA cheat reference for PlayStation, Xbox, and PC.',
  disclaimer:
    'Unofficial fan-made companion application. GTA VI Cheat Codes is not affiliated with, endorsed by, sponsored by, or connected to Rockstar Games or Take-Two Interactive Software, Inc. Grand Theft Auto and related marks are trademarks of Take-Two Interactive.',
  privacySummary:
    'Cheat lookup, favorites, preferred platform, button size, and theme stay 100% on-device via local storage — no account or login required. Google AdMob may serve ads subject to your regional privacy and consent choices.',
} as const;

export const OPEN_SOURCE_LICENSES = [
  {
    project: 'Flat Gamepad Icons',
    author: 'RobTheFiveNine',
    sourceUrl: 'https://github.com/RobTheFiveNine/flat-gamepad-icons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    notes:
      'High-resolution 300 DPI PlayStation, Xbox, and Generic controller button PNG assets bundled locally. Distributed with attribution under Creative Commons Attribution-ShareAlike 4.0 International.',
  },
  {
    project: 'Streamline Free Logos Icons',
    author: 'Streamline',
    sourceUrl: 'https://www.streamlinehq.com/',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    notes: 'PlayStation and Xbox platform brand SVG logos used in platform selectors.',
  },
  {
    project: 'Iconsax React Native',
    author: 'Erfan Khadivar / Vuesax',
    sourceUrl: 'https://github.com/rendinjast/iconsax-react',
    license: 'MIT',
    licenseUrl: 'https://github.com/rendinjast/iconsax-react/blob/main/LICENSE',
    notes: 'Modern vector icon system rendered via react-native-svg across navigation and controls.',
  },
  {
    project: 'Expo & React Native',
    author: 'Expo / Meta Platforms, Inc.',
    sourceUrl: 'https://expo.dev/',
    license: 'MIT',
    licenseUrl: 'https://github.com/expo/expo/blob/main/LICENSE',
    notes: 'Core mobile application framework, Expo Router, Expo Image, and React Native Reanimated.',
  },
] as const;
