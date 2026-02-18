'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AuthForm from './auth-form';
import { useRouter } from 'next/navigation';

type AuthModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const router = useRouter();

  const handleSuccess = () => {
    onOpenChange(false);
    router.push('/meus-cartoes');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2rem] p-8 border-none shadow-2xl">
        <AuthForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
