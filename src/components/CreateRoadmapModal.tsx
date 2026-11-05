import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  TrendingUp, 
  Image as ImageIcon, 
  Layers, 
  GitFork, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PRESET_SVG_ITEMS } from './illustration/PresetSvgCatalog';

interface CreateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  forkInitialData?: {
    id: string;
    title: string;
    category: string;
    description: string;
  };
}

export interface RoadmapNodeDraft {
  title: string;
  level: number;
  duration: string;
  illustration_mode: 'preset' | 'interactive_chart' | 'snapshot';
  preset_type: string;
  chart_symbol: string;
  snapshot_url: string;
  content_markdown: string;
}

export const CreateRoadmapModal: React.FC<CreateRoadmapModalProps> = ({
  isOpen,
  onClose,
  onCreated,
  forkInitialData
}) => {
  const [title, setTitle] = useState(forkInitialData ? `${forkInitialData.title} (Custom Fork)` : '');
  const [creatorName, setCreatorName] = useState('');
  const [category, setCategory] = useState(forkInitialData?.category || 'Price Action & Technical');
  const [description, setDescription] = useState(forkInitialData ? `Kustomisasi mandiri dari kurikulum resmi ${forkInitialData.title}` : '');
  const [expandedNodeIndex, setExpandedNodeIndex] = useState<number | null>(0);
  
  const [nodes, setNodes] = useState<RoadmapNodeDraft[]>([
    {
      title: 'Fondasi Struktur & Likuiditas Awal',
      level: 1,
      duration: '2 jam',
      illustration_mode: 'preset',
      preset_type: 'candlestick_anatomy',
      chart_symbol: 'EUR/USD',
      snapshot_url: '',
      content_markdown: '### Modul 1: Fondasi\nPelajari mekanika lelang pasar dan pembersihan likuiditas.',
    },
    {
      title: 'Eksekusi & Mitigasi Order Block',
      level: 2,
      duration: '3 jam',
      illustration_mode: 'interactive_chart',
      preset_type: 'order_block_diagram',
      chart_symbol: 'EUR/USD',
      snapshot_url: '',
      content_markdown: '### Modul 2: Setup Eksekusi\nValidasi konfirmasi Order Block dan level Mean Threshold 50%.',
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddNode = () => {
    setNodes(prev => [
      ...prev,
      {
        title: '',
        level: prev.length + 1,
        duration: '2 jam',
        illustration_mode: 'preset',
        preset_type: 'bos_choch',
        chart_symbol: 'EUR/USD',
        snapshot_url: '',
        content_markdown: '',
      }
    ]);
    setExpandedNodeIndex(nodes.length);
  };

  const handleRemoveNode = (index: number) => {
    if (nodes.length <= 1) return;
    setNodes(prev => prev.filter((_, i) => i !== index));
    if (expandedNodeIndex === index) {
      setExpandedNodeIndex(null);
    }
  };

  const handleNodeChange = (index: number, field: keyof RoadmapNodeDraft, value: any) => {
    setNodes(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleApplyOfficialTemplate = async (officialId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/roadmaps/${officialId}`);
      const json = await res.json();
      if (json.success && json.data.nodes) {
        setTitle(`${json.data.roadmap.title} (Komunitas)`);
        setCategory(json.data.roadmap.category);
        setDescription(`Kurikulum adaptif berbasis ${json.data.roadmap.title}`);
        const templatedNodes: RoadmapNodeDraft[] = json.data.nodes.map((n: any, idx: number) => ({
          title: n.title,
          level: n.level || idx + 1,
          duration: '2 jam',
          illustration_mode: idx % 2 === 0 ? 'preset' : 'interactive_chart',
          preset_type: n.visual_type || 'candlestick_anatomy',
          chart_symbol: 'EUR/USD',
          snapshot_url: '',
          content_markdown: n.content || `### ${n.title}\n${n.summary}`,
        }));
        setNodes(templatedNodes);
        setExpandedNodeIndex(0);
      }
    } catch (err) {
      console.error('Failed to load official template', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !creatorName.trim() || !description.trim()) {
      setError('Mohon lengkapi judul, nama pembuat, dan deskripsi roadmap.');
      return;
    }

    const hasEmptyNode = nodes.some(n => !n.title.trim());
    if (hasEmptyNode) {
      setError('Pastikan semua tahapan modul telah memiliki judul yang jelas.');
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
          nodes: nodes.map(n => ({
            title: n.title,
            level: n.level,
            duration: n.duration,
            illustration_mode: n.illustration_mode,
            preset_type: n.preset_type,
            chart_symbol: n.chart_symbol,
            snapshot_url: n.snapshot_url,
            content_markdown: n.content_markdown
          }))
        })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Gagal mempublikasikan roadmap');

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem saat menyimpan roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[8px_8px_0px_#000] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#040810] border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 rounded-xl">
              <Layers size={18} />
            </span>
            <div>
              <h3 className="text-base font-mono font-bold text-white">
                Roadmap Builder &amp; 3-Mode Illustration Studio
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Rancang kurikulum trading komunitas lengkap dengan ilustrasi interaktif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3.5 bg-rose-950/80 border border-rose-600 rounded-xl flex items-center space-x-2.5 text-xs font-mono text-rose-300">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Template Fork Buttons */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-[11px] font-mono font-bold text-slate-300 mb-2 flex items-center space-x-1.5">
              <GitFork size={13} className="text-[#38BDF8]" />
              <span>Mulai Dari Template Resmi (Fork 1-Klik):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyOfficialTemplate('price-action-foundations')}
                className="text-[10px] font-mono px-2.5 py-1 bg-blue-950/80 hover:bg-blue-900 border border-blue-700 text-blue-300 rounded transition-colors"
              >
                + Fork Price Action
              </button>
              <button
                type="button"
                onClick={() => handleApplyOfficialTemplate('smart-money-concepts-ict-mastery')}
                className="text-[10px] font-mono px-2.5 py-1 bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-300 rounded transition-colors"
              >
                + Fork SMC &amp; ICT
              </button>
              <button
                type="button"
                onClick={() => handleApplyOfficialTemplate('wyckoff-method-vsa-mastery')}
                className="text-[10px] font-mono px-2.5 py-1 bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-300 rounded transition-colors"
              >
                + Fork Wyckoff &amp; VSA
              </button>
              <button
                type="button"
                onClick={() => handleApplyOfficialTemplate('risk-management-psychology-mastery')}
                className="text-[10px] font-mono px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 rounded transition-colors"
              >
                + Fork Risk &amp; Psychology
              </button>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Judul Roadmap *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Contoh: XAU/USD London Scalping Protocol"
                className="w-full bg-[#020617] border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Nama Pembuat / Handle Anda *
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={e => setCreatorName(e.target.value)}
                placeholder="Contoh: Alex Trader (ICT Practitioner)"
                className="w-full bg-[#020617] border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Kategori Spesialisasi
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-[#020617] border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="Price Action & Technical">Price Action &amp; Technical</option>
                <option value="Institutional & SMC">Institutional &amp; SMC</option>
                <option value="Classical & Wyckoff">Classical &amp; Wyckoff</option>
                <option value="Crypto & Altcoin">Crypto &amp; Altcoin</option>
                <option value="Scalping & Day Trading">Scalping &amp; Day Trading</option>
                <option value="Quantitative & Algo">Quantitative &amp; Algo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Deskripsi Singkat *
              </label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Penjelasan ringkas strategi dan siapa yang cocok mempelajarinya"
                className="w-full bg-[#020617] border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {/* Module Nodes Section with 3-Mode Illustration Picker */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Tahapan Modul &amp; Engine Ilustrasi ({nodes.length} Modul)
                </h4>
                <p className="text-[11px] font-mono text-slate-400">
                  Setiap modul dapat dilengkapi dengan salah satu dari 3 mode ilustrasi
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddNode}
                className="px-3 py-1.5 bg-[#38BDF8] text-black rounded-lg text-xs font-mono font-bold hover:bg-[#0284C7] transition-colors flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Tambah Modul</span>
              </button>
            </div>

            <div className="space-y-3">
              {nodes.map((node, index) => {
                const isExpanded = expandedNodeIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-[#020617] border border-slate-800 rounded-xl overflow-hidden transition-all"
                  >
                    {/* Node Row Header */}
                    <div className="p-3 flex items-center justify-between gap-3 bg-[#040810]">
                      <div className="flex items-center space-x-2.5 flex-1">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={node.title}
                          onChange={e => handleNodeChange(index, 'title', e.target.value)}
                          placeholder="Judul topik modul..."
                          className="flex-1 bg-transparent border-b border-transparent focus:border-[#38BDF8] px-1 py-0.5 text-xs font-mono font-bold text-white placeholder-slate-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Current Mode Badge */}
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                          node.illustration_mode === 'preset'
                            ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                            : node.illustration_mode === 'interactive_chart'
                            ? 'bg-sky-950/80 border-sky-600 text-sky-300'
                            : 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                        }`}>
                          {node.illustration_mode === 'preset' ? 'Mode 1: Preset' : node.illustration_mode === 'interactive_chart' ? 'Mode 2: Chart' : 'Mode 3: Snapshot'}
                        </span>

                        <button
                          type="button"
                          onClick={() => setExpandedNodeIndex(isExpanded ? null : index)}
                          className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        {nodes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveNode(index)}
                            className="p-1 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Node Expanded Settings (3-Mode Illustration Picker + Tutorial Content) */}
                    {isExpanded && (
                      <div className="p-4 border-t border-slate-800/80 space-y-4 bg-[#060A14]">
                        {/* 3-Mode Illustration Engine Selector */}
                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                            Pilih Engine Ilustrasi untuk Modul Ini:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {/* Mode 1 */}
                            <button
                              type="button"
                              onClick={() => handleNodeChange(index, 'illustration_mode', 'preset')}
                              className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                                node.illustration_mode === 'preset'
                                  ? 'bg-amber-950/60 border-[#FACC15] text-[#FACC15]'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 font-bold text-xs">
                                <Sparkles size={14} />
                                <span>Mode 1: Preset SVG</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight">
                                Pilih dari 25 katalog diagram institusional bawaan.
                              </p>
                            </button>

                            {/* Mode 2 */}
                            <button
                              type="button"
                              onClick={() => handleNodeChange(index, 'illustration_mode', 'interactive_chart')}
                              className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                                node.illustration_mode === 'interactive_chart'
                                  ? 'bg-sky-950/60 border-[#38BDF8] text-[#38BDF8]'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 font-bold text-xs">
                                <TrendingUp size={14} />
                                <span>Mode 2: Chart Interaktif</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight">
                                Candlestick TradingView riil dengan kotak FVG / OB.
                              </p>
                            </button>

                            {/* Mode 3 */}
                            <button
                              type="button"
                              onClick={() => handleNodeChange(index, 'illustration_mode', 'snapshot')}
                              className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                                node.illustration_mode === 'snapshot'
                                  ? 'bg-emerald-950/60 border-[#10B981] text-[#10B981]'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 font-bold text-xs">
                                <ImageIcon size={14} />
                                <span>Mode 3: Snapshot &amp; Draw</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight">
                                Link TradingView / upload gambar dengan canvas anotasi.
                              </p>
                            </button>
                          </div>
                        </div>

                        {/* Mode-Specific Configuration Inputs */}
                        {node.illustration_mode === 'preset' && (
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Pilih Jenis Diagram Preset SVG:
                            </label>
                            <select
                              value={node.preset_type}
                              onChange={e => handleNodeChange(index, 'preset_type', e.target.value)}
                              className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#FACC15]"
                            >
                              {PRESET_SVG_ITEMS.map(p => (
                                <option key={p.type} value={p.type}>
                                  [{p.category}] {p.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {node.illustration_mode === 'interactive_chart' && (
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Simbol &amp; Skenario Interaktif:
                            </label>
                            <select
                              value={node.chart_symbol}
                              onChange={e => handleNodeChange(index, 'chart_symbol', e.target.value)}
                              className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#38BDF8]"
                            >
                              <option value="EUR/USD">EUR/USD: London Open Judas Swing &amp; FVG 50% CE</option>
                              <option value="BTC/USDT">BTC/USDT: Wyckoff Phase C Spring &amp; Creek Jump</option>
                            </select>
                          </div>
                        )}

                        {node.illustration_mode === 'snapshot' && (
                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              URL Snapshot TradingView / Link Gambar:
                            </label>
                            <input
                              type="text"
                              value={node.snapshot_url}
                              onChange={e => handleNodeChange(index, 'snapshot_url', e.target.value)}
                              placeholder="https://www.tradingview.com/x/..."
                              className="w-full bg-[#020617] border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#10B981]"
                            />
                          </div>
                        )}

                        {/* Markdown Tutorial Editor */}
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">
                            Materi / Panduan Praktik (Markdown Format):
                          </label>
                          <textarea
                            rows={4}
                            value={node.content_markdown}
                            onChange={e => handleNodeChange(index, 'content_markdown', e.target.value)}
                            placeholder="Tuliskan materi penjelasan, SOP eksekusi, atau checklist yang harus dipahami trader pada modul ini..."
                            className="w-full bg-[#020617] border border-slate-800 rounded-lg p-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] resize-y"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-mono transition-colors"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-black font-mono font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-[#10B981]/20 disabled:opacity-50"
            >
              <CheckCircle2 size={16} />
              <span>{loading ? 'Menyimpan...' : 'Publikasikan Roadmap Komunitas'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
