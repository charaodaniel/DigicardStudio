'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link2, Mail, MessageCircle, Share2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

type ShareModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
};

export default function ShareModal({ isOpen, onOpenChange, url, title }: ShareModalProps) {
  const { toast } = useToast();
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(!!navigator.share);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({ 
      title: 'Link copiado!', 
      description: 'O link do cartão foi copiado para sua área de transferência.' 
    });
    onOpenChange(false);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="size-6 text-green-500" />,
      color: 'hover:bg-green-50',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank'),
    },
    {
      name: 'Telegram',
      icon: <Send className="size-6 text-sky-500" />,
      color: 'hover:bg-sky-50',
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank'),
    },
    {
      name: 'E-mail',
      icon: <Mail className="size-6 text-slate-500" />,
      color: 'hover:bg-slate-50',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: 'Copiar Link',
      icon: <Link2 className="size-6 text-blue-500" />,
      color: 'hover:bg-blue-50',
      action: handleCopyLink,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        onOpenChange(false);
      } catch (err) {
        // Ignora erro de cancelamento do usuário
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl p-6 border-none shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-black tracking-tight text-center">Compartilhar Cartão</DialogTitle>
          <DialogDescription className="text-center font-medium text-slate-500">
            Escolha como você deseja enviar sua identidade digital.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 py-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className={`flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all active:scale-95 ${option.color} group`}
            >
              <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                {option.icon}
              </div>
              <span className="text-sm font-bold text-slate-700">{option.name}</span>
            </button>
          ))}
        </div>

        {canNativeShare && (
          <Button 
            onClick={handleNativeShare} 
            variant="outline" 
            className="w-full gap-2 rounded-2xl h-14 font-bold border-2 hover:bg-slate-50"
          >
            <Share2 className="size-5" />
            Outras opções do dispositivo
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
