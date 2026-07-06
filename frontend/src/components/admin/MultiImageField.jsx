import { useState } from 'react';
import axios from 'axios';
import { Upload, Loader2, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function MultiImageField({ value = [], onChange, max = 5, aspect = 'aspect-square w-16' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const files = Array.from(e.target.files).slice(0, max - value.length);
    e.target.value = '';
    if (!files.length) return;
    setError('');
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`${BACKEND_URL}/api/upload`, formData);
        urls.push(`${BACKEND_URL}${data.url}`);
      }
      onChange([...value, ...urls]);
    } catch (err) {
      setError(err.response?.data?.detail || 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((url, i) => (
          <div key={i} className={`relative ${aspect} overflow-hidden border border-[#406788]/30`}>
            <img src={url} alt={`foto ${i + 1}`} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-0.5 right-0.5 bg-black/70 text-white p-0.5 hover:bg-red-500/80 cursor-pointer"
            >
              <X size={11} />
            </button>
          </div>
        ))}
        {value.length < max && (
          <label className={`flex flex-col items-center justify-center gap-1 ${aspect} border border-dashed border-[#406788]/40 text-[#7A9BB5] hover:text-white hover:border-[#D9AE4E]/60 transition-colors ${uploading ? 'opacity-60' : 'cursor-pointer'}`}>
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
        )}
      </div>
      <p className="text-[11px] text-[#7A9BB5]/70 font-sans">{value.length}/{max} fotos</p>
      {error && <p className="text-[11px] text-red-400 font-sans">{error}</p>}
    </div>
  );
}
