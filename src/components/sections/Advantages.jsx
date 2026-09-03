import React from 'react';

export const Advantages = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 border-b border-[#23272d]">
      <div className="max-w-7xl mx-auto">
        {/* Метка ответственного */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>Ответственный: Али</span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Advantages</h2>
        <p className="text-gray-400 text-sm mb-4">
          6 карточек преимуществ (3 в ряд на десктопе с эффектом hover-подсветки изображения, список с маркерами на мобилке):
        </p>
        <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
          <li>40+ unique cars for rent from our fleet</li>
          <li>Delivery and return of cars in Dubai 24/7</li>
          <li>Insurance without a deductible for each car</li>
          <li>No video or audio recording in the car</li>
          <li>24/7 technical support</li>
          <li>All models have a premium package</li>
        </ul>
      </div>
    </section>
  );
};
