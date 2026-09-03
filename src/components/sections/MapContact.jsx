import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, MapPin } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const MapContact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name && !formData.email && !formData.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section id="map-contact" className="w-full py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8 md:mb-12 tracking-tight">
          {t('mapContact.title', 'Ask us anything')}
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Dark Themed Interactive Map */}
          <div className="lg:col-span-6 min-h-[380px] lg:min-h-[480px] bg-[#141619] rounded-2xl border border-[#23272d] overflow-hidden relative shadow-xl flex flex-col">
            {/* Map Location Badge */}
            <div className="absolute top-4 left-4 z-10 bg-[#0d0f11]/90 backdrop-blur-md border border-[#23272d] px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-medium text-white shadow-lg pointer-events-none">
              <MapPin className="w-4 h-4 text-brand-cyan" />
              <span>Al Quoz, Dubai</span>
            </div>

            {/* Embedded Google Map with Dark Theme CSS Inversion Filter */}
            <iframe
              title="Dubai Map"
              src="https://maps.google.com/maps?q=Al+Quoz+Industrial+Area+3,+Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] flex-1 border-0"
              style={{
                filter: 'invert(92%) hue-rotate(180deg) contrast(1.1) brightness(0.95)',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 bg-[#141619] rounded-2xl border border-[#23272d] p-6 sm:p-10 shadow-xl flex flex-col justify-between">
            {isSubmitted ? (
              <div className="my-auto py-12 flex flex-col items-center text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-16 h-16 text-brand-cyan mb-4 drop-shadow-[0_0_15px_var(--color-brand-cyan)]" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('mapContact.success', 'Thank you! Your request has been sent successfully.')}
                </h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Our concierge team will review your message and contact you within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('mapContact.namePlaceholder', 'Name')}
                  required
                />

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('mapContact.emailPlaceholder', 'E-mail')}
                  required
                />

                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t('mapContact.phonePlaceholder', 'Phone')}
                  required
                />

                {/* Message Textarea */}
                <div className="w-full flex flex-col gap-1.5">
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('mapContact.messagePlaceholder', 'Message')}
                    className="w-full bg-[#181a1d] text-white placeholder-gray-500 rounded-md px-4 py-3.5 outline-none border border-[#2b2f36] hover:border-gray-600 focus:border-brand-cyan transition-colors duration-200 text-sm resize-none"
                  />
                </div>

                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={loading}
                    className="w-full py-4 text-sm font-bold tracking-wider"
                  >
                    {loading ? 'SENDING...' : t('mapContact.submit', 'SEND THE REQUEST')}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
