import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const TEAM_IMAGE = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=srgb&fm=jpg&q=85&w=900';

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" className="py-24 md:py-32 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:col-span-5 order-2 md:order-1"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans font-medium">
                {t.badge}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-[#F5F5F0] leading-tight mb-2">
              {t.title}
            </h2>
            <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] leading-tight mb-6">
              {t.titleAccent}
            </h2>

            <p className="text-base text-[#A1A1AA] font-sans font-light leading-relaxed mb-8">
              {t.body}
            </p>

            {/* Mission */}
            <div className="border-l-2 border-[#D4AF37] pl-5 mb-8">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-sans font-medium mb-2">
                {t.missionLabel}
              </div>
              <p className="text-sm text-[#A1A1AA] font-sans font-light leading-relaxed italic">
                "{t.mission}"
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {t.values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-2"
                  data-testid={`about-value-${i}`}
                >
                  <CheckCircle size={13} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="text-xs text-[#A1A1AA] font-sans">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="md:col-span-7 order-1 md:order-2"
          >
            <div className="relative">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={TEAM_IMAGE}
                  alt="Equipo Grupo Novega"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-[#D4AF37] opacity-60" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-[#D4AF37] opacity-60" />
              {/* Founded badge */}
              <div className="absolute bottom-6 right-6 bg-[#0A0A0A]/90 backdrop-blur-sm border border-white/10 px-5 py-4 text-center">
                <div className="text-[#D4AF37] font-serif text-2xl font-semibold">2026</div>
                <div className="text-[#A1A1AA] text-[9px] tracking-[0.2em] uppercase font-sans mt-0.5">Fundación</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
