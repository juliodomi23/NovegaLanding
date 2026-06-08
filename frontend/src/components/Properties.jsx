import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BedDouble, Bath, Maximize, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20una%20propiedad.';

export default function Properties() {
  const { lang } = useLanguage();
  const t = translations[lang].properties;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="properties" className="py-24 md:py-32 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.items.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-testid={`property-card-${property.id}`}
              className="group relative overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 px-3 py-1">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#A1A1AA] font-sans">
                    {property.type}
                  </span>
                </div>
                {/* Hot Badge */}
                {property.badge && (
                  <div className="absolute top-4 right-4 bg-[#D4AF37] px-3 py-1">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-black font-sans font-semibold">
                      {property.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-serif text-[#F5F5F0] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={11} className="text-[#D4AF37] flex-shrink-0" />
                  <span className="text-xs text-[#A1A1AA] font-sans">{property.location}</span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-xl font-serif text-[#D4AF37] font-medium">{property.price}</span>
                    <span className="text-xs text-[#A1A1AA] font-sans ml-1">{property.currency}</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/10 mb-4">
                  {property.beds !== null && (
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={13} className="text-[#A1A1AA]" />
                      <span className="text-xs text-[#A1A1AA] font-sans">{property.beds} {t.beds}</span>
                    </div>
                  )}
                  {property.baths !== null && (
                    <div className="flex items-center gap-1.5">
                      <Bath size={13} className="text-[#A1A1AA]" />
                      <span className="text-xs text-[#A1A1AA] font-sans">{property.baths} {t.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Maximize size={13} className="text-[#A1A1AA]" />
                    <span className="text-xs text-[#A1A1AA] font-sans">{property.sqm} {t.sqm}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`property-cta-${property.id}`}
                  className="flex items-center justify-center gap-2 w-full border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.1em] uppercase font-sans font-medium py-2.5 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  <MessageCircle size={13} />
                  {t.contactCta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="properties-view-all-btn"
            className="inline-flex items-center gap-2 border border-white/20 text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 text-xs tracking-[0.15em] uppercase font-sans font-medium px-8 py-3 transition-all duration-300"
          >
            {t.viewAll}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
