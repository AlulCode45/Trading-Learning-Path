import React, { useState } from 'react';
import { X, Shield, BookOpen, Send, UserCheck, AlertCircle } from 'lucide-react';

interface ContributorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreateRoadmap: () => void;
}

export const ContributorPortalModal: React.FC<ContributorPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenCreateRoadmap
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('Price Action & Structure');
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Selamat datang, ${name || 'Kontributor'}! Sesi kontributor aktif. Anda dapat mempublikasikan kurikulum.`);
    setTimeout(() => {
      onClose();
      onOpenCreateRoadmap();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans-ui">
      <div className="bg-[#F5F3ED] border border-[#DCD9D0] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#DCD9D0] bg-[#FFFFFF] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono-data uppercase tracking-wider text-[#F26A3D] font-bold">
              PORTAL KONTRIBUTOR &amp; KURATOR
            </div>
            <h2 className="text-xl font-editorial font-normal text-[#171916] mt-0.5">
              {mode === 'register' ? 'Daftar Sebagai Kontributor Kurikulum' : 'Masuk Akun Kontributor'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#85857D] hover:text-[#171916] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note on Public Access */}
        <div className="p-4 bg-[#EAE7DF] border-b border-[#DCD9D0] text-xs font-mono-data text-[#171916] flex items-start space-x-2.5">
          <Shield className="w-4 h-4 text-[#6D896B] flex-shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Akses Publik:</strong> Pengunjung biasa tidak perlu akun untuk belajar. Seluruh materi, roadmap, kuis, dan simulasi 100% gratis &amp; bebas akses. Pendaftaran ini khusus bagi praktisi/mentor yang ingin menerbitkan materi pembelajaran baru.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message && (
            <div className="p-3 bg-[#6D896B]/15 border border-[#6D896B] text-xs text-[#171916] font-mono-data flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-[#6D896B] flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono-data uppercase text-[#85857D] mb-1">
              Nama Lengkap / Nama Alias Komunitas *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Contoh: Raka Putra (FX Pro Trader)"
              className="w-full bg-[#FFFFFF] border border-[#DCD9D0] focus:border-[#171916] px-3 py-2 text-xs text-[#171916] outline-none font-sans-ui"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-data uppercase text-[#85857D] mb-1">
              Alamat Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nama@domain.com"
              className="w-full bg-[#FFFFFF] border border-[#DCD9D0] focus:border-[#171916] px-3 py-2 text-xs text-[#171916] outline-none font-sans-ui"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-data uppercase text-[#85857D] mb-1">
              Bidang Spesialisasi Pasar
            </label>
            <select
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#DCD9D0] focus:border-[#171916] px-3 py-2 text-xs text-[#171916] outline-none font-sans-ui"
            >
              <option value="Price Action & Structure">Price Action &amp; Market Structure</option>
              <option value="Smart Money Concepts & ICT">Smart Money Concepts &amp; ICT</option>
              <option value="Wyckoff & Volume Spread Analysis">Wyckoff &amp; Volume Spread Analysis</option>
              <option value="Quantitative & Algorithmic">Quantitative &amp; Algorithmic</option>
              <option value="Risk Management & Psychology">Risk Management &amp; Psychology</option>
            </select>
          </div>

          <div className="pt-4 border-t border-[#DCD9D0] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
              className="text-xs font-mono-data text-[#85857D] hover:text-[#171916] underline"
            >
              {mode === 'register' ? 'Sudah terdaftar? Masuk di sini' : 'Belum punya akun? Daftar kontributor'}
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#171916] text-[#F5F3ED] hover:bg-[#F26A3D] transition-colors text-xs font-mono-data uppercase tracking-wider font-semibold"
            >
              {mode === 'register' ? 'Lanjutkan ke Editor Path' : 'Masuk Kontributor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
