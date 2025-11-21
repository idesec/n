import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-mono text-cyan-400 mb-2 tracking-wide">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-4 py-3 bg-gray-800/50 border rounded-lg
          font-mono text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400
          transition-all duration-300
          ${error ? 'border-red-400/50' : 'border-gray-700'}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
};
