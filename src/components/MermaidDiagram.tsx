import React, { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

// In-memory global SVG render cache to prevent re-render flickering
const mermaidCache = new Map<string, string>();

let mermaidInitialized = false;

function ensureMermaidInit() {
  if (mermaidInitialized) return;
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'neutral',
    securityLevel: 'loose',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    themeVariables: {
      darkMode: isDark,
      primaryColor: isDark ? '#1E293B' : '#F1F5F9',
      primaryTextColor: isDark ? '#F8FAFC' : '#0F172A',
      primaryBorderColor: isDark ? '#475569' : '#CBD5E1',
      lineColor: isDark ? '#94A3B8' : '#64748B',
      secondaryColor: isDark ? '#0F172A' : '#FFFFFF',
      tertiaryColor: isDark ? '#1E293B' : '#F8FAFC'
    }
  });
  mermaidInitialized = true;
}

// Function to clean up common Markdown / Mermaid syntax issues automatically
function sanitizeMermaidChart(rawChart: string): string {
  let cleaned = rawChart.trim();

  // Fix unquoted subgraphs like: subgraph Trader Ritel (95%) -> subgraph Trader_Ritel_95 ["Trader Ritel (95%)"]
  cleaned = cleaned
    .split('\n')
    .map((line) => {
      let l = line.trim();
      if (l.startsWith('subgraph ')) {
        const rest = l.replace(/^subgraph\s+/, '').trim();
        // If already correct: subgraph id ["Title"]
        if (/^[a-zA-Z0-9_-]+\s*\[".*"\]$/.test(rest)) {
          return line;
        }
        // If subgraph "Title"
        if (/^"[^"]+"$/.test(rest)) {
          const title = rest.replace(/^"|"$/g, '');
          const id = title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
          return line.replace(l, `subgraph ${id}["${title}"]`);
        }
        // If has spaces, parens, percentages, slashes
        if (/[ ()/%]/.test(rest) && !rest.includes('["')) {
          const id = rest.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
          return line.replace(l, `subgraph ${id}["${rest}"]`);
        }
      }

      // Auto-quote unquoted labels containing parentheses, e.g. Node{Text (with parens)} -> Node{"Text (with parens)"}
      // or Node[Text (with parens)] -> Node["Text (with parens)"]
      l = l.replace(/([a-zA-Z0-9_]+)\{([^{}"\n]*?\([^)\n]+?\)[^{}"\n]*?)\}/g, '$1{"$2"}');
      l = l.replace(/([a-zA-Z0-9_]+)\[([^\[\]"\n]*?\([^)\n]+?\)[^\[\]"\n]*?)\]/g, '$1["$2"]');
      return l;
    })
    .join('\n');

  return cleaned;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = React.memo(({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const sanitized = sanitizeMermaidChart(chart);

  // Check cache immediately on render to prevent initial empty flicker
  const [svgContent, setSvgContent] = useState<string>(() => mermaidCache.get(sanitized) || '');
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(!mermaidCache.has(sanitized));

  useEffect(() => {
    let isMounted = true;

    // If already cached, don't re-render and cause layout flashes
    if (mermaidCache.has(sanitized)) {
      setSvgContent(mermaidCache.get(sanitized)!);
      setIsRendering(false);
      return;
    }

    ensureMermaidInit();
    const renderId = `mermaid-${reactId}-${Math.floor(Math.random() * 10000)}`;

    mermaid
      .render(renderId, sanitized)
      .then(({ svg }) => {
        mermaidCache.set(sanitized, svg);
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
          setIsRendering(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          setError('Gagal merender diagram alur.');
          setIsRendering(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [sanitized, reactId]);

  if (error) {
    return (
      <div className="my-4 p-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs font-mono">
        <p className="font-semibold">{error}</p>
        <pre className="mt-2 text-[11px] overflow-x-auto text-slate-600 dark:text-slate-400">{chart}</pre>
      </div>
    );
  }

  return (
    <div className="my-5 relative rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs transition-opacity duration-300">
      {isRendering && !svgContent && (
        <div className="p-8 text-center text-xs font-mono text-slate-400 dark:text-zinc-500 animate-pulse">
          Menyusun diagram alur...
        </div>
      )}
      {svgContent && (
        <div
          ref={containerRef}
          className="p-4 sm:p-6 overflow-x-auto flex justify-center items-center [&_svg]:max-w-full [&_svg]:h-auto transition-opacity duration-300"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
});
