# DigiCard Studio

Cartões digitais interativos + gabaritos de impressão, construído **sem framework**: HTML estático, HTMX, Tailwind CSS e JavaScript vanilla (ES Modules). Sem TypeScript, sem React, sem Supabase.

## Stack

- **HTML** — páginas estáticas
- **HTMX** (vendor local em `vendor/htmx.min.js`) — carregamento do fragmento da grade em `meus-cartoes.html`
- **Tailwind CSS** — buildado para `css/app.css`
- **JavaScript vanilla** (ES Modules, sem build) — estado, editor, templates de cartão, localStorage

## Estrutura

```
├── index.html            Landing page
├── editor.html           Editor de cartões (digital + físico)
├── meus-cartoes.html     Dashboard de cartões (grade via HTMX)
├── preview.html          Preview standalone do editor
├── c/card.html           Template da página pública do cartão
├── partials/             Fragmentos HTMX
├── css/
│   ├── input.css         Fonte do Tailwind
│   └── app.css           CSS buildado (não editar)
├── js/
│   ├── db.js             "Banco" local (localStorage, chave digicard_db_json)
│   ├── data.js           Dados iniciais do cartão
│   ├── templates.js      Os 13 templates de cartão (HTML strings)
│   ├── card.js           Preview digital + modal de compartilhar
│   ├── utils.js          vCard, SVG/PNG, analytics
│   ├── shared.js         Toast + biblioteca de modelos
│   └── pages/            Lógica por página
└── vendor/htmx.min.js    HTMX 2.0.4 local
```

## Rodando

```bash
npm install          # instala só o tailwindcss (dev)
npm run build:css    # gera css/app.css
npm run dev          # serve em http://localhost:9002
```

> Importante: usar `npm run dev` (ou qualquer servidor HTTP). Abrir os arquivos direto via `file://` não funciona por causa dos ES Modules.

## Testes

```bash
npm test             # suíte completa (node:test, zero dependências)
```

44 testes cobrindo:
- **SQLite store** (`node:sqlite` nativo): CRUD, upsert, import/export, reset
- **db.js** (localStorage): mesma API, fallback e recuperação de JSON corrompido
- **utils.js**: links sociais, vCard, SVG de impressão (escape XML, dimensões A4)
- **templates.js**: os 13 templates renderizam sem "undefined"/"[object Object]" e escapam XSS
- **gerador** `c/<id>.html`: dados embutidos, XSS neutralizado, erros claros
- **integridade**: páginas, `node --check` em todos os JS, CSS buildado

## SQLite (banco de dados p/ testes)

O `node:sqlite` nativo substitui o localStorage em contexto Node. Mesma API do `db.js`:

```bash
npm run db -- list                    # lista cartões
npm run db -- add spotify "Maria"      # cria cartão
npm run db -- get <id>                # JSON completo
npm run db -- delete <id>             # remove
npm run db -- import cards.json       # importa do "Exportar JSON" da UI
npm run db -- export                  # exporta para cards.json
npm run db -- reset                   # limpa tudo
```

O banco fica em `.data/digicard.db` (criado sob demanda). Para usar outro caminho:
`DIGICARD_DB=/tmp/test.db npm run db -- list`

### Fluxo manual de teste

```bash
npm test                          # 1. valida tudo
npm run db -- add spotify "Teste" # 2. popula o banco
npm run db -- export              # 3. gera cards.json
npm run generate:cards            # 4. cria páginas públicas
npm run dev                       # 5. serve e testa no navegador
```

## Página pública do cartão (links /c/<id>.html)

Os dados ficam no seu navegador, então as páginas públicas são **geradas**:

1. Em **Meus Cartões**, clique em **Exportar JSON** → baixa `cards.json`
2. Coloque o `cards.json` na raiz do projeto
3. Rode:

```bash
npm run generate:cards
```

Isso cria `c/<id>.html` para cada cartão, com os dados embutidos na própria página (self-contained) — o link funciona para qualquer visitante, independente de localStorage. Rodar de novo recria as páginas do zero.

Em ambiente dev (sem gerar), `c/card.html` ainda funciona lendo do localStorage pelo id na URL: `/c/card.html?id=<id>`.

> Segurança: os dados são embutidos com `</` escapado, evitando quebra do `<script>` de dados (testado com payloads XSS).

## Dados

Tudo fica no **localStorage** do navegador (chave `digicard_db_json`). O cartão inicial (João Silva) é criado automaticamente. Para resetar: DevTools → Application → Local Storage → limpar.

## Dados

Tudo fica no **localStorage** do navegador (chave `digicard_db_json`). O cartão inicial (João Silva) é criado automaticamente. Para resetar: DevTools → Application → Local Storage → limpar.
