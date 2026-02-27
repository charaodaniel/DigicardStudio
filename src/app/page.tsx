'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SiInstagram, SiSpotify, SiLinkedin, SiWhatsapp } from "react-icons/si";
import AuthModal from '@/components/auth-modal';
import { supabaseService } from '@/lib/supabase-service';
import type { SystemSettings, Plan } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check, Crown, Zap } from 'lucide-react';

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [settingsData, plansData] = await Promise.all([
        supabaseService.getSystemSettings(),
        supabaseService.getAllPlans()
      ]);
      setSettings(settingsData);
      setPlans(plansData.filter(p => p.active));
    };
    fetchData();
  }, []);

  const heroImage = PlaceHolderImages.find(img => img.id === 'template-digicard-web');
  const templateEx1 = PlaceHolderImages.find(img => img.id === 'template-executive');
  const templateEx2 = PlaceHolderImages.find(img => img.id === 'template-instagram');
  const templateEx3 = PlaceHolderImages.find(img => img.id === 'template-spotify');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-display">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">style</span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              {settings?.siteName || 'DigiCard Studio'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Funcionalidades</a>
            <a href="#templates" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Modelos</a>
            <a href="#pricing" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="font-bold"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Login
            </Button>
            <Link href="/editor">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 font-bold rounded-xl shadow-lg shadow-primary/20">
                Criar Agora
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Revolucione sua Identidade Profissional
              </div>
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                {settings?.heroTitle?.split(' ')[0]} <span className="text-primary">{settings?.heroTitle?.split(' ').slice(1).join(' ') || 'Visita, Reinventado.'}</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                {settings?.heroSubtitle || 'Crie cartões digitais interativos e gabaritos de impressão profissional em minutos. Onde a elegância digital encontra a precisão física.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/editor">
                  <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl transition-all active:scale-95">
                    Começar Gratuitamente
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold rounded-2xl border-2 hover:bg-slate-100 transition-all">
                    Ver Planos Premium
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-8 grayscale opacity-50">
                <SiInstagram size={24} />
                <SiSpotify size={24} />
                <SiLinkedin size={24} />
                <SiWhatsapp size={24} />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden transform lg:rotate-3 hover:rotate-0 transition-transform duration-700">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl} 
                    alt="DigiCard App Preview" 
                    width={800} 
                    height={600} 
                    className="rounded-[2rem] w-full"
                    data-ai-hint="saas dashboard mockup"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white border-y border-slate-200 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl font-black tracking-tighter text-slate-900">O Poder do Híbrido</h2>
              <p className="text-slate-500 font-medium text-lg">
                Esqueça os cartões de papel comuns. Oferecemos uma experiência completa para o mundo digital e ferramentas técnicas para produção física.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: 'qr_code_2', title: 'Identidade Digital', desc: 'Links interativos, redes sociais e VCard instantâneo para salvar contatos no celular.' },
                { icon: 'print', title: 'Gabaritos Técnicos', desc: 'Exporte PDFs em A4 com marcas de corte e sangria. 10 cartões por folha prontos para imprimir.' },
                { icon: 'auto_awesome', title: 'Design com IA', desc: 'Deixe nossa IA sugerir as melhores cores, fontes e templates para sua profissão.' },
              ].map((f, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white transition-all group">
                  <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl font-bold">{f.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black tracking-tighter">Escolha o seu nível</h2>
              <p className="text-slate-500 font-medium">Invista na sua presença profissional com o melhor custo-benefício.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative border-none shadow-xl rounded-[2.5rem] overflow-hidden flex flex-col ${plan.name === 'Premium' ? 'ring-2 ring-primary scale-105 z-10' : ''}`}>
                  {plan.name === 'Premium' && (
                    <div className="bg-primary text-white text-center py-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                      <Crown size={12} /> Mais Popular
                    </div>
                  )}
                  <CardHeader className="p-10 pb-0 text-center">
                    <CardTitle className="text-2xl font-black mb-2">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black">{plan.price}</span>
                      {plan.price.includes('R$') && <span className="text-slate-400 font-bold text-sm">/mês</span>}
                    </div>
                    <CardDescription className="pt-4 font-medium">
                      Ideal para {plan.name === 'Free' ? 'começar agora' : plan.name === 'Premium' ? 'profissionais em ascensão' : 'grandes empresas'}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-10 flex-1 flex flex-col">
                    <ul className="space-y-4 mb-10">
                      <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <Check size={18} className="text-emerald-500 shrink-0" /> {plan.cardLimit} {plan.cardLimit === '1' ? 'Cartão Ativo' : 'Cartões Ativos'}
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <Check size={18} className={plan.industrialExport ? 'text-emerald-500' : 'text-slate-300'} /> Exportação Industrial {plan.industrialExport ? '(SVG/PNG)' : '(Não incluído)'}
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <Check size={18} className="text-emerald-500" /> Bio com IA
                      </li>
                      <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <Check size={18} className="text-emerald-500" /> QR Code Dinâmico
                      </li>
                    </ul>
                    
                    <div className="mt-auto">
                      {plan.checkoutUrl ? (
                        <Button 
                          onClick={() => window.open(plan.checkoutUrl, '_blank')}
                          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-95 gap-2"
                        >
                          <Zap size={18} /> Assinar Agora
                        </Button>
                      ) : (
                        <Link href="/editor" className="w-full">
                          <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black text-lg hover:bg-slate-100 transition-all">
                            Começar Grátis
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section id="templates" className="py-24 px-6 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter">Modelos Inspiradores</h2>
                <p className="text-slate-500 font-medium text-lg max-w-md">Designs prontos inspirados em redes sociais e estilos executivos de luxo.</p>
              </div>
              <Link href="/editor">
                <Button className="font-bold rounded-xl h-12 px-8">Ver Todos os Modelos</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[templateEx1, templateEx2, templateEx3].map((t, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
                    {t && <Image src={t.imageUrl} alt={t.description} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                      <p className="text-white font-bold text-xl">{t?.description.split('Preview')[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <span className="material-symbols-outlined text-[300px] rotate-12">style</span>
            </div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">Pronto para elevar seu <br/> profissionalismo?</h2>
              <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já usam o {settings?.siteName || 'DigiCard Studio'} para causar a melhor primeira impressão.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/editor">
                  <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl bg-white text-primary hover:bg-slate-50 shadow-xl transition-all active:scale-95">
                    Criar meu Cartão Agora
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">style</span>
              <span className="text-xl font-black tracking-tight text-slate-900">{settings?.siteName || 'DigiCard Studio'}</span>
            </div>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              A próxima geração da identidade profissional híbrida. Simples, potente e elegante.
            </p>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Produto</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link href="/editor">Editor</Link></li>
              <li><Link href="#templates">Modelos</Link></li>
              <li><Link href="/meus-cartoes">Meus Cartões</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Empresa</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href={`mailto:${settings?.supportEmail || 'suporte@digicard.studio'}`}>Suporte</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Siga-nos</h4>
            <div className="flex items-center gap-4 text-slate-400">
              <SiInstagram size={20} className="hover:text-primary transition-colors cursor-pointer" />
              <SiLinkedin size={20} className="hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">© 2024 {settings?.siteName || 'DigiCard Studio'}. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
            <span>Brasil</span>
            <span>English (US)</span>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </div>
  );
}
