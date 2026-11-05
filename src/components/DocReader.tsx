import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EducationalArticle, RoadmapNode } from '../types';
import { EDUCATIONAL_ARTICLES, getAllArticles } from '../data/articles';
import { VisualDiagram } from './VisualDiagram';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Layers, 
  Map, 
  AlertTriangle, 
  Lightbulb, 
  Info, 
  Bookmark, 
  Share2, 
  ChevronRight,
  TrendingUp,
  Check
} from 'lucide-react';

interface DocReaderProps {
  articleSlug: string;
  allNodes?: RoadmapNode[];
  onSelectArticle: (slug: string) => void;
  onReturnToRoadmap: () => void;
  onUpdateNodeStatus?: (nodeId: string, status: RoadmapNode['status']) => void;
  nodeStatus?: Record<string, RoadmapNode['status']>;
}

export const DocReader: React.FC<DocReaderProps> = ({
  articleSlug,
  allNodes = [],
  onSelectArticle,
  onReturnToRoadmap,
  onUpdateNodeStatus,
  nodeStatus = {}
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const article: EducationalArticle | undefined = EDUCATIONAL_ARTICLES[articleSlug] || Object.values(EDUCATIONAL_ARTICLES)[0];
  const allArticlesList = getAllArticles();

  // Find current index and prev/next
  const currentIndex = allArticlesList.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticlesList[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticlesList.length - 1 ? allArticlesList[currentIndex + 1] : null;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!article) return;
      const sections = article.tableOfContents.map(toc => document.getElementById(toc.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSectionId(el.id);
            return;
          }
        }
      }
      if (article.tableOfContents.length > 0) {
        setActiveSectionId(article.tableOfContents[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSectionId(id);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isCompleted = article.nodeId ? nodeStatus[article.nodeId] === 'completed' : false;

  const handleToggleCompleted = () => {
    if (!article.nodeId || !onUpdateNodeStatus) return;
    if (!isCompleted) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10B981', '#38BDF8', '#F59E0B']
      });
      onUpdateNodeStatus(article.nodeId, 'completed');
    } else {
      onUpdateNodeStatus(article.nodeId, 'available');
    }
  };

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-xl font-bold mb-3">Materi Belum Tersedia</h2>
        <p className="text-sm text-slate-500 mb-6">Artikel edukasi untuk topik ini sedang dalam tahap penulisan tim kurikulum.</p>
        <button
          onClick={onReturnToRoadmap}
          className="px-4 py-2 bg-[#10B981] text-black font-semibold rounded-lg text-xs"
        >
          Kembali ke Peta Roadmap
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-[#E2E8F0] transition-colors">
      {/* Top Sticky Subheader Bar */}
      <div className="sticky top-15 z-30 bg-white/95 dark:bg-[#0D1017]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1D2532] px-4 sm:px-8 py-2.5 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-[#94A3B8] overflow-x-auto">
          <button
            onClick={onReturnToRoadmap}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#121722] dark:hover:bg-[#1D2532] text-slate-700 dark:text-[#94A3B8] hover:text-black dark:hover:text-white border border-slate-300 dark:border-[#1D2532] transition-colors flex-shrink-0 font-medium"
          >
            <Map className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Peta Roadmap</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-40 text-slate-400" />
          <span className="truncate max-w-[200px] sm:max-w-none text-emerald-600 dark:text-[#10B981] font-semibold">
            {article.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-[#1D2532] hover:bg-slate-100 dark:hover:bg-[#1D2532] text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white text-xs flex items-center space-x-1 transition-colors"
            title="Bagikan tautan dokumen"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Tersalin' : 'Share'}</span>
          </button>

          {article.nodeId && onUpdateNodeStatus && (
            <button
              onClick={handleToggleCompleted}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                isCompleted
                  ? 'bg-[#10B981] text-black border-[#10B981] shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-[#121722] dark:text-[#10B981] dark:border-[#10B981]/40 dark:hover:bg-[#10B981]/15'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Selesai Dipelajari ✓' : 'Tandai Selesai'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3-Column Technical Documentation Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Left Navigation: Topics Directory */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-3 flex items-center space-x-2 font-bold">
                <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Dokumentasi Price Action</span>
              </h4>
              <div className="space-y-1">
                {allArticlesList.map((item, idx) => {
                  const isActive = item.slug === article.slug;
                  const itemCompleted = item.nodeId ? nodeStatus[item.nodeId] === 'completed' : false;

                  return (
                    <button
                      key={item.slug}
                      onClick={() => onSelectArticle(item.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                        isActive
                          ? 'bg-emerald-100/70 dark:bg-[#10B981]/15 text-emerald-800 dark:text-[#10B981] font-semibold border-l-3 border-[#10B981]'
                          : 'text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#121722]'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono text-[10px] text-slate-400 dark:text-[#64748B] mr-1.5">{idx + 1}.</span>
                        <span>{item.title}</span>
                      </div>
                      {itemCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Roadmap Terhubung</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-3">
                Topik ini adalah simpul dari kurikulum Price Action &amp; Market Structure.
              </p>
              <button
                onClick={onReturnToRoadmap}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-slate-300 hover:border-emerald-500 dark:bg-[#121722] dark:hover:bg-white/5 dark:border-[#1D2532] dark:hover:border-[#10B981] dark:text-[#10B981] text-xs font-mono flex items-center justify-center space-x-1.5 transition-colors font-medium"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Buka Kanvas Interaktif</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Center: Main Educational Article Body */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Article Header Metadata */}
          <div className="border-b border-slate-200 dark:border-[#1D2532] pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#10B981]/15 dark:text-[#10B981] border border-emerald-300 dark:border-[#10B981]/30 font-semibold">
                {article.category}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#121722] text-slate-700 dark:text-[#94A3B8] border border-slate-200 dark:border-[#1D2532]">
                Level {article.level}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#121722] text-slate-700 dark:text-[#94A3B8] border border-slate-200 dark:border-[#1D2532]">
                {article.difficulty}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] flex items-center space-x-1 ml-auto font-medium">
                <Clock className="w-3 h-3" />
                <span>{article.readingTimeMinutes} min baca</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed font-normal">
              {article.summary}
            </p>

            {article.prerequisites && article.prerequisites.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] flex items-start space-x-2 text-xs">
                <Bookmark className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-[#F8FAFC]">Prasyarat Pembahasan: </span>
                  <span className="text-slate-600 dark:text-[#94A3B8]">
                    {article.prerequisites.join(' • ')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Article Sections Loop with Rich Markdown Rendering */}
          <div className="space-y-10 text-sm leading-relaxed text-slate-800 dark:text-[#CBD5E1]">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] pt-2 border-b border-slate-200 dark:border-[#1D2532]/60 pb-2">
                  {section.title}
                </h2>

                {/* Render Rich Markdown with GFM Table Support */}
                <div className="leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1] mb-3.5 last:mb-0">
                          {children}
                        </p>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1.5 tracking-tight">
                          {children}
                        </h4>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-outside ml-5 space-y-1.5 my-3 text-sm text-slate-700 dark:text-[#CBD5E1]">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-outside ml-5 space-y-1.5 my-3 text-sm text-slate-700 dark:text-[#CBD5E1]">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
                          {children}
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-slate-950 dark:text-white">
                          {children}
                        </strong>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 my-3.5 rounded-r-lg text-xs sm:text-sm text-amber-950 dark:text-amber-200 italic font-medium">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className, ...props }: any) => {
                        const isInline = !className && typeof children === 'string' && !children.includes('\n');
                        if (isInline) {
                          return (
                            <code className="bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold border border-slate-200 dark:border-zinc-700" {...props}>
                              {children}
                            </code>
                          );
                        }
                        return (
                          <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-3 border border-zinc-800">
                            <code {...props}>{children}</code>
                          </pre>
                        );
                      },
                      /* GFM Table Rendering Components */
                      table: ({ children }) => (
                        <div className="my-5 overflow-x-auto rounded-xl border border-slate-300 dark:border-zinc-700 shadow-sm">
                          <table className="w-full text-left text-xs border-collapse">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-slate-100 dark:bg-zinc-800 border-b-2 border-slate-300 dark:border-zinc-700">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-3 font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100 border-r last:border-r-0 border-slate-300 dark:border-zinc-700 text-[11.5px]">
                          {children}
                        </th>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900/60 font-mono">
                          {children}
                        </tbody>
                      ),
                      tr: ({ children }) => (
                        <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors">
                          {children}
                        </tr>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-2.5 text-xs text-slate-800 dark:text-zinc-200 border-r last:border-r-0 border-slate-200 dark:border-zinc-800">
                          {children}
                        </td>
                      )
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>

                {/* Optional Visual Diagram Embedded */}
                {section.visualType && (
                  <div className="my-6">
                    <VisualDiagram type={section.visualType} />
                  </div>
                )}

                {/* Optional Context Callout */}
                {section.callout && (
                  <div className={`p-4 rounded-xl border flex items-start space-x-3 text-xs leading-relaxed ${
                    section.callout.type === 'warning'
                      ? 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-[#F43F5E]/10 dark:border-[#F43F5E]/30 dark:text-[#F43F5E]'
                      : section.callout.type === 'tip'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-[#10B981]/10 dark:border-[#10B981]/30 dark:text-[#10B981]'
                      : section.callout.type === 'example'
                      ? 'bg-sky-50 border-sky-300 text-sky-800 dark:bg-[#38BDF8]/10 dark:border-[#38BDF8]/30 dark:text-[#38BDF8]'
                      : 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-[#F59E0B]/10 dark:border-[#F59E0B]/30 dark:text-[#F59E0B]'
                  }`}>
                    {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {section.callout.type === 'example' && <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {section.callout.type === 'note' && <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    <div>
                      {section.callout.title && (
                        <div className="font-bold mb-1 uppercase tracking-wider font-mono text-[11px]">
                          {section.callout.title}
                        </div>
                      )}
                      <p className="text-slate-800 dark:text-[#E2E8F0]">{section.callout.text}</p>
                    </div>
                  </div>
                )}

                {/* Optional Financial Example Box */}
                {section.financialExample && (
                  <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1D2532] space-y-2 text-xs">
                    <div className="font-mono uppercase text-[10px] text-sky-600 dark:text-[#38BDF8] font-bold tracking-wider">
                      Studi Kasus Transaksi Riil
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-[#F8FAFC]">Skenario: </strong>
                      <span className="text-slate-600 dark:text-[#94A3B8]">{section.financialExample.scenario}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-[#F8FAFC]">Analisis Perilaku Pasar: </strong>
                      <span className="text-slate-600 dark:text-[#94A3B8]">{section.financialExample.analysis}</span>
                    </div>
                    <div className="pt-1 text-emerald-700 dark:text-[#10B981]">
                      <strong className="font-bold">Hasil / Evaluasi: </strong>
                      <span>{section.financialExample.outcome}</span>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Common Mistakes Section */}
            {article.commonMistakes && article.commonMistakes.length > 0 && (
              <section id="common-mistakes" className="scroll-mt-28 pt-6 border-t border-slate-200 dark:border-[#1D2532]">
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Kesalahan Fatal Trader Pemula &amp; Solusinya</span>
                </h3>
                <div className="space-y-3">
                  {article.commonMistakes.map((cm, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] space-y-1.5 text-xs shadow-xs">
                      <div className="text-rose-600 dark:text-[#F43F5E] font-medium flex items-center space-x-1.5">
                        <span className="font-bold">✕</span>
                        <span>{cm.mistake}</span>
                      </div>
                      <div className="text-emerald-700 dark:text-[#10B981] flex items-center space-x-1.5 pl-3 border-l-2 border-emerald-500">
                        <span className="font-bold">✓</span>
                        <span>{cm.correction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Takeaways Section */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <section id="key-takeaways" className="scroll-mt-28 p-5 rounded-xl bg-emerald-50/70 dark:bg-[#10B981]/5 border border-emerald-300 dark:border-[#10B981]/25">
                <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-800 dark:text-[#10B981] mb-3 flex items-center space-x-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Poin Kunci &amp; Prinsip Bertahan</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-[#CBD5E1]">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-[#10B981] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Topics Links */}
            {article.relatedTopics && article.relatedTopics.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-[#1D2532]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-3 font-bold">
                  Topik Terkait dalam Jalur Belajar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {article.relatedTopics.map(rel => (
                    <button
                      key={rel.slug}
                      onClick={() => onSelectArticle(rel.slug)}
                      className="p-3.5 rounded-lg bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] hover:border-emerald-500 text-left transition-colors group flex items-center justify-between shadow-xs"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-[#F8FAFC] group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors">
                          {rel.title}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-[#64748B] mt-0.5">{rel.category}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Academic & Authoritative References */}
            {article.references && article.references.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-[#1D2532] text-xs text-slate-500 dark:text-[#94A3B8]">
                <h4 className="font-mono uppercase text-[10px] tracking-wider mb-2 font-bold">
                  Referensi Ilmiah &amp; Literatur Klasik:
                </h4>
                <ul className="space-y-1 font-mono text-[11px]">
                  {article.references.map((ref, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <span>[{idx + 1}]</span>
                      <span className="text-slate-800 dark:text-[#CBD5E1] italic">{ref.title}</span>
                      <span>— {ref.author} {ref.year ? `(${ref.year})` : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Previous / Next Article Navigation Footer */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-[#1D2532] flex items-center justify-between gap-4">
            {prevArticle ? (
              <button
                onClick={() => onSelectArticle(prevArticle.slug)}
                className="flex items-center space-x-2 text-left p-3 rounded-xl border border-slate-200 dark:border-[#1D2532] hover:border-emerald-500 bg-white dark:bg-[#0D1017] text-xs transition-colors flex-1 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-[#10B981] flex-shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] font-mono text-slate-500">Sebelumnya</div>
                  <div className="font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">{prevArticle.title}</div>
                </div>
              </button>
            ) : <div className="flex-1" />}

            {nextArticle ? (
              <button
                onClick={() => onSelectArticle(nextArticle.slug)}
                className="flex items-center justify-end space-x-2 text-right p-3 rounded-xl border border-slate-200 dark:border-[#1D2532] hover:border-emerald-500 bg-white dark:bg-[#0D1017] text-xs transition-colors flex-1 shadow-xs"
              >
                <div className="truncate">
                  <div className="text-[10px] font-mono text-slate-500">Selanjutnya</div>
                  <div className="font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">{nextArticle.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-[#10B981] flex-shrink-0" />
              </button>
            ) : <div className="flex-1" />}
          </div>
        </article>

        {/* Right Sticky Column: Table of Contents */}
        <aside className="hidden xl:block w-60 flex-shrink-0">
          <div className="sticky top-28 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] flex items-center space-x-1.5 font-bold">
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Daftar Isi (TOC)</span>
            </h4>

            <nav className="space-y-1 text-xs">
              {article.tableOfContents.map(toc => {
                const isActive = activeSectionId === toc.id;
                return (
                  <button
                    key={toc.id}
                    onClick={() => scrollToSection(toc.id)}
                    className={`w-full text-left py-1.5 px-2 rounded text-[11px] leading-snug transition-colors truncate block ${
                      isActive
                        ? 'text-emerald-700 dark:text-[#10B981] font-bold bg-emerald-100/60 dark:bg-[#10B981]/10 border-l-2 border-emerald-500'
                        : 'text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {toc.title}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 dark:border-[#1D2532] text-[11px] text-slate-500 dark:text-[#64748B] space-y-2">
              <div>Topik: {article.slug}</div>
              <div>Estimasi: ~{article.readingTimeMinutes} menit</div>
              <div>Status: Terbuka untuk Umum</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
