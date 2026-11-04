import React, { useState } from 'react';
import { X, Plus, Trash2, ShieldAlert } from 'lucide-react';

interface CreateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateRoadmapModal: React.FC<CreateRoadmapModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [title, setTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [category, setCategory] = useState('Scalping & Day Trading');
  const [description, setDescription] = useState('');
  const [nodes, setNodes] = useState<Array<{ title: string; level: number; duration: string }>>([
    { title: 'Dasar & Pengenalan Setup', level: 1, duration: '2 jam' },
    { title: 'Konfirmasi Entry & Aturan Invalidasi', level: 2, duration: '3 jam' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddNode = () => {
    setNodes(prev => [
      ...prev,
      { title: '', level: prev.length + 1, duration: '2 jam' }
    ]);
  };

  const handleRemoveNode = (index: number) => {
    if (nodes.length <= 1) return;
    setNodes(prev => prev.filter((_, i) => i !== index));
  };

  const handleNodeChange = (index: number, field: 'title' | 'duration', value: string) => {
    setNodes(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !creatorName.trim() || !description.trim()) {
      setError('Mohon lengkapi judul, nama pembuat, dan deskripsi.');
      return;
    }

    const hasEmptyNode = nodes.some(n => !n.title.trim());
    if (hasEmptyNode) {
      setError('Pastikan semua tahapan modul telah memiliki judul.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          creator_name: creatorName,
          category,
          description,
          nodes
        })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Gagal mempublikasikan roadmap');

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between bg-[#0B101D]">
          <div>
            <h2 className="text-base font-bold text-[#F8FAFC]">Buat &amp; Publikasikan Roadmap Baru</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">Bagikan alur belajar trading versi Anda ke komunitas TLP</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-xs text-[#F43F5E] flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
              Judul Roadmap *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Scalping Gold Sesi London-NY / Swing Saham Breakout"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#090D16] border border-[#1E293B] focus:border-[#10B981] rounded-lg px-3 py-2 text-xs text-[#F8FAFC] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                Nama / Alias Creator *
              </label>
              <input
                type="text"
                required
                placeholder="Nama Anda atau Komunitas"
                value={creatorName}
                onChange={e => setCreatorName(e.target.value)}
                className="w-full bg-[#090D16] border border-[#1E293B] focus:border-[#10B981] rounded-lg px-3 py-2 text-xs text-[#F8FAFC] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                Kategori Metodologi
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-[#090D16] border border-[#1E293B] focus:border-[#10B981] rounded-lg px-3 py-2 text-xs text-[#F8FAFC] outline-none"
              >
                <option value="Scalping & Day Trading">Scalping &amp; Day Trading</option>
                <option value="Swing Trading & Momentum">Swing Trading &amp; Momentum</option>
                <option value="Crypto & DeFi Trading">Crypto &amp; DeFi Trading</option>
                <option value="SMC / Institutional">SMC / Institutional</option>
                <option value="Risk & Psychology">Risk &amp; Psychology</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
              Deskripsi Singkat *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Jelaskan fokus strategi, instrumen pasar yang cocok, dan prasyarat dasar..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-[#090D16] border border-[#1E293B] focus:border-[#10B981] rounded-lg px-3 py-2 text-xs text-[#F8FAFC] outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Dynamic Nodes Builder */}
          <div className="border-t border-[#1E293B] pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-[#10B981] uppercase font-semibold">
                Tahapan Modul Pembelajaran ({nodes.length})
              </label>
              <button
                type="button"
                onClick={handleAddNode}
                className="text-xs font-mono text-[#38BDF8] hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Modul</span>
              </button>
            </div>

            <div className="space-y-2">
              {nodes.map((node, index) => (
                <div key={index} className="flex items-center space-x-2 bg-[#090D16] p-2.5 rounded-lg border border-[#1E293B]">
                  <span className="w-6 text-center text-xs font-mono text-[#94A3B8]">#{index + 1}</span>
                  <input
                    type="text"
                    required
                    placeholder={`Nama Modul ${index + 1}...`}
                    value={node.title}
                    onChange={e => handleNodeChange(index, 'title', e.target.value)}
                    className="flex-1 bg-transparent text-xs text-[#F8FAFC] placeholder-[#475569] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Est. durasi (e.g. 2 jam)"
                    value={node.duration}
                    onChange={e => handleNodeChange(index, 'duration', e.target.value)}
                    className="w-24 bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1 text-[11px] font-mono text-[#94A3B8] outline-none"
                  />
                  {nodes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveNode(index)}
                      className="p-1 text-[#94A3B8] hover:text-[#F43F5E] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E293B] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#10B981] text-[#090D16] rounded-lg text-xs font-semibold hover:bg-[#059669] transition-colors disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Publikasikan ke Komunitas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
