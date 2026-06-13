import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Trayectoria from '@/components/Trayectoria';
import Services from '@/components/Services';
import Properties from '@/components/Properties';
import Desarrollos from '@/components/Desarrollos';
import PropertiesMap from '@/components/PropertiesMap';
import Marketing from '@/components/Marketing';
import JobBoard from '@/components/JobBoard';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminPage from '@/pages/AdminPage';

function MainSite() {
  return (
    <div className="App bg-[#0A1628] min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Trayectoria />
        <Services />
        <Properties />
        <Desarrollos />
        <PropertiesMap />
        <Marketing />
        <JobBoard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <BrowserRouter>
          <MotionConfig reducedMotion="user">
            <Routes>
              <Route path="/" element={<MainSite />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
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
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
