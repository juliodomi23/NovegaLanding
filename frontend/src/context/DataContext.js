import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const DEFAULT_ADVISORS = [
  { id: 1, name: 'Asesor Inmobiliario Senior', role: 'Especialista en Bienes Raíces', photo: '', certs: [{ name: 'Certificado AMPI', image: '' }, { name: 'Valuador Certificado', image: '' }, { name: 'Crédito Hipotecario', image: '' }] },
  { id: 2, name: 'Abogado Fiscalista', role: 'Asesor Legal Inmobiliario', photo: '', certs: [{ name: 'Cédula Profesional', image: '' }, { name: 'Derecho Fiscal', image: '' }, { name: 'Derecho Inmobiliario', image: '' }] },
  { id: 3, name: 'Gestor de Desarrollos', role: 'Especialista en Proyectos', photo: '', certs: [{ name: 'Certificado PMI', image: '' }, { name: 'Análisis de Mercado', image: '' }, { name: 'Valuación Comercial', image: '' }] },
  { id: 4, name: 'Agente Comercial', role: 'Comercialización Integral', photo: '', certs: [{ name: 'Negociación Avanzada', image: '' }, { name: 'Marketing Inmobiliario', image: '' }, { name: 'CRM Especializado', image: '' }] },
];

export const DEFAULT_PROPERTIES = [
  { id: 1, category: 'venta', type: 'Residencial', title: 'Casa Residencial Premium', location: 'Fracc. Terán, Tuxtla Gutiérrez', price: '$4,500,000', currency: 'MXN', beds: 4, baths: 3, sqm: 320, badge: 'DESTACADO', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, category: 'renta', type: 'Departamento', title: 'Departamento Ejecutivo', location: 'Zona Centro, Tuxtla Gutiérrez', price: '$12,000', currency: 'MXN/mes', beds: 2, baths: 2, sqm: 95, badge: 'EN RENTA', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, category: 'venta', type: 'Comercial', title: 'Local Comercial Estratégico', location: 'Blvd. Belisario Domínguez', price: '$850,000', currency: 'MXN', beds: null, baths: null, sqm: 120, badge: 'EN VENTA', image: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export const DEFAULT_DEVELOPMENTS = [
  { id: 1, title: 'Residencial Las Cumbres', location: 'Berriozábal, Chiapas', status: 'EN PREVENTA', statusColor: 'gold', description: 'Conjunto residencial de 40 unidades con amenidades de primer nivel, áreas verdes y seguridad 24/7.', units: '40 Unidades', delivery: 'Q4 2026', type: 'Residencial', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, title: 'Plaza Comercial El Jobo', location: 'El Jobo, Tuxtla Gutiérrez', status: 'EN CONSTRUCCIÓN', statusColor: 'blue', description: 'Desarrollo comercial con 15 locales estratégicamente ubicados en una de las zonas de mayor crecimiento.', units: '15 Locales', delivery: 'Q2 2027', type: 'Comercial', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, title: 'Villas Copoya', location: 'Copoya, Chiapas', status: 'PRÓXIMAMENTE', statusColor: 'muted', description: 'Exclusivo fraccionamiento horizontal con 25 villas de lujo en el corazón de Copoya.', units: '25 Villas', delivery: '2027', type: 'Residencial Premium', image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const DEFAULT_DATA = {
  advisors: DEFAULT_ADVISORS,
  properties: DEFAULT_PROPERTIES,
  developments: DEFAULT_DEVELOPMENTS,
};

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/cms`)
      .then(({ data: res }) => {
        setData({
          advisors: res.advisors?.length ? res.advisors : DEFAULT_ADVISORS,
          properties: res.properties?.length ? res.properties : DEFAULT_PROPERTIES,
          developments: res.developments?.length ? res.developments : DEFAULT_DEVELOPMENTS,
        });
      })
      .catch(() => {}); // sin conexión al backend: se queda con los valores por defecto
  }, []);

  const save = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    axios.put(`${BACKEND_URL}/api/cms/${key}`, value);
  };

  return (
    <DataContext.Provider value={{ data, save }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
