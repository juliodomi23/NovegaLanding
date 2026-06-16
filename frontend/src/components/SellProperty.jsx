import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const AGENCY_EMAIL = 'novegabienesraices@gmail.com';
const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20quiero%20vender%20mi%20propiedad.';

export default function SellProperty() {
  const { lang } = useLanguage();
  const t = translations[lang].vende;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', propertyType: t.formTypeOptions[0], message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const subject = encodeURIComponent(`Quiero Vender mi Propiedad - ${form.name}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nCorreo: ${form.email}\nTeléfono: ${form.phone}\n` +
      `Ubicación: ${form.address}\nTipo de propiedad: ${form.propertyType}\n\n${form.message}`
    );

    window.location.href = `mailto:${AGENCY_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', address: '', propertyType: t.formTypeOptions[0], message: '' });
    }, 800);
  };

  return (
    <section id="sell" className="py-24 md:py-32 bg-[#0A1628]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#D9AE4E]" />
            <span className="text-[#D9AE4E] text-xs tracking-[0.25em] uppercase font-sans font-medium">
              {t.badge}
            </span>
            <div className="w-8 h-px bg-[#D9AE4E]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#EEF2F8]">{t.title}</h2>
          <h2 className="text-3xl md:text-4xl font-serif text-[#D9AE4E] mb-4">{t.titleAccent}</h2>
          <p className="text-base text-[#7A9BB5] font-sans font-light max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-[#406788]/8 border border-[#406788]/20 p-6 md:p-10"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-[#D9AE4E]/10 border border-[#D9AE4E]/30 px-5 py-4"
            >
              <CheckCircle size={18} className="text-[#D9AE4E] flex-shrink-0" />
              <p className="text-sm text-[#D9AE4E] font-sans">{t.formSuccess}</p>
            </motion.div>
          ) : (
          <form data-testid="sell-property-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sell-name" className="text-[10px] tracking-[0.2em] uppercase text-[#7A9BB5] font-sans font-medium">
                  {t.formName}
                </label>
                <input
                  id="sell-name"
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  data-testid="sell-name-input"
                  placeholder={t.formName}
                  className="bg-transparent border-0 border-b border-[#406788]/40 focus:border-[#D9AE4E] text-[#EEF2F8] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sell-email" className="text-[10px] tracking-[0.2em] uppercase text-[#7A9BB5] font-sans font-medium">
                  {t.formEmail}
                </label>
                <input
                  id="sell-email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  data-testid="sell-email-input"
                  placeholder={t.formEmail}
                  className="bg-transparent border-0 border-b border-[#406788]/40 focus:border-[#D9AE4E] text-[#EEF2F8] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sell-phone" className="text-[10px] tracking-[0.2em] uppercase text-[#7A9BB5] font-sans font-medium">
                  {t.formPhone}
                </label>
                <input
                  id="sell-phone"
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  data-testid="sell-phone-input"
                  placeholder={t.formPhone}
                  className="bg-transparent border-0 border-b border-[#406788]/40 focus:border-[#D9AE4E] text-[#EEF2F8] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sell-type" className="text-[10px] tracking-[0.2em] uppercase text-[#7A9BB5] font-sans font-medium">
                  {t.formType}
                </label>
                <select
                  id="sell-type"
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  data-testid="sell-type-select"
                  className="bg-transparent border-0 border-b border-[#406788]/40 focus:border-[#D9AE4E] text-[#EEF2F8] font-sans text-sm py-2.5 outline-none transition-colors duration-300"
                >
                  {t.formTypeOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0A1628]">{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="sell-address" className="text-[10px] tracking-[0.2em] uppercase text-[#7A9BB5] font-sans font-medium">
                {t.formAddress}
              </label>
              <input
                id="sell-address"
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                data-testid="sell-address-input"
                placeholder={t.formAddress}
                className="bg-transparent border-0 border-b border-[#406788]/40 focus:border-[#D9AE4E] text-[#EEF2F8] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="sell-message" className="text-[10px] tracking-[0.2em] uppercase text-[#7A9BB5] font-sans font-medium">
                {t.formMessage.split('(')[0]}
              </label>
              <textarea
                id="sell-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                data-testid="sell-message-input"
                placeholder={t.formMessage}
                className="bg-transparent border-0 border-b border-[#406788]/40 focus:border-[#D9AE4E] text-[#EEF2F8] font-sans text-sm py-2.5 outline-none transition-colors duration-300 resize-none placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                data-testid="sell-submit-btn"
                className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#D9AE4E] text-black font-sans font-semibold text-xs tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#C49A38] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {status === 'sending' ? t.formSending : t.formSubmit}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="sell-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 border border-[#D9AE4E] text-[#D9AE4E] font-sans font-medium text-xs tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#D9AE4E] hover:text-black transition-all duration-300"
              >
                <MessageCircle size={14} />
                {t.whatsappCta}
              </a>
            </div>
          </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
