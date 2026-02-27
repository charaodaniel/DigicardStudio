# DigiCard Studio 📇✨

O **DigiCard Studio** é uma plataforma SaaS (Software as a Service) de arquitetura híbrida projetada para a gestão de identidades profissionais. O sistema permite a transição fluida entre perfis digitais interativos e gabaritos técnicos de alta fidelidade para produção física em larga escala.

---

## 🏗️ Arquitetura do Sistema

A plataforma é construída sobre uma pilha tecnológica moderna focada em performance, segurança e escalabilidade:

### Core & Framework
- **Next.js 15 (App Router)**: Utilização de Server Components para otimização de SEO nas páginas públicas e Client Components para o editor em tempo real.
- **TypeScript**: Tipagem rigorosa em toda a aplicação para garantir a integridade dos dados de design.
- **Tailwind CSS**: Sistema de design baseado em utilitários para interface responsiva e modo escuro nativo.

### Backend & Segurança (BaaS)
- **Supabase (PostgreSQL)**: Persistência de dados relacionais para cartões e perfis.
- **RBAC (Role-Based Access Control)**: Sistema de permissões hierárquico implementado via Row Level Security (RLS), suportando:
  - `super_admin`: Acesso total ao sistema e banco de dados.
  - `admin`: Gestão de usuários e moderação de conteúdo.
  - `premium`: Acesso a templates exclusivos e exportação industrial.
  - `free`: Nível de entrada com limites de criação de cartões.

### Inteligência Artificial
- **Genkit 1.x & Google Gemini**: Fluxos de IA para sugestões inteligentes de design baseadas em processamento de linguagem natural (NLP).

---

## 🛠️ Motores de Renderização e Exportação

O diferencial técnico do DigiCard Studio reside em sua capacidade de processar ativos gráficos para diferentes mídias:

### 1. Renderização Digital (Web-First)
- **Flexbox Scroll Engine**: Arquitetura CSS `flex-1 min-h-0` para garantir rolagem independente de conteúdo em mockups de dispositivos móveis.
- **QR Code Inteligente**: Geração dinâmica de códigos de resposta rápida (API-driven) integrados ao final do fluxo de leitura do usuário.

### 2. Exportação Industrial (Print-Ready)
- **Motor de 350 DPI**: Processamento de planos vetoriais via HTML5 Canvas API com interpolação de alta qualidade para saída em PNG de alta resolução.
- **SVG Vetorial Autocontido**: Geração de arquivos XML/SVG 1.1 com conversão de imagens remotas para **Base64 (Data URI)**, garantindo compatibilidade total com softwares de Plotters (Cricut, Silhouette, Roland).
- **Layout A4 "Aberto"**: Algoritmo de posicionamento milimétrico para impressão em grade (10 cartões por folha), com marcas de sangria e compensação de corte.

---

## 📋 Requisitos e Instalação

1. **Dependências**:
   ```bash
   npm install
   ```

2. **Variáveis de Ambiente (.env)**:
   - `NEXT_PUBLIC_SUPABASE_URL`: Endpoint do projeto Supabase.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública de anonimato.
   - `GOOGLE_GENAI_API_KEY`: Chave para o motor Genkit/Gemini.

3. **Banco de Dados**:
   - Execute o script `supabase_setup.sql` localizado na pasta `/docs` para provisionar as tabelas, tipos ENUM e políticas RLS.

---

## 🚀 Roadmap Técnico
- [x] Implementação de Hierarquia de Usuários (RBAC).
- [x] Motor de exportação SVG para Plotters.
- [x] Filtros contextuais na biblioteca de modelos (Digital vs Físico).
- [x] Painel Administrativo Geral com métricas MRR.
- [ ] Integração com Gateway de Pagamento (Stripe).
- [ ] Suporte a domínios personalizados via CNAME.

*Desenvolvido com rigor técnico no DigiCard Studio.*
