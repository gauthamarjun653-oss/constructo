import React from 'react';

interface AdvanceLogoProps {
  className?: string;
  textColor?: string;
}

const AdvanceLogo: React.FC<AdvanceLogoProps> = ({ className = "h-12 w-auto", textColor = "currentColor" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 350 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 
        This is a meticulously crafted SVG recreation of the 
        AdVance GROUP MIDDLE EAST & INDIA logo. It ensures 
        infinitely sharp resolution (better than 8K!) 
      */}

      <style>
        {`
          .logo-text { font-family: 'Inter', 'Segoe UI', sans-serif; fill: ${textColor}; font-weight: 700; }
          .logo-light { font-family: 'Inter', 'Segoe UI', sans-serif; fill: ${textColor}; font-weight: 400; }
        `}
      </style>

      {/* Main Text: Ad */}
      <text x="5" y="55" fontSize="48" className="logo-text" letterSpacing="-1">Ad</text>

      {/* The iconic 'V' with the orange circle */}
      <g transform="translate(62, 0)">
        {/* Orange Circle */}
        <circle cx="28" cy="18" r="10" fill="#f17600" />
        {/* V Shape */}
        <path 
          d="M 5,22 L 24,55 L 28,55 L 45,22 L 35,22 L 26,45 L 15,22 Z" 
          fill={textColor} 
        />
      </g>

      {/* Main Text: ance */}
      <text x="112" y="55" fontSize="48" className="logo-text" letterSpacing="-1">ance</text>

      {/* Text: GROUP */}
      <text x="230" y="55" fontSize="22" className="logo-light" letterSpacing="1">GROUP</text>

      {/* The Multi-Colored Underline */}
      <g transform="translate(5, 62)">
        <rect x="0" y="0" width="30" height="4" fill="#ffc90e" />
        <rect x="30" y="0" width="65" height="4" fill="#23b14d" />
        <rect x="95" y="0" width="40" height="4" fill="#00a2e8" />
        <rect x="135" y="0" width="30" height="4" fill="#ffc90e" />
        <rect x="165" y="0" width="60" height="4" fill="#ed1c24" />
      </g>

      {/* Subtitle: MIDDLE EAST & INDIA */}
      <text x="5" y="85" fontSize="16" className="logo-light" letterSpacing="2">MIDDLE EAST &amp; INDIA</text>
      
    </svg>
  );
};

export default AdvanceLogo;
