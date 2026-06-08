import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta%20gratuita.';
const HERO_IMAGE = 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleScrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Grupo Novega Bienes Raices"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans font-medium">
              {t.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#F5F5F0] leading-none tracking-tight mb-6"
          >
            {t.line1}
            <br />
            <span className="text-[#D4AF37]">{t.line2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base md:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed mb-10 max-w-xl"
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-hero-cta"
              className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] text-black font-sans font-semibold text-sm tracking-[0.08em] px-7 py-4 hover:bg-[#C5A059] transition-all duration-300 group"
            >
              <MessageCircle size={17} className="group-hover:scale-110 transition-transform" />
              {t.cta1}
            </a>
            <button
              data-testid="services-hero-cta"
              onClick={handleScrollToServices}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] font-sans font-medium text-sm tracking-[0.08em] px-7 py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              {t.cta2}
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg"
        >
          {[t.stat1, t.stat2, t.stat3].map((stat, i) => (
            <div key={i} className="text-center" data-testid={`hero-stat-${i}`}>
              <div className="text-2xl md:text-3xl font-serif text-[#D4AF37] font-semibold">{stat.value}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-[#A1A1AA] font-sans mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[#A1A1AA]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
