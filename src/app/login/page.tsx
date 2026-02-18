'use client';
import AuthForm from '@/components/auth-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-8 border border-slate-100 dark:border-slate-800">
        <AuthForm />
        
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Link href="/" className="text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600 block text-center">
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}
