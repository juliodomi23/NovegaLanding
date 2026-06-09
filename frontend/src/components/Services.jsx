import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, FileText, TrendingUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const ICONS = { Home, FileText, TrendingUp };
const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios.';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function Services() {
  const { lang } = useLanguage();
  const t = translations[lang].services;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#132436]" ref={ref}>
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
          <h2 className="text-3xl md:text-4xl font-serif text-[#EEF2F8] mb-1">{t.title}</h2>
          <h2 className="text-3xl md:text-4xl font-serif text-[#D9AE4E] mb-4">{t.titleAccent}</h2>
          <p className="text-base text-[#7A9BB5] font-sans font-light max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.items.map((service, i) => {
            const Icon = ICONS[service.icon] || Home;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                data-testid={`service-card-${service.id}`}
                className="bg-[#406788]/10 border border-[#406788]/25 p-8 hover:bg-[#406788]/15 hover:border-[#D9AE4E]/50 transition-all duration-500 group flex flex-col"
              >
                {/* Icon + Label */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 border border-[#D9AE4E]/30 flex items-center justify-center group-hover:border-[#D9AE4E] group-hover:bg-[#D9AE4E]/5 transition-all duration-300">
                    <Icon size={20} className="text-[#D9AE4E]" />
                  </div>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#7A9BB5] font-sans font-medium border border-[#406788]/25 px-2.5 py-1">
                    {service.label}
                  </span>
                </div>

                {/* Title + Description */}
                <h3 className="text-xl md:text-2xl font-serif text-[#EEF2F8] mb-3 group-hover:text-[#D9AE4E] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-[#7A9BB5] font-sans font-light leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Pricing Table */}
                <div className="border-t border-[#406788]/25 pt-5 mb-6">
                  <div className="text-[9px] tracking-[0.22em] uppercase text-[#D9AE4E] font-sans font-medium mb-3">
                    {t.priceHeader}
                  </div>
                  <div className="space-y-3">
                    {service.pricing.map((item, j) => (
                      <div key={j} className="flex items-start justify-between gap-2">
                        <span className="text-xs text-[#7A9BB5] font-sans font-light leading-tight flex-1">{item.name}</span>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-[#EEF2F8] font-sans font-medium">{item.price}</div>
                          {item.note && (
                            <div className="text-[10px] text-[#7A9BB5]/70 font-sans">{item.note}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`service-cta-${service.id}`}
                  className="flex items-center justify-center gap-2 border border-[#D9AE4E] text-[#D9AE4E] text-xs tracking-[0.1em] uppercase font-sans font-medium py-3 hover:bg-[#D9AE4E] hover:text-black transition-all duration-300 group/btn"
                >
                  <MessageCircle size={14} className="group-hover/btn:scale-110 transition-transform" />
                  {service.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
