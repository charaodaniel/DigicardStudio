/**
 * Store SQLite para os cartões do DigiCard Studio (node:sqlite nativo).
 * Mesma API do js/db.js (localStorage), para testes e manipulação via CLI.
 *
 * CLI:
 *   node scripts/db-sqlite.mjs list
 *   node scripts/db-sqlite.mjs add [template] [nome]
 *   node scripts/db-sqlite.mjs get <id>
 *   node scripts/db-sqlite.mjs delete <id>
 *   node scripts/db-sqlite.mjs import <cards.json>   (do botão "Exportar JSON")
 *   node scripts/db-sqlite.mjs export [arquivo]      (padrão: cards.json)
 *   node scripts/db-sqlite.mjs reset
 *
 * O arquivo do banco é ./.data/digicard.db (criado sob demanda).
 */
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initialCardData } from '../js/data.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DB_PATH = process.env.DIGICARD_DB || join(ROOT, '.data', 'digicard.db');

let dbInstance = null;

function getDb() {
  if (dbInstance) return dbInstance;
  mkdirSync(dirname(DB_PATH), { recursive: true });
  dbInstance = new DatabaseSync(DB_PATH);
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      full_name TEXT,
      template TEXT,
      last_updated INTEGER
    );
  `);
  return dbInstance;
}

function rowToCard(row) {
  if (!row) return undefined;
  try {
    return JSON.parse(row.data);
  } catch {
    return undefined;
  }
}

/** API compatível com js/db.js (localStorage). */
export const sqliteStore = {
  getAllCards() {
    const rows = getDb().prepare('SELECT data FROM cards ORDER BY last_updated DESC').all();
    return rows.map(rowToCard).filter(Boolean);
  },

  getCardById(id) {
    return rowToCard(getDb().prepare('SELECT data FROM cards WHERE id = ?').get(id));
  },

  saveCard(card) {
    if (!card || !card.id) throw new Error('Cartão precisa de id');
    getDb()
      .prepare(
        `INSERT INTO cards (id, data, full_name, template, last_updated)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           data = excluded.data,
           full_name = excluded.full_name,
           template = excluded.template,
           last_updated = excluded.last_updated`
      )
      .run(
        card.id,
        JSON.stringify(card),
        card.fullName ?? null,
        card.template ?? null,
        card.lastUpdated ?? Date.now()
      );
  },

  deleteCard(id) {
    getDb().prepare('DELETE FROM cards WHERE id = ?').run(id);
  },

  createNewCard(template = 'default', fullName = 'Novo Cartão') {
    const newCard = {
      ...structuredClone(initialCardData),
      id: `card_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      template,
      fullName,
      lastUpdated: Date.now(),
    };
    this.saveCard(newCard);
    return newCard;
  },

  count() {
    return getDb().prepare('SELECT COUNT(*) AS n FROM cards').get().n;
  },

  reset() {
    getDb().exec('DELETE FROM cards');
  },
};

/* ------------------------- Import / Export ------------------------- */

export async function importFromJson(filePath) {
  const cards = JSON.parse(await readFile(filePath, 'utf8'));
  if (!Array.isArray(cards)) throw new Error('cards.json deve conter um array');
  for (const card of cards) {
    if (card && card.id) sqliteStore.saveCard(card);
  }
  return cards.filter((c) => c && c.id).length;
}

export async function exportToJson(filePath) {
  const cards = sqliteStore.getAllCards();
  await mkdir(dirname(filePath), { recursive: true }).catch(() => {});
  await writeFile(filePath, JSON.stringify(cards, null, 2), 'utf8');
  return cards.length;
}

/* ------------------------------ CLI ------------------------------ */

function isMain() {
  return process.argv[1] && process.argv[1].endsWith('db-sqlite.mjs');
}

if (isMain()) {
  const [cmd, ...args] = process.argv.slice(2);

  const printCard = (c) =>
    console.log(`${c.id}  [${c.template}]  ${c.fullName} — ${(c.links || []).length} links, editado ${new Date(c.lastUpdated || 0).toLocaleString('pt-BR')}`);

  switch (cmd) {
    case 'list': {
      const cards = sqliteStore.getAllCards();
      if (!cards.length) {
        console.log('(vazio)');
      } else {
        cards.forEach(printCard);
        console.log(`\n${cards.length} cartão(ões) em ${DB_PATH}`);
      }
      break;
    }
    case 'add': {
      const card = sqliteStore.createNewCard(args[0] || 'default', args[1] || 'Novo Cartão');
      console.log('Criado:');
      printCard(card);
      break;
    }
    case 'get': {
      const card = sqliteStore.getCardById(args[0]);
      if (!card) {
        console.log('Não encontrado:', args[0]);
      } else {
        console.log(JSON.stringify(card, null, 2));
      }
      break;
    }
    case 'delete':
      sqliteStore.deleteCard(args[0]);
      console.log('Removido:', args[0]);
      break;
    case 'import': {
      if (!args[0]) {
        console.log('Uso: import <cards.json>');
      } else {
        const n = await importFromJson(args[0]);
        console.log(`✓ ${n} cartão(ões) importado(s) para o SQLite`);
      }
      break;
    }
    case 'export': {
      const out = args[0] || 'cards.json';
      const n = await exportToJson(out);
      console.log(`✓ ${n} cartão(ões) exportado(s) para ${out}`);
      break;
    }
    case 'reset':
      sqliteStore.reset();
      console.log('✓ Tabela cards limpa');
      break;
    default:
      printHelp();
  }
}

function printHelp() {
  console.log(`Uso: node scripts/db-sqlite.mjs <comando>

  list                        Lista todos os cartões
  add [template] [nome]       Cria um cartão novo
  get <id>                    Mostra um cartão em JSON
  delete <id>                 Remove um cartão
  import <cards.json>         Importa do "Exportar JSON" da UI
  export [arquivo]            Exporta para cards.json (padrão)
  reset                       Limpa a tabela cards`);
}
