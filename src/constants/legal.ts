export const APP_INFO = {
  name: 'GTA VI Cheat Codes',
  version: '1.0.0',
  tagline: 'Fast, offline-first GTA VI cheat reference for PlayStation 5, Xbox Series X/S, and PC.',
  disclaimer:
    'Unofficial fan-made companion application. GTA VI Cheat Codes is not affiliated with, endorsed by, sponsored by, or connected to Rockstar Games or Take-Two Interactive Software, Inc. Grand Theft Auto and related marks are trademarks of Take-Two Interactive.',
  privacySummary:
    'This app works 100% offline with locally bundled data. No account, login, analytics, or cloud sync is required. Your favorites, preferred platform, theme, and recently viewed cheats are stored solely on your device using local storage.',
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
    project: 'Lucide Icons',
    author: 'Lucide Contributors',
    sourceUrl: 'https://lucide.dev/',
    license: 'ISC',
    licenseUrl: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
    notes: 'Clean open-source vector interface icons used across navigation and controls.',
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
