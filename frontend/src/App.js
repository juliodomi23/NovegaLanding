import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Properties from '@/components/Properties';
import JobBoard from '@/components/JobBoard';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="App bg-[#0A0A0A] min-h-screen">
          <Header />
          <main>
            <Hero />
            <About />
            <Services />
            <Properties />
            <JobBoard />
            <Contact />
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F5F5F0',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
            },
          }}
        />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
