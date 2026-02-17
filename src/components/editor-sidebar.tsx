'use client';
import type { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import type { ActiveTool } from '@/app/page';

type EditorSidebarProps = {
  activeTool: ActiveTool;
  setActiveTool: Dispatch<SetStateAction<ActiveTool>>;
};

const tools: { id: ActiveTool; label: string; icon: string }[] = [
  { id: 'profile', label: 'Perfil e Info', icon: 'person' },
  { id: 'design', label: 'Design e Cores', icon: 'palette' },
  { id: 'print', label: 'Config. Impressão', icon: 'print' },
  { id: 'qr', label: 'Código QR', icon: 'qr_code_2' },
];

export default function EditorSidebar({ activeTool, setActiveTool }: EditorSidebarProps) {
  return (
    <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-2">
        <div className="mb-4">
          <h2 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Ferramentas de Edição
          </h2>
        </div>
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition-all hover:bg-slate-50',
              activeTool === tool.id && 'bg-primary/10 text-primary'
            )}
          >
            <span className="material-symbols-outlined">{tool.icon}</span>
            <span className="text-sm font-semibold">{tool.label}</span>
          </button>
        ))}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Atalhos
          </h2>
          <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-500 transition-all hover:text-slate-800">
            <span className="material-symbols-outlined text-lg">undo</span>
            <span className="text-sm">Desfazer</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-500 transition-all hover:text-slate-800">
            <span className="material-symbols-outlined text-lg">redo</span>
            <span className="text-sm">Refazer</span>
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-500">
          Uso de Armazenamento
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-[45%] bg-primary"></div>
        </div>
        <p className="mt-2 text-[10px] text-slate-400">
          4.5MB de 10MB utilizados
        </p>
      </div>
    </aside>
  );
}
