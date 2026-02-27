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

---

## 📐 Exportação & Manipulação de Arquivos

Para garantir a maior qualidade possível (350 DPI) e compatibilidade industrial sem sobrecarregar o bundle da aplicação, utilizamos padrões nativos modernos:

### 1. Manipulação de Vetores (SVG)
- **Padrão**: XML/SVG 1.1 nativo.
- **Processamento**: Geração dinâmica via Template Literals em TypeScript.
- **Imagens**: Conversão de URLs remotas para **Base64 (Data URI)** em tempo de execução para garantir que o SVG seja auto-contido em softwares como Inkscape, Illustrator e softwares de Plotters (Cricut/Silhouette).

### 2. Geração de PDF (A4 Técnico)
- **Padrão**: CSS Paged Media (@media print).
- **Processamento**: Motor de renderização nativo do navegador (`window.print()`).
- **Layout**: CSS Grid especializado para alinhamento milimétrico em folhas A4, garantindo frentes e versos emparelhados (Layout "Aberto").

### 3. Alta Resolução (PNG 350 DPI)
- **Biblioteca**: HTML5 Canvas API.
- **Processamento**: Renderização de planos vetoriais em buffer de memória com cálculo de densidade de pixels (DPI) para saída de alta fidelidade gráfica.

### 4. Identidade Digital (VCard)
- **Padrão**: vCard 3.0.
- **Processamento**: Serialização de objetos de dados para arquivos `.vcf` via Blobs binários.

---

## 📦 Bibliotecas Relevantes (package.json)

- `@genkit-ai/google-genai`: Integração oficial com modelos Gemini.
- `class-variance-authority`: Gestão de variantes de componentes UI.
- `framer-motion`: Animações fluidas na interface.
- `react-day-picker`: Seletores de data customizados.
- `tailwind-merge`: Utilizado para composição dinâmica de classes CSS.
- `recharts`: Estrutura pronta para exibição de métricas e analytics.

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
*Desenvolvido com ❤️ no DigiCard Studio.*
