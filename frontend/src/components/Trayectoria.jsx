import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Shield, Star, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20el%20equipo.';

const CERT_ICONS = [Award, Shield, Star];

export default function Trayectoria() {
  const { lang } = useLanguage();
  const t = translations[lang].trayectoria;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="trayectoria" className="py-24 md:py-32 bg-[#132436]" ref={ref}>
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

        {/* Advisor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.advisors.map((advisor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-[#406788]/10 border border-[#406788]/25 hover:border-[#D9AE4E]/40 transition-all duration-500 p-6 flex flex-col"
            >
              {/* Avatar placeholder */}
              <div className="w-14 h-14 bg-[#D9AE4E]/10 border border-[#D9AE4E]/25 flex items-center justify-center mb-5">
                <Award size={22} className="text-[#D9AE4E]" />
              </div>

              <h3 className="text-base font-serif text-[#EEF2F8] mb-1 leading-snug">{advisor.name}</h3>
              <p className="text-xs text-[#7A9BB5] font-sans mb-5">{advisor.role}</p>

              {/* Certifications */}
              <div className="mt-auto space-y-2">
                <div className="text-[9px] tracking-[0.2em] uppercase text-[#D9AE4E] font-sans font-medium mb-3">
                  Certificaciones
                </div>
                {advisor.certs.map((cert, j) => {
                  const Icon = CERT_ICONS[j % CERT_ICONS.length];
                  return (
                    <div key={j} className="flex items-center gap-2">
                      <Icon size={11} className="text-[#D9AE4E] flex-shrink-0" />
                      <span className="text-[11px] text-[#7A9BB5] font-sans">{cert}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D9AE4E] text-black text-xs tracking-[0.12em] uppercase font-sans font-semibold px-7 py-3.5 hover:bg-[#C49A38] transition-colors duration-300"
          >
            <MessageCircle size={14} />
            {t.cta}
          </a>
          <a
            href="#jobs"
            onClick={(e) => { e.preventDefault(); document.querySelector('#jobs')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-xs tracking-[0.12em] uppercase text-[#7A9BB5] hover:text-[#D9AE4E] font-sans font-medium transition-colors duration-300 border border-[#406788]/40 hover:border-[#D9AE4E]/40 px-7 py-3.5"
          >
            {t.uploadCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
