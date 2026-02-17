'use client';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

const Card = ({ title, lastEdited, status, bgImageUrl, cardData }) => {
    const cardBg1 = PlaceHolderImages.find(p => p.id === 'meus-cartoes-card-bg-1');
    const cardBg2 = PlaceHolderImages.find(p => p.id === 'meus-cartoes-card-bg-2');
    const cardBg3 = PlaceHolderImages.find(p => p.id === 'meus-cartoes-card-bg-3');
    
    let image = cardBg1?.imageUrl;
    if (bgImageUrl === 'meus-cartoes-card-bg-2') image = cardBg2?.imageUrl;
    if (bgImageUrl === 'meus-cartoes-card-bg-3') image = cardBg3?.imageUrl;


    return (
        <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group">
            <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                {cardData === 'card1' && image && (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex flex-col justify-end text-white" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                            <div className="size-8 bg-white rounded flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-indigo-600 text-sm">qr_code_2</span>
                            </div>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Digital Card</p>
                            <p className="text-sm font-bold">Ricardo Silva</p>
                        </div>
                    </div>
                )}
                {cardData === 'card2' && image && (
                     <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 p-6 flex flex-col items-center justify-center text-white" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="size-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-4 border border-white/30">
                            <span className="material-symbols-outlined text-3xl">person</span>
                        </div>
                        <p className="text-lg font-black tracking-tighter">Freelancer Pro</p>
                    </div>
                )}
                 {cardData === 'card3' && image && (
                     <div className="absolute inset-0 bg-primary p-6 flex flex-col justify-between text-white" style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <span className="material-symbols-outlined text-4xl font-light">language</span>
                        <div>
                            <p className="text-xl font-black">Startup Pitch</p>
                            <p className="text-xs opacity-70">digicard.web/pitch-1</p>
                        </div>
                    </div>
                )}


                <div className="absolute top-3 right-3">
                    <span className={`backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase ${status === 'Ativo' ? 'bg-green-500/90' : 'bg-amber-500/90'}`}>{status}</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{title}</h3>
                <p className="text-xs text-slate-500 mt-1">{lastEdited}</p>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/5 group/btn transition-colors">
                        <span className="material-symbols-outlined text-slate-400 group-hover/btn:text-primary transition-colors text-xl">edit</span>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover/btn:text-primary transition-colors">Editar</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/5 group/btn transition-colors">
                        <span className="material-symbols-outlined text-slate-400 group-hover/btn:text-primary transition-colors text-xl">share</span>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover/btn:text-primary transition-colors">Enviar</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/5 group/btn transition-colors">
                        <span className="material-symbols-outlined text-slate-400 group-hover/btn:text-primary transition-colors text-xl">insights</span>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover/btn:text-primary transition-colors">Análise</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function MeusCartoesPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                 <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Meus Cartões</h2>
                        <p className="text-slate-500 mt-1 font-medium">Gerencie e compartilhe sua identidade digital profissional.</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 h-auto">
                        <span className="material-symbols-outlined">add_circle</span>
                        Criar Novo Cartão
                    </Button>
                </header>

                <div className="bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[300px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <Input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm h-auto" placeholder="Pesquisar por nome do cartão..." type="text" />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                        <Button variant="ghost" className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold whitespace-nowrap h-auto hover:bg-primary/20">Todos</Button>
                        <Button variant="ghost" className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium whitespace-nowrap h-auto">Ativos</Button>
                        <Button variant="ghost" className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium whitespace-nowrap h-auto">Rascunhos</Button>
                        <Button variant="ghost" className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium whitespace-nowrap h-auto">Inativos</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <Card title="Cartão Executivo V1" lastEdited="Última edição: 2 horas atrás" status="Ativo" bgImageUrl="meus-cartoes-card-bg-1" cardData="card1" />
                    <Card title="Portfolio Design" lastEdited="Última edição: Ontem" status="Rascunho" bgImageUrl="meus-cartoes-card-bg-2" cardData="card2" />
                    <Card title="Comercial / Vendas" lastEdited="Última edição: 4 dias atrás" status="Ativo" bgImageUrl="meus-cartoes-card-bg-3" cardData="card3" />
                    
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-8 cursor-pointer">
                        <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Novo Cartão</h3>
                        <p className="text-sm text-slate-500 text-center mt-2 font-medium">Crie uma nova versão para sua identidade.</p>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Visualizações Totais</span>
                            <span className="material-symbols-outlined text-primary">visibility</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">12.482</p>
                        <p className="text-xs text-green-500 font-bold mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            +12% este mês
                        </p>
                    </div>
                    <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Novos Contatos</span>
                            <span className="material-symbols-outlined text-primary">person_add</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">458</p>
                        <p className="text-xs text-green-500 font-bold mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            +5% este mês
                        </p>
                    </div>
                    <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">CTR Médio</span>
                            <span className="material-symbols-outlined text-primary">ads_click</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">8.2%</p>
                        <p className="text-xs text-slate-500 font-bold mt-1">Média do mercado: 4.1%</p>
                    </div>
                </div>

            </main>
        </div>
    );
}
