'use client';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function AppHeader() {
  const avatar = PlaceHolderImages.find(img => img.id === 'avatar-1');

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined text-2xl">style</span>
        </div>
        <div>
          <h1 className="font-headline text-lg font-bold leading-tight">
            DigiCard Studio
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Projeto: Cartão Executivo 2024
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <nav className="mr-2 hidden items-center gap-6 border-r border-slate-200 pr-6 md:flex">
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            href="/meus-cartoes"
          >
            Meus Cartões
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            href="/templates/modelos"
          >
            Modelos
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-200 bg-white text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Salvar
          </Button>
          <Button className="bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
            <span className="material-symbols-outlined text-sm">ios_share</span>
            Exportar
          </Button>
          <div className="ml-2 h-10 w-10 overflow-hidden rounded-full border border-slate-300 bg-slate-200">
            <Avatar>
              <AvatarImage src={avatar?.imageUrl} alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
