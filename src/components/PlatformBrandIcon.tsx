import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PlatformId } from '../types/cheat';

interface PlatformBrandIconProps {
  platform: PlatformId;
  size?: number;
  color: string;
}

export function PlatformBrandIcon({
  platform,
  size = 24,
  color,
}: PlatformBrandIconProps) {
  if (platform === 'playstation') {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        testID="brand-logo-playstation"
      >
        <Path
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
          d="m9.218 19.332l3.597 1.207V7.47c0-.455.307-1.001.672-1.001c.465 0 .759.633.759 1.001v4.927c.297.174.993.52 1.4.52h.032c.556.002 2.494.006 2.494-2.948c0-3.013-1.59-4.149-2.916-4.583l-6.038-1.89v15.835Zm-1-.905v-1.735c-.839.312-1.606.564-2.079.638c-.89.138-1.855.038-1.735-.469c.103-.432 2.31-1.201 3.814-1.678V13.21c-2.852.89-7.213 2.396-7.213 3.401c0 1.42 3.337 1.847 4.118 1.894c.457.028 1.724.072 3.095-.077Zm5.597 1.82c3.325-1.108 9.178-3.293 9.178-4.251c0-1.254-3.375-2.072-5.491-1.988c-1.083.043-2.426.318-3.687.662v1.974a92 92 0 0 1 3.829-1.31c.686-.209 1.479-.169 1.846 0c.568.26.355.567-.829 1.04c-.706.283-2.993 1.128-4.846 1.807z"
        />
      </Svg>
    );
  }

  if (platform === 'xbox') {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        testID="brand-logo-xbox"
      >
        <Path
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.152 2.123A10.96 10.96 0 0 1 12 1c1.74 0 3.385.404 4.848 1.123A17.7 17.7 0 0 0 12 4.337a17.7 17.7 0 0 0-4.848-2.214M2.937 18.235A10.95 10.95 0 0 1 1 12a10.97 10.97 0 0 1 3.56-8.103C5.948 4.351 7.566 5.3 9.224 6.58c-2.922 2.866-5.076 6.828-6.287 11.656Zm16.559 1.816A10.96 10.96 0 0 1 12 23c-2.896 0-5.531-1.12-7.496-2.95c1.2-3.74 4.212-7.87 7.496-11.056c3.284 3.187 6.296 7.317 7.496 11.057m1.567-1.816A10.95 10.95 0 0 0 23 12a10.97 10.97 0 0 0-3.56-8.103c-1.387.454-3.006 1.403-4.664 2.681c2.922 2.867 5.075 6.83 6.287 11.657"
        />
      </Svg>
    );
  }

  // Crisp desktop gaming PC monitor + stand SVG logo
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" testID="brand-logo-pc">
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3.5A2.5 2.5 0 0 0 1.5 6v9.5A2.5 2.5 0 0 0 4 18h6.25v1.75H7.5a.9.9 0 1 0 0 1.8h9a.9.9 0 1 0 0-1.8h-2.75V18H20a2.5 2.5 0 0 0 2.5-2.5V6A2.5 2.5 0 0 0 20 3.5H4Zm0 2h16a.5.5 0 0 1 .5.5v8.25h-17V6a.5.5 0 0 1 .5-.5Zm5.15 2.4a.75.75 0 0 1 0 1.06L7.36 10.75l1.79 1.79a.75.75 0 1 1-1.06 1.06l-2.32-2.32a.75.75 0 0 1 0-1.06l2.32-2.32a.75.75 0 0 1 1.06 0Zm5.7 0a.75.75 0 0 1 1.06 0l2.32 2.32a.75.75 0 0 1 0 1.06l-2.32 2.32a.75.75 0 1 1-1.06-1.06l1.79-1.79-1.79-1.79a.75.75 0 0 1 0-1.06Zm-1.56-.3a.75.75 0 0 1 .49.94l-1.6 5.15a.75.75 0 1 1-1.43-.44l1.6-5.15a.75.75 0 0 1 .94-.5Z"
      />
    </Svg>
  );
}
