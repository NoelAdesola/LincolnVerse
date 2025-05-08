// src/components/ThreeBackground.js
import React from 'react';
import { keyframes, styled } from '@mui/system';

// 1) Gradient shift
const gradientShift = keyframes`
  0%   { background-position:   0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
`;

// 2) Rotating radial “spotlight”
const rotateSpot = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// Base animated gradient layer
const AnimatedGradient = styled('div')({
  position: 'fixed',
  inset: 0,
  zIndex: -3,
  background: 'linear-gradient(135deg, #323259 0%, #5e8bff 100%)',
  backgroundSize: '200% 200%',
  animation: `${gradientShift} 20s ease infinite`
});

// Subtle rotating radial overlay
const RotatingSpot = styled('div')({
  position: 'fixed',
  inset: 0,
  zIndex: -2,
  pointerEvents: 'none',
  background:
    'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
  transformOrigin: '50% 50%',
  animation: `${rotateSpot} 120s linear infinite`,
  mixBlendMode: 'overlay'
});

// Tiny noise texture (10×10 px base64) tiled
const Noise = styled('div')({
  position: 'fixed',
  inset: 0,
  zIndex: -1,
  pointerEvents: 'none',
  backgroundImage:
    'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHklEQVQYV2NkYGBg+M+ADFDEgQYgxmCgzDCACDAAw79Q4lAAAAAElFTkSuQmCC")',
  opacity: 0.03
});

const ThreeBackground = ({ style }) => (
  <>
    <AnimatedGradient style={style} />
    <RotatingSpot />
    <Noise />
  </>
);

export default ThreeBackground;
