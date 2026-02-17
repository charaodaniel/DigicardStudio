'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { CardData } from '@/lib/types';

type DigitalCardPreviewProps = {
  cardData: CardData;
};

export default function DigitalCardPreview({ cardData }: DigitalCardPreviewProps) {
  const { fullName, jobTitle, bio, avatarUrl, isVerified, links, themeColor } = cardData;

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="relative h-48 shrink-0"
        style={{ backgroundColor: themeColor }}
      >
        <div
          className="absolute inset-0 bg-[length:20px_20px] opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)' }}
          data-alt="Abstract subtle pattern"
        ></div>
        <div className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100">
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
        <p className="mt-1 text-center text-xs text-slate-400">
          {bio}
        </p>
        <div className="mt-8 grid w-full grid-cols-2 gap-3">
          {links.slice(0, 2).map(link => (
            <button key={link.id} className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <span className="material-symbols-outlined" style={{color: themeColor}}>{link.icon}</span>
              <span className="text-[10px] font-bold text-slate-700">{link.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 w-full space-y-2">
          {links.slice(2).map(link => (
            <div key={link.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                </div>
                <span className="text-xs font-bold text-slate-700">{link.label}</span>
              </div>
              <span className="material-symbols-outlined text-sm text-slate-400">arrow_forward_ios</span>
            </div>
          ))}
        </div>
        <button
          className="mt-10 w-full rounded-xl py-3 text-xs font-bold text-white shadow-lg"
          style={{ backgroundColor: themeColor, boxShadow: `0 4px 14px 0 ${themeColor}33` }}
        >
          {cardData.saveContactLabel}
        </button>
      </div>
    </div>
  );
}
