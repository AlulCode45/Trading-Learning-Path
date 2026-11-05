import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  X,
  Check,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Eye,
  Code2,
  Image as ImageIcon,
  Lightbulb,
  MoveUp,
  MoveDown,
  Layers
} from 'lucide-react';
import { WysiwygMarkdownEditor } from '../editor/WysiwygMarkdownEditor';
import { CustomChartBuilderModal } from '../chart-builder/CustomChartBuilderModal';
import { CustomChartRenderer } from '../illustration/CustomChartRenderer';
import { ChartSnapshotViewer } from '../illustration/ChartSnapshotViewer';
import { CustomChartConfig } from '../../types/chartBuilderTypes';
import { QuizQuestion } from '../../types';

export interface DocSectionDraft {
  id: string;
  title: string;
  content: string;
  illustrationMode: 'none' | 'custom_builder' | 'snapshot';
  customChartConfig?: CustomChartConfig;
  snapshotUrl?: string;
  callout?: {
    enabled: boolean;
    type: 'tip' | 'warning' | 'note' | 'example';
    title: string;
    text: string;
  };
  financialExample?: {
    enabled: boolean;
    scenario: string;
    analysis: string;
    outcome: string;
  };
}

export interface ModuleDocConfig {
  summary: string;
  readingTimeMinutes: number;
  prerequisites: string[];
  sections: DocSectionDraft[];
  commonMistakes: Array<{ mistake: string; correction: string }>;
  keyTakeaways: string[];
  checklists: Array<{ id: string; text: string; is_completed: boolean }>;
  quizzes: QuizQuestion[];
}

interface ModuleDocStudioModalProps {
  isOpen: boolean;
  moduleIndex?: number;
  moduleTitle: string;
  moduleLevel?: number;
  moduleDuration?: string;
  initialMarkdown?: string;
  initialChartConfig?: CustomChartConfig;
  initialDocConfig?: Partial<ModuleDocConfig>;
  initialConfig?: Partial<ModuleDocConfig>;
  onClose: () => void;
  onSave: (config: ModuleDocConfig, updatedTitle?: string) => void;
}

export const ModuleDocStudioModal: React.FC<ModuleDocStudioModalProps> = ({
  isOpen,
  moduleIndex = 0,
  moduleTitle,
  moduleLevel = 1,
  initialMarkdown,
  initialChartConfig,
  initialDocConfig,
  initialConfig,
  onClose,
  onSave
}) => {
  const resolvedDocConfig = initialDocConfig || initialConfig || {};
  const [title, setTitle] = useState(moduleTitle);
  const [summary, setSummary] = useState(resolvedDocConfig.summary || '');
  const [readingTimeMinutes, setReadingTimeMinutes] = useState(resolvedDocConfig.readingTimeMinutes || 8);
  const [prerequisites, setPrerequisites] = useState<string[]>(resolvedDocConfig.prerequisites || []);
  const [newPrereq, setNewPrereq] = useState('');

  const [sections, setSections] = useState<DocSectionDraft[]>(
    resolvedDocConfig.sections && resolvedDocConfig.sections.length > 0
      ? resolvedDocConfig.sections
      : [
          {
            id: 'sec-1',
            title: '1. Konsep Dasar & Mekanika Struktur',
            content:
              initialMarkdown ||
              '### Penjelasan Materi\nUraikan logika institusional, alasan terbentuknya pergerakan harga, dan parameter validasinya secara objektif.',
            illustrationMode: initialChartConfig ? 'custom_builder' : 'none',
            customChartConfig: initialChartConfig
          }
        ]
  );

  const [commonMistakes, setCommonMistakes] = useState<Array<{ mistake: string; correction: string }>>(
    resolvedDocConfig.commonMistakes && resolvedDocConfig.commonMistakes.length > 0
      ? resolvedDocConfig.commonMistakes
      : [
          {
            mistake: 'Masuk posisi sebelum penutupan body candle terkonfirmasi valid.',
            correction: 'Tunggu candle close penuh dan pastikan struktur likuiditas telah tersapu.'
          }
        ]
  );

  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(
    resolvedDocConfig.keyTakeaways && resolvedDocConfig.keyTakeaways.length > 0
      ? resolvedDocConfig.keyTakeaways
      : [
          'Selalu identifikasi struktur High Timeframe (HTF) sebelum mencari konfirmasi eksekusi.',
          'Batasi risiko maksimal 1% per transaksi dengan titik invalidasi mekanis.'
        ]
  );

  const [checklists, setChecklists] = useState<Array<{ id: string; text: string; is_completed: boolean }>>(
    resolvedDocConfig.checklists && resolvedDocConfig.checklists.length > 0
      ? resolvedDocConfig.checklists
      : [
          { id: `chk-${Date.now()}-1`, text: 'Memahami aturan identifikasi struktur pada chart riil', is_completed: false },
          { id: `chk-${Date.now()}-2`, text: 'Menentukan level invalidasi (Stop Loss) dan Target (TP) secara presisi', is_completed: false }
        ]
  );

  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(
    resolvedDocConfig.quizzes || []
  );

  const [activeTab, setActiveTab] = useState<'sections' | 'mistakes_takeaways' | 'checklist_quiz' | 'preview'>('sections');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [chartStudioSectionIndex, setChartStudioSectionIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleAddSection = () => {
    const nextNum = sections.length + 1;
    const newSec: DocSectionDraft = {
      id: `sec-${Date.now()}`,
      title: `${nextNum}. Sub-Bab Pembahasan Lanjutan`,
      content: '### Poin Pembahasan\nTuliskan detail materi, rumus, atau aturan eksekusi pada bagian ini.',
      illustrationMode: 'none'
    };
    setSections(prev => [...prev, newSec]);
    setActiveSectionIndex(sections.length);
  };

  const handleUpdateSection = (idx: number, patch: Partial<DocSectionDraft>) => {
    setSections(prev => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const handleMoveSection = (idx: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= sections.length) return;
    setSections(prev => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[target];
      copy[target] = temp;
      return copy;
    });
    setActiveSectionIndex(target);
  };

  const handleRemoveSection = (idx: number) => {
    if (sections.length <= 1) return;
    setSections(prev => prev.filter((_, i) => i !== idx));
    setActiveSectionIndex(Math.max(0, idx - 1));
  };

  const handleAddQuiz = () => {
    setQuizzes(prev => [
      ...prev,
      {
        id: `quiz-${Date.now()}`,
        question: 'Apa syarat utama agar setup pada modul ini dinyatakan valid?',
        options: [
          'Penutupan body candle (Candle Close) melampaui batas struktur kunci',
          'Hanya melihat ekor (wick) tanpa menunggu penutupan candle',
          'Mengandalkan perasaan tanpa konfirmasi struktur',
          'Membuka posisi berlawanan arah tren utama tanpa Stop Loss'
        ],
        correctAnswer: 0,
        explanation: 'Konfirmasi body candle close membuktikan perpindahan lelang institusional yang sebenarnya.'
      }
    ]);
  };

  const currentSection = sections[activeSectionIndex] || sections[0];

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-900/80 backdrop-blur-xs flex flex-col overflow-hidden">
      {/* Top Studio Header */}
      <div className="px-6 py-3.5 bg-white dark:bg-[#0D111A] border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black font-black">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-black text-[#10B981] text-[10px] font-mono font-extrabold uppercase">
                Docs Studio • Modul #{moduleIndex + 1} (Level {moduleLevel})
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                {title || `Dokumentasi Lengkap Modul #${moduleIndex + 1}`}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Susun dokumentasi buku lengkap (/docs): Multi-Bab, Chart Studio per Bab, Callout Pro-Tip, Studi Kasus, Kesalahan Umum, &amp; Kuis.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-300 dark:border-zinc-700 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'sections'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Bab &amp; Materi ({sections.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mistakes_takeaways')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'mistakes_takeaways'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Kesalahan &amp; Poin Kunci</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checklist_quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'checklist_quiz'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
            <span>3. Checklist &amp; Kuis ({quizzes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'preview'
                ? 'bg-emerald-500 text-black font-extrabold shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pratinjau Halaman /docs</span>
          </button>
        </div>

        {/* Save & Cancel */}
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Tutup</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSave(
                {
                  summary,
                  readingTimeMinutes,
                  prerequisites,
                  sections,
                  commonMistakes,
                  keyTakeaways,
                  checklists,
                  quizzes
                },
                title
              );
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Dokumentasi Modul</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#080B12] p-6">
        <div className="max-w-7xl mx-auto">
          {/* TAB 1: MULTI-SECTION DOCS BUILDER */}
          {activeTab === 'sections' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Metadata & Table of Contents (Sections List) */}
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2.5">
                    Header Artikel Dokumentasi
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                        Judul Artikel / Modul
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                        Ringkasan Eksekutif (Tampil di Atas Artikel &amp; Drawer)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Jelaskan intisari modul ini dalam 2-3 kalimat..."
                        value={summary}
                        onChange={e => setSummary(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                          Estimasi Waktu Baca (Menit)
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={120}
                          value={readingTimeMinutes}
                          onChange={e => setReadingTimeMinutes(Number(e.target.value) || 5)}
                          className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sections / Chapters List */}
                <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <Layers className="w-4 h-4 text-emerald-500" />
                      <span>Daftar Bab (Table of Contents)</span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Tambah Bab</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {sections.map((sec, sIdx) => {
                      const isActive = activeSectionIndex === sIdx;
                      return (
                        <div
                          key={sec.id}
                          onClick={() => setActiveSectionIndex(sIdx)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 dark:text-white font-bold shadow-2xs'
                              : 'bg-slate-50 dark:bg-zinc-900/70 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-400'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <div className="text-xs truncate">{sec.title || `Bab #${sIdx + 1}`}</div>
                            <div className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                              Ilustrasi: {sec.illustrationMode === 'custom_builder' ? '🎨 Chart Studio' : sec.illustrationMode === 'snapshot' ? '🖼️ Snapshot' : 'Teks Murni'}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                            <button
                              type="button"
                              disabled={sIdx === 0}
                              onClick={() => handleMoveSection(sIdx, 'up')}
                              className="p-1 text-slate-400 hover:text-black dark:hover:text-white disabled:opacity-30"
                            >
                              <MoveUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={sIdx === sections.length - 1}
                              onClick={() => handleMoveSection(sIdx, 'down')}
                              className="p-1 text-slate-400 hover:text-black dark:hover:text-white disabled:opacity-30"
                            >
                              <MoveDown className="w-3 h-3" />
                            </button>
                            {sections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(sIdx)}
                                className="p-1 text-rose-500 hover:text-rose-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Active Section Content, Chart Illustration, Callout & Financial Example */}
              {currentSection && (
                <div className="lg:col-span-8 bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                    <span className="text-xs font-mono font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                      Menyunting Bab #{activeSectionIndex + 1} dari {sections.length}
                    </span>
                  </div>

                  {/* Section Title */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Judul Sub-Bab (Heading H2 di Halaman /docs) *
                    </label>
                    <input
                      type="text"
                      value={currentSection.title}
                      onChange={e => handleUpdateSection(activeSectionIndex, { title: e.target.value })}
                      placeholder="Contoh: 1. Mekanika Lelang & Anatomi Order Block"
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Rich Markdown Editor for this Section */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Isi Materi Bab #{activeSectionIndex + 1} (Mendukung Format Markdown, Tabel, &amp; List)
                    </label>
                    <WysiwygMarkdownEditor
                      value={currentSection.content}
                      onChange={val => handleUpdateSection(activeSectionIndex, { content: val })}
                      onOpenChartBuilder={() => {
                        handleUpdateSection(activeSectionIndex, { illustrationMode: 'custom_builder' });
                        setChartStudioSectionIndex(activeSectionIndex);
                      }}
                    />
                  </div>

                  {/* Section Illustration Selector */}
                  <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-3">
                    <label className="block text-xs font-mono font-bold text-slate-800 dark:text-white">
                      Ilustrasi Visual pada Bab #{activeSectionIndex + 1}:
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <button
                        type="button"
                        onClick={() => handleUpdateSection(activeSectionIndex, { illustrationMode: 'none' })}
                        className={`p-3 rounded-xl border text-left font-mono ${
                          currentSection.illustrationMode === 'none'
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-black font-bold'
                            : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        <div>Tanpa Ilustrasi</div>
                        <p className="text-[10px] opacity-75 font-sans mt-0.5">Hanya teks penjelasan di bab ini</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateSection(activeSectionIndex, { illustrationMode: 'custom_builder' });
                          setChartStudioSectionIndex(activeSectionIndex);
                        }}
                        className={`p-3 rounded-xl border text-left font-mono ${
                          currentSection.illustrationMode === 'custom_builder'
                            ? 'bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white font-bold'
                            : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Chart Studio 🎨</span>
                        </div>
                        <p className="text-[10px] opacity-75 font-sans mt-0.5">Buat skematik candle/wave khusus bab ini</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdateSection(activeSectionIndex, { illustrationMode: 'snapshot' })}
                        className={`p-3 rounded-xl border text-left font-mono ${
                          currentSection.illustrationMode === 'snapshot'
                            ? 'bg-purple-500/15 border-purple-500 text-slate-900 dark:text-white font-bold'
                            : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center space-x-1">
                          <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
                          <span>Snapshot Gambar</span>
                        </div>
                        <p className="text-[10px] opacity-75 font-sans mt-0.5">Tautan gambar TradingView / URL</p>
                      </button>
                    </div>

                    {currentSection.illustrationMode === 'custom_builder' && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
                            Ilustrasi Chart Studio Bab #{activeSectionIndex + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => setChartStudioSectionIndex(activeSectionIndex)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-mono font-extrabold text-xs flex items-center space-x-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{currentSection.customChartConfig ? 'Sunting Chart Bab Ini 🎨' : 'Buka Chart Studio 🎨'}</span>
                          </button>
                        </div>
                        {currentSection.customChartConfig && (
                          <CustomChartRenderer config={currentSection.customChartConfig} title={currentSection.title} />
                        )}
                      </div>
                    )}

                    {currentSection.illustrationMode === 'snapshot' && (
                      <div className="space-y-2">
                        <input
                          type="url"
                          placeholder="https://www.tradingview.com/x/... atau URL gambar"
                          value={currentSection.snapshotUrl || ''}
                          onChange={e => handleUpdateSection(activeSectionIndex, { snapshotUrl: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                        />
                        {currentSection.snapshotUrl && (
                          <ChartSnapshotViewer initialImageUrl={currentSection.snapshotUrl} title={currentSection.title} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Callout Box & Real Financial Case Study toggles for this Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                    {/* Callout Box */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Kotak Callout (Pro-Tip / Peringatan)</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={Boolean(currentSection.callout?.enabled)}
                          onChange={e =>
                            handleUpdateSection(activeSectionIndex, {
                              callout: {
                                enabled: e.target.checked,
                                type: currentSection.callout?.type || 'tip',
                                title: currentSection.callout?.title || 'Aturan Penting',
                                text: currentSection.callout?.text || ''
                              }
                            })
                          }
                          className="accent-emerald-500"
                        />
                      </label>

                      {currentSection.callout?.enabled && (
                        <div className="space-y-2 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={currentSection.callout.type}
                              onChange={e =>
                                handleUpdateSection(activeSectionIndex, {
                                  callout: { ...currentSection.callout!, type: e.target.value as any }
                                })
                              }
                              className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs font-mono"
                            >
                              <option value="tip">💡 Pro-Tip (Hijau)</option>
                              <option value="warning">⚠️ Warning (Merah)</option>
                              <option value="note">📌 Catatan (Kuning)</option>
                              <option value="example">📊 Contoh (Biru)</option>
                            </select>
                            <input
                              type="text"
                              placeholder="Judul Callout"
                              value={currentSection.callout.title}
                              onChange={e =>
                                handleUpdateSection(activeSectionIndex, {
                                  callout: { ...currentSection.callout!, title: e.target.value }
                                })
                              }
                              className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs"
                            />
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Isi pesan callout penting..."
                            value={currentSection.callout.text}
                            onChange={e =>
                              handleUpdateSection(activeSectionIndex, {
                                callout: { ...currentSection.callout!, text: e.target.value }
                              })
                            }
                            className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs"
                          />
                        </div>
                      )}
                    </div>

                    {/* Financial Case Study Box */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">
                          📈 Kotak Studi Kasus Transaksi Riil
                        </span>
                        <input
                          type="checkbox"
                          checked={Boolean(currentSection.financialExample?.enabled)}
                          onChange={e =>
                            handleUpdateSection(activeSectionIndex, {
                              financialExample: {
                                enabled: e.target.checked,
                                scenario: currentSection.financialExample?.scenario || '',
                                analysis: currentSection.financialExample?.analysis || '',
                                outcome: currentSection.financialExample?.outcome || ''
                              }
                            })
                          }
                          className="accent-emerald-500"
                        />
                      </label>

                      {currentSection.financialExample?.enabled && (
                        <div className="space-y-2 text-xs">
                          <input
                            type="text"
                            placeholder="Skenario Pasar (cth: Sesi London XAU/USD M15)"
                            value={currentSection.financialExample.scenario}
                            onChange={e =>
                              handleUpdateSection(activeSectionIndex, {
                                financialExample: { ...currentSection.financialExample!, scenario: e.target.value }
                              })
                            }
                            className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Analisis Perilaku Harga & Likuiditas"
                            value={currentSection.financialExample.analysis}
                            onChange={e =>
                              handleUpdateSection(activeSectionIndex, {
                                financialExample: { ...currentSection.financialExample!, analysis: e.target.value }
                              })
                            }
                            className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Hasil / Evaluasi Risk-to-Reward"
                            value={currentSection.financialExample.outcome}
                            onChange={e =>
                              handleUpdateSection(activeSectionIndex, {
                                financialExample: { ...currentSection.financialExample!, outcome: e.target.value }
                              })
                            }
                            className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COMMON MISTAKES, KEY TAKEAWAYS & PREREQUISITES */}
          {activeTab === 'mistakes_takeaways' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Common Mistakes */}
              <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span>Kesalahan Fatal Trader (✕) &amp; Solusinya (✓)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setCommonMistakes(prev => [...prev, { mistake: '', correction: '' }])
                    }
                    className="px-3 py-1 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {commonMistakes.map((cm, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-rose-500">Kesalahan #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setCommonMistakes(prev => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="✕ Kesalahan yang sering dilakukan trader..."
                        value={cm.mistake}
                        onChange={e =>
                          setCommonMistakes(prev =>
                            prev.map((item, i) => (i === idx ? { ...item, mistake: e.target.value } : item))
                          )
                        }
                        className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="✓ Koreksi / Solusi mekanis yang benar..."
                        value={cm.correction}
                        onChange={e =>
                          setCommonMistakes(prev =>
                            prev.map((item, i) => (i === idx ? { ...item, correction: e.target.value } : item))
                          )
                        }
                        className="w-full bg-white dark:bg-zinc-800 border border-emerald-500/40 rounded-lg px-3 py-1.5 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaways & Prerequisites */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-mono font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Poin Kunci &amp; Prinsip Utama (Key Takeaways)</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setKeyTakeaways(prev => [...prev, ''])}
                      className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Poin Kunci</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {keyTakeaways.map((pt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <input
                          type="text"
                          value={pt}
                          placeholder="Tulis prinsip kunci yang wajib diingat..."
                          onChange={e =>
                            setKeyTakeaways(prev => prev.map((item, i) => (i === idx ? e.target.value : item)))
                          }
                          className="flex-1 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setKeyTakeaways(prev => prev.filter((_, i) => i !== idx))}
                          className="p-1 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3">
                  <h3 className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
                    Prasyarat Topik Sebelum Membaca Modul Ini
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ketik prasyarat (cth: Anatomi Candlestick)..."
                      value={newPrereq}
                      onChange={e => setNewPrereq(e.target.value)}
                      className="flex-1 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPrereq.trim()) return;
                        setPrerequisites(prev => [...prev, newPrereq.trim()]);
                        setNewPrereq('');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold"
                    >
                      + Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {prerequisites.map((pr, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-xs font-mono flex items-center space-x-1.5"
                      >
                        <span>{pr}</span>
                        <button
                          type="button"
                          onClick={() => setPrerequisites(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-500 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST & INTERACTIVE QUIZ */}
          {activeTab === 'checklist_quiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Verification Checklists */}
              <div className="lg:col-span-5 bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
                    Checklist Verifikasi Praktik
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setChecklists(prev => [
                        ...prev,
                        { id: `chk-${Date.now()}`, text: '', is_completed: false }
                      ])
                    }
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold"
                  >
                    + Checklist
                  </button>
                </div>

                <div className="space-y-2">
                  {checklists.map((chk, idx) => (
                    <div key={chk.id} className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-slate-400">#{idx + 1}</span>
                      <input
                        type="text"
                        value={chk.text}
                        placeholder="Tugas verifikasi praktik untuk trader..."
                        onChange={e =>
                          setChecklists(prev =>
                            prev.map((c, i) => (i === idx ? { ...c, text: e.target.value } : c))
                          )
                        }
                        className="flex-1 bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setChecklists(prev => prev.filter((_, i) => i !== idx))}
                        className="p-1 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Multiple Choice Quizzes */}
              <div className="lg:col-span-7 bg-white dark:bg-[#111623] border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
                    Soal Kuis Evaluasi Modul ({quizzes.length} Soal)
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddQuiz}
                    className="px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Soal Kuis</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {quizzes.map((qz, qIdx) => (
                    <div key={qz.id} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sky-500">Pertanyaan #{qIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setQuizzes(prev => prev.filter((_, i) => i !== qIdx))}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={qz.question}
                        onChange={e =>
                          setQuizzes(prev =>
                            prev.map((q, i) => (i === qIdx ? { ...q, question: e.target.value } : q))
                          )
                        }
                        className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-bold"
                      />

                      <div className="space-y-1.5">
                        {qz.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`correct-${qz.id}`}
                              checked={qz.correctAnswer === oIdx}
                              onChange={() =>
                                setQuizzes(prev =>
                                  prev.map((q, i) => (i === qIdx ? { ...q, correctAnswer: oIdx } : q))
                                )
                              }
                              className="accent-emerald-500"
                              title="Tandai sebagai jawaban benar"
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={e => {
                                const nextOpts = [...qz.options];
                                nextOpts[oIdx] = e.target.value;
                                setQuizzes(prev =>
                                  prev.map((q, i) => (i === qIdx ? { ...q, options: nextOpts } : q))
                                );
                              }}
                              className="flex-1 bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs"
                            />
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        placeholder="Penjelasan mengapa jawaban tersebut benar..."
                        value={qz.explanation}
                        onChange={e =>
                          setQuizzes(prev =>
                            prev.map((q, i) => (i === qIdx ? { ...q, explanation: e.target.value } : q))
                          )
                        }
                        className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs italic"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE /DOCS ARTICLE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="max-w-3xl mx-auto bg-white dark:bg-[#0D111A] border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 space-y-8 shadow-sm">
              <div className="border-b border-slate-200 dark:border-zinc-800 pb-6">
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-500 mb-2">
                  <span>Level {moduleLevel}</span>
                  <span>•</span>
                  <span>{readingTimeMinutes} min baca</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  {title}
                </h1>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {summary || 'Ringkasan eksekutif artikel dokumentasi ini.'}
                </p>
              </div>

              {sections.map(sec => (
                <div key={sec.id} className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">
                    {sec.title}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                  </div>
                  {sec.illustrationMode === 'custom_builder' && sec.customChartConfig && (
                    <CustomChartRenderer config={sec.customChartConfig} title={sec.title} />
                  )}
                  {sec.illustrationMode === 'snapshot' && sec.snapshotUrl && (
                    <ChartSnapshotViewer initialImageUrl={sec.snapshotUrl} title={sec.title} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nested Chart Studio Modal for Section-Specific Chart Building */}
      {chartStudioSectionIndex !== null && sections[chartStudioSectionIndex] && (
        <CustomChartBuilderModal
          isOpen={true}
          onClose={() => setChartStudioSectionIndex(null)}
          initialConfig={sections[chartStudioSectionIndex].customChartConfig}
          onSave={cfg => {
            handleUpdateSection(chartStudioSectionIndex, {
              illustrationMode: 'custom_builder',
              customChartConfig: cfg
            });
            setChartStudioSectionIndex(null);
          }}
        />
      )}
    </div>
  );
};
