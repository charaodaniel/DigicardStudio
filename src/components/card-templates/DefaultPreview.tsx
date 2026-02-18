'use client';
import Image from 'next/image';
import type { CardData } from '@/lib/types';
import { formatHref } from '@/lib/utils';

type DefaultPreviewProps = {
  cardData: CardData;
  onShare: () => void;
};

export default function DefaultPreview({ cardData, onShare }: DefaultPreviewProps) {
  const { fullName, jobTitle, bio, avatarUrl, isVerified, links, themeColor, saveContactLabel } = cardData;

  return (
    <div className="flex min-h-full w-full flex-col bg-white overflow-y-auto no-scrollbar pb-20 relative">
      <div
        className="relative h-48 shrink-0"
        style={{ backgroundColor: themeColor }}
      >
        <button 
          onClick={onShare}
          className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/30 transition-colors"
        >
          <span className="material-symbols-outlined text-white text-xl">share</span>
        </button>
        <div
          className="absolute inset-0 bg-[length:20px_20px] opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)' }}
        ></div>
        <div className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
          <Image
            src={avatarUrl}
            alt="Profile"
            className="h-full w-full object-cover"
            width={96}
            height={96}
            data-ai-hint="professional photo"
          />
        </div>
      </div>
      <div className="mt-14 flex flex-col items-center px-6">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xl font-bold text-slate-800">{fullName}</h3>
          {isVerified && (
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1", color: themeColor }}
            >
              verified
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-slate-500">{jobTitle}</p>
        <p className="mt-2 text-center text-sm text-slate-400 leading-relaxed max-w-[300px]">
          {bio}
        </p>
        <div className="mt-8 grid w-full grid-cols-2 gap-3">
          {links.slice(0, 2).map(link => (
            <a 
              key={link.id} 
              href={formatHref(link.type, link.value)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined" style={{color: link.color || themeColor}}>{link.icon}</span>
              <span className="text-[10px] font-bold text-slate-700">{link.label}</span>
            </a>
          ))}
        </div>
        <div className="mt-6 w-full space-y-2">
          {links.slice(2).map(link => (
            <a 
              key={link.id} 
              href={formatHref(link.type, link.value)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{backgroundColor: link.color || themeColor}}>
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                </div>
                <span className="text-xs font-bold text-slate-700">{link.label}</span>
              </div>
              <span className="material-symbols-outlined text-sm text-slate-400">arrow_forward_ios</span>
            </a>
          ))}
        </div>
        <button
          className="mt-10 w-full rounded-xl py-4 text-sm font-bold text-white shadow-lg active:scale-[0.98] transition-all"
          style={{ backgroundColor: themeColor, boxShadow: `0 8px 20px -4px ${themeColor}66` }}
        >
          {saveContactLabel}
        </button>
      </div>
    </div>
  );
}
