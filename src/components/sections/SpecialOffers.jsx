import React from 'react';

export const SpecialOffers = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 border-b border-[#23272d]">
      <div className="max-w-7xl mx-auto">
        {/* Метка ответственного */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>Ответственный: Бахтовар</span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Special Offers</h2>
        <p className="text-gray-400 text-sm">
          Табы фильтрации (Special Offer, New car, Most popular, Daily), 4 карточки спорткаров и кнопка "VIEW ALL".
        </p>
      </div>
    </section>
  );
};
