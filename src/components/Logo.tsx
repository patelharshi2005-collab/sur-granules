import React, { useState } from 'react';
import officialLogoImg from '../assets/images/sur_granules_logo_1790415708263.jpg';
import officialMarkImg from '../assets/images/sur_granules_mark_1790415726912.jpg';

export interface LogoProps {
  variant?: 'light' | 'dark' | 'full' | 'mark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';
  const [imageError, setImageError] = useState(false);

  // If user requests full vertical badge variant
  if (variant === 'full') {
    const fullSizes = {
      sm: 'max-w-[160px]',
      md: 'max-w-[200px]',
      lg: 'max-w-[260px]',
      xl: 'max-w-[340px]',
    };

    return (
      <div className={`flex flex-col items-center text-center select-none ${fullSizes[size]} ${className}`}>
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200/90 p-2">
          <img
            src={officialLogoImg}
            alt="SUR GRANULES - Recycle • Reprocess • Rebuild"
            className="w-full h-auto object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // If user requests just the S emblem mark
  if (variant === 'mark') {
    const markSizes = {
      sm: 'w-8 h-8',
      md: 'w-11 h-11',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    };

    return (
      <div
        className={`relative ${markSizes[size]} shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xs border border-slate-200 p-0.5 select-none ${className}`}
      >
        <img
          src={officialMarkImg}
          alt="SUR GRANULES Emblem"
          className="w-full h-full object-contain rounded-full hover:scale-105 transition-transform"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Horizontal responsive lockup (default for Navbar, Footer, Headers)
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subSizes = {
    sm: 'text-[8px]',
    md: 'text-[9.5px]',
    lg: 'text-[11px]',
    xl: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D S-Loop Emblem with Blue, Green & White Granules + Dual Eco Leaves */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-xs border ${
          isLight ? 'border-white/20 bg-white/95' : 'border-slate-200'
        } p-0.5`}
      >
        {!imageError ? (
          <img
            src={officialMarkImg}
            alt="SUR GRANULES Official S Emblem"
            className="w-full h-full object-contain rounded-lg hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sgFallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E88E5" />
                <stop offset="50%" stopColor="#0D47A1" />
                <stop offset="100%" stopColor="#002171" />
              </linearGradient>
            </defs>
            <path
              d="M 68 28 C 65 14, 45 10, 32 18 C 22 25, 20 38, 28 46 C 36 53, 58 52, 68 60 C 78 68, 76 84, 60 90 C 44 96, 26 88, 22 74"
              stroke="url(#sgFallbackGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="68,18 78,28 64,36" fill="#0D47A1" />
            <polygon points="22,78 12,68 26,60" fill="#0D47A1" />
            <circle cx="44" cy="28" r="3.2" fill="#1565C0" />
            <circle cx="51" cy="27" r="3" fill="#1E88E5" />
            <circle cx="53" cy="38" r="3.5" fill="#43A047" />
            <circle cx="47" cy="45" r="3.2" fill="#2E7D32" />
            <circle cx="40" cy="62" r="3.4" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="0.8" />
          </svg>
        )}
      </div>

      {/* Brand Typography Lockup */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display font-black tracking-tight uppercase ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-[#00335a]'
            }`}
          >
            SUR
          </span>
          <span
            className={`font-display font-extrabold tracking-wider uppercase ${titleSizes[size]} ${
              isLight ? 'text-blue-100' : 'text-[#174a78]'
            }`}
          >
            GRANULES
          </span>
        </div>

        {showSubtitle && (
          <div
            className={`flex items-center gap-1.5 mt-1 font-mono font-bold uppercase tracking-wider ${subSizes[size]} ${
              isLight ? 'text-emerald-300' : 'text-slate-600'
            }`}
          >
            <span
              className={`h-px w-2.5 sm:w-3.5 ${isLight ? 'bg-emerald-400/50' : 'bg-slate-300'}`}
            />
            <span>RECYCLE • REPROCESS • REBUILD</span>
            <span
              className={`h-px w-2.5 sm:w-3.5 ${isLight ? 'bg-emerald-400/50' : 'bg-slate-300'}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
