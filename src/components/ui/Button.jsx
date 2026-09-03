import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none text-sm uppercase tracking-wider py-3.5 px-6';

  const variants = {
    primary:
      'bg-brand-cyan text-black hover:bg-brand-cyan-hover hover:shadow-[0_0_20px_var(--color-brand-cyan-glow)] active:scale-[0.98]',
    secondary:
      'bg-[#1b1e22] text-white border border-[#2b2f36] hover:border-brand-cyan hover:text-brand-cyan active:scale-[0.98]',
    outline:
      'border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-black active:scale-[0.98]',
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
