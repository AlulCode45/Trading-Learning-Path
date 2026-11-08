import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const isDark = document.documentElement.classList.contains('dark');

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

    const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    mermaid
      .render(uniqueId, chart.trim())
      .then(({ svg }) => {
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          setError('Gagal merender diagram alur.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 p-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs font-mono">
        <p className="font-semibold">{error}</p>
        <pre className="mt-2 text-[11px] overflow-x-auto text-slate-600 dark:text-slate-400">{chart}</pre>
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div className="my-4 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 text-center text-xs text-slate-500 animate-pulse">
        Memuat diagram alur...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-5 p-4 sm:p-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm flex justify-center items-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
