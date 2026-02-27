'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseService } from '@/lib/supabase-service';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  CreditCard, 
  Activity, 
  ShieldCheck, 
  Search, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownRight,
  Settings,
  LayoutDashboard,
  LogOut,
  Plus,
  Crown,
  ShieldAlert,
  UserCheck,
  RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import type { UserRole, UserProfile } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AuthForm from '@/components/auth-form';

const mockChartData = [
  { name: 'Jan', users: 400, revenue: 2400 },
  { name: 'Fev', users: 300, revenue: 1398 },
  { name: 'Mar', users: 200, revenue: 9800 },
  { name: 'Abr', users: 278, revenue: 3908 },
  { name: 'Mai', users: 189, revenue: 4800 },
  { name: 'Jun', users: 239, revenue: 3800 },
  { name: 'Jul', users: 349, revenue: 4300 },
];

const RoleBadge = ({ role }: { role: UserRole }) => {
  switch (role) {
    case 'super_admin':
      return <Badge className="bg-red-500 hover:bg-red-600 text-white font-black uppercase text-[9px] tracking-widest gap-1"><ShieldAlert size={10} /> Super Admin</Badge>;
    case 'admin':
      return <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-[9px] tracking-widest gap-1"><ShieldCheck size={10} /> Admin</Badge>;
    case 'premium':
      return <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold uppercase text-[9px] tracking-widest gap-1"><Crown size={10} /> Premium</Badge>;
    default:
      return <Badge variant="secondary" className="font-bold uppercase text-[9px] tracking-widest gap-1"><UserCheck size={10} /> Free</Badge>;
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const userProfile = await supabaseService.getUserProfile();
    
    if (!userProfile) {
      router.push('/login');
      return;
    }

    if (userProfile.role !== 'admin' && userProfile.role !== 'super_admin') {
      router.push('/meus-cartoes');
      return;
    }

    setProfile(userProfile);
    
    // Carrega usuários reais do banco
    const allUsers = await supabaseService.getAllProfiles();
    setUsers(allUsers);
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const filteredUsers = users.filter(u => 
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && profile === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary size-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">DigiCard</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Gestão SaaS</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-semibold">Visão Geral</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <Users size={18} />
            <span className="text-sm font-semibold">Usuários & Níveis</span>
          </button>
          <button 
            onClick={() => setActiveTab('plans')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'plans' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <CreditCard size={18} />
            <span className="text-sm font-semibold">Planos & Assinaturas</span>
          </button>
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configurações</p>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Settings size={18} />
            <span className="text-sm font-semibold">Configuração do Sistema</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/meus-cartoes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-2">
            <ArrowUpRight size={18} />
            <span className="text-sm font-semibold">Voltar ao App</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-semibold">Sair</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {activeTab === 'overview' ? 'Dashboard Administrativo' : 
               activeTab === 'users' ? 'Usuários & Permissões' : 'Planos & Assinaturas'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Controle central de acesso do DigiCard Studio.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <Input 
                placeholder="Filtrar por nome ou nível..." 
                className="pl-9 w-64 bg-slate-50 dark:bg-slate-800 border-none" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-primary/20">
              {profile?.fullName?.[0] || 'A'}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Usuários', value: users.length.toString(), change: '+12%', positive: true, icon: Users },
                  { title: 'Cartões Ativos', value: '3,492', change: '+18%', positive: true, icon: Activity },
                  { title: 'Receita Mensal', value: 'R$ 12.450', change: '+5%', positive: true, icon: CreditCard },
                  { title: 'Assinantes Premium', value: users.filter(u => u.role === 'premium').length.toString(), change: '+8%', positive: true, icon: Crown },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-sm dark:bg-slate-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.title}</CardTitle>
                      <stat.icon className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-black">{stat.value}</div>
                      <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {stat.change} vs mês anterior
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle>Crescimento da Base</CardTitle>
                    <CardDescription>Novos usuários cadastrados nos últimos meses.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Line type="monotone" dataKey="users" stroke="#5048e5" strokeWidth={3} dot={{ r: 4, fill: '#5048e5' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle>MRR - Receita Recurrente</CardTitle>
                    <CardDescription>Fluxo gerado por assinaturas Premium.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }} />
                          <Bar dataKey="revenue" fill="#5048e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">Membros & Permissões</h3>
                  <p className="text-sm text-slate-500">Gerencie os níveis de acesso e visualize perfis reais.</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={loadData}
                    disabled={isLoading}
                    className="rounded-xl font-bold gap-2 border-slate-200 dark:border-slate-800"
                  >
                    <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
                    Sincronizar
                  </Button>

                  <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-xl font-bold gap-2">
                        <Plus size={18} />
                        Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-[2rem] p-8 border-none shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="sr-only">Adicionar Novo Usuário</DialogTitle>
                        <DialogDescription className="sr-only">
                          Preencha o formulário para criar uma nova conta de usuário.
                        </DialogDescription>
                      </DialogHeader>
                      <AuthForm onSuccess={() => {
                        setIsAddUserModalOpen(false);
                        loadData();
                      }} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                      <TableHead className="font-bold text-xs uppercase tracking-widest py-4">Membro</TableHead>
                      <TableHead className="font-bold text-xs uppercase tracking-widest">Nível de Acesso</TableHead>
                      <TableHead className="font-bold text-xs uppercase tracking-widest">Status</TableHead>
                      <TableHead className="font-bold text-xs uppercase tracking-widest">Cadastro</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                      <TableRow key={u.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden font-bold text-slate-500 text-xs shrink-0">
                              {u.avatarUrl ? <img src={u.avatarUrl} className="w-full h-full object-cover" /> : u.fullName?.[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm truncate">{u.fullName || 'Sem Nome'}</p>
                              <p className="text-[10px] text-slate-400 font-mono truncate">{u.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <RoleBadge role={u.role} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-emerald-500" />
                            <span className="text-sm font-medium">Ativo</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500 font-medium">
                          {u.createdAt ? format(new Date(u.createdAt), "dd/MM/yyyy", { locale: ptBR }) : '---'}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-2xl border-none">
                              <DropdownMenuLabel className="text-xs uppercase tracking-widest text-slate-400">Ações de Gestão</DropdownMenuLabel>
                              <DropdownMenuItem className="gap-2 font-semibold text-sm">Ver Detalhes do Perfil</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 font-semibold text-sm text-indigo-500">Alterar para Premium</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 font-semibold text-sm text-orange-500">Tornar Administrador</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 font-semibold text-sm text-red-500 font-bold">Banir Permanentemente</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-slate-500 font-medium">
                          Nenhum usuário encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">Modelos de Negócio</h3>
                  <p className="text-sm text-slate-500">Configure limites técnicos e preços das assinaturas.</p>
                </div>
                <Button className="rounded-xl font-bold gap-2">
                  <Plus size={18} />
                  Novo Plano
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Free', price: 'R$ 0', users: users.filter(u => u.role === 'free').length, active: true },
                  { name: 'Premium', price: 'R$ 29,90', users: users.filter(u => u.role === 'premium').length, active: true },
                  { name: 'Enterprise', price: 'Sob consulta', users: users.filter(u => u.role === 'admin').length, active: true },
                ].map((plan, i) => (
                  <Card key={i} className="border-none shadow-sm dark:bg-slate-900 flex flex-col relative overflow-hidden">
                    {plan.active && <div className="absolute top-0 right-0 p-4"><Badge className="bg-emerald-500 text-white uppercase text-[8px] font-black">Ativo</Badge></div>}
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {plan.name === 'Premium' && <Crown size={18} className="text-indigo-500" />}
                        {plan.name}
                      </CardTitle>
                      <CardDescription>Limites e precificação para {plan.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-black">{plan.price}</span>
                        {plan.price !== 'Sob consulta' && <span className="text-sm text-slate-500 font-bold">/mês</span>}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-medium">Usuários ativos</span>
                          <span className="font-bold">{plan.users}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-medium">Limite de cartões</span>
                          <span className="font-bold">{plan.name === 'Free' ? '1' : plan.name === 'Premium' ? '10' : 'Ilimitado'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-medium">Exportação Industrial</span>
                          <span className="font-bold">{plan.name === 'Free' ? 'Não' : 'Sim'}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardHeader className="pt-0">
                      <Button variant="outline" className="w-full rounded-xl font-bold">Editar Configurações do Plano</Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
