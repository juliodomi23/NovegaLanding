import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Properties from '@/components/Properties';
import PropertiesMap from '@/components/PropertiesMap';
import JobBoard from '@/components/JobBoard';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
        <div className="App bg-[#0A1628] min-h-screen">
          <Header />
          <main>
            <Hero />
            <About />
            <Services />
            <Properties />
            <PropertiesMap />
            <JobBoard />
            <Contact />
          </main>
          <Footer />
        </div>
        </MotionConfig>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#132436',
              color: '#EEF2F8',
              border: '1px solid rgba(217, 174, 78, 0.3)',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
            },
          }}
        />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
