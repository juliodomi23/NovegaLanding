import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BedDouble, Bath, Maximize, MapPin, MessageCircle, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';
import { useData } from '@/context/DataContext';
import DetailModal from '@/components/DetailModal';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20una%20propiedad.';

export default function Properties() {
  const { lang } = useLanguage();
  const t = translations[lang].properties;
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'all' ? data.properties : data.properties.filter(p => p.category === filter);

  const filters = [
    { key: 'all', label: t.filterAll },
    { key: 'venta', label: t.filterVenta },
    { key: 'renta', label: t.filterRenta },
  ];

  return (
    <section id="properties" className="py-24 md:py-32 bg-[#0A1628]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#D9AE4E]" />
            <span className="text-[#D9AE4E] text-xs tracking-[0.25em] uppercase font-sans font-medium">{t.badge}</span>
            <div className="w-8 h-px bg-[#D9AE4E]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#EEF2F8]">{t.title}</h2>
          <h2 className="text-3xl md:text-4xl font-serif text-[#D9AE4E] mb-4">{t.titleAccent}</h2>
          <p className="text-base text-[#7A9BB5] font-sans font-light max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`cursor-pointer px-5 py-2 text-xs tracking-[0.15em] uppercase font-sans font-medium transition-all duration-300 border ${
                filter === f.key
                  ? 'bg-[#D9AE4E] text-black border-[#D9AE4E]'
                  : 'border-[#406788]/40 text-[#7A9BB5] hover:border-[#D9AE4E]/50 hover:text-[#D9AE4E]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-testid={`property-card-${property.id}`}
              className="group relative overflow-hidden bg-[#406788]/8 border border-[#406788]/15 hover:border-[#406788]/40 transition-all duration-500"
            >
              <button
                onClick={() => setSelected(property)}
                className="relative overflow-hidden aspect-[4/3] w-full cursor-pointer block"
                aria-label={t.detailsCta}
              >
                {property.images?.[0] ? (
                  <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-[#406788]/15 flex items-center justify-center">
                    <Home size={32} className="text-[#406788]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <span className="text-[11px] tracking-[0.15em] uppercase font-sans font-medium text-white border border-white/50 px-4 py-2">{t.detailsCta}</span>
                </div>
                <div className="absolute top-4 left-4 bg-[#0A1628]/80 backdrop-blur-sm border border-[#406788]/25 px-3 py-1">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#7A9BB5] font-sans">{property.type}</span>
                </div>
                {property.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 ${property.category === 'renta' ? 'bg-[#406788]' : 'bg-[#D9AE4E]'}`}>
                    <span className={`text-[10px] tracking-[0.18em] uppercase font-sans font-semibold ${property.category === 'renta' ? 'text-white' : 'text-black'}`}>{property.badge}</span>
                  </div>
                )}
              </button>
              <div className="p-6">
                <h3 className="text-lg font-serif text-[#EEF2F8] mb-2 group-hover:text-[#D9AE4E] transition-colors duration-300">{property.title}</h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={11} className="text-[#D9AE4E] flex-shrink-0" />
                  <span className="text-xs text-[#7A9BB5] font-sans">{property.location}</span>
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-xl font-serif text-[#D9AE4E] font-medium">{property.price}</span>
                    <span className="text-xs text-[#7A9BB5] font-sans ml-1">{property.currency}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-[#406788]/25 mb-4">
                  {property.beds != null && (
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={13} className="text-[#7A9BB5]" />
                      <span className="text-xs text-[#7A9BB5] font-sans">{property.beds} {t.beds}</span>
                    </div>
                  )}
                  {property.baths != null && (
                    <div className="flex items-center gap-1.5">
                      <Bath size={13} className="text-[#7A9BB5]" />
                      <span className="text-xs text-[#7A9BB5] font-sans">{property.baths} {t.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Maximize size={13} className="text-[#7A9BB5]" />
                    <span className="text-xs text-[#7A9BB5] font-sans">{property.sqm} {t.sqm}</span>
                  </div>
                </div>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid={`property-cta-${property.id}`} className="flex items-center justify-center gap-2 w-full border border-[#D9AE4E]/50 text-[#D9AE4E] text-xs tracking-[0.1em] uppercase font-sans font-medium py-2.5 hover:bg-[#D9AE4E] hover:text-black transition-all duration-300">
                  <MessageCircle size={13} />
                  {t.contactCta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="properties-view-all-btn" className="inline-flex items-center gap-2 border border-[#406788]/40 text-[#7A9BB5] hover:text-[#D9AE4E] hover:border-[#D9AE4E]/50 text-xs tracking-[0.15em] uppercase font-sans font-medium px-8 py-3 transition-all duration-300">
            {t.viewAll}
          </a>
        </motion.div>
      </div>

      {selected && (
        <DetailModal
          title={selected.title}
          location={selected.location}
          images={selected.images}
          fallbackIcon={Home}
          whatsappUrl={WHATSAPP_URL}
          whatsappLabel={t.contactCta}
          onClose={() => setSelected(null)}
        >
          <div className="flex items-end justify-between mb-5">
            <div>
              <span className="text-2xl font-serif text-[#D9AE4E] font-medium">{selected.price}</span>
              <span className="text-sm text-[#7A9BB5] font-sans ml-1">{selected.currency}</span>
            </div>
          </div>
          <div className="flex items-center gap-5 pb-5 border-b border-[#406788]/25 text-sm">
            {selected.beds != null && (
              <div className="flex items-center gap-1.5 text-[#7A9BB5] font-sans">
                <BedDouble size={14} className="text-[#7A9BB5]" /> {selected.beds} {t.beds}
              </div>
            )}
            {selected.baths != null && (
              <div className="flex items-center gap-1.5 text-[#7A9BB5] font-sans">
                <Bath size={14} className="text-[#7A9BB5]" /> {selected.baths} {t.baths}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[#7A9BB5] font-sans">
              <Maximize size={14} className="text-[#7A9BB5]" /> {selected.sqm} {t.sqm}
            </div>
          </div>
        </DetailModal>
      )}
    </section>
  );
}
