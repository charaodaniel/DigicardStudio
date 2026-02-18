'use client';

type ToolsSidebarProps = {
    activeTool: string;
    onToolClick: (toolId: string) => void;
};

export default function ToolsSidebar({ activeTool, onToolClick }: ToolsSidebarProps) {
    const tools = [
        { id: 'modelos', label: 'Modelos', icon: 'dashboard_customize' },
        { id: 'conteudo', label: 'Conteúdo', icon: 'text_fields' },
        { id: 'estilo', label: 'Estilo', icon: 'palette' },
        { id: 'imagens', label: 'Imagens', icon: 'image' },
        { id: 'social', label: 'Social', icon: 'share' },
        { id: 'qrcode', label: 'QR Code', icon: 'qr_code_2' },
    ];

    return (
        <aside className="w-20 lg:w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-2">
                <p className="hidden lg:block text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2 px-3">Ferramentas</p>
                {tools.map(tool => (
                     <button 
                        key={tool.id}
                        onClick={() => onToolClick(tool.id)}
                        className={`group flex flex-col lg:flex-row items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                            activeTool === tool.id 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                        <span className={`material-symbols-outlined transition-colors ${
                            activeTool === tool.id ? 'text-primary' : 'text-slate-500 group-hover:text-primary'
                        }`}>{tool.icon}</span>
                        <span className={`hidden lg:block text-sm transition-colors ${
                            activeTool === tool.id
                            ? 'font-semibold text-primary' 
                            : 'font-medium text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}>{tool.label}</span>
                    </button>
                ))}
                
                <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-4"></div>
                <div className="hidden lg:block px-3 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Dica Pro</p>
                    <p className="text-[11px] leading-relaxed text-slate-400">Personalize a tipografia global para dar uma personalidade única ao seu cartão.</p>
                </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button className="flex items-center justify-center lg:justify-start gap-3 w-full px-3 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="hidden lg:block text-sm font-medium">Configurações</span>
                </button>
            </div>
        </aside>
    );
}
