'use client';

export default function EditorFooter() {
    return (
        <footer className="h-10 bg-slate-900 text-slate-400 flex items-center justify-between px-6 text-[10px] font-medium shrink-0">
            <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">CTRL + Z</kbd> Desfazer</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">V</kbd> Selecionar</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">T</kbd> Texto</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-emerald-500">Alterações salvas automaticamente</span>
                <div className="h-3 w-[1px] bg-slate-700"></div>
                <span className="hover:text-white cursor-pointer transition-colors">Precisa de ajuda?</span>
            </div>
        </footer>
    );
}
