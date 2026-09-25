import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Utensils, 
  Flame, 
  Wine, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  Radio,
  Cpu
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'reservations' | 'robata' | 'cocktails' | 'booths'>('reservations');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'shinjuku2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAutoFill = () => {
    setPasscode('shinjuku2026');
    setIsAuthenticated(true);
    setError(false);
  };

  const reservations = [
    { id: 'RES-8821', guest: 'Dr. Arisaka Takahashi', tier: 'Cyber Omakase', party: 2, time: '20:30 JST', booth: 'Capsule Alpha-01', status: 'CONFIRMED' },
    { id: 'RES-8822', guest: 'Sloane Sterling', tier: 'Robata VIP Rations', party: 4, time: '21:15 JST', booth: 'Neon Grid-04', status: 'SEATED' },
    { id: 'RES-8823', guest: 'Kenji Vance', tier: 'Liquid Data Tasting', party: 2, time: '22:00 JST', booth: 'Bar Node 03', status: 'CONFIRMED' },
    { id: 'RES-8824', guest: 'Elena Rostova', tier: 'Corporate Syndicate', party: 6, time: '22:45 JST', booth: 'Vault Chamber-09', status: 'PENDING_DEPOSIT' },
  ];

  const robataItems = [
    { id: 'ROB-01', name: 'A5 Wagyu Kushiyaki [Plasma Seared]', category: 'Robata Skewers', price: '¥3,800', status: 'IN_STOCK', temp: '850°C' },
    { id: 'ROB-02', name: 'Carbon-Glazed Unagi Nigiri', category: 'Specialty Nigiri', price: '¥6,200', status: 'LOW_STOCK', temp: 'Flash-Chilled' },
    { id: 'ROB-03', name: 'Glitch-Infused Black Truffle Gyoza', category: 'Synthetics', price: '¥2,400', status: 'IN_STOCK', temp: 'Optimum' },
    { id: 'ROB-04', name: 'Toxin-Free Bio-Gen Tonkotsu Ramen', category: 'Broth Protocols', price: '¥4,800', status: 'IN_STOCK', temp: '94°C' },
  ];

  const cocktails = [
    { id: 'CKT-101', name: 'Void Cocktail (Charcoal Vodka + Nebula Dust)', abv: '18%', price: '¥2,400', level: '92% Full' },
    { id: 'CKT-102', name: 'Iridescent Electric Cyan Gin', abv: '22%', price: '¥1,200', level: '78% Full' },
    { id: 'CKT-103', name: 'Synthesized Glucose Nectar', abv: '0% Non-Alc', price: '¥1,800', level: '96% Full' },
    { id: 'CKT-104', name: 'Junmai Daiginjo 2077 Reserve Carafe', abv: '16%', price: '¥8,500', level: '14 Bottles' },
  ];

  const booths = [
    { id: 'CAP-01', name: 'Capsule Alpha-01', capacity: '2-3 Guests', audio: 'Cyberpunk Ambient Stream 4', status: 'OCCUPIED' },
    { id: 'GRID-04', name: 'Neon Grid-04 (Hologram View)', capacity: '4-6 Guests', audio: 'Synthwave Lo-Fi Sub-bass', status: 'OCCUPIED' },
    { id: 'VAULT-09', name: 'Executive Syndicate Vault', capacity: '8-12 Guests', audio: 'Soundproofed Dark Room', status: 'RESERVED' },
    { id: 'BAR-03', name: 'Robata Bar Node 03', capacity: '2 Guests', audio: 'Charcoal Hearth Binaural', status: 'AVAILABLE' },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#0A0A0B] border-2 border-neon-cyan/40 shadow-[0_0_50px_rgba(0,255,255,0.2)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neon-cyan/30 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan font-bold flex items-center gap-2">
              <Terminal size={14} /> NEO_SHINJUKU_OS // OPERATOR_BACKSTAGE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-neon-pink transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 md:p-12 flex flex-col items-center text-center font-mono">
            <div className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan mb-6 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              <Lock size={28} />
            </div>

            <h3 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">
              AUTHENTICATION_REQUIRED
            </h3>
            <p className="text-white/50 text-xs max-w-md mb-8">
              Authorized operators only. Enter root credentials or click the 1-click bypass passkey below to test the full-stack management node.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 mb-6">
              <div className="relative">
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="ENTER ACCESS KEY"
                  className="w-full bg-black/80 border border-neon-cyan/50 px-4 py-3 text-center text-sm font-mono text-neon-cyan tracking-[0.3em] focus:outline-none focus:border-neon-pink rounded"
                />
              </div>

              {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-xs">
                  <AlertCircle size={14} />
                  <span>INVALID OPERATOR PASSKEY</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full btn-editorial text-base font-semibold min-h-[44px] py-3 font-bold uppercase tracking-widest"
              >
                AUTHORIZE LOGIN
              </button>
            </form>

            <div className="w-full max-w-sm pt-6 border-t border-white/10">
              <button 
                onClick={handleAutoFill}
                className="w-full py-2.5 px-4 bg-neon-cyan/15 hover:bg-neon-cyan/25 border border-neon-cyan/40 text-neon-cyan text-base font-semibold min-h-[44px] font-mono tracking-widest rounded transition-all flex items-center justify-center gap-2 group"
              >
                <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
                <span>[ 1-CLICK DEMO PASSKEY: shinjuku2026 ]</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden font-mono">
            {/* Top Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-black/60 text-xs divide-x divide-white/10">
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Grid Uptime</span>
                <span className="text-neon-cyan font-bold text-base">99.98% OPTIMAL</span>
              </div>
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Tonight's Covers</span>
                <span className="text-neon-pink font-bold text-base">48 / 52 SEATS</span>
              </div>
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Robata Hearth</span>
                <span className="text-white font-bold text-base">850°C ACTIVE</span>
              </div>
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Dispensary Level</span>
                <span className="text-neon-cyan font-bold text-base">94% LIQUID READY</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-black/40 overflow-x-auto text-xs">
              <button 
                onClick={() => setActiveTab('reservations')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'reservations' 
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Calendar size={14} />
                <span>01_RESERVATIONS</span>
              </button>
              <button 
                onClick={() => setActiveTab('robata')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'robata' 
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Flame size={14} />
                <span>02_ROBATA_HEARTH</span>
              </button>
              <button 
                onClick={() => setActiveTab('cocktails')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'cocktails' 
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Wine size={14} />
                <span>03_COCKTAIL_DISPENSARY</span>
              </button>
              <button 
                onClick={() => setActiveTab('booths')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'booths' 
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Cpu size={14} />
                <span>04_CAPSULE_BOOTHS</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider">
                      Tonight's Guest Roster // Live Supabase Sync
                    </span>
                    <span className="text-neon-cyan text-xs font-semibold tracking-wider flex items-center gap-1.5">
                      <Radio size={12} className="animate-pulse" /> LIVE STREAMING
                    </span>
                  </div>

                  <div className="overflow-x-auto border border-white/10 rounded">
                    <table className="w-full text-left">
                      <thead className="bg-white/5 text-xs font-semibold tracking-wider text-white/40 uppercase tracking-wider">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Guest Name</th>
                          <th className="p-3">Protocol Tier</th>
                          <th className="p-3">Party</th>
                          <th className="p-3">Seating Time</th>
                          <th className="p-3">Booth / Node</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {reservations.map(res => (
                          <tr key={res.id} className="hover:bg-white/5">
                            <td className="p-3 font-mono text-neon-cyan">{res.id}</td>
                            <td className="p-3 font-bold text-white">{res.guest}</td>
                            <td className="p-3 text-white/70">{res.tier}</td>
                            <td className="p-3 text-white/50">{res.party}p</td>
                            <td className="p-3 text-white/80">{res.time}</td>
                            <td className="p-3 text-white/60">{res.booth}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                res.status === 'CONFIRMED' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40' :
                                res.status === 'SEATED' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                                'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                              }`}>
                                {res.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'robata' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider">
                      Hearth Temperature & Robata Rations
                    </span>
                    <span className="text-neon-pink text-xs font-semibold tracking-wider">850°C KISHU BINCHOTAN</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {robataItems.map(item => (
                      <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-neon-cyan text-xs font-semibold tracking-wider font-mono">{item.id} // {item.category}</span>
                            <h4 className="text-sm font-bold text-white uppercase">{item.name}</h4>
                          </div>
                          <span className="text-neon-pink font-bold text-sm">{item.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-white/50 border-t border-white/10 pt-2 mt-2">
                          <span>Target: {item.temp}</span>
                          <span className={`font-bold ${item.status === 'IN_STOCK' ? 'text-neon-cyan' : 'text-amber-400'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cocktails' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider">
                      Automated Cocktail Dispensary & Sake Cellar
                    </span>
                    <span className="text-neon-cyan text-xs font-semibold tracking-wider">RESERVOIR PRESSURE: NORMAL</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {cocktails.map(ckt => (
                      <div key={ckt.id} className="p-4 bg-white/5 border border-white/10 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-neon-pink text-xs font-semibold tracking-wider">{ckt.id}</span>
                            <h4 className="text-sm font-bold text-white">{ckt.name}</h4>
                          </div>
                          <span className="text-neon-cyan font-bold">{ckt.price}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold tracking-wider text-white/50 border-t border-white/10 pt-2 mt-2">
                          <span>Proof: {ckt.abv}</span>
                          <span className="text-white/80">{ckt.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'booths' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider">
                      Capsule Seating & Spatial Audio Grid
                    </span>
                    <span className="text-green-400 text-xs font-semibold tracking-wider">4 / 4 NODES ONLINE</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {booths.map(booth => (
                      <div key={booth.id} className="p-4 bg-white/5 border border-white/10 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-white">{booth.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            booth.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                            booth.status === 'RESERVED' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                            'bg-neon-pink/20 text-neon-pink border border-neon-pink/40'
                          }`}>
                            {booth.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold tracking-wider text-white/50 mb-2">Capacity: {booth.capacity}</p>
                        <div className="text-[9px] text-neon-cyan/70 border-t border-white/10 pt-2">
                          Audio Channel: {booth.audio}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/80 flex items-center justify-between text-xs font-semibold tracking-wider text-white/40">
              <span className="flex items-center gap-1.5 text-neon-cyan">
                <Database size={12} /> SUPABASE POSTGRESQL CONNECTED (RLS SECURE)
              </span>
              <span>AUTHENTICATED OPERATOR SESSION</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
