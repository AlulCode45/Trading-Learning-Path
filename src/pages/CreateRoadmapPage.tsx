import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import { 
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
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Compass,
  Eye,
  Code2,
  Check,
  MoveUp,
  MoveDown,
  Cpu,
  BarChart3,
  ShieldCheck,
  Send
} from 'lucide-react';
import { PRESET_SVG_ITEMS } from '../components/illustration/PresetSvgCatalog';
import { VisualDiagram } from '../components/VisualDiagram';
import { InteractiveTradingChart } from '../components/illustration/InteractiveTradingChart';
import { ChartSnapshotViewer } from '../components/illustration/ChartSnapshotViewer';
import { WysiwygMarkdownEditor } from '../components/editor/WysiwygMarkdownEditor';
import { CustomChartBuilderModal } from '../components/chart-builder/CustomChartBuilderModal';
import { CustomChartRenderer } from '../components/illustration/CustomChartRenderer';
import { CustomChartConfig } from '../types/chartBuilderTypes';

export interface NodeDraft {
  title: string;
  duration: string;
  level: number;
  importance: 'essential' | 'recommended' | 'optional';
  illustration_mode: 'preset' | 'interactive_chart' | 'snapshot' | 'custom_builder';
  preset_type: string;
  chart_symbol: string;
  snapshot_url: string;
  content_markdown: string;
  custom_chart_config?: CustomChartConfig;
}

export const CreateRoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const forkSlug = searchParams.get('fork');

// Metadata State
  const [title, setTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [category, setCategory] = useState('Price Action & Market Structure');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [description, setDescription] = useState('');
  
  // Modules / Nodes State
  const [nodes, setNodes] = useState<NodeDraft[]>([
    {
      title: 'Fondasi Struktur Pasar & Likuiditas Awal',
      duration: '2 jam',
      level: 1,
      importance: 'essential',
      illustration_mode: 'preset',
      preset_type: 'candlestick-anatomy',
      chart_symbol: 'EUR/USD',
      snapshot_url: '',
      content_markdown: '### Modul 1: Fondasi\nPelajari anatomi candlestick dan mekanika lelang pasar dua arah (*Double Auction Market*).',
    },
    {
      title: 'Validasi Swing High & Break of Structure (BOS)',
      duration: '3 jam',
      level: 2,
      importance: 'essential',
      illustration_mode: 'interactive_chart',
      preset_type: 'bos-choch',
      chart_symbol: 'EUR/USD',
      snapshot_url: '',
      content_markdown: '### Modul 2: Struktur Pasar Mekanis\nIdentifikasi konfirmasi penutupan body candle di luar swing point objektif.',
    },
    {
      title: 'Eksekusi & Mitigasi Order Block Institusional',
      duration: '3 jam',
      level: 3,
      importance: 'recommended',
      illustration_mode: 'snapshot',
      preset_type: 'order-block',
      chart_symbol: 'EUR/USD',
      snapshot_url: 'https://www.tradingview.com/x/vB8uY1rZ/',
      content_markdown: '### Modul 3: Order Block & Mitigasi\nAturan entry limit order pada level Mean Threshold 50% candle pemicu likuiditas.',
    }
  ]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [chartBuilderTargetIndex, setChartBuilderTargetIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successSlug, setSuccessSlug] = useState<string | null>(null);

  // Auto-load template if `?fork=slug` is present in URL
  useEffect(() => {
    if (forkSlug) {
      loadOfficialTemplate(forkSlug);
    }
  }, [forkSlug]);

  const loadOfficialTemplate = async (slug: string) => {
    setLoadingTemplate(true);
    setError(null);
    try {
      const res = await fetch(`/api/roadmaps/${slug}`);
      const json = await res.json();
      if (json.success && json.data.nodes) {
        const rm = json.data.roadmap;
        setTitle(`${rm.title} (Komunitas Fork)`);
        setCategory(rm.category);
        setIsCustomCategory(false);
        setCustomCategoryInput('');
        setDescription(`Kurikulum adaptif yang dikembangkan dari silabus ${rm.title}. Dilengkapi studi kasus dan anotasi teknikal mandiri.`);
        setDifficulty((rm.difficulty as any) || 'Intermediate');
        
        const templatedNodes: NodeDraft[] = json.data.nodes.map((n: any, idx: number) => ({
          title: n.title,
          duration: `${n.estimated_hours || 2} jam`,
          level: n.level || idx + 1,
          importance: idx < 3 ? 'essential' : 'recommended',
          illustration_mode: idx % 3 === 0 ? 'preset' : idx % 3 === 1 ? 'interactive_chart' : 'snapshot',
          preset_type: n.visual_type || n.diagram_type || 'candlestick-anatomy',
          chart_symbol: 'EUR/USD',
          snapshot_url: idx % 3 === 2 ? 'https://www.tradingview.com/x/vB8uY1rZ/' : '',
          content_markdown: n.content || `### ${n.title}\n${n.summary || 'Pelajari materi ini dengan teliti.'}`,
        }));

        setNodes(templatedNodes);
        setExpandedIndex(0);
      }
    } catch (err) {
      console.error('Failed to load roadmap template', err);
      setError('Gagal memuat template kurikulum yang dipilih.');
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleAddNode = () => {
    setNodes(prev => [
      ...prev,
      {
        title: '',
        duration: '2 jam',
        level: prev.length + 1,
        importance: 'recommended',
        illustration_mode: 'preset',
        preset_type: 'bos-choch',
        chart_symbol: 'EUR/USD',
        snapshot_url: '',
        content_markdown: '### Ringkasan Materi\nTuliskan panduan praktik dan aturan teknikal di sini.',
      }
    ]);
    setExpandedIndex(nodes.length);
  };

  const handleRemoveNode = (index: number) => {
    if (nodes.length <= 1) return;
    setNodes(prev => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) {
      setExpandedIndex(Math.max(0, index - 1));
    }
  };

  const handleMoveNode = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= nodes.length) return;
    
    setNodes(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });

    setExpandedIndex(targetIndex);
  };

  const handleUpdateNode = <K extends keyof NodeDraft>(index: number, field: K, value: NodeDraft[K]) => {
    setNodes(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const totalEstimatedHours = nodes.reduce((acc, curr) => {
    const parsed = parseInt(curr.duration);
    return acc + (isNaN(parsed) ? 2 : parsed);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !creatorName.trim() || !description.trim()) {
      setError('Mohon lengkapi Judul Roadmap, Nama Pembuat, dan Deskripsi Kurikulum.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const finalCategory = (isCustomCategory ? customCategoryInput.trim() : category.trim());
    if (!finalCategory) {
      setError('Mohon tentukan atau ketik kategori metodologi untuk kurikulum Anda.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const hasEmptyNode = nodes.some(n => !n.title.trim());
    if (hasEmptyNode) {
      setError('Pastikan semua tahapan modul telah memiliki judul yang terisi.');
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
          category: finalCategory,
          description,
          difficulty,
          estimated_hours: totalEstimatedHours,
          nodes: nodes.map((n, idx) => ({
            id: `node-${idx + 1}`,
            title: n.title,
            duration: n.duration,
            level: n.level || idx + 1,
            importance: n.importance,
            illustrationMode: n.illustration_mode,
            diagram_type: n.preset_type,
            chartConfig: n.illustration_mode === 'interactive_chart' ? {
              symbol: n.chart_symbol,
              title: `${n.title} Setup Chart`,
              timeframe: '15m'
            } : null,
            snapshotConfig: n.illustration_mode === 'snapshot' ? {
              src: n.snapshot_url,
              caption: n.title
            } : null,
            customChartConfig: n.illustration_mode === 'custom_builder' ? n.custom_chart_config : null,
            content_markdown: n.content_markdown
          }))
        })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Gagal mempublikasikan roadmap');

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      const newSlug = json.data?.slug || 'community';
      setSuccessSlug(newSlug);

      setTimeout(() => {
        navigate(`/roadmaps/${newSlug}`);
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem saat menyimpan roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-[#E2E8F0] py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
              <Link to="/roadmaps" className="hover:text-black dark:hover:text-white flex items-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Katalog Roadmaps</span>
              </Link>
              <span>/</span>
              <span className="text-emerald-600 dark:text-[#10B981] font-bold">Studio Pembuat Roadmap</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2.5">
              <span>Roadmap Studio &amp; Creator Hub</span>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8]">
              Rancang dan publikasikan kurikulum trading terstruktur Anda. Lengkapi setiap modul dengan panduan tutorial markdown dan engine ilustrasi 3-mode (Preset Diagram, Candlestick Interaktif, atau Snapshot Anotasi).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link
              to="/roadmaps"
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium transition-colors"
            >
              Batal
            </Link>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-bold text-xs flex items-center space-x-2 transition-all shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span>Memvalidasi &amp; Menerbitkan...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Publikasikan Roadmap 🚀</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Template Fork Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-700 dark:text-zinc-300 font-bold">
            <GitFork className="w-4 h-4 text-[#10B981]" />
            <span>Kloning Cepat dari Template Kurikulum Resmi:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { slug: 'price-action-market-structure', label: 'Price Action & Structure' },
              { slug: 'smart-money-concepts-ict', label: 'Smart Money Concepts (ICT)' },
              { slug: 'wyckoff-method-vsa', label: 'Wyckoff Method & VSA' },
              { slug: 'risk-management-psychology', label: 'Manajemen Risiko' },
              { slug: 'quantitative-algo-trading', label: 'Quantitative & Algo' }
            ].map(item => (
              <button
                key={item.slug}
                type="button"
                onClick={() => loadOfficialTemplate(item.slug)}
                disabled={loadingTemplate}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 transition-colors border border-slate-200 dark:border-zinc-700"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert Box */}
        {successSlug && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Roadmap berhasil dipublikasikan! Mengalihkan ke halaman kurikulum...</span>
            </div>
            <Link to={`/roadmaps/${successSlug}`} className="font-bold underline ml-2">
              Buka Sekarang &rarr;
            </Link>
          </div>
        )}

        {/* 2-Column Split Workspace */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Curriculum Settings & Live Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Metadata Card */}
            <div className="bg-white dark:bg-[#121722] border-2 border-slate-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
                <BookOpen className="w-4 h-4 text-[#10B981]" />
                <span>1. Informasi &amp; Metadata Kurikulum</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Judul Roadmap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Strategi Scalping Emas XAU/USD Sesi London"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0A0D14] border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      Nama Pembuat / Mentor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda atau Tim"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#0A0D14] border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300">
                        Kategori Metodologi *
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isCustomCategory) {
                            setIsCustomCategory(true);
                            setCustomCategoryInput(category);
                          } else {
                            setIsCustomCategory(false);
                            setCategory('Price Action & Market Structure');
                          }
                        }}
                        className="text-[10px] font-mono text-[#10B981] hover:underline flex items-center space-x-1 font-bold"
                      >
                        {isCustomCategory ? '← Gunakan Pilihan Bawaan' : '✨ + Ketik Kategori Kustom'}
                      </button>
                    </div>

                    {isCustomCategory ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Misal: Order Flow & Footprint, Harmonic Patterns, Elliott Wave..."
                          value={customCategoryInput}
                          onChange={(e) => setCustomCategoryInput(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-[#0A0D14] border-2 border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                        />
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">Inspirasi Cepat:</span>
                          {[
                            'Order Flow & Footprint',
                            'Harmonic Patterns & Fibonacci',
                            'Elliott Wave Theory',
                            'Auction Market Theory',
                            'Scalping 1-Menit M1',
                            'Crypto Rotation & Perp'
                          ].map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => setCustomCategoryInput(sug)}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200 dark:border-zinc-700 font-medium"
                            >
                              + {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <select
                        value={category}
                        onChange={(e) => {
                          if (e.target.value === '__CUSTOM__') {
                            setIsCustomCategory(true);
                            setCustomCategoryInput('');
                          } else {
                            setCategory(e.target.value);
                          }
                        }}
                        className="w-full bg-slate-50 dark:bg-[#0A0D14] border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all font-medium"
                      >
                        <option value="Price Action & Market Structure">Price Action &amp; Struktur</option>
                        <option value="Institutional & SMC">Institutional &amp; SMC (ICT)</option>
                        <option value="Wyckoff & Volume Analysis">Metode Wyckoff &amp; VSA</option>
                        <option value="Risk Management & Psychology">Manajemen Risiko &amp; Psikologi</option>
                        <option value="Quantitative & Algorithmic">Kuantitatif &amp; Algo Trading</option>
                        <option value="Spesialisasi Pasar">Scalping / Kripto / Forex Khusus</option>
                        <option value="__CUSTOM__">✨ + Ketik Kategori Kustom Sendiri...</option>
                      </select>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Tingkat Kesulitan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setDifficulty(lvl)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all border ${
                          difficulty === lvl
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-transparent hover:border-slate-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Deskripsi Lengkap Kurikulum *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan keunggulan metodologi, target pemahaman trader, dan pendekatan eksekusi yang diajarkan pada kurikulum ini..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0A0D14] border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Live Directory Card Preview */}
            <div className="bg-white dark:bg-[#121722] border-2 border-slate-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Pratinjau Kartu di Direktori</span>
              </h2>

              <div className="p-5 rounded-2xl border-2 border-black dark:border-zinc-300 bg-amber-100/90 dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-[4px_4px_0px_#000] space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded font-extrabold uppercase bg-black text-amber-200">
                    {isCustomCategory ? (customCategoryInput.trim() || 'Kategori Kustom') : category}
                  </span>
                  <span className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded font-bold">
                    {difficulty}
                  </span>
                </div>

                <h3 className="text-base font-black leading-snug line-clamp-2">
                  {title || 'Judul Roadmap Anda Akan Tampil di Sini'}
                </h3>

                <p className="text-xs text-slate-800 dark:text-zinc-300 leading-relaxed line-clamp-2">
                  {description || 'Deskripsi kurikulum akan tampil di sini untuk membantu trader lain memilih jalur belajar ini.'}
                </p>

                <div className="pt-3 border-t border-black/15 dark:border-white/15 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center space-x-3 text-slate-800 dark:text-zinc-300 font-semibold">
                    <span>{nodes.length} Modul</span>
                    <span>•</span>
                    <span>~{totalEstimatedHours} Jam</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-zinc-300">
                    Oleh: {creatorName || 'Nama Anda'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Module Stages & 3-Mode Illustration Studio (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#10B981]" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  2. Susunan Silabus Modul ({nodes.length} Tahapan)
                </h2>
              </div>

              <button
                type="button"
                onClick={handleAddNode}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-[#10B981] border border-emerald-500/30 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Modul</span>
              </button>
            </div>

            {/* List of Module Cards */}
            <div className="space-y-4">
              {nodes.map((node, index) => {
                const isExpanded = expandedIndex === index;
                const tab = markdownPreviewTab[index] || 'edit';

                return (
                  <div
                    key={index}
                    className={`rounded-2xl border-2 transition-all bg-white dark:bg-[#121722] shadow-xs overflow-hidden ${
                      isExpanded 
                        ? 'border-black dark:border-zinc-300' 
                        : 'border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    {/* Module Accordion Header */}
                    <div 
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors select-none"
                    >
                      <div className="flex items-center space-x-3 truncate pr-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>

                        <div className="truncate">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {node.title || `Modul #${index + 1} (Belum Berjudul)`}
                          </h4>
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                            <span>Durasi: {node.duration}</span>
                            <span>•</span>
                            <span className="capitalize">Mode: {node.illustration_mode.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleMoveNode(index, 'up')}
                          disabled={index === 0}
                          title="Pindah ke atas"
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-500 disabled:opacity-30"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveNode(index, 'down')}
                          disabled={index === nodes.length - 1}
                          title="Pindah ke bawah"
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-500 disabled:opacity-30"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>

                        {nodes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveNode(index)}
                            title="Hapus modul ini"
                            className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="p-1.5 text-slate-400"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Module Body Content when Expanded */}
                    {isExpanded && (
                      <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-zinc-800 space-y-5 bg-slate-50/50 dark:bg-[#0A0D14]/50">
                        
                        {/* Title & Duration Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                          <div className="sm:col-span-8">
                            <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                              Judul Modul #{index + 1} *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Contoh: Identifikasi Order Block & Mitigasi Mean Threshold"
                              value={node.title}
                              onChange={(e) => handleUpdateNode(index, 'title', e.target.value)}
                              className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all font-medium"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="block font-mono font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                              Estimasi Waktu Belajar
                            </label>
                            <input
                              type="text"
                              placeholder="2 jam"
                              value={node.duration}
                              onChange={(e) => handleUpdateNode(index, 'duration', e.target.value)}
                              className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                          </div>
                        </div>

                        {/* 3-Mode Illustration Engine Selector */}
                        <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
                          <div className="flex items-center justify-between">
                            <label className="font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>Pilihan Engine Ilustrasi Modul Ini:</span>
                            </label>
                          </div>

                          {/* 4-Mode Illustration Engine Selector */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => handleUpdateNode(index, 'illustration_mode', 'preset')}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                node.illustration_mode === 'preset'
                                  ? 'bg-amber-500/10 border-amber-500 text-slate-950 dark:text-white font-bold ring-2 ring-amber-500/20'
                                  : 'bg-white dark:bg-[#121722] border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-400'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-mono">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>Mode 1: Preset SVG</span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                                25+ diagram teknikal lelang, BOS/CHoCH, Wyckoff, &amp; Risk.
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleUpdateNode(index, 'illustration_mode', 'interactive_chart')}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                node.illustration_mode === 'interactive_chart'
                                  ? 'bg-sky-500/10 border-sky-500 text-slate-950 dark:text-white font-bold ring-2 ring-sky-500/20'
                                  : 'bg-white dark:bg-[#121722] border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-400'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-mono">
                                <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                                <span>Mode 2: Chart Interaktif</span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                                TradingView Lightweight Charts dengan FVG &amp; OB overlay.
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleUpdateNode(index, 'illustration_mode', 'snapshot')}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                node.illustration_mode === 'snapshot'
                                  ? 'bg-purple-500/10 border-purple-500 text-slate-950 dark:text-white font-bold ring-2 ring-purple-500/20'
                                  : 'bg-white dark:bg-[#121722] border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-400'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-mono">
                                <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
                                <span>Mode 3: Snapshot</span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                                Link URL TradingView snapshot atau upload gambar custom.
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                handleUpdateNode(index, 'illustration_mode', 'custom_builder');
                                setChartBuilderTargetIndex(index);
                              }}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                node.illustration_mode === 'custom_builder'
                                  ? 'bg-emerald-500/10 border-emerald-500 text-slate-950 dark:text-white font-bold ring-2 ring-emerald-500/20'
                                  : 'bg-white dark:bg-[#121722] border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-400'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-mono">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Mode 4: Chart Studio 🎨</span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                                Susun candle, tarik Fibonacci Retracement &amp; kotak OB/FVG.
                              </p>
                            </button>
                          </div>

                          {/* Specific Config Input per Mode */}
                          {node.illustration_mode === 'preset' && (
                            <div className="space-y-3 pt-2">
                              <div>
                                <label className="block font-mono text-[11px] text-slate-600 dark:text-zinc-400 mb-1">
                                  Pilih Diagram dari Katalog Preset:
                                </label>
                                <select
                                  value={node.preset_type}
                                  onChange={(e) => handleUpdateNode(index, 'preset_type', e.target.value)}
                                  className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                                >
                                  {PRESET_SVG_ITEMS.map(item => (
                                    <option key={item.id} value={item.id}>
                                      [{item.category}] {item.title}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-zinc-800">
                                <div className="text-[10px] font-mono text-slate-400 mb-2">Pratinjau Diagram Terpilih:</div>
                                <VisualDiagram type={node.preset_type as any} />
                              </div>
                            </div>
                          )}

                          {node.illustration_mode === 'interactive_chart' && (
                            <div className="space-y-3 pt-2">
                              <div>
                                <label className="block font-mono text-[11px] text-slate-600 dark:text-zinc-400 mb-1">
                                  Instrumen Pasangan Aset:
                                </label>
                                <select
                                  value={node.chart_symbol}
                                  onChange={(e) => handleUpdateNode(index, 'chart_symbol', e.target.value)}
                                  className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                                >
                                  <option value="EUR/USD">EUR/USD (London Judas &amp; FVG Imbalance)</option>
                                  <option value="BTC/USDT">BTC/USDT (Wyckoff Spring &amp; JAC Breakout)</option>
                                  <option value="XAU/USD">XAU/USD (Gold Session Breakout &amp; Sweep)</option>
                                </select>
                              </div>

                              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-zinc-800">
                                <div className="text-[10px] font-mono text-slate-400 mb-2">Pratinjau Chart Interaktif:</div>
                                <InteractiveTradingChart 
                                  title={`${node.chart_symbol} Live Simulation`}
                                  timeframe="15m"
                                />
                              </div>
                            </div>
                          )}

                          {node.illustration_mode === 'snapshot' && (
                            <div className="space-y-3 pt-2">
                              <div>
                                <label className="block font-mono text-[11px] text-slate-600 dark:text-zinc-400 mb-1">
                                  URL Snapshot TradingView atau Tautan Gambar:
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://www.tradingview.com/x/vB8uY1rZ/ atau https://.../chart.png"
                                  value={node.snapshot_url}
                                  onChange={(e) => handleUpdateNode(index, 'snapshot_url', e.target.value)}
                                  className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
                                />
                              </div>

                              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-zinc-800">
                                <div className="text-[10px] font-mono text-slate-400 mb-2">Pratinjau Snapshot &amp; Alat Anotasi Canvas:</div>
                                <ChartSnapshotViewer 
                                  initialImageUrl={node.snapshot_url}
                                  title={node.title || 'Chart Snapshot Viewer'}
                                />
                              </div>
                            </div>
                          )}

                          {/* Mode 4: Custom Candle Chart Builder Studio */}
                          {node.illustration_mode === 'custom_builder' && (
                            <div className="space-y-3 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400">
                                  Konfigurasi Chart Drag &amp; Drop Interaktif:
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setChartBuilderTargetIndex(index)}
                                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-lg text-xs font-mono flex items-center space-x-1 shadow-sm transition-colors"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>{node.custom_chart_config ? 'Sunting di Chart Studio 🎨' : 'Rancang di Chart Studio 🎨'}</span>
                                </button>
                              </div>

                              {node.custom_chart_config ? (
                                <div className="p-3 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-zinc-800">
                                  <div className="text-[10px] font-mono text-slate-400 mb-2">Pratinjau Chart Kustom Anda:</div>
                                  <CustomChartRenderer 
                                    config={node.custom_chart_config}
                                    title={node.title || 'Interactive Custom Candlestick Model'}
                                  />
                                </div>
                              ) : (
                                <div 
                                  onClick={() => setChartBuilderTargetIndex(index)}
                                  className="p-6 rounded-xl border-2 border-dashed border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer flex flex-col items-center justify-center text-center transition-all group"
                                >
                                  <Sparkles className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white mb-1">
                                    Klik untuk Membuka Canvas Chart Studio
                                  </span>
                                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                                    Gunakan template candle (FVG, Order Block, Hammer), drag &amp; drop candle, tarik Fibonacci Retracement, dan pasang badge BOS/CHoCH.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* WYSIWYG Rich Markdown Lesson Content Editor */}
                        <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-zinc-800">
                          <label className="font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between mb-1">
                            <span className="flex items-center space-x-1.5">
                              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Materi Inti &amp; Panduan Praktik (WYSIWYG Rich Editor):</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              Mendukung Toolbar Visual, Callout Pro-Tip/Risiko &amp; Tabel
                            </span>
                          </label>

                          <WysiwygMarkdownEditor
                            value={node.content_markdown}
                            onChange={(val) => handleUpdateNode(index, 'content_markdown', val)}
                            placeholder="### Judul Sub-Topik&#10;Tulis konsep teknikal, langkah validasi konfirmasi body candle, atau aturan manajemen risiko di sini..."
                            onOpenChartBuilder={() => setChartBuilderTargetIndex(index)}
                          />
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Module CTA */}
            <button
              type="button"
              onClick={handleAddNode}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-[#10B981] font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all bg-white/40 dark:bg-[#121722]/40"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Modul Selanjutnya (+ Tahapan #{nodes.length + 1})</span>
            </button>

            {/* Final Submit Banner */}
            <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                Total: <strong>{nodes.length} Modul</strong> (~{totalEstimatedHours} Jam Materi)
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Link
                  to="/roadmaps"
                  className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-mono font-medium transition-colors"
                >
                  Batal
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Menerbitkan...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Publikasikan Roadmap 🚀</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </form>

      </div>

      {/* Interactive Custom Candlestick & Drawing Studio Modal */}
      {chartBuilderTargetIndex !== null && (
        <CustomChartBuilderModal
          isOpen={true}
          onClose={() => setChartBuilderTargetIndex(null)}
          initialConfig={nodes[chartBuilderTargetIndex]?.custom_chart_config}
          onSave={(config) => {
            handleUpdateNode(chartBuilderTargetIndex, 'custom_chart_config', config);
            handleUpdateNode(chartBuilderTargetIndex, 'illustration_mode', 'custom_builder');
          }}
        />
      )}
    </div>
  );
};
