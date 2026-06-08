import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n.';
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_novega-landing/artifacts/m2prel8t_logo%20final%20de%20novega%20-%20Novega%20Bienes%20Ra%C3%ADces.png';

const SOCIALS = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/NovegaBienesRaices?locale=es_LA',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/novegabienesraices/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@novegabienesraices',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.44a8.16 8.16 0 0 0 4.78 1.52V6.51a4.85 4.85 0 0 1-1.01-.18z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@NOVEGABIENESRAICES',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10">
      {/* Top Bar - Gold CTA */}
      <div className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-serif text-[#F5F5F0] italic">
            "{t.tagline}"
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-cta"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs tracking-[0.12em] uppercase font-sans font-semibold px-6 py-2.5 hover:bg-[#C5A059] transition-colors duration-300 flex-shrink-0"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={LOGO_URL}
                alt="Novega Bienes Raíces"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#A1A1AA] font-sans font-light leading-relaxed mb-5">
              {t.description}
            </p>
            {/* Social Icons */}
            <div>
              <div className="text-[9px] tracking-[0.22em] uppercase text-[#D4AF37] font-sans font-medium mb-3">
                {t.socialTitle}
              </div>
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`footer-social-${s.id}`}
                    aria-label={s.label}
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[9px] tracking-[0.22em] uppercase text-[#D4AF37] font-sans font-medium mb-5">
              {t.navTitle}
            </div>
            <ul className="space-y-3">
              {t.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-testid={`footer-nav-${item.href.replace('#', '')}`}
                    onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                    className="text-xs text-[#A1A1AA] hover:text-[#D4AF37] transition-colors duration-300 font-sans"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-[9px] tracking-[0.22em] uppercase text-[#D4AF37] font-sans font-medium mb-5">
              {t.servicesTitle}
            </div>
            <ul className="space-y-3">
              {t.servicesList.map((s, i) => (
                <li key={i}>
                  <span className="text-xs text-[#A1A1AA] font-sans">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <div className="text-[9px] tracking-[0.22em] uppercase text-[#D4AF37] font-sans font-medium mb-5">
              CONTACTO
            </div>
            <div className="space-y-3">
              <p className="text-xs text-[#A1A1AA] font-sans leading-relaxed">
                AV. CENTRAL PTE. 847 C.7ª PTE. Y C.8ª PTE.<br />
                Tuxtla Gutiérrez, Chiapas, C.P. 29000
              </p>
              <p className="text-xs text-[#A1A1AA] font-sans">novegabienesraices@gmail.com</p>
              <p className="text-xs text-[#A1A1AA] font-sans">+52 961 462 5879</p>
              <a
                href="https://maps.app.goo.gl/WAaLFeELQFsyt9gx6"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-maps-link"
                className="text-xs text-[#D4AF37] hover:text-[#C5A059] font-sans transition-colors duration-300 underline underline-offset-2"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#A1A1AA]/60 font-sans tracking-[0.08em]">
            {t.legal} · {t.rights}
          </p>
          <p className="text-[10px] text-[#A1A1AA]/40 font-sans">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
