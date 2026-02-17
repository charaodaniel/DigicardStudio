'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function EditorHeader() {
  const avatar = PlaceHolderImages.find(img => img.id === 'avatar-1');

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-30 shrink-0">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl font-bold">style</span>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DigiCard Studio</h1>
            </div>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button className="px-4 py-1.5 text-sm font-semibold rounded bg-white dark:bg-slate-700 shadow-sm text-primary">Digital</button>
                <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Físico</button>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                    <span className="material-symbols-outlined text-xl">undo</span>
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                    <span className="material-symbols-outlined text-xl">redo</span>
                </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-lg">visibility</span>
                Preview
            </button>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                Publicar
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        AO VIVO
                    </span>
                    <span className="text-[10px] text-slate-400">v1.2.4</span>
                </div>
                {avatar && <Image className="w-10 h-10 rounded-full border-2 border-primary/20" alt="Avatar" src={avatar.imageUrl} width={40} height={40} />}
            </div>
        </div>
    </header>
  );
}
