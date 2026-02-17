'use client';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  aiTemplateSuggestion,
  type AiTemplateSuggestionOutput,
} from '@/ai/flows/ai-template-suggestion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { CardData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  profession: z.string().min(2, 'Informe sua profissão.'),
  industry: z.string().min(2, 'Informe sua indústria.'),
  desiredStyle: z.string().min(2, 'Descreva o estilo desejado.'),
});

type AIAssistantProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCardData: Dispatch<SetStateAction<CardData>>;
};

export default function AIAssistant({
  isOpen,
  setIsOpen,
  setCardData,
}: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] =
    useState<AiTemplateSuggestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profession: '',
      industry: '',
      desiredStyle: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await aiTemplateSuggestion(values);
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        variant: 'destructive',
        title: 'Ocorreu um erro',
        description:
          'Não foi possível gerar a sugestão. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function applySuggestion() {
    if (!suggestion) return;

    // Capitalize font name
    const fontName = suggestion.themeFont.charAt(0).toUpperCase() + suggestion.themeFont.slice(1);

    setCardData(prev => ({
      ...prev,
      template: suggestion.templateName.toLowerCase().replace(/ /g, '-'),
      themeColor: suggestion.themeColor,
      fontFamily: fontName,
    }));
    setIsOpen(false);
    setSuggestion(null);
    form.reset();
    toast({
      title: 'Design Aplicado!',
      description: `O modelo "${suggestion.templateName}" foi aplicado ao seu cartão.`,
    });
  }

  const suggestionImage = PlaceHolderImages.find(
    p => p.id === `template-${suggestion?.templateName.toLowerCase().replace(/ /g, '-')}`
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              auto_awesome
            </span>
            Assistente de Design IA
          </DialogTitle>
          <DialogDescription>
            Descreva suas preferências e nossa IA irá sugerir um design
            exclusivo para seu cartão.
          </DialogDescription>
        </DialogHeader>
        {!suggestion && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua Profissão</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Engenheiro de Software" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua Indústria</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Tecnologia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estilo Desejado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Minimalista, Moderno" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin mr-2">
                        progress_activity
                      </span>
                      Gerando Sugestão...
                    </>
                  ) : (
                    'Gerar Sugestão de Design'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        {suggestion && (
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Sugestão da IA para você:</h4>
            <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
              {suggestionImage && (
                <img
                  src={suggestionImage.imageUrl}
                  alt={suggestion.templateName}
                  className="aspect-video w-full rounded-md object-cover mb-4"
                />
              )}
              <h5 className="font-semibold">{suggestion.templateName}</h5>
              <p className="text-sm text-muted-foreground">
                {suggestion.templateDescription}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-muted-foreground">
                    COR DO TEMA
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-5 w-5 rounded-full border"
                      style={{ backgroundColor: suggestion.themeColor }}
                    />
                    <span className="font-mono text-sm">
                      {suggestion.themeColor}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground">
                    FONTE
                  </p>
                  <p className="text-sm font-semibold">{suggestion.themeFont}</p>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:justify-between">
              <Button
                variant="ghost"
                onClick={() => {
                  setSuggestion(null);
                  form.reset();
                }}
              >
                Gerar Outra
              </Button>
              <Button onClick={applySuggestion}>Aplicar este Design</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
