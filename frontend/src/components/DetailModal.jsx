import { X, MapPin, MessageCircle } from 'lucide-react';

export default function DetailModal({ title, location, image, fallbackIcon: FallbackIcon, children, whatsappUrl, whatsappLabel, onClose }) {
  const mapSrc = location ? `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4 pb-8 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="bg-[#0D1E30] border border-[#406788]/40 w-full max-w-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video overflow-hidden bg-[#406788]/15">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            FallbackIcon && (
              <div className="w-full h-full flex items-center justify-center">
                <FallbackIcon size={48} className="text-[#406788]" />
              </div>
            )
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#0A1628]/80 text-white p-2 hover:text-[#D9AE4E] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-serif text-[#EEF2F8] mb-2">{title}</h3>
          {location && (
            <div className="flex items-center gap-1.5 mb-5 text-[#7A9BB5] font-sans text-sm">
              <MapPin size={13} className="text-[#D9AE4E] flex-shrink-0" /> {location}
            </div>
          )}
          {children}
          {mapSrc && (
            <div className="mt-6 aspect-video border border-[#406788]/25 overflow-hidden">
              <iframe title="Ubicación" src={mapSrc} className="w-full h-full" style={{ border: 0 }} loading="lazy" />
            </div>
          )}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full border border-[#D9AE4E]/50 text-[#D9AE4E] text-xs tracking-[0.1em] uppercase font-sans font-medium py-3 hover:bg-[#D9AE4E] hover:text-black transition-all duration-300"
            >
              <MessageCircle size={13} /> {whatsappLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
