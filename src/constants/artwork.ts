import { ImageSourcePropType } from 'react-native';
import { ArtworkKey, PlatformMeta } from '../types/cheat';

export const ARTWORK_SOURCES: Record<ArtworkKey, ImageSourcePropType> = {
  'hero-vice': require('../../assets/images/art/hero-vice.jpg'),
  'collage-cover': require('../../assets/images/art/collage-cover.jpg'),
  'convertible-skyline': require('../../assets/images/art/convertible-skyline.jpg'),
  'street-duo': require('../../assets/images/art/street-duo.jpg'),
  'bay-jetskis': require('../../assets/images/art/bay-jetskis.jpg'),
};

export const PLATFORMS: PlatformMeta[] = [
  {
    id: 'playstation',
    label: 'PlayStation 5',
    shortLabel: 'PS5',
    inputType: 'controller',
  },
  {
    id: 'xbox',
    label: 'Xbox Series X/S',
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
