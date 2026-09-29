#!/usr/bin/env node
/**
 * Gera páginas públicas estáticas em /c/<id>.html a partir de cards.json.
 *
 * Uso:
 *   1. Em "Meus Cartões", clique em "Exportar JSON" → baixa cards.json
 *   2. Coloque cards.json na raiz do projeto
 *   3. Rode: npm run generate:cards
 *
 * Cada página gerada é self-contained: os dados do cartão vão embutidos
 * num <script type="application/json">, então o link funciona para
 * qualquer visitante (não depende do localStorage de quem vê).
 */
import { readFile, writeFile, rm, readdir, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Raiz do projeto: padrão é o diretório acima de scripts/; DIGICARD_ROOT sobrescreve (usado em testes)
const ROOT = process.env.DIGICARD_ROOT || join(dirname(fileURLToPath(import.meta.url)), '..');
// Template sempre no projeto real; saída (páginas geradas) vai para DIGICARD_ROOT
const APP_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CARDS_JSON = join(ROOT, 'cards.json');
const C_DIR = join(ROOT, 'c');
const TEMPLATE = join(APP_ROOT, 'c', 'card.html');

const DATA_MARKER = '<!-- CARDS-DATA -->';
const TITLE_MARKER = '<!-- CARDS-TITLE -->';

async function main() {
  // 1. Lê cards.json
  let cards;
  try {
    cards = JSON.parse(await readFile(CARDS_JSON, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('✗ cards.json não encontrado na raiz do projeto.');
      console.error('  Exporte-o pela página "Meus Cartões" → botão "Exportar JSON".');
    } else {
      console.error('✗ cards.json inválido:', err.message);
    }
    process.exit(1);
  }

  if (!Array.isArray(cards)) {
    console.error('✗ cards.json deve conter um array de cartões.');
    process.exit(1);
  }

  // 2. Lê o template
  let template;
  try {
    template = await readFile(TEMPLATE, 'utf8');
  } catch {
    console.error('✗ Template c/card.html não encontrado.');
    process.exit(1);
  }

  if (!template.includes(DATA_MARKER) || !template.includes(TITLE_MARKER)) {
    console.error(`✗ Template c/card.html precisa conter ${TITLE_MARKER} (no <title>) e ${DATA_MARKER} (no body).`);
    process.exit(1);
  }

  // 3. Garante o diretório de saída e remove páginas geradas anteriormente
  await mkdir(C_DIR, { recursive: true });
  const existing = await readdir(C_DIR);
  await Promise.all(
    existing
      .filter((f) => f.endsWith('.html') && f !== 'card.html')
      .map((f) => rm(join(C_DIR, f), { force: true }))
  );

  // 4. Gera uma página por cartão
  let generated = 0;
  for (const card of cards) {
    if (!card || !card.id) {
      console.warn('⚠ Cartão sem id ignorado.');
      continue;
    }

    // Escapa "</" para evitar que "</script>" nos dados quebre a página
    const safeData = JSON.stringify(card).replace(/<\//g, '<\\/');

    const html = template
      .replace(DATA_MARKER, `<script type="application/json" id="card-data">${safeData}</script>`)
      .replace(TITLE_MARKER, escapeHtml(card.fullName || 'Cartão Digital'));

    await writeFile(join(C_DIR, `${card.id}.html`), html, 'utf8');
    generated++;
    console.log(`✓ c/${card.id}.html → ${card.fullName || '(sem nome)'}`);
  }

  console.log(`\n✅ ${generated} página(s) gerada(s) em /c/.`);
  console.log('   Os links "Ver" e os QR Codes agora apontam para páginas estáticas reais.');
}

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

main();
