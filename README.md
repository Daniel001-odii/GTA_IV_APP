# GTA VI Cheat Codes (MVP 1.0)

A lightweight, offline-first mobile companion app built with **React Native + Expo (TypeScript + Expo Router)** for iOS, Android, and Web preview.

**Core philosophy:** Open the app, find a cheat, use or copy it, and get back to the game — no accounts, no logins, no onboarding friction.

## Features

- **All Screen (`All`)**: Displays all cheat codes directly without category grouping inside an instant **PS | Xbox | PC** tabbed view, showing live 300 DPI controller button icons or PC commands with one-tap copy right on every card.
- **Categories Screen (`Categories`)**: Organizes cheat codes cleanly per category with horizontal Vice City portrait artwork cards and grouped category sections.
- **Cheat Details**: Full-bleed portrait hero header, inline **PS | Xbox | PC** switcher, large interactive `<ControllerCombo />` (staggered entrance, tap-to-track step progress with haptics, replay/reset), dedicated `<PcCommandDisplay />` with Copy, and related cheats.
- **Floating Bottom Dock Navigation**: Upgraded floating rounded pill navigation bar (`All`, `Categories`, `Favorites`, `Settings`) powered by **Iconsax** (`iconsax-react-nativejs`) Bold/Linear vector icons.
- **Offline Persistence**: Favorites, preferred platform, Dark/Light theme, and recently viewed history persist locally via `AsyncStorage`.

## Swapping GTA V → GTA VI Cheat Codes

All cheat codes live in one clean TypeScript object in `src/data/cheatCodesConfig.ts`:
1. Populate `GTA6_CHEAT_CODES` with verified GTA VI cheat codes (using platform-independent button IDs like `TRIANGLE`, `L1`, `DPAD_LEFT`, etc. and PC console commands).
2. Flip `ACTIVE_CHEAT_DATASET` from `'gta5'` to `'gta6'`.

Every screen (**All**, **Categories**, **Favorites**, **Cheat Details**, and **Search**) updates automatically.

## Getting Started

```bash
npm install
npm start          # Launch Expo Dev Server (scan QR with Expo Go on iOS/Android)
npm run web        # Launch Expo Web preview
npm run typecheck  # TypeScript check
npm test           # Run Jest unit & component tests
```

## Disclaimer & Attribution

- Unofficial fan-made companion app; not affiliated with Rockstar Games or Take-Two Interactive.
- Controller button icons sourced from [Flat Gamepad Icons](https://github.com/RobTheFiveNine/flat-gamepad-icons) by **RobTheFiveNine**, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- UI icons powered by **Iconsax React Native** (`iconsax-react-nativejs`).
