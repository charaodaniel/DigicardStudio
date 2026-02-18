# DigiCard Studio 📇✨

O **DigiCard Studio** é uma plataforma SaaS moderna para criação de identidades profissionais híbridas. Com uma interface de arrastar-e-soltar (drag-and-drop), permite que profissionais criem cartões de visita digitais interativos e gerem gabaritos técnicos de alta qualidade para impressão física e recorte em plotters.

---

## 🚀 Funcionalidades Principais

- **Editor Visual Real-time**: Edição intuitiva com preview instantâneo em mockups de smartphones.
- **Modo Híbrido (Digital vs Físico)**: Alternância entre design para web e gabaritos de produção industrial.
- **Assistente de Design IA**: Sugestões inteligentes de templates, cores e fontes baseadas na profissão e estilo do usuário (Powered by Genkit).
- **Exportação Profissional**:
  - **PDF Técnico (A4)**: Grade de 10 cartões por folha com marcas de corte e sangria.
  - **Salvar SVG (Vetorial)**: Arquivo otimizado para plotters de recorte (Cricut/Silhouette) com camadas de corte em Base64.
  - **PNG 350 DPI**: Imagem de alta resolução para fidelidade gráfica absoluta.
- **Gerador de VCard**: Download de arquivo `.vcf` real para salvar contatos diretamente no celular.
- **Biblioteca de Modelos**: Diversos presets inspirados em redes sociais (Instagram, Spotify, LinkedIn, TikTok) e modelos executivos.

---

## 🛠️ Tecnologias Utilizadas

### Core
- **Next.js 15 (App Router)**: Framework React para performance e SEO.
- **TypeScript**: Tipagem estática para robustez do código.
- **Tailwind CSS**: Estilização baseada em utilitários para interface responsiva.

### Interface & Componentes
- **ShadCN UI**: Componentes acessíveis e elegantes baseados em Radix UI.
- **Lucide React**: Biblioteca de ícones consistente.
- **Material Symbols Outlined**: Ícones técnicos para o editor.
- **Embla Carousel**: Para bibliotecas de templates e carrosséis de mídia.

### Inteligência Artificial
- **Genkit 1.x**: Framework da Google para integração de fluxos de IA.
- **Google Generative AI (Gemini)**: Modelo utilizado para sugestões de design.

### Utilitários & Dados
- **Zod**: Validação de esquemas e contratos de dados.
- **React Hook Form**: Gestão eficiente de formulários no editor.
- **Recharts**: Estrutura pronta para exibição de métricas e analytics.
- **Firebase Client SDK**: Preparado para integração de autenticação e Firestore.

---

## 📦 Bibliotecas Relevantes (package.json)

- `@genkit-ai/google-genai`: Integração oficial com modelos Gemini.
- `class-variance-authority`: Gestão de variantes de componentes UI.
- `framer-motion`: Animações fluidas na interface.
- `react-day-picker`: Seletores de data customizados.
- `tailwind-merge`: Utilizado para composição dinâmica de classes CSS.

---

## 🏁 Como Começar

1. **Instalação**:
   ```bash
   npm install
   ```

2. **Configuração de Variáveis**:
   Crie um arquivo `.env` com sua chave do Google AI:
   ```env
   GOOGLE_GENAI_API_KEY=sua_chave_aqui
   ```

3. **Desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse o editor em `http://localhost:9002`.

---

## 📐 Estrutura de Design

O projeto segue princípios de **Design System** rigorosos:
- **Cores Primárias**: Deep Blue (#4263EB) para confiança.
- **Acento**: Teal (#2DD4CF) para interatividade.
- **Tipografia**: 'Space Grotesk' para headings e 'Inter' para corpo de texto.
- **Acessibilidade**: Foco em ARIA attributes e contraste de cores dinâmico nos gabaritos físicos.

---

## 📈 Roadmap Front-end
- [x] Rota dinâmica de visualização pública (`/c/[slug]`).
- [x] Exportação de SVG Vetorial com Base64 embutido.
- [x] Conversão de design para PNG 350 DPI.
- [x] Lógica de "Print and Cut" para gráficas.

---
*Desenvolvido com ❤️ no DigiCard Studio.*
