import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'green' | 'cyan' | 'red';
}

export const Card = ({ children, className = '', glowColor = 'cyan' }: CardProps) => {
  const glowColors = {
    green: 'shadow-green-400/10 border-green-400/30',
    cyan: 'shadow-cyan-400/10 border-cyan-400/30',
    red: 'shadow-red-400/10 border-red-400/30',
  };

  return (
    <div
      className={`
        bg-gray-900/80 backdrop-blur-sm rounded-lg border
        ${glowColors[glowColor]} shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};
