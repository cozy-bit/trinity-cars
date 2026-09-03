import React from 'react';

export const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#0d0f11] flex flex-col p-6 text-white">
      {/* TODO: Implement full mobile menu */}
      <p>Mobile Menu Overlay</p>
    </div>
  );
};
