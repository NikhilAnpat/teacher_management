import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1.5rem', circle = false, className = '' }) => (
  <div
    className={`relative overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 ${circle ? 'rounded-full' : 'rounded-md'} ${className}`}
    style={{ width, height }}
  >
    <span
      className="absolute inset-0 shimmer-block"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', animation: 'shimmer 1.5s infinite linear' }}
    />
  </div>
);

export default Skeleton;

// Add this to your globals.css:
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .shimmer-block {
//   background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
//   animation: shimmer 1.5s infinite linear;
//   will-change: transform;
//   width: 100%;
//   height: 100%;
//   display: block;
//   position: absolute;
//   top: 0;
//   left: 0;
// } 