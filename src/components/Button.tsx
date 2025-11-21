import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const variants = {
    primary: 'bg-green-400/20 text-green-400 border-green-400/50 hover:bg-green-400/30 hover:shadow-green-400/30',
    secondary: 'bg-cyan-400/20 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/30 hover:shadow-cyan-400/30',
    danger: 'bg-red-400/20 text-red-400 border-red-400/50 hover:bg-red-400/30 hover:shadow-red-400/30',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg border font-mono font-semibold
        transition-all duration-300 shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
