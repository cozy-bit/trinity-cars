import React from 'react';

export const Input = ({
  label,
  error,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs text-gray-400 font-medium">{label}</label>}
      <input
        disabled={disabled}
        className={`w-full bg-[#181a1d] text-white placeholder-gray-500 rounded-md px-4 py-3.5 outline-none border transition-colors duration-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed ${
          error
            ? 'border-red-500/80 focus:border-red-500 text-red-400'
            : 'border-[#2b2f36] hover:border-gray-600 focus:border-brand-cyan'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
};
