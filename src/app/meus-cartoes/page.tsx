
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabaseService } from '@/lib/supabase-service';
import type { CardData } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { isSupabaseConfigured } from '@/lib/supabase';

const Sidebar = () => {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'meus-cartoes-avatar-1');
    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col fixed h-full z-10">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">style</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-none tracking-tight">DigiCard</h1>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">SaaS Dashboard</p>
                </div>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary" href="/meus-cartoes">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>credit_card</span>
                    <span className="text-sm font-medium">Meus Cartões</span>
                </Link>
                <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="/templates/modelos">
                    <span className="material-symbols-outlined">layers</span>
                    <span className="text-sm font-medium">Modelos</span>
                </Link>
                <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">group</span>
                    <span className="text-sm font-medium">Contatos</span>
                </Link>
                <div className="pt-4 pb-2">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sistema</p>
                </div>
                <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-sm font-medium">Configurações</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 p-2">
                    {userAvatar && <Image alt="Avatar do usuário" className="size-9 rounded-full object-cover" src={userAvatar.imageUrl} width={36} height={36} />}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">Ricardo Silva</p>
                        <p className="text-xs text-slate-500 truncate">Plano Pro</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-lg">logout</span>
                </div>
            </div>
        </aside>
    );
};

const CardItem = ({ card, onDelete }: { card: CardData, onDelete: (id: string) => void }) => {
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group">
            <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${card.bannerUrl || card.avatarUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-white text-center">
                        <div className="size-16 rounded-full border-4 border-white/30 overflow-hidden mb-3">
                            <img src={card.avatarUrl} alt={card.fullName} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{card.fullName}</h3>
                        <p className="text-xs opacity-70 mt-1">{card.jobTitle}</p>
                    </div>
                </div>

                <div className="absolute top-3 right-3 flex gap-2">
                     <button 
                        onClick={(e) => { e.preventDefault(); onDelete(card.id); }}
                        className="bg-red-500/90 hover:bg-red-500 p-2 rounded-lg text-white shadow-lg transition-colors"
                        title="Excluir"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                    <span className="backdrop-blur-md bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded uppercase border border-white/20">
                        {card.template}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{card.fullName}</h3>
                <p className="text-xs text-slate-500 mt-1">
                    Editado {card.lastUpdated ? formatDistanceToNow(card.lastUpdated, { addSuffix: true, locale: ptBR }) : 'recentemente'}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button 
                        onClick={() => router.push(`/?id=${card.id}`)}
                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Editar
                    </button>
                    <button 
                        onClick={() => window.open(`/c/${card.id}`, '_blank')}
                        className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Ver
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function MeusCartoesPage() {
    const router = useRouter();
    const [cards, setCards] = useState<CardData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCards = async () => {
            setIsLoading(true);
            const data = await supabaseService.getAllCards();
            setCards(data);
            setIsLoading(false);
        };
        loadCards();
    }, []);

    const handleCreateNew = async () => {
        const newCard = await supabaseService.createNewCard();
        router.push(`/?id=${newCard.id}`);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este cartão?')) {
            await supabaseService.deleteCard(id);
            const data = await supabaseService.getAllCards();
            setCards(data);
        }
    };

    const filteredCards = cards.filter(c => 
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                 <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Meus Cartões</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-slate-500 font-medium">Gerencie sua identidade digital profissional.</p>
                            {isSupabaseConfigured ? (
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Supabase Online</span>
                            ) : (
                                <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Local Database</span>
                            )}
                        </div>
                    </div>
                    <Button 
                        onClick={handleCreateNew}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 h-auto"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        Criar Novo Cartão
                    </Button>
                </header>

                <div className="bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[300px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <Input 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm h-auto" 
                            placeholder="Pesquisar por nome ou cargo..." 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Sincronizando dados...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCards.map(card => (
                            <CardItem key={card.id} card={card} onDelete={handleDelete} />
                        ))}
                        
                        <div 
                            onClick={handleCreateNew}
                            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-8 cursor-pointer min-h-[300px]"
                        >
                            <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Novo Cartão</h3>
                            <p className="text-sm text-slate-500 text-center mt-2 font-medium">Crie uma nova versão para sua identidade.</p>
                        </div>
                    </div>
                )}

                {!isLoading && (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total de Cartões</span>
                                <span className="material-symbols-outlined text-primary">credit_card</span>
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{cards.length}</p>
                            <p className="text-xs text-slate-500 font-bold mt-1">Sincronizados via {isSupabaseConfigured ? 'Supabase' : 'JSON Local'}</p>
                        </div>
                        <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Storage</span>
                                <span className="material-symbols-outlined text-primary">database</span>
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">Ativo</p>
                            <p className="text-xs text-slate-500 font-bold mt-1">Conexão estável</p>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
