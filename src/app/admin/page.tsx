'use client';
import { useState, useEffect, useMemo } from 'react';
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
  RefreshCcw,
  Calendar,
  Fingerprint,
  Mail,
  User as UserIcon,
  Check,
  X,
  Globe,
  Monitor,
  HardDrive,
  Link2
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
  DialogFooter
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
import type { UserRole, UserProfile, Plan, SystemSettings } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AuthForm from '@/components/auth-form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCards, setTotalCards] = useState(0);
  
  // Modais
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedViewUser, setSelectedViewUser] = useState<UserProfile | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Planos
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planForm, setPlanForm] = useState({
    name: '',
    price: '',
    cardLimit: '',
    industrialExport: false,
    checkoutUrl: ''
  });

  // Configurações do Sistema
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    id: 'global',
    siteName: 'DigiCard Studio',
    heroTitle: '',
    heroSubtitle: '',
    supportEmail: '',
    maintenanceMode: false
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
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
      
      const [allUsers, allPlans, cardCount, settings] = await Promise.all([
        supabaseService.getAllProfiles(),
        supabaseService.getAllPlans(),
        supabaseService.getTotalCardCount(),
        supabaseService.getSystemSettings()
      ]);
      
      setUsers(allUsers);
      setPlans(allPlans);
      setTotalCards(cardCount);
      setSystemSettings(settings);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erro ao carregar dados', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [router]);

  // Cálculo dinâmico de dados para os gráficos baseados nos usuários reais
  const chartData = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const now = new Date();
    
    // Gerar esqueleto dos últimos 7 meses
    const last7Months = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last7Months.push({ 
        name: months[d.getMonth()], 
        users: 0, 
        revenue: 0,
        monthNum: d.getMonth(),
        yearNum: d.getFullYear()
      });
    }

    // Processar usuários reais
    users.forEach(u => {
      if (!u.createdAt) return;
      const date = new Date(u.createdAt);
      const m = date.getMonth();
      const y = date.getFullYear();
      
      const target = last7Months.find(item => item.monthNum === m && item.yearNum === y);
      if (target) {
        target.users++;
        if (u.role === 'premium') {
          target.revenue += 29.90;
        }
      }
    });

    return last7Months;
  }, [users]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleUpdateRole = async (userId: string, role: UserRole) => {
    try {
      await supabaseService.updateProfileRole(userId, role);
      toast({ title: "Nível alterado", description: `O usuário agora possui o plano ${role}.` });
      loadData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro na sincronia", description: error.message });
    }
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja banir este usuário? O perfil será removido permanentemente.")) return;
    try {
      await supabaseService.deleteProfile(userId);
      toast({ title: "Usuário banido", description: "O perfil foi removido com sucesso." });
      loadData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao banir", description: error.message });
    }
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabaseService.savePlan({
        id: editingPlan?.id,
        ...planForm,
        active: true
      });
      toast({ title: editingPlan ? "Plano Atualizado" : "Plano Criado", description: `O plano ${planForm.name} foi processado.` });
      setIsPlanModalOpen(false);
      setEditingPlan(null);
      setPlanForm({ name: '', price: '', cardLimit: '', industrialExport: false, checkoutUrl: '' });
      loadData();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erro ao salvar plano', description: error.message });
    }
  };

  const handleSaveSystemSettings = async () => {
    try {
      setIsLoading(true);
      await supabaseService.updateSystemSettings(systemSettings);
      toast({ title: "Configurações Salvas", description: "As mudanças no sistema foram aplicadas com sucesso." });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erro ao salvar configurações', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name,
      price: plan.price,
      cardLimit: plan.cardLimit,
      industrialExport: plan.industrialExport,
      checkoutUrl: plan.checkoutUrl || ''
    });
    setIsPlanModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const premiumCount = users.filter(u => u.role === 'premium').length;
  const estimatedRevenue = chartData[chartData.length - 1].revenue;

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
            <h1 className="text-lg font-bold leading-none tracking-tight">{systemSettings.siteName || 'DigiCard'}</h1>
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
            <span className="text-sm font-semibold">Planos & Mercado Pago</span>
          </button>
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configurações</p>
          </div>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
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
               activeTab === 'users' ? 'Usuários & Permissões' : 
               activeTab === 'plans' ? 'Planos & Pagamentos' : 'Configurações de Marca'}
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
                  { title: 'Total Usuários', value: users.length.toLocaleString(), change: 'Tempo real', positive: true, icon: Users },
                  { title: 'Cartões Ativos', value: totalCards.toLocaleString(), change: 'Registros', positive: true, icon: Activity },
                  { title: 'Receita MRR', value: `R$ ${estimatedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, change: 'Estimativa', positive: true, icon: CreditCard },
                  { title: 'Assinantes Premium', value: premiumCount.toLocaleString(), change: `${((premiumCount/users.length)*100).toFixed(1)}% base`, positive: true, icon: Crown },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-sm dark:bg-slate-900">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.title}</CardTitle>
                      <stat.icon className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-black">{stat.value}</div>
                      <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle>Crescimento da Base</CardTitle>
                    <CardDescription>Novos usuários reais detectados por mês.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
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
                    <CardTitle>Receita Mensal Estimada</CardTitle>
                    <CardDescription>Crescimento do MRR baseado em planos ativos.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                          />
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
                  <Button variant="outline" onClick={loadData} disabled={isLoading} className="rounded-xl font-bold gap-2 border-slate-200 dark:border-slate-800">
                    <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
                    Sincronizar
                  </Button>

                  <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-xl font-bold gap-2"><Plus size={18} /> Novo Usuário</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-[2rem] p-8 border-none shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="sr-only">Adicionar Novo Usuário</DialogTitle>
                        <DialogDescription className="sr-only">Preencha o formulário para criar uma nova conta.</DialogDescription>
                      </DialogHeader>
                      <AuthForm onSuccess={() => { setIsAddUserModalOpen(false); loadData(); }} />
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
                        <TableCell><RoleBadge role={u.role} /></TableCell>
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
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreHorizontal size={16} /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-2xl border-none">
                              <DropdownMenuLabel className="text-xs uppercase tracking-widest text-slate-400">Ações de Gestão</DropdownMenuLabel>
                              <DropdownMenuItem className="gap-2 font-semibold text-sm cursor-pointer" onClick={() => { setSelectedViewUser(u); setIsDetailsModalOpen(true); }}>
                                Ver Detalhes do Perfil
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUpdateRole(u.id, 'premium')} className="gap-2 font-semibold text-sm text-indigo-500 cursor-pointer">Alterar para Premium</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateRole(u.id, 'admin')} className="gap-2 font-semibold text-sm text-orange-500 cursor-pointer">Tornar Administrador</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleBanUser(u.id)} className="gap-2 font-semibold text-sm text-red-500 font-bold cursor-pointer">Banir Permanentemente</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-slate-500 font-medium">Nenhum usuário encontrado.</TableCell>
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
                  <p className="text-sm text-slate-500">Configure limites técnicos e links de Checkout do Mercado Pago.</p>
                </div>
                
                <Dialog open={isPlanModalOpen} onOpenChange={(open) => {
                  setIsPlanModalOpen(open);
                  if (!open) { setEditingPlan(null); setPlanForm({ name: '', price: '', cardLimit: '', industrialExport: false, checkoutUrl: '' }); }
                }}>
                  <DialogTrigger asChild>
                    <Button className="rounded-xl font-bold gap-2"><Plus size={18} /> Novo Plano</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-[2rem] p-8 border-none shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-black">{editingPlan ? 'Editar Plano' : 'Criar Novo Plano'}</DialogTitle>
                      <DialogDescription>Defina as regras e o link de pagamento do Mercado Pago.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSavePlan} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="planName">Nome do Plano</Label>
                        <Input id="planName" value={planForm.name} onChange={e => setPlanForm({...planForm, name: e.target.value})} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planPrice">Preço Mensal (Texto)</Label>
                        <Input id="planPrice" value={planForm.price} onChange={e => setPlanForm({...planForm, price: e.target.value})} required placeholder="Ex: R$ 29,90" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planLimit">Limite de Cartões</Label>
                        <Input id="planLimit" value={planForm.cardLimit} onChange={e => setPlanForm({...planForm, cardLimit: e.target.value})} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checkoutUrl" className="flex items-center gap-2">Checkout Mercado Pago <Link2 size={14} className="text-primary" /></Label>
                        <Input id="checkoutUrl" value={planForm.checkoutUrl} onChange={e => setPlanForm({...planForm, checkoutUrl: e.target.value})} placeholder="https://www.mercadopago.com.br/checkout/v1/redirect/..." />
                        <p className="text-[10px] text-slate-400 font-medium">Cole aqui o link do seu botão de pagamento.</p>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-bold">Exportação Industrial</Label>
                          <p className="text-[10px] text-slate-500 font-medium">Permite baixar SVG/PNG em alta resolução.</p>
                        </div>
                        <Switch checked={planForm.industrialExport} onCheckedChange={val => setPlanForm({...planForm, industrialExport: val})} />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full h-12 rounded-xl font-bold">{editingPlan ? 'Salvar Alterações' : 'Publicar Plano'}</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className="border-none shadow-sm dark:bg-slate-900 flex flex-col relative overflow-hidden">
                    {plan.active && <div className="absolute top-0 right-0 p-4"><Badge className="bg-emerald-500 text-white uppercase text-[8px] font-black">Ativo</Badge></div>}
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">{plan.name === 'Premium' && <Crown size={18} className="text-indigo-500" />}{plan.name}</CardTitle>
                      <CardDescription>Limites para {plan.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-black">{plan.price}</span>
                        {plan.price !== 'Sob consulta' && plan.price !== 'R$ 0' && <span className="text-sm text-slate-500 font-bold">/mês</span>}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-medium">Limite de cartões</span>
                          <span className="font-bold">{plan.cardLimit}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-medium">Exportação Industrial</span>
                          <span className="font-bold">{plan.industrialExport ? <Check size={16} className="text-emerald-500" /> : <X size={16} className="text-red-500" />}</span>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Link de Integração</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 truncate bg-slate-50 dark:bg-slate-800 p-2 rounded">
                            <Link2 size={12} className="shrink-0" />
                            <span className="truncate">{plan.checkoutUrl || 'Não configurado'}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardHeader className="pt-0">
                      <Button variant="outline" className="w-full rounded-xl font-bold" onClick={() => openEditPlan(plan)}>Editar Configurações</Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-bold">Configurações Globais</h3>
                  <p className="text-sm text-slate-500">Personalize a identidade e o comportamento da plataforma.</p>
                </div>
                <Button onClick={handleSaveSystemSettings} className="rounded-xl font-bold gap-2 h-12 px-8">
                  <Check size={18} />
                  Salvar Alterações
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-none shadow-sm dark:bg-slate-900">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Globe className="size-4 text-primary" /> Identidade Visual & Branding
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome do Sistema</Label>
                          <Input 
                            value={systemSettings.siteName} 
                            onChange={e => setSystemSettings({...systemSettings, siteName: e.target.value})} 
                            placeholder="Ex: DigiCard Studio"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>E-mail de Suporte</Label>
                          <Input 
                            value={systemSettings.supportEmail} 
                            onChange={e => setSystemSettings({...systemSettings, supportEmail: e.target.value})} 
                            placeholder="suporte@exemplo.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm dark:bg-slate-900">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Monitor className="size-4 text-primary" /> Conteúdo da Landing Page
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Título Principal (Hero)</Label>
                        <Input 
                          value={systemSettings.heroTitle} 
                          onChange={e => setSystemSettings({...systemSettings, heroTitle: e.target.value})} 
                          placeholder="Ex: Seu Cartão, Reinventado."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtítulo (Hero)</Label>
                        <Textarea 
                          value={systemSettings.heroSubtitle} 
                          onChange={e => setSystemSettings({...systemSettings, heroSubtitle: e.target.value})} 
                          placeholder="Breve descrição sobre o produto..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border-none shadow-sm dark:bg-slate-900 border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <ShieldAlert className="size-4 text-orange-500" /> Controle de Estado
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-bold text-orange-700 dark:text-orange-400">Modo de Manutenção</Label>
                          <p className="text-[10px] text-orange-600 dark:text-orange-500 font-medium">Bloqueia o acesso de usuários.</p>
                        </div>
                        <Switch 
                          checked={systemSettings.maintenanceMode} 
                          onCheckedChange={val => setSystemSettings({...systemSettings, maintenanceMode: val})} 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Capacidade de Infra</Label>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-3">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="flex items-center gap-1"><HardDrive size={10} /> Storage em uso</span>
                            <span className="text-primary">12.4 GB / 50 GB</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[25%] rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes do Perfil */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-[2rem] p-0 border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-900">
          {selectedViewUser && (
            <div className="flex flex-col">
              <div className="h-32 bg-slate-100 dark:bg-slate-800 relative">
                <div className="absolute -bottom-12 left-8 p-1 bg-white dark:bg-slate-900 rounded-full shadow-lg">
                  <div className="size-24 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center border-4 border-white dark:border-slate-900">
                    {selectedViewUser.avatarUrl ? <img src={selectedViewUser.avatarUrl} className="w-full h-full object-cover" /> : <UserIcon size={40} className="text-slate-400" />}
                  </div>
                </div>
                <div className="absolute top-4 right-4"><RoleBadge role={selectedViewUser.role} /></div>
              </div>
              <div className="pt-16 px-8 pb-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{selectedViewUser.fullName || 'Sem Nome'}</h3>
                  <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1"><Mail size={14} /> ID de Usuário Ativo</p>
                </div>
                <Separator className="bg-slate-100 dark:bg-slate-800" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Fingerprint size={12} /> Identificador Único</p>
                    <p className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg text-slate-600 dark:text-slate-300 break-all border border-slate-100 dark:border-slate-800">{selectedViewUser.id}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12} /> Data de Cadastro</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{selectedViewUser.createdAt ? format(new Date(selectedViewUser.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Activity size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status da Conta</p>
                      <p className="text-sm font-black text-primary">ATIVA & SINCRONIZADA</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500 text-white font-bold">ONLINE</Badge>
                </div>
                <DialogFooter className="pt-4 gap-2">
                  <Button variant="outline" className="rounded-xl font-bold flex-1" onClick={() => setIsDetailsModalOpen(false)}>Fechar Visualização</Button>
                  <Button className="rounded-xl font-bold flex-1 bg-slate-900 dark:bg-white dark:text-slate-900">Acessar Painel do Usuário</Button>
                </DialogFooter>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
