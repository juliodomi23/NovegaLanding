import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, Globe, Share2, Building, Target, Users, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20solicitar%20una%20estrategia%20de%20marketing%20para%20mi%20propiedad.';

const ICON_MAP = { Camera, Globe, Share2, Building, Target, Users };

export default function Marketing() {
  const { lang } = useLanguage();
  const t = translations[lang].marketing;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="marketing" className="py-24 md:py-32 bg-[#0A1628]" ref={ref}>
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Target;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-[#406788]/10 border border-[#406788]/25 hover:border-[#D9AE4E]/40 p-6 transition-all duration-400 group"
              >
                <div className="w-11 h-11 border border-[#D9AE4E]/30 flex items-center justify-center mb-5 group-hover:border-[#D9AE4E] group-hover:bg-[#D9AE4E]/5 transition-all duration-300">
                  <Icon size={18} className="text-[#D9AE4E]" />
                </div>
                <h3 className="text-base font-serif text-[#EEF2F8] mb-2 group-hover:text-[#D9AE4E] transition-colors duration-300 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-[#7A9BB5] font-sans font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#D9AE4E] text-black font-sans font-semibold text-sm tracking-[0.08em] px-8 py-4 hover:bg-[#C49A38] transition-all duration-300"
          >
            <MessageCircle size={16} />
            {t.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
