import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Building2, TrendingUp, Navigation, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20propiedades%20en%20una%20zona%20específica.';
const MAPS_URL = 'https://maps.app.goo.gl/WAaLFeELQFsyt9gx6';

const MAP_EMBED =
  'https://maps.google.com/maps?q=16.7521,-93.1292&z=13&output=embed';

const ZONE_ICONS = [Building2, MapPin, TrendingUp, Navigation];

export default function PropertiesMap() {
  const { lang } = useLanguage();
  const t = translations[lang].map;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="zona" className="bg-[#132436]" ref={ref}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
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
      </div>

      {/* Map + Info grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 border border-[#406788]/25 overflow-hidden"
        >
          {/* Map iframe */}
          <div className="lg:col-span-3 relative h-[340px] md:h-[480px] lg:h-auto min-h-[340px]">
            <iframe
              src={MAP_EMBED}
              title={t.mapTitle}
              loading="lazy"
              className="w-full h-full border-0"
              style={{
                filter:
                  'invert(92%) hue-rotate(180deg) saturate(40%) brightness(75%) contrast(0.92)',
              }}
              allowFullScreen
            />
            {/* Gradient fade on right edge (desktop) */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#0A1628] pointer-events-none" />
            {/* City label overlay */}
            <div className="absolute top-4 left-4 bg-[#0A1628]/85 backdrop-blur-sm border border-[#406788]/25 px-4 py-2.5 flex items-center gap-2">
              <MapPin size={12} className="text-[#D9AE4E]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#EEF2F8] font-sans font-medium">
                Tuxtla Gutiérrez, Chiapas
              </span>
            </div>
            {/* Open in Maps link */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 bg-[#D9AE4E] text-black text-[10px] tracking-[0.15em] uppercase font-sans font-semibold px-3 py-1.5 hover:bg-[#C49A38] transition-colors duration-300 flex items-center gap-1.5"
            >
              <Navigation size={10} />
              {t.openMaps}
            </a>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2 bg-[#0A1628] border-t lg:border-t-0 lg:border-l border-[#406788]/25 p-8 lg:p-10 flex flex-col gap-8">

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pb-8 border-b border-[#406788]/25">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-2xl font-serif text-[#D9AE4E] font-semibold leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[9px] tracking-[0.15em] uppercase text-[#7A9BB5] font-sans mt-1.5 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Zones */}
            <div>
              <div className="text-[9px] tracking-[0.22em] uppercase text-[#D9AE4E] font-sans font-medium mb-4">
                {t.zonesTitle}
              </div>
              <div className="space-y-3">
                {t.zones.map((zone, i) => {
                  const Icon = ZONE_ICONS[i % ZONE_ICONS.length];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 border border-[#D9AE4E]/25 flex items-center justify-center group-hover:border-[#D9AE4E]/60 transition-colors duration-300 flex-shrink-0">
                          <Icon size={12} className="text-[#D9AE4E]" />
                        </div>
                        <span className="text-sm text-[#EEF2F8] font-sans font-light">{zone.name}</span>
                      </div>
                      <span className="text-[10px] tracking-[0.1em] uppercase text-[#7A9BB5]/70 font-sans border border-[#406788]/25 px-2 py-0.5 flex-shrink-0">
                        {zone.type}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Office address */}
            <div className="pb-8 border-b border-[#406788]/25">
              <div className="flex items-center gap-2 mb-2.5">
                <MapPin size={12} className="text-[#D9AE4E]" />
                <div className="text-[9px] tracking-[0.22em] uppercase text-[#D9AE4E] font-sans font-medium">
                  {t.officeTitle}
                </div>
              </div>
              <p className="text-xs text-[#7A9BB5] font-sans font-light leading-relaxed whitespace-pre-line pl-5">
                {t.officeAddress}
              </p>
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="map-whatsapp-cta"
              className="inline-flex items-center justify-center gap-2 bg-[#D9AE4E] text-black font-sans font-semibold text-xs tracking-[0.1em] uppercase px-6 py-4 hover:bg-[#C49A38] transition-colors duration-300 w-full"
            >
              <MessageCircle size={14} />
              {t.cta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
