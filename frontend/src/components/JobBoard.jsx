import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, CheckCircle, Star, Mail, Paperclip, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const AGENCY_EMAIL = 'novegabienesraices@gmail.com';

export default function JobBoard() {
  const { lang } = useLanguage();
  const t = translations[lang].jobs;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', message: '', file: null });
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setStatus('sending');

    const subject = encodeURIComponent(`Solicitud de Empleo - ${form.name}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nCorreo: ${form.email}\n\n${form.message}\n\n` +
      (fileName ? `CV adjunto: ${fileName}\n(Por favor adjunta tu CV manualmente a este correo)` : '')
    );

    window.location.href = `mailto:${AGENCY_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '', file: null });
      setFileName('');
    }, 800);
  };

  return (
    <section id="jobs" className="py-24 md:py-32 bg-[#132436]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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

        {/* Opening Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-[#D9AE4E] animate-pulse" />
          <span className="text-xs tracking-[0.18em] uppercase text-[#D9AE4E] font-sans font-medium">
            {t.openings}
          </span>
        </motion.div>

        {/* Job Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          data-testid="job-position-card"
          className="bg-[#406788]/10 border border-[#406788]/25 hover:border-[#D9AE4E]/30 transition-all duration-500 overflow-hidden"
        >
          {/* Job Header */}
          <div className="p-6 md:p-8 border-b border-[#406788]/25">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#EEF2F8] mb-3">
                  {t.positionTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#D9AE4E]" />
                    <span className="text-xs text-[#7A9BB5] font-sans">{t.positionType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#D9AE4E]" />
                    <span className="text-xs text-[#7A9BB5] font-sans">{t.positionLocation}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-[#D9AE4E]/10 border border-[#D9AE4E]/30 px-4 py-2 inline-flex items-center gap-2">
                  <Star size={11} className="text-[#D9AE4E]" />
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#D9AE4E] font-sans font-medium">
                    {t.openings}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#7A9BB5] font-sans font-light leading-relaxed mt-4">
              {t.description}
            </p>
          </div>

          {/* Requirements + Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#406788]/25">
            <div className="p-6 md:p-8">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#D9AE4E] font-sans font-medium mb-4">
                {t.requirementsTitle}
              </div>
              <ul className="space-y-3">
                {t.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={13} className="text-[#D9AE4E] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#7A9BB5] font-sans font-light leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#D9AE4E] font-sans font-medium mb-4">
                {t.benefitsTitle}
              </div>
              <ul className="space-y-3">
                {t.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={13} className="text-[#D9AE4E] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#7A9BB5] font-sans font-light leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CV Upload Form */}
          <div className="p-6 md:p-8 bg-[#D9AE4E]/5 border-t border-[#406788]/25">
            <h4 className="text-lg font-serif text-[#EEF2F8] mb-1">{t.applyTitle}</h4>
            <p className="text-sm text-[#7A9BB5] font-sans mb-6">{t.applySubtitle}</p>

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7A9BB5] font-sans mb-2">
                      {t.formName} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t.formName}
                      className="w-full bg-[#0A1628]/60 border border-[#406788]/30 text-[#EEF2F8] placeholder-[#7A9BB5]/50 text-sm font-sans px-4 py-3 focus:outline-none focus:border-[#D9AE4E]/50 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7A9BB5] font-sans mb-2">
                      {t.formEmail} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={t.formEmail}
                      className="w-full bg-[#0A1628]/60 border border-[#406788]/30 text-[#EEF2F8] placeholder-[#7A9BB5]/50 text-sm font-sans px-4 py-3 focus:outline-none focus:border-[#D9AE4E]/50 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7A9BB5] font-sans mb-2">
                    {t.formMessage}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={t.formMessage}
                    className="w-full bg-[#0A1628]/60 border border-[#406788]/30 text-[#EEF2F8] placeholder-[#7A9BB5]/50 text-sm font-sans px-4 py-3 focus:outline-none focus:border-[#D9AE4E]/50 transition-colors duration-300 resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-[10px] tracking-[0.18em] uppercase text-[#7A9BB5] font-sans mb-2">
                    {t.formFile}
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer bg-[#0A1628]/60 border border-[#406788]/30 hover:border-[#D9AE4E]/40 px-4 py-3 transition-colors duration-300 group">
                    <Paperclip size={15} className="text-[#D9AE4E] flex-shrink-0" />
                    <span className="text-sm font-sans text-[#7A9BB5] group-hover:text-[#EEF2F8] transition-colors truncate">
                      {fileName || (lang === 'es' ? 'Seleccionar archivo PDF...' : 'Select PDF file...')}
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    data-testid="job-apply-submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#D9AE4E] text-black text-xs tracking-[0.1em] uppercase font-sans font-semibold px-7 py-3 hover:bg-[#C49A38] transition-colors duration-300 disabled:opacity-60"
                  >
                    <Send size={13} />
                    {status === 'sending' ? t.formSending : t.formSubmit}
                  </button>
                  <a
                    href={`mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent('Solicitud de Empleo - Agente de Ventas')}`}
                    data-testid="job-apply-email"
                    className="inline-flex items-center gap-2 border border-[#D9AE4E] text-[#D9AE4E] text-xs tracking-[0.1em] uppercase font-sans font-medium px-6 py-3 hover:bg-[#D9AE4E] hover:text-black transition-all duration-300"
                  >
                    <Mail size={13} />
                    {t.emailCta}
                  </a>
                </div>
                <p className="text-[10px] text-[#7A9BB5]/70 font-sans">{t.applyNote}</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
