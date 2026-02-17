'use client';
import type { Dispatch, SetStateAction } from 'react';
import type { CardData } from '@/lib/types';
import { Input } from '@/components/ui/input';

export default function PropertiesSidebar({ cardData, setCardData }: { cardData: CardData, setCardData: Dispatch<SetStateAction<CardData>> }) {

    // This is a mocked version. A full implementation would require
    // state to track the selected element on the canvas.
    const selectedElement = 'button';
    const activeLink = cardData.links[0];

    const colors = [
        '#5048e5', '#e11d48', '#10b981', '#f59e0b', '#3b82f6'
    ];

    return (
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Propriedades</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">{selectedElement}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{backgroundColor: activeLink.color}}>
                        <span className="material-symbols-outlined text-sm">{activeLink.icon}</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{activeLink.label}</p>
                        <p className="text-[10px] text-slate-500">Elemento Ativo</p>
                    </div>
                    <button className="ml-auto material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors">delete</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
                <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conteúdo</label>
                    <div className="space-y-3">
                        <div className="space-y-1.5">
                            <p className="text-[11px] font-medium text-slate-400 ml-1">Rótulo do Botão</p>
                            <Input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="text" defaultValue={activeLink.label}/>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-[11px] font-medium text-slate-400 ml-1">Link / Telefone</p>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm text-slate-400">link</span>
                                <Input className="w-full pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary" type="text" defaultValue={activeLink.value}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estilo e Cor</label>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <p className="text-[11px] font-medium text-slate-400 ml-1">Cor do Fundo</p>
                            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="w-5 h-5 rounded" style={{backgroundColor: activeLink.color}}></div>
                                <span className="text-[11px] font-mono">{activeLink.color}</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-[11px] font-medium text-slate-400 ml-1">Cor do Texto</p>
                            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="w-5 h-5 rounded bg-white border border-slate-200"></div>
                                <span className="text-[11px] font-mono">#FFFFFF</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-[11px] font-medium text-slate-400 ml-1">Arredondamento</p>
                        <div className="flex items-center gap-4">
                            <input className="flex-1 accent-primary" max="32" min="0" type="range" defaultValue="16"/>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">16px</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Página Geral</label>
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">dark_mode</span>
                            <span className="text-xs font-semibold">Modo Escuro</span>
                        </div>
                        <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer p-0.5">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-[100%]"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[11px] font-medium text-slate-400 ml-1">Cor Primária do Tema</p>
                        <div className="flex gap-2">
                            {colors.map(color => (
                                <button 
                                    key={color} 
                                    className={`w-8 h-8 rounded-full`}
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: cardData.themeColor === color ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px ${color}` : ''
                                    }}
                                />
                            ))}
                            <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xs text-white">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Novo Elemento
                </button>
            </div>
        </aside>
    );
}
