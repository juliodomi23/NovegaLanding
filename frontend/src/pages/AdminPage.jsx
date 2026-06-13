import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Save, LogOut, Award, Home, Building, Eye } from 'lucide-react';
import { useData, DEFAULT_ADVISORS, DEFAULT_PROPERTIES, DEFAULT_DEVELOPMENTS } from '@/context/DataContext';

const ADMIN_PASSWORD = 'Novega2026';

// ── Estilos reutilizables ──────────────────────────────────────────────────
const inp = 'w-full bg-[#0A1628] border border-[#406788]/40 text-[#EEF2F8] placeholder-[#406788]/60 text-sm px-3 py-2.5 focus:outline-none focus:border-[#D9AE4E]/60 transition-colors';
const lbl = 'block text-[10px] tracking-[0.15em] uppercase text-[#7A9BB5] mb-1.5 font-sans';
const btn = 'inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase font-sans font-medium px-4 py-2 transition-all duration-200';

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className={lbl}>{label}</label>
      {children}
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4 pb-12 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0D1E30] border border-[#406788]/40 w-full max-w-xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#406788]/30">
          <h3 className="font-serif text-[#EEF2F8]">{title}</h3>
          <button onClick={onClose} className="text-[#7A9BB5] hover:text-white transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#406788]/30">
          <button onClick={onClose} className={`${btn} border border-[#406788]/40 text-[#7A9BB5] hover:text-white hover:border-[#406788]/70 cursor-pointer`}>
            Cancelar
          </button>
          <button onClick={onSave} className={`${btn} bg-[#D9AE4E] text-black hover:bg-[#C49A38] cursor-pointer`}>
            <Save size={13} /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── EMPTY FORMS ────────────────────────────────────────────────────────────
const emptyAdvisor = () => ({ id: Date.now(), name: '', role: '', certs: [] });
const emptyProperty = () => ({ id: Date.now(), category: 'venta', type: '', title: '', location: '', price: '', currency: 'MXN', beds: '', baths: '', sqm: '', badge: '', image: '' });
const emptyDevelopment = () => ({ id: Date.now(), title: '', location: '', status: '', statusColor: 'gold', description: '', units: '', delivery: '', type: '', image: '' });

// ── TAB: ASESORES ──────────────────────────────────────────────────────────
function AdvisorsTab() {
  const { data, save } = useData();
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', item }
  const [draft, setDraft] = useState(null);
  const [certsText, setCertsText] = useState('');

  const openAdd = () => {
    const item = emptyAdvisor();
    setDraft(item);
    setCertsText('');
    setModal({ mode: 'add', item });
  };

  const openEdit = (item) => {
    setDraft({ ...item });
    setCertsText(item.certs.join('\n'));
    setModal({ mode: 'edit', item });
  };

  const saveModal = () => {
    const final = { ...draft, certs: certsText.split('\n').map(s => s.trim()).filter(Boolean) };
    if (!final.name) return;
    const list = modal.mode === 'add'
      ? [...data.advisors, final]
      : data.advisors.map(a => a.id === final.id ? final : a);
    save('advisors', list);
    setModal(null);
  };

  const del = (id) => {
    if (window.confirm('¿Eliminar este asesor?')) save('advisors', data.advisors.filter(a => a.id !== id));
  };

  const reset = () => {
    if (window.confirm('¿Restaurar asesores por defecto?')) save('advisors', DEFAULT_ADVISORS);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-[#7A9BB5] font-sans">{data.advisors.length} asesores</span>
        <div className="flex gap-2">
          <button onClick={reset} className={`${btn} border border-[#406788]/40 text-[#7A9BB5] hover:text-white cursor-pointer`}>Restaurar</button>
          <button onClick={openAdd} className={`${btn} bg-[#D9AE4E] text-black hover:bg-[#C49A38] cursor-pointer`}><Plus size={14} /> Agregar</button>
        </div>
      </div>

      <div className="space-y-3">
        {data.advisors.map(a => (
          <div key={a.id} className="flex items-center justify-between bg-[#406788]/8 border border-[#406788]/20 px-5 py-4 gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-9 h-9 bg-[#D9AE4E]/10 border border-[#D9AE4E]/25 flex items-center justify-center flex-shrink-0">
                <Award size={16} className="text-[#D9AE4E]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-sans text-[#EEF2F8] truncate">{a.name}</div>
                <div className="text-xs text-[#7A9BB5] font-sans">{a.role}</div>
                <div className="text-[11px] text-[#D9AE4E]/70 font-sans mt-0.5">{a.certs.join(' · ')}</div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(a)} className="p-1.5 text-[#7A9BB5] hover:text-[#D9AE4E] transition-colors cursor-pointer"><Edit2 size={14} /></button>
              <button onClick={() => del(a.id)} className="p-1.5 text-[#7A9BB5] hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Nuevo asesor' : 'Editar asesor'} onClose={() => setModal(null)} onSave={saveModal}>
          <Field label="Nombre">
            <input className={inp} value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))} placeholder="Nombre del asesor" />
          </Field>
          <Field label="Cargo / Especialidad">
            <input className={inp} value={draft.role} onChange={e => setDraft(p => ({ ...p, role: e.target.value }))} placeholder="Especialista en Bienes Raíces" />
          </Field>
          <Field label="Certificaciones (una por línea)">
            <textarea
              className={`${inp} resize-none`}
              rows={4}
              value={certsText}
              onChange={e => setCertsText(e.target.value)}
              placeholder={'Certificado AMPI\nValuador Certificado\nDerecho Fiscal'}
            />
          </Field>
        </Modal>
      )}
    </div>
  );
}

// ── TAB: PROPIEDADES ───────────────────────────────────────────────────────
function PropertiesTab() {
  const { data, save } = useData();
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(null);

  const openAdd = () => { setDraft(emptyProperty()); setModal({ mode: 'add' }); };
  const openEdit = (item) => { setDraft({ ...item, beds: item.beds ?? '', baths: item.baths ?? '' }); setModal({ mode: 'edit', item }); };

  const saveModal = () => {
    if (!draft.title || !draft.location) return;
    const final = {
      ...draft,
      beds: draft.beds === '' ? null : Number(draft.beds),
      baths: draft.baths === '' ? null : Number(draft.baths),
      sqm: Number(draft.sqm) || 0,
    };
    const list = modal.mode === 'add'
      ? [...data.properties, final]
      : data.properties.map(p => p.id === final.id ? final : p);
    save('properties', list);
    setModal(null);
  };

  const del = (id) => {
    if (window.confirm('¿Eliminar esta propiedad?')) save('properties', data.properties.filter(p => p.id !== id));
  };

  const reset = () => {
    if (window.confirm('¿Restaurar propiedades por defecto?')) save('properties', DEFAULT_PROPERTIES);
  };

  const set = (k, v) => setDraft(p => ({ ...p, [k]: v }));

  const BADGE_COLOR = { venta: 'bg-[#D9AE4E] text-black', renta: 'bg-[#406788] text-white' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-[#7A9BB5] font-sans">{data.properties.length} propiedades</span>
        <div className="flex gap-2">
          <button onClick={reset} className={`${btn} border border-[#406788]/40 text-[#7A9BB5] hover:text-white cursor-pointer`}>Restaurar</button>
          <button onClick={openAdd} className={`${btn} bg-[#D9AE4E] text-black hover:bg-[#C49A38] cursor-pointer`}><Plus size={14} /> Agregar</button>
        </div>
      </div>

      <div className="space-y-3">
        {data.properties.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-[#406788]/8 border border-[#406788]/20 gap-4 overflow-hidden">
            <div className="w-16 h-14 flex-shrink-0">
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#406788]/20 flex items-center justify-center"><Home size={16} className="text-[#406788]" /></div>}
            </div>
            <div className="flex-1 min-w-0 py-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[9px] px-2 py-0.5 font-sans font-semibold uppercase tracking-wide ${BADGE_COLOR[p.category]}`}>{p.category}</span>
                <span className="text-sm font-sans text-[#EEF2F8] truncate">{p.title}</span>
              </div>
              <div className="text-xs text-[#7A9BB5] font-sans">{p.location} · {p.price} {p.currency}</div>
            </div>
            <div className="flex gap-2 flex-shrink-0 pr-4">
              <button onClick={() => openEdit(p)} className="p-1.5 text-[#7A9BB5] hover:text-[#D9AE4E] transition-colors cursor-pointer"><Edit2 size={14} /></button>
              <button onClick={() => del(p.id)} className="p-1.5 text-[#7A9BB5] hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Nueva propiedad' : 'Editar propiedad'} onClose={() => setModal(null)} onSave={saveModal}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Categoría">
              <select className={inp} value={draft.category} onChange={e => set('category', e.target.value)}>
                <option value="venta">Venta</option>
                <option value="renta">Renta</option>
              </select>
            </Field>
            <Field label="Tipo">
              <input className={inp} value={draft.type} onChange={e => set('type', e.target.value)} placeholder="Residencial" />
            </Field>
          </div>
          <Field label="Título">
            <input className={inp} value={draft.title} onChange={e => set('title', e.target.value)} placeholder="Casa Residencial Premium" />
          </Field>
          <Field label="Ubicación">
            <input className={inp} value={draft.location} onChange={e => set('location', e.target.value)} placeholder="Fracc. Terán, Tuxtla Gutiérrez" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio">
              <input className={inp} value={draft.price} onChange={e => set('price', e.target.value)} placeholder="$4,500,000" />
            </Field>
            <Field label="Moneda / Unidad">
              <input className={inp} value={draft.currency} onChange={e => set('currency', e.target.value)} placeholder="MXN o MXN/mes" />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Habitaciones">
              <input className={inp} type="number" value={draft.beds} onChange={e => set('beds', e.target.value)} placeholder="4 (vacío = N/A)" />
            </Field>
            <Field label="Baños">
              <input className={inp} type="number" value={draft.baths} onChange={e => set('baths', e.target.value)} placeholder="3" />
            </Field>
            <Field label="m²">
              <input className={inp} type="number" value={draft.sqm} onChange={e => set('sqm', e.target.value)} placeholder="320" />
            </Field>
          </div>
          <Field label="Etiqueta (badge)">
            <input className={inp} value={draft.badge} onChange={e => set('badge', e.target.value)} placeholder="DESTACADO" />
          </Field>
          <Field label="URL de imagen">
            <input className={inp} value={draft.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
          </Field>
          {draft.image && (
            <div className="aspect-video overflow-hidden border border-[#406788]/30">
              <img src={draft.image} alt="preview" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ── TAB: DESARROLLOS ───────────────────────────────────────────────────────
function DevelopmentsTab() {
  const { data, save } = useData();
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(null);

  const openAdd = () => { setDraft(emptyDevelopment()); setModal({ mode: 'add' }); };
  const openEdit = (item) => { setDraft({ ...item }); setModal({ mode: 'edit', item }); };

  const saveModal = () => {
    if (!draft.title || !draft.location) return;
    const list = modal.mode === 'add'
      ? [...data.developments, draft]
      : data.developments.map(d => d.id === draft.id ? draft : d);
    save('developments', list);
    setModal(null);
  };

  const del = (id) => {
    if (window.confirm('¿Eliminar este desarrollo?')) save('developments', data.developments.filter(d => d.id !== id));
  };

  const reset = () => {
    if (window.confirm('¿Restaurar desarrollos por defecto?')) save('developments', DEFAULT_DEVELOPMENTS);
  };

  const set = (k, v) => setDraft(p => ({ ...p, [k]: v }));

  const STATUS_COLOR_LABEL = { gold: 'Dorado (preventa)', blue: 'Azul (construcción)', muted: 'Gris (próximamente)' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-[#7A9BB5] font-sans">{data.developments.length} desarrollos</span>
        <div className="flex gap-2">
          <button onClick={reset} className={`${btn} border border-[#406788]/40 text-[#7A9BB5] hover:text-white cursor-pointer`}>Restaurar</button>
          <button onClick={openAdd} className={`${btn} bg-[#D9AE4E] text-black hover:bg-[#C49A38] cursor-pointer`}><Plus size={14} /> Agregar</button>
        </div>
      </div>

      <div className="space-y-3">
        {data.developments.map(d => (
          <div key={d.id} className="flex items-center justify-between bg-[#406788]/8 border border-[#406788]/20 gap-4 overflow-hidden">
            <div className="w-16 h-14 flex-shrink-0">
              {d.image ? <img src={d.image} alt={d.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#406788]/20 flex items-center justify-center"><Building size={16} className="text-[#406788]" /></div>}
            </div>
            <div className="flex-1 min-w-0 py-2">
              <div className="text-sm font-sans text-[#EEF2F8] truncate">{d.title}</div>
              <div className="text-xs text-[#7A9BB5] font-sans">{d.location} · {d.status}</div>
            </div>
            <div className="flex gap-2 flex-shrink-0 pr-4">
              <button onClick={() => openEdit(d)} className="p-1.5 text-[#7A9BB5] hover:text-[#D9AE4E] transition-colors cursor-pointer"><Edit2 size={14} /></button>
              <button onClick={() => del(d.id)} className="p-1.5 text-[#7A9BB5] hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Nuevo desarrollo' : 'Editar desarrollo'} onClose={() => setModal(null)} onSave={saveModal}>
          <Field label="Nombre del proyecto">
            <input className={inp} value={draft.title} onChange={e => set('title', e.target.value)} placeholder="Residencial Las Cumbres" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ubicación">
              <input className={inp} value={draft.location} onChange={e => set('location', e.target.value)} placeholder="Berriozábal, Chiapas" />
            </Field>
            <Field label="Tipo">
              <input className={inp} value={draft.type} onChange={e => set('type', e.target.value)} placeholder="Residencial" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Estado (texto)">
              <input className={inp} value={draft.status} onChange={e => set('status', e.target.value)} placeholder="EN PREVENTA" />
            </Field>
            <Field label="Color del estado">
              <select className={inp} value={draft.statusColor} onChange={e => set('statusColor', e.target.value)}>
                {Object.entries(STATUS_COLOR_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Descripción">
            <textarea className={`${inp} resize-none`} rows={3} value={draft.description} onChange={e => set('description', e.target.value)} placeholder="Descripción del proyecto..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Unidades">
              <input className={inp} value={draft.units} onChange={e => set('units', e.target.value)} placeholder="40 Unidades" />
            </Field>
            <Field label="Entrega">
              <input className={inp} value={draft.delivery} onChange={e => set('delivery', e.target.value)} placeholder="Q4 2026" />
            </Field>
          </div>
          <Field label="URL de imagen">
            <input className={inp} value={draft.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
          </Field>
          {draft.image && (
            <div className="aspect-video overflow-hidden border border-[#406788]/30">
              <img src={draft.image} alt="preview" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ── MAIN ADMIN PAGE ────────────────────────────────────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('novega_admin') === '1');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('asesores');

  const login = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('novega_admin', '1');
      setAuthed(true);
    } else {
      setError(true);
      setPw('');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('novega_admin');
    setAuthed(false);
  };

  const TABS = [
    { key: 'asesores', label: 'Asesores', icon: Award },
    { key: 'propiedades', label: 'Propiedades', icon: Home },
    { key: 'desarrollos', label: 'Desarrollos', icon: Building },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="text-[#D9AE4E] text-xs tracking-[0.3em] uppercase font-sans mb-2">Panel de Administración</div>
            <h1 className="text-2xl font-serif text-[#EEF2F8]">Grupo Novega</h1>
          </div>
          <form onSubmit={login} className="bg-[#132436] border border-[#406788]/30 p-8 space-y-5">
            <div>
              <label className={lbl}>Contraseña</label>
              <input
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setError(false); }}
                className={`${inp} ${error ? 'border-red-500/60' : ''}`}
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs font-sans mt-1.5">Contraseña incorrecta</p>}
            </div>
            <button type="submit" className={`${btn} bg-[#D9AE4E] text-black hover:bg-[#C49A38] w-full justify-center cursor-pointer py-3`}>
              Ingresar
            </button>
          </form>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-[#7A9BB5] hover:text-[#D9AE4E] text-xs font-sans tracking-wide transition-colors flex items-center gap-1.5 mx-auto cursor-pointer"
          >
            ← Volver al sitio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Admin Header */}
      <header className="bg-[#0D1E30] border-b border-[#406788]/25 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[#D9AE4E] text-xs tracking-[0.25em] uppercase font-sans font-medium">Panel Admin</div>
          <span className="text-[#406788]/60 text-xs">·</span>
          <span className="text-[#7A9BB5] text-xs font-sans">Grupo Novega Bienes Raíces</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className={`${btn} border border-[#406788]/40 text-[#7A9BB5] hover:text-[#D9AE4E] hover:border-[#D9AE4E]/40 cursor-pointer`}
          >
            <Eye size={13} /> Ver sitio
          </button>
          <button onClick={logout} className={`${btn} border border-[#406788]/40 text-[#7A9BB5] hover:text-red-400 hover:border-red-500/40 cursor-pointer`}>
            <LogOut size={13} /> Salir
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Tab Nav */}
        <div className="flex gap-1 mb-8 border-b border-[#406788]/25">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-3 text-xs tracking-[0.12em] uppercase font-sans font-medium border-b-2 -mb-px transition-all duration-200 cursor-pointer ${
                tab === key
                  ? 'border-[#D9AE4E] text-[#D9AE4E]'
                  : 'border-transparent text-[#7A9BB5] hover:text-[#EEF2F8]'
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {tab === 'asesores' && <AdvisorsTab />}
          {tab === 'propiedades' && <PropertiesTab />}
          {tab === 'desarrollos' && <DevelopmentsTab />}
        </div>
      </div>
    </div>
  );
}
