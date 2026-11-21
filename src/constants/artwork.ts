import { ImageSource } from 'expo-image';
import { ArtworkKey, PlatformMeta } from '../types/cheat';

export const ARTWORK_SOURCES: Record<ArtworkKey, ImageSource> = {
  'hero-vice': require('../../assets/images/art/hero-vice.jpg'),
  'collage-cover': require('../../assets/images/art/collage-cover.jpg'),
  'convertible-skyline': require('../../assets/images/art/convertible-skyline.jpg'),
  'street-duo': require('../../assets/images/art/street-duo.jpg'),
  'bay-jetskis': require('../../assets/images/art/bay-jetskis.jpg'),
  // GTA VI artwork (from Red Bull article, bundled locally)
  'gta6-boobie-phone': require('../../assets/images/art/gta6-boobie-phone.webp'),
  'gta6-real-dimez': require('../../assets/images/art/gta6-real-dimez.webp'),
  'gta6-lucia-training': require('../../assets/images/art/gta6-lucia-training.webp'),
  'gta6-jason-lucia': require('../../assets/images/art/gta6-jason-lucia.webp'),
  'gta6-tuning': require('../../assets/images/art/gta6-tuning.webp'),
  'gta6-lucia-nightclub': require('../../assets/images/art/gta6-lucia-nightclub.webp'),
  'gta6-vice-city-night': require('../../assets/images/art/gta6-vice-city-night.webp'),
  'gta6-boat-party': require('../../assets/images/art/gta6-boat-party.webp'),
};

export const GAME_LOGOS: Record<'gta5' | 'gta6', ImageSource> = {
  gta6: require('../../assets/images/logos/gta6-logo.png'),
  gta5: require('../../assets/images/logos/gta5-logo.png'),
};

export const PLATFORMS: PlatformMeta[] = [
  {
    id: 'playstation',
    label: 'PlayStation',
    shortLabel: 'PS',
    inputType: 'controller',
  },
  {
    id: 'xbox',
    label: 'Xbox',
    shortLabel: 'Xbox',
    inputType: 'controller',
  },
  {
    id: 'pc',
    label: 'PC',
    shortLabel: 'PC',
    inputType: 'keyboard',
  },
];

export function getPlatformMeta(id: PlatformMeta['id']): PlatformMeta {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0];
}
