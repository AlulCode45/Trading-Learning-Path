import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Code, 
  FileCode, 
  Quote, 
  Table, 
  AlertTriangle, 
  Info, 
  CheckSquare, 
  Eye, 
  Edit3, 
  Columns, 
  Sparkles,
  Minus
} from 'lucide-react';

interface WysiwygMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onOpenChartBuilder?: () => void;
}

export const WysiwygMarkdownEditor: React.FC<WysiwygMarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Tulis materi modul kurikulum Anda di sini...',
  minHeight = '280px',
  onOpenChartBuilder
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper insertion function with cursor selection preservation
  const insertText = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;
    const replacement = `${before}${selectedText}${after}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  const insertTable = () => {
    const tableTemplate = `\n| Parameter | Aturan Teknis | Validasi |\n| :--- | :--- | :--- |\n| Timeframe HTF | 4 Jam / Daily | Menentukan Tren Utama |\n| Setup Zone | Order Block / FVG | Menunggu Rejection Candle |\n| Invalidasi | Di Luar Swing Point | Cut Loss Disiplin |\n\n`;
    insertText(tableTemplate);
  };

  const insertCallout = (type: 'info' | 'warning' | 'tip') => {
    let callout = '';
    if (type === 'tip') {
      callout = `\n> [!TIP]\n> **Pro Tip Institusi**: Konfirmasi selalu penutupan body candle pada timeframe eksekusi sebelum entry limit order.\n\n`;
    } else if (type === 'warning') {
      callout = `\n> [!WARNING]\n> **Aturan Invalidasi Modal**: Batasi risiko maksimum 1% per posisi dan jangan pernah menggeser Stop Loss menjauh.\n\n`;
    } else {
      callout = `\n> [!NOTE]\n> **Mekanika Lelang Pasar**: Perhatikan apakah likuiditas di sisi berlawanan telah tersapu (*swept*) sebelum momentum berbalik.\n\n`;
    }
    insertText(callout);
  };

  return (
    <div className="border border-slate-300 dark:border-zinc-700 rounded-2xl overflow-hidden bg-white dark:bg-[#0A0D14] shadow-xs">
      {/* Editor Main Toolbar */}
      <div className="bg-slate-100 dark:bg-[#121722] border-b border-slate-200 dark:border-zinc-800 p-2 flex flex-wrap items-center justify-between gap-1.5 select-none">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <button
            type="button"
            onClick={() => insertLinePrefix('# ')}
            title="Heading 1"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertLinePrefix('## ')}
            title="Heading 2"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertLinePrefix('### ')}
            title="Heading 3"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-slate-300 dark:bg-zinc-700 mx-1" />

          {/* Inline Formats */}
          <button
            type="button"
            onClick={() => insertText('**', '**', 'teks tebal')}
            title="Tebal (Bold)"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('*', '*', 'teks miring')}
            title="Miring (Italic)"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('~~', '~~', 'coret')}
            title="Coret (Strikethrough)"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('`', '`', 'kode_istilah')}
            title="Kode / Istilah"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-slate-300 dark:bg-zinc-700 mx-1" />

          {/* Blocks */}
          <button
            type="button"
            onClick={() => insertLinePrefix('- ')}
            title="Daftar Poin"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertLinePrefix('1. ')}
            title="Daftar Nomor"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertLinePrefix('- [ ] ')}
            title="Checklist Checklist"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertLinePrefix('> ')}
            title="Kutipan (Quote)"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={insertTable}
            title="Sisipkan Tabel Matriks"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('\n```text\n', '\n```\n', '// Blok Catatan Teknis')}
            title="Blok Kode Lengkap"
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-slate-300 dark:bg-zinc-700 mx-1" />

          {/* Quick Callouts */}
          <button
            type="button"
            onClick={() => insertCallout('tip')}
            title="Sisipkan Kotak Pro Tip"
            className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 rounded-md text-[10px] font-mono font-bold flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>+ Tip</span>
          </button>

          <button
            type="button"
            onClick={() => insertCallout('warning')}
            title="Sisipkan Peringatan Risiko"
            className="px-2 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800 rounded-md text-[10px] font-mono font-bold flex items-center space-x-1"
          >
            <AlertTriangle className="w-3 h-3 text-rose-500" />
            <span>+ Risiko</span>
          </button>

          {/* Chart Builder Trigger Button */}
          {onOpenChartBuilder && (
            <button
              type="button"
              onClick={onOpenChartBuilder}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-md text-[10px] font-mono flex items-center space-x-1 shadow-2xs transition-colors ml-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Buka Chart Builder 📊</span>
            </button>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1 bg-slate-200 dark:bg-zinc-800 p-0.5 rounded-lg text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              viewMode === 'edit'
                ? 'bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              viewMode === 'split'
                ? 'bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Split</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              viewMode === 'preview'
                ? 'bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Pratinjau</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className={`grid ${viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-zinc-800' : 'grid-cols-1'}`}>
        {/* Textarea Input */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              style={{ minHeight }}
              className="w-full h-full p-4 bg-transparent outline-none text-xs sm:text-sm font-mono text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 resize-y leading-relaxed"
            />
          </div>
        )}

        {/* Live Preview */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div
            style={{ minHeight }}
            className="p-4 bg-slate-50/60 dark:bg-[#060910] overflow-y-auto prose dark:prose-invert max-w-none text-xs sm:text-sm"
          >
            {value.trim() ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-3 mb-2 pb-1 border-b border-slate-200 dark:border-zinc-800">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-3 mb-1.5">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#10B981] mt-2 mb-1 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      <span>{children}</span>
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-zinc-300 mb-2.5">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside ml-4 space-y-1 my-2 text-xs text-slate-700 dark:text-zinc-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-outside ml-4 space-y-1 my-2 text-xs text-slate-700 dark:text-zinc-300">
                      {children}
                    </ol>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-3 border border-slate-200 dark:border-zinc-800 rounded-xl">
                      <table className="w-full text-[11px] font-mono text-left divide-y divide-slate-200 dark:divide-zinc-800">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="bg-slate-100 dark:bg-[#121722] px-3 py-2 font-bold text-slate-900 dark:text-white">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-1.5 border-t border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300">
                      {children}
                    </td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-500/5 px-3 py-2 my-2.5 rounded-r-lg text-xs italic text-slate-800 dark:text-zinc-200">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-200/80 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded text-[11px] font-mono">
                      {children}
                    </code>
                  )
                }}
              >
                {value}
              </ReactMarkdown>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 dark:text-zinc-600 font-mono text-xs italic">
                Pratinjau konten markdown akan muncul di sini...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
