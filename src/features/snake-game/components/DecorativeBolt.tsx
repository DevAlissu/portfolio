import { memo } from 'react';
import { BOLT_CROSS_PATH, type BoltVariant } from '../constants';

interface DecorativeBoltProps {
  variant: BoltVariant;
}

export const DecorativeBolt = memo(function DecorativeBolt({ variant }: DecorativeBoltProps) {
  return (
    <div className={`absolute ${variant.position} size-[13px]`}>
      <div className="absolute inset-[-15.38%_-46.15%_-46.15%_-15.38%]">
        <svg className="block size-full" fill="none" viewBox="0 0 21 21">
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="21"
              id={variant.filterId}
              width="21"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="2" dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values={variant.dropShadowColor} />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={variant.innerShadowColor} />
              <feBlend in2="shape" mode="normal" result="effect2_innerShadow" />
            </filter>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(8.5 5.5) rotate(90) scale(9.5)"
              gradientUnits="userSpaceOnUse"
              id={variant.gradientId}
              r="1"
            >
              <stop offset="0.151042" stopColor={variant.gradientStart} />
              <stop offset="1" stopColor={variant.gradientEnd} />
            </radialGradient>
          </defs>
          <g filter={`url(#${variant.filterId})`}>
            <circle cx="8.5" cy="8.5" r="6.5" fill={`url(#${variant.gradientId})`} />
          </g>
          <path d={BOLT_CROSS_PATH} stroke={variant.strokeColor} />
        </svg>
      </div>
    </div>
  );
});
