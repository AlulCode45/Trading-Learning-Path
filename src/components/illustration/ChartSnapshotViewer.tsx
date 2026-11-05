import React, { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Upload,
  PenTool,
  Square,
  ArrowUpRight,
  RotateCcw,
  Download,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

export interface ChartSnapshotViewerProps {
  src?: string;
  caption?: string;
  sourceUrl?: string;
  allowUpload?: boolean;
  allowAnnotation?: boolean;
  className?: string;
}

// Converts standard TradingView snapshot URLs (e.g. https://www.tradingview.com/x/xyz/) to direct image URL
export function resolveTradingViewImageUrl(url?: string): string {
  if (!url) return '';
  const tvMatch = url.match(/tradingview\.com\/x\/([a-zA-Z0-9]+)/);
  if (tvMatch && tvMatch[1]) {
    const id = tvMatch[1].toLowerCase();
    const firstChar = id.charAt(0);
    return `https://s3.tradingview.com/snapshots/${firstChar}/${id}.png`;
  }
  return url;
}

export const ChartSnapshotViewer: React.FC<ChartSnapshotViewerProps> = ({
  src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  caption = 'Setup Analisis Likuiditas TradingView',
  sourceUrl,
  allowUpload = true,
  allowAnnotation = true,
  className = '',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(resolveTradingViewImageUrl(src));
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotationTool, setAnnotationTool] = useState<'pen' | 'rect' | 'arrow'>('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Synchronize when prop changes
  useEffect(() => {
    if (src) {
      setCurrentSrc(resolveTradingViewImageUrl(src));
    }
  }, [src]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setCurrentSrc(resolveTradingViewImageUrl(inputUrl.trim()));
      setInputUrl('');
    }
  };

  // Canvas Annotation Logic
  useEffect(() => {
    if (isAnnotating && canvasRef.current && imgRef.current) {
      const canvas = canvasRef.current;
      const img = imgRef.current;
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#F43F5E';
      }
    }
  }, [isAnnotating]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isAnnotating || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartX(x);
    setStartY(y);
    setIsDrawing(true);

    const ctx = canvasRef.current.getContext('2d');
    if (ctx && annotationTool === 'pen') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isAnnotating || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (annotationTool === 'pen') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isAnnotating || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext('2d');

    if (ctx) {
      if (annotationTool === 'rect') {
        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, x - startX, y - startY);
      } else if (annotationTool === 'arrow') {
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  return (
    <div className={`bg-[#060A12] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl overflow-hidden my-6 ${className}`}>
      {/* Header Toolbar */}
      <div className="bg-[#0B1120] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-blue-950/80 text-blue-400 border border-blue-800 rounded">
            <ImageIcon size={14} />
          </span>
          <div>
            <span className="text-xs font-mono font-bold text-white block">{caption}</span>
            <span className="text-[10px] font-mono text-slate-400">Chart Snapshot &amp; Visual Annotation</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {allowAnnotation && (
            <button
              onClick={() => setIsAnnotating(!isAnnotating)}
              className={`p-1.5 rounded text-xs flex items-center space-x-1.5 border font-mono transition-colors ${
                isAnnotating
                  ? 'bg-rose-950 border-rose-600 text-rose-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Anotasi Gambar (Coret-coret)"
            >
              <PenTool size={13} />
              <span className="hidden sm:inline">{isAnnotating ? 'Close Draw' : 'Annotate'}</span>
            </button>
          )}

          <button
            onClick={() => setIsLightboxOpen(true)}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded transition-colors"
            title="Perbesar / Lightbox"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Annotation Tool Palette (when annotating is active) */}
      {isAnnotating && (
        <div className="bg-[#020617] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-[11px]">Tool:</span>
            <button
              onClick={() => setAnnotationTool('pen')}
              className={`px-2 py-1 rounded border flex items-center space-x-1 ${
                annotationTool === 'pen' ? 'bg-rose-900/60 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <PenTool size={11} />
              <span>Pen (Merah)</span>
            </button>
            <button
              onClick={() => setAnnotationTool('rect')}
              className={`px-2 py-1 rounded border flex items-center space-x-1 ${
                annotationTool === 'rect' ? 'bg-amber-900/60 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Square size={11} />
              <span>Kotak FVG/OB (Kuning)</span>
            </button>
            <button
              onClick={() => setAnnotationTool('arrow')}
              className={`px-2 py-1 rounded border flex items-center space-x-1 ${
                annotationTool === 'arrow' ? 'bg-sky-900/60 border-sky-500 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <ArrowUpRight size={11} />
              <span>Panah BOS (Biru)</span>
            </button>
          </div>

          <button
            onClick={clearCanvas}
            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded flex items-center space-x-1"
          >
            <RotateCcw size={11} />
            <span>Reset Coretan</span>
          </button>
        </div>
      )}

      {/* Main Image & Canvas Area */}
      <div className="relative flex items-center justify-center bg-black/80 min-h-[260px] overflow-hidden">
        <img
          ref={imgRef}
          src={currentSrc}
          alt={caption}
          className="w-full max-h-[460px] object-contain select-none"
        />

        {/* Annotation Layer Canvas */}
        {isAnnotating && (
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="absolute inset-0 z-20 cursor-crosshair w-full h-full"
          />
        )}
      </div>

      {/* Uploader / URL Input Bar (for creators) */}
      {allowUpload && (
        <div className="bg-[#0B1120] border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center space-x-2 max-w-lg">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste link TradingView (contoh: https://www.tradingview.com/x/...)"
              className="flex-1 bg-[#020617] border border-slate-800 rounded px-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
            <button
              type="submit"
              className="bg-[#38BDF8] hover:bg-[#0284C7] text-black font-bold px-3 py-1.5 rounded transition-colors"
            >
              Load Link
            </button>
          </form>

          <label className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded cursor-pointer transition-colors">
            <Upload size={13} />
            <span>Upload File PNG/JPG</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono font-bold">{caption}</span>
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-400 hover:underline flex items-center space-x-1"
                >
                  <ExternalLink size={12} />
                  <span>Buka di TradingView</span>
                </a>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.2))}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-white"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono text-slate-400 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.2))}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-white"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-1.5 bg-rose-950 border border-rose-700 text-rose-300 rounded hover:bg-rose-900 ml-4 font-mono text-xs"
              >
                Tutup (ESC)
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <img
              src={currentSrc}
              alt={caption}
              style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
              className="max-h-[85vh] max-w-full object-contain select-none shadow-2xl rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
