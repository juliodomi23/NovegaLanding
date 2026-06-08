# PRD - Grupo Novega Bienes Raíces Landing Page

## Original Problem Statement
Landing page de lanzamiento para GRUPO NOVEGA BIENES RAICES S.A DE C.V. Empresa inmobiliaria emergente fundada en abril 2026. Bilingüe (ES/EN). Slogan: "PATRIMONIO QUE INSPIRA FUTURO". Diseño luxury dark con acentos dorados. Copywriting persuasivo en ambos idiomas.

## Architecture
- **Frontend**: React + Framer Motion + Tailwind CSS (dark luxury theme)
- **Backend**: FastAPI + MongoDB
- **Design System**: Dark (#0A0A0A bg), Gold (#D4AF37 accent), Cormorant Garamond + Outfit fonts

## User Personas
1. Compradores/vendedores de inmuebles en Chiapas (mediano-alto poder adquisitivo)
2. Inversores interesados en bienes raíces en México
3. Candidatos a Agente de Ventas Inmobiliarias

## Core Requirements (Static)
- Bilingüe ES/EN con toggle en header
- Diseño luxury dark con acentos dorados (#D4AF37)
- CTAs hacia WhatsApp en cada sección
- Formulario de contacto funcional
- Bolsa de trabajo para Agente de Ventas

## What's Been Implemented (April 2026)

### Frontend Components
- **Header** - Glassmorphism, logo NOVEGA, nav 6 links, toggle ES/EN, WhatsApp CTA
- **Hero** - Full viewport, hero image, título serif, stats (5 socios, 5+ años, 100% legal)
- **About** - Asimétrico, imagen equipo, misión, 6 valores
- **Services** - 3 cards bento: Intermediación, Asesoría, Gestión Patrimonial con precios
- **Properties** - 3 tarjetas con imágenes, precios, specs (m², hab, baños)
- **JobBoard** - Posición Agente de Ventas, requisitos, beneficios, apply via WhatsApp/email
- **Contact** - Formulario (name, email, phone, message) + info dirección + WhatsApp
- **Footer** - 4 columnas, 4 redes sociales, links nav, servicios, contacto

### Backend APIs
- `GET /api/` - Health check
- `POST /api/contact` - Guarda mensajes de contacto en MongoDB
- `GET /api/contact` - Lista mensajes (admin)

### Bilingual Content
- `src/constants/translations.js` - Todas las traducciones ES + EN
- `src/context/LanguageContext.js` - Estado global del idioma

## Contact/Brand Info (REAL DATA - Updated June 7, 2026)
- WhatsApp: +52 961 462 5879 (número real actualizado)
- Email: novegabienesraices@gmail.com (correo real)
- Google Maps: https://maps.app.goo.gl/WAaLFeELQFsyt9gx6
- Logo: Logo real integrado (casa azul marino + "NovEgA")

## Social Media (Active)
- Facebook: https://www.facebook.com/NovegaBienesRaices
- Instagram: https://www.instagram.com/novegabienesraices/
- TikTok: https://www.tiktok.com/@novegabienesraices
- YouTube: https://www.youtube.com/@NOVEGABIENESRAICES

## Prioritized Backlog

### P0 - Pre-Launch Critical
- [ ] Actualizar número de WhatsApp real en todos los componentes
- [ ] Actualizar correos reales (contacto y RRHH)
- [ ] Añadir logo real (actualmente logo "N" en dorado)

### P1 - Post-Launch Enhancements
- [ ] Formulario de captura de propiedades para propietarios
- [ ] Galería de propiedades real con CMS o admin panel
- [ ] Integración con email (Resend/SendGrid) para notificaciones del formulario
- [ ] WhatsApp Business API para respuestas automáticas
- [ ] SEO: meta tags, Open Graph, sitemap.xml
- [ ] Google Analytics / pixel Facebook

### P2 - Future Features
- [ ] Blog inmobiliario (actualmente no requerido)
- [ ] Calculadora de hipoteca
- [ ] Panel admin para gestionar propiedades
- [ ] CRM básico para leads del formulario
- [ ] Chat en vivo

## Domain Suggestions
1. `gruponovega.com.mx` (recomendado - nombre legal)
2. `novegabienesraices.com.mx` 
3. `gruponovega.com`

## Tech Stack Recommendation
- **Hosting**: Vercel (frontend) + Railway (backend) para producción
- **Dominio**: Namecheap o GoDaddy para .com.mx (~$300 MXN/año)
