import React from 'react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-black/40 backdrop-blur-md border-b border-[#23272d]/50 h-20 flex items-center justify-between px-6 md:px-12 text-white">
      <div>{/* TODO: Left Menu */} Header Left</div>
      <div>{/* TODO: Logo */} TRINITY</div>
      <div>{/* TODO: Contacts & Lang */} Header Right</div>
    </header>
  );
};
