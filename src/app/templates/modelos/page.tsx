import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const templates = [
  { name: 'Profissionais', slug: 'professionals', image: 'https://picsum.photos/seed/prof/400/300', available: true },
  { name: 'LinkedIn', slug: 'linkedin', image: 'https://picsum.photos/seed/link/400/300', available: false },
  { name: 'Instagram', slug: 'instagram', image: 'https://picsum.photos/seed/insta/400/300', available: false },
  { name: 'WhatsApp', slug: 'whatsapp', image: 'https://picsum.photos/seed/wapp/400/300', available: false },
  { name: 'Designer Studio', slug: 'designer-studio', image: 'https://picsum.photos/seed/design/400/300', available: false },
  { name: 'Executivo', slug: 'executive', image: 'https://picsum.photos/seed/exec/400/300', available: false },
  { name: 'Facebook', slug: 'facebook', image: 'https://picsum.photos/seed/fb/400/300', available: false },
  { name: 'Spotify', slug: 'spotify', image: 'https://picsum.photos/seed/spot/400/300', available: false },
  { name: 'YouTube', slug: 'youtube', image: 'https://picsum.photos/seed/yt/400/300', available: false },
  { name: 'TikTok', slug: 'tiktok', image: 'https://picsum.photos/seed/tt/400/300', available: false },
  { name: 'DigiCard Web', slug: 'digicard-web', image: 'https://picsum.photos/seed/digi/400/300', available: false },
];

export default function ModelosPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Galeria de Modelos</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore nossa coleção de modelos de cartões de visita digitais.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div key={template.slug} className={cn(!template.available && 'opacity-50 pointer-events-none')}>
              <Link href={template.available ? `/templates/modelos/${template.slug}` : '#'}>
                <Card className="overflow-hidden group cursor-pointer relative">
                  {!template.available && <Badge variant="secondary" className="absolute top-2 right-2 z-10">Em Breve</Badge>}
                  <div className="overflow-hidden">
                    <Image
                      src={template.image}
                      alt={`Preview do modelo ${template.name}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-foreground">{template.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
         <p className="text-center text-muted-foreground mt-12">Mais modelos serão adicionados em breve.</p>
      </div>
    </div>
  );
}
