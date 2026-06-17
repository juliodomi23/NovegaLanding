import { useState } from 'react';
import axios from 'axios';
import { Upload, Loader2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const inp = 'w-full bg-[#0A1628] border border-[#406788]/40 text-[#EEF2F8] placeholder-[#406788]/60 text-sm px-3 py-2.5 focus:outline-none focus:border-[#D9AE4E]/60 transition-colors';

export default function ImageField({ value, onChange, aspect = 'aspect-square w-16' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axios.post(`${BACKEND_URL}/api/upload`, formData);
      onChange(`${BACKEND_URL}${data.url}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className={inp} value={value} onChange={e => onChange(e.target.value)} placeholder="https://... o sube un archivo" />
        <label className={`flex items-center gap-1.5 px-3 border border-[#406788]/40 text-[#7A9BB5] hover:text-white hover:border-[#D9AE4E]/60 text-xs font-sans flex-shrink-0 transition-colors ${uploading ? 'opacity-60' : 'cursor-pointer'}`}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-[11px] text-red-400 font-sans">{error}</p>}
      {value && (
        <div className={`${aspect} overflow-hidden border border-[#406788]/30`}>
          <img src={value} alt="preview" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
        </div>
      )}
    </div>
  );
}
