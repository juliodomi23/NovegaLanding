import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, Clock, Phone, MessageCircle, Send } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n.';
const MAPS_URL = 'https://maps.app.goo.gl/WAaLFeELQFsyt9gx6';

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, { ...form, msg_type: 'contact' });
      toast.success(t.formSuccess);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error(t.formError);
    } finally {
      setSubmitting(false);
    }
  };

  const infoItems = [
    { icon: MapPin, label: t.addressLabel, value: t.address },
    { icon: Mail, label: t.emailLabel, value: t.email },
    { icon: Clock, label: t.scheduleLabel, value: t.schedule },
    { icon: Phone, label: t.phoneLabel, value: t.phone },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans font-medium">
              {t.badge}
            </span>
            <div className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F5F5F0]">{t.title}</h2>
          <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-4">{t.titleAccent}</h2>
          <p className="text-base text-[#A1A1AA] font-sans font-light max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-sans font-medium">
                    {t.formName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    data-testid="contact-name-input"
                    placeholder={t.formName}
                    className="bg-transparent border-0 border-b border-white/20 focus:border-[#D4AF37] text-[#F5F5F0] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-sans font-medium">
                    {t.formEmail}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    data-testid="contact-email-input"
                    placeholder={t.formEmail}
                    className="bg-transparent border-0 border-b border-white/20 focus:border-[#D4AF37] text-[#F5F5F0] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-sans font-medium">
                  {t.formPhone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  data-testid="contact-phone-input"
                  placeholder={t.formPhone}
                  className="bg-transparent border-0 border-b border-white/20 focus:border-[#D4AF37] text-[#F5F5F0] font-sans text-sm py-2.5 outline-none transition-colors duration-300 placeholder:text-white/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-sans font-medium">
                  {t.formMessage.split('...')[0]}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  data-testid="contact-message-input"
                  placeholder={t.formMessage}
                  className="bg-transparent border-0 border-b border-white/20 focus:border-[#D4AF37] text-[#F5F5F0] font-sans text-sm py-2.5 outline-none transition-colors duration-300 resize-none placeholder:text-white/20"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit-btn"
                  className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-sans font-semibold text-xs tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#C5A059] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                  {submitting ? t.formSending : t.formSubmit}
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-btn"
                  className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] font-sans font-medium text-xs tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  <MessageCircle size={14} />
                  {t.whatsappCta}
                </a>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} data-testid={`contact-info-${i}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} className="text-[#D4AF37]" />
                    <span className="text-[9px] tracking-[0.22em] uppercase text-[#D4AF37] font-sans font-medium">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#A1A1AA] font-sans font-light leading-relaxed whitespace-pre-line pl-5">
                    {item.value}
                  </p>
                  {i === 0 && (
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-maps-link"
                      className="text-xs text-[#D4AF37] hover:text-[#C5A059] font-sans transition-colors duration-300 pl-5 mt-1 inline-block underline underline-offset-2"
                    >
                      Ver en Google Maps
                    </a>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
