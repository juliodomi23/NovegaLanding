import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Layers, MessageCircle, Building } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';
import { useData } from '@/context/DataContext';
import DetailModal from '@/components/DetailModal';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20sus%20proyectos%20de%20desarrollo.';

const STATUS_STYLES = {
  gold: 'bg-[#D9AE4E] text-black',
  blue: 'bg-[#406788] text-white',
  muted: 'bg-[#406788]/30 text-[#7A9BB5]',
};

export default function Desarrollos() {
  const { lang } = useLanguage();
  const t = translations[lang].desarrollos;
  const { data } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState(null);

  return (
    <section id="desarrollos" className="py-24 md:py-32 bg-[#132436]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.developments.map((dev, i) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group overflow-hidden bg-[#406788]/8 border border-[#406788]/15 hover:border-[#D9AE4E]/30 transition-all duration-500"
            >
              <button onClick={() => setSelected(dev)} className="relative overflow-hidden aspect-[16/9] w-full cursor-pointer block">
                {dev.images?.[0] ? (
                  <img src={dev.images[0]} alt={dev.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-[#406788]/15 flex items-center justify-center">
                    <Building size={32} className="text-[#406788]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <span className="text-[11px] tracking-[0.15em] uppercase font-sans font-medium text-white border border-white/50 px-4 py-2">{t.detailsCta}</span>
                </div>
                <div className={`absolute top-4 left-4 px-3 py-1 ${STATUS_STYLES[dev.statusColor] || STATUS_STYLES.muted}`}>
                  <span className="text-[10px] tracking-[0.15em] uppercase font-sans font-semibold">{dev.status}</span>
                </div>
              </button>
              <div className="p-6">
                <div className="text-[10px] tracking-[0.18em] uppercase text-[#7A9BB5] font-sans mb-2">{dev.type}</div>
                <h3 className="text-xl font-serif text-[#EEF2F8] mb-2 group-hover:text-[#D9AE4E] transition-colors duration-300">{dev.title}</h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={11} className="text-[#D9AE4E] flex-shrink-0" />
                  <span className="text-xs text-[#7A9BB5] font-sans">{dev.location}</span>
                </div>
                <p className="text-sm text-[#7A9BB5] font-sans font-light leading-relaxed mb-5">{dev.description}</p>
                <div className="flex items-center gap-5 pb-5 border-b border-[#406788]/25 mb-5">
                  <div className="flex items-center gap-1.5">
                    <Layers size={12} className="text-[#D9AE4E]" />
                    <span className="text-xs text-[#7A9BB5] font-sans">{dev.units}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#D9AE4E]" />
                    <span className="text-xs text-[#7A9BB5] font-sans">{dev.delivery}</span>
                  </div>
                </div>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full border border-[#D9AE4E]/50 text-[#D9AE4E] text-xs tracking-[0.1em] uppercase font-sans font-medium py-2.5 hover:bg-[#D9AE4E] hover:text-black transition-all duration-300">
                  <MessageCircle size={13} />
                  {t.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected && (
        <DetailModal
          title={selected.title}
          location={selected.location}
          images={selected.images}
          fallbackIcon={Building}
          whatsappUrl={WHATSAPP_URL}
          whatsappLabel={t.cta}
          onClose={() => setSelected(null)}
        >
          <p className="text-sm text-[#7A9BB5] font-sans font-light leading-relaxed mb-5">{selected.description}</p>
          <div className="flex items-center gap-5 pb-5 border-b border-[#406788]/25 text-sm">
            <div className="flex items-center gap-1.5 text-[#7A9BB5] font-sans">
              <Layers size={14} className="text-[#D9AE4E]" /> {selected.units}
            </div>
            <div className="flex items-center gap-1.5 text-[#7A9BB5] font-sans">
              <Calendar size={14} className="text-[#D9AE4E]" /> {selected.delivery}
            </div>
          </div>
        </DetailModal>
      )}
    </section>
  );
}
