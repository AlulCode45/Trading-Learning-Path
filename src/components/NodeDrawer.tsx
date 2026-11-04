import React from 'react';
import { RoadmapNode } from '../types';
import { VisualDiagram } from './VisualDiagram';
import { X, CheckCircle, Clock, BookOpen, ExternalLink, ShieldCheck, CheckSquare, Square } from 'lucide-react';

interface NodeDrawerProps {
  node: RoadmapNode | null;
  onClose: () => void;
  onUpdateStatus: (nodeId: string, status: RoadmapNode['status']) => void;
  onToggleChecklist: (checklistId: string, isCompleted: boolean) => void;
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({
  node,
  onClose,
  onUpdateStatus,
  onToggleChecklist
}) => {
  if (!node) return null;

  const allChecklistsCompleted = node.checklists && node.checklists.length > 0
    ? node.checklists.every(c => c.is_completed)
    : false;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] lg:w-[580px] bg-[#0B101D] not-dark:bg-white border-l border-[#1E293B] not-dark:border-slate-200 shadow-2xl flex flex-col transition-colors">
      {/* Drawer Header */}
      <div className="p-5 border-b border-[#1E293B] not-dark:border-slate-200 bg-[#0F172A] not-dark:bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            Level {node.level}
          </span>
          <span className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500">Modul #{node.order_index}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-[#94A3B8] not-dark:text-slate-500 hover:text-[#F8FAFC] not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#F8FAFC] not-dark:text-slate-900 leading-snug">{node.title}</h2>
          <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-2 leading-relaxed">{node.summary}</p>
        </div>

        {/* Visual Concept Diagram */}
        <div className="pt-2">
          <VisualDiagram type={node.visual_type} />
        </div>

        {/* Lesson Theory & Detailed Content */}
        <div className="border-t border-[#1E293B] not-dark:border-slate-200 pt-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#10B981] mb-3 flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Materi Inti & Panduan Praktik</span>
          </h3>
          <div className="text-xs leading-relaxed text-[#CBD5E1] not-dark:text-slate-700 space-y-3 whitespace-pre-line bg-[#090D16] not-dark:bg-slate-50 p-4 rounded-xl border border-[#1E293B] not-dark:border-slate-200">
            {node.content}
          </div>
        </div>

        {/* Interactive Verification Checklist */}
        <div className="border-t border-[#1E293B] not-dark:border-slate-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Checklist Validasi Pemahaman</span>
            </h3>
            <span className="text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500">
              {node.checklists?.filter(c => c.is_completed).length || 0} / {node.checklists?.length || 0}
            </span>
          </div>

          <div className="space-y-2">
            {node.checklists && node.checklists.length > 0 ? (
              node.checklists.map(chk => (
                <div
                  key={chk.id}
                  onClick={() => onToggleChecklist(chk.id, !chk.is_completed)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer flex items-start space-x-3 transition-colors ${
                    chk.is_completed
                      ? 'bg-[#10B981]/10 not-dark:bg-[#10B981]/10 border-[#10B981]/40 text-[#F8FAFC] not-dark:text-slate-900'
                      : 'bg-[#0F172A] not-dark:bg-white border-[#1E293B] not-dark:border-slate-200 text-[#94A3B8] not-dark:text-slate-600 hover:border-[#334155]'
                  }`}
                >
                  <button className="mt-0.5 text-[#10B981] flex-shrink-0">
                    {chk.is_completed ? (
                      <CheckSquare className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#475569] not-dark:text-slate-400" />
                    )}
                  </button>
                  <span className={chk.is_completed ? 'line-through text-[#94A3B8] not-dark:text-slate-400' : ''}>
                    {chk.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#94A3B8] not-dark:text-slate-500">Tidak ada checklist khusus untuk modul ini.</p>
            )}
          </div>
        </div>

        {/* Curated Resources */}
        {node.resources && node.resources.length > 0 && (
          <div className="border-t border-[#1E293B] not-dark:border-slate-200 pt-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] not-dark:text-slate-900 mb-3">
              Bahan Bacaan &amp; Referensi Terverifikasi
            </h3>
            <div className="space-y-2">
              {node.resources.map(res => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 hover:border-[#38BDF8] text-xs flex items-center justify-between group transition-colors"
                >
                  <div>
                    <span className="font-medium text-[#F8FAFC] not-dark:text-slate-800 group-hover:text-[#38BDF8] transition-colors">
                      {res.title}
                    </span>
                    <div className="text-[10px] font-mono text-[#94A3B8] not-dark:text-slate-500 mt-0.5">
                      {res.type} {res.author ? `• Oleh ${res.author}` : ''}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#38BDF8] flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#1E293B] not-dark:border-slate-200 bg-[#0F172A] not-dark:bg-slate-50 flex items-center justify-between space-x-3">
        <button
          onClick={() => onUpdateStatus(node.id, node.status === 'in_progress' ? 'available' : 'in_progress')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center space-x-2 transition-all ${
            node.status === 'in_progress'
              ? 'bg-[#F59E0B]/15 border-[#F59E0B]/50 text-[#F59E0B]'
              : 'bg-[#1E293B] not-dark:bg-white border-[#334155] not-dark:border-slate-300 text-[#CBD5E1] not-dark:text-slate-700 hover:bg-[#334155] not-dark:hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{node.status === 'in_progress' ? 'Sedang Dipelajari' : 'Mulai Pelajari'}</span>
        </button>

        <button
          onClick={() => onUpdateStatus(node.id, node.status === 'completed' ? 'available' : 'completed')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm ${
            node.status === 'completed'
              ? 'bg-[#10B981] text-[#090D16]'
              : allChecklistsCompleted
              ? 'bg-[#10B981] hover:bg-[#059669] text-[#090D16] animate-pulse'
              : 'bg-[#10B981]/20 hover:bg-[#10B981] text-[#10B981] hover:text-[#090D16] border border-[#10B981]/40'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{node.status === 'completed' ? 'Selesai (Mastered)' : 'Tandai Selesai'}</span>
        </button>
      </div>
    </div>
  );
};
