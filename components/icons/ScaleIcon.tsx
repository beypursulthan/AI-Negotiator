
import React from 'react';

const ScaleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 16.5l-4-4-4 4" />
    <path d="M12 22V12.5" />
    <path d="M5 7.5a7 7 0 1 0 14 0" />
    <path d="M2 7.5h3" />
    <path d="M19 7.5h3" />
  </svg>
);

export default ScaleIcon;
