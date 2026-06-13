import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

const WHATSAPP_URL = 'https://wa.me/529614625879?text=Hola%20Grupo%20Novega%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n.';
const LOGO_URL = '/images/logo.png';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.about, href: '#about' },
    { label: t.services, href: '#services' },
    { label: t.properties, href: '#properties' },
    { label: t.jobs, href: '#jobs' },
    { label: t.contact, href: '#contact' },
  ];

  const handleNav = (href) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0A1628]/90 border-b border-[#406788]/25'
          : 'backdrop-blur-sm bg-[#0A1628]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#home"
          data-testid="header-logo"
          onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          className="flex items-center gap-3 group"
        >
          <img
            src={LOGO_URL}
            alt="Novega Bienes Raíces"
            className="h-11 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.href.replace('#', '')}`}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="text-[#7A9BB5] hover:text-[#D9AE4E] transition-colors duration-300 text-xs tracking-[0.12em] uppercase font-sans font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <button
            data-testid="lang-toggle-btn"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="cursor-pointer text-[#7A9BB5] hover:text-[#D9AE4E] transition-colors duration-300 text-xs tracking-[0.15em] uppercase font-sans font-medium border border-[#406788]/25 hover:border-[#D9AE4E]/50 px-3 py-1.5"
          >
            {t.langLabel}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="header-whatsapp-cta"
            className="hidden md:flex bg-[#D9AE4E] text-black text-xs tracking-[0.12em] uppercase font-sans font-semibold px-5 py-2.5 hover:bg-[#C49A38] transition-colors duration-300"
          >
            {t.cta}
          </a>
          <button
            data-testid="nav-menu-toggle"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden cursor-pointer text-[#EEF2F8] hover:text-[#D9AE4E] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-[#406788]/25 px-6 py-6 flex flex-col gap-5" data-testid="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`mobile-nav-link-${link.href.replace('#', '')}`}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="text-[#7A9BB5] hover:text-[#D9AE4E] transition-colors text-sm tracking-[0.12em] uppercase font-sans"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-whatsapp-cta"
            className="bg-[#D9AE4E] text-black text-xs tracking-[0.12em] uppercase font-sans font-semibold px-5 py-3 text-center hover:bg-[#C49A38] transition-colors mt-2"
          >
            {t.cta}
          </a>
        </div>
      )}
    </header>
  );
}
