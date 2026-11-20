import React from 'react';
import {
  Car,
  CloudSunny,
  Flash,
  Global,
  Gps,
  MagicStar,
  ShieldTick,
  Star1,
} from 'iconsax-react-nativejs';

interface CategoryIconProps {
  name: string;
  size?: number;
  color: string;
  variant?: 'Linear' | 'Bold' | 'Bulk';
}

export function CategoryIcon({
  name,
  size = 18,
  color,
  variant = 'Bulk',
}: CategoryIconProps) {
  switch (name) {
    case 'Crosshair':
      return <Gps size={size} color={color} variant={variant} />;
    case 'Car':
      return <Car size={size} color={color} variant={variant} />;
    case 'Shield':
      return <ShieldTick size={size} color={color} variant={variant} />;
    case 'Zap':
      return <Flash size={size} color={color} variant={variant} />;
    case 'Siren':
      return <Star1 size={size} color={color} variant={variant} />;
    case 'CloudSun':
      return <CloudSunny size={size} color={color} variant={variant} />;
    case 'Globe':
      return <Global size={size} color={color} variant={variant} />;
    default:
      return <MagicStar size={size} color={color} variant={variant} />;
  }
}
