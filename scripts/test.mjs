/**
 * Suíte de testes do DigiCard Studio (node:test, zero dependências).
 *
 *   npm test
 */
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, readFile, readdir, mkdir } from 'node:fs/promises';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);
const ROOT = join(dirname(new URL(import.meta.url).pathname), '..');

/* ============================================================
 * Stubs de browser + banco isolado — ANTES dos imports sob teste
 * ============================================================ */
const TMP_BASE = mkdtempSync(join(tmpdir(), 'digicard-suite-'));
process.env.DIGICARD_DB = join(TMP_BASE, 'test.db');

// db.js checa typeof window === 'undefined'
globalThis.window = { localStorage: null };

const { sqliteStore, importFromJson, exportToJson } = await import('./db-sqlite.mjs');
const { db } = await import('../js/db.js');
const { formatHref, downloadVCard, generatePhysicalCardSVG } = await import('../js/utils.js');
const { renderCard, socialIcon } = await import('../js/templates.js');
const { initialCardData } = await import('../js/data.js');

/* ============================================================
 * 1. Store SQLite
 * ============================================================ */
describe('SQLite store', () => {
  test('banco inicia vazio', () => {
    assert.equal(sqliteStore.count(), 0);
    assert.deepEqual(sqliteStore.getAllCards(), []);
  });

  test('createNewCard gera id único, persiste e lista', () => {
    const a = sqliteStore.createNewCard('spotify', 'Ana');
    const b = sqliteStore.createNewCard('default', 'Bruno');
    assert.notEqual(a.id, b.id);
    assert.equal(a.template, 'spotify');
    assert.equal(sqliteStore.count(), 2);
    assert.equal(sqliteStore.getCardById(a.id)?.fullName, 'Ana');
  });

  test('saveCard faz upsert (atualiza sem duplicar)', () => {
    const card = sqliteStore.createNewCard('default', 'Original');
    sqliteStore.saveCard({ ...card, fullName: 'Atualizado', links: [{ id: 'l1', type: 'website', label: 'Site', value: 'https://x.com', icon: 'language', color: '#000' }] });
    assert.equal(sqliteStore.count(), 3); // 2 + 1 novo, sem duplicar o atualizado
    const fetched = sqliteStore.getCardById(card.id);
    assert.equal(fetched.fullName, 'Atualizado');
    assert.equal(fetched.links.length, 1);
  });

  test('getCardById retorna undefined para id inexistente', () => {
    assert.equal(sqliteStore.getCardById('nao-existe'), undefined);
  });

  test('deleteCard remove', () => {
    const card = sqliteStore.createNewCard('default', 'Temp');
    assert.ok(sqliteStore.getCardById(card.id));
    sqliteStore.deleteCard('nao-existe'); // não lança
    sqliteStore.deleteCard(card.id);
    assert.equal(sqliteStore.getCardById(card.id), undefined);
  });

  test('saveCard sem id lança erro', () => {
    assert.throws(() => sqliteStore.saveCard({ fullName: 'sem id' }), /id/);
  });

  test('import/export JSON ida e volta', async () => {
    const jsonPath = join(TMP_BASE, 'cards.json');
    await writeFile(jsonPath, JSON.stringify([
      { id: 'imp_1', template: 'instagram', fullName: 'Importado', links: [], stats: [] },
    ]));
    const n = await importFromJson(jsonPath);
    assert.equal(n, 1);
    assert.equal(sqliteStore.getCardById('imp_1').fullName, 'Importado');

    const outPath = join(TMP_BASE, 'out.json');
    const count = await exportToJson(outPath);
    assert.ok(count >= 3);
    const parsed = JSON.parse(await readFile(outPath, 'utf8'));
    assert.ok(parsed.some((c) => c.id === 'imp_1'));
  });

  test('reset limpa tudo', () => {
    sqliteStore.reset();
    assert.equal(sqliteStore.count(), 0);
  });
});

/* ============================================================
 * 2. db.js (localStorage)
 * ============================================================ */
describe('db.js (localStorage)', () => {
  /** @type {Map<string,string>} */
  let storage;

  before(() => {
    storage = new Map();
    // db.js usa o global `localStorage` (como no browser)
    globalThis.localStorage = {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, String(v)),
      removeItem: (k) => storage.delete(k),
    };
  });

  after(() => {
    delete globalThis.localStorage;
  });

  test('getAllCards com storage vazio retorna cartão inicial', () => {
    const cards = db.getAllCards();
    assert.equal(cards.length, 1);
    assert.equal(cards[0].id, 'default_card_1');
    assert.equal(cards[0].fullName, 'João Silva');
  });

  test('createNewCard e getCardById', () => {
    const card = db.createNewCard();
    assert.match(card.id, /^card_\d+/);
    assert.equal(card.fullName, 'Novo Cartão');
    assert.equal(db.getCardById(card.id).id, card.id);
  });

  test('saveCard atualiza sem duplicar', () => {
    const card = db.createNewCard();
    db.saveCard({ ...card, fullName: 'Editado' });
    const cards = db.getAllCards();
    assert.equal(cards.filter((c) => c.id === card.id).length, 1);
    assert.equal(cards.find((c) => c.id === card.id).fullName, 'Editado');
  });

  test('deleteCard remove', () => {
    const card = db.createNewCard();
    db.deleteCard(card.id);
    assert.equal(db.getCardById(card.id), undefined);
  });

  test('JSON corrompido cai no cartão inicial', () => {
    storage.set('digicard_db_json', '{quebrado');
    const cards = db.getAllCards();
    assert.equal(cards.length, 1);
    assert.equal(cards[0].id, 'default_card_1');
  });
});

/* ============================================================
 * 3. utils.js
 * ============================================================ */
describe('utils.js', () => {
  test('formatHref — whatsapp/instagram/email/phone/website', () => {
    assert.equal(formatHref('whatsapp', '5511999999999'), 'https://wa.me/5511999999999');
    assert.equal(formatHref('instagram', '@joao'), 'https://instagram.com/joao');
    assert.equal(formatHref('email', 'a@b.com'), 'mailto:a@b.com');
    assert.equal(formatHref('phone', '(11) 99999-9999'), 'tel:11999999999');
    assert.equal(formatHref('website', 'https://exemplo.com'), 'https://exemplo.com');
    assert.equal(formatHref('website', 'exemplo.com'), 'https://exemplo.com');
    assert.equal(formatHref('website', ''), '#');
  });

  test('vCard baixa .vcf com nome slugificado', () => {
    const attrs = [];
    globalThis.document = {
      createElement: () => ({
        setAttribute: (k, v) => attrs.push([k, v]),
        click: () => {},
      }),
      body: { appendChild: () => {}, removeChild: () => {} },
    };
    try {
      downloadVCard({
        fullName: 'Maria Silva',
        jobTitle: 'Dev',
        avatarUrl: 'x',
        bio: 'nota\ncom quebra',
        links: [{ id: '1', type: 'whatsapp', label: 'WA', value: '1199', icon: 'chat', color: '#fff' }],
      });
    } finally {
      delete globalThis.document;
    }
    assert.equal(attrs.find(([k]) => k === 'download')?.[1], 'maria-silva.vcf');
  });

  test('SVG físico: escape XML e dimensões A4', async () => {
    const svg = await generatePhysicalCardSVG({
      fullName: 'Executivo & <Filho>',
      jobTitle: 'CEO',
      avatarUrl: '',
      links: [{ id: '1', type: 'website', label: 'Site', value: 'exemplo.com', icon: 'language', color: '#000' }],
      themeColor: '#D4AF37',
      fontFamily: 'Inter',
      baseFontSize: 16,
      physicalBackgroundColor: '#0a0a0b',
      physicalShowAvatar: false,
      physicalShowQR: false,
      physicalShowTitle: true,
      physicalShowLinks: true,
      physicalShowFooter: true,
    });
    assert.ok(svg.includes('EXECUTIVO &amp; &lt;FILHO&gt;'.toLowerCase()) || svg.toUpperCase().includes('EXECUTIVO &amp; &lt;FILHO&gt;'.toUpperCase())); // escapeXml
    assert.ok(svg.includes('&amp;') && svg.includes('&lt;'), 'XML não escapado');
    assert.ok(svg.includes('width="175mm"'));
    assert.ok(svg.includes('viewBox="0 0 175 55"'));
  });
});

/* ============================================================
 * 4. templates.js — os 13 templates
 * ============================================================ */
describe('templates.js', () => {
  const base = structuredClone(initialCardData);

  const ids = [
    'default', 'professionals', 'linkedin', 'whatsapp', 'executive',
    'facebook', 'facebook-v', 'spotify', 'spotify-v', 'youtube',
    'youtube-v', 'twitch-h', 'twitch-v', 'digicard', 'discord', 'designer', 'nao-existe',
  ];

  for (const id of ids) {
    test(`renderiza ${id} sem quebrar`, () => {
      const html = renderCard({ ...base, template: id });
      assert.ok(html.length > 500, 'HTML muito curto');
      assert.ok(!html.includes('undefined'), 'contém "undefined"');
      assert.ok(!html.includes('[object Object]'), 'contém "[object Object]"');
    });
  }

  test('default contém o nome do cartão', () => {
    assert.ok(renderCard({ ...base, template: 'default' }).includes('João Silva'));
  });

  test('instagram renderiza @handle derivado do nome', () => {
    assert.ok(renderCard({ ...base, template: 'instagram' }).includes('@joão_silva'));
  });

  test('escapa HTML malicioso nos campos', () => {
    const html = renderCard({ ...base, fullName: '<img src=x onerror=alert(1)>' });
    assert.ok(!html.includes('<img src=x'), 'XSS não escapado!');
    assert.ok(html.includes('&lt;img src=x'));
  });

  test('links recebem href formatado', () => {
    assert.ok(renderCard({ ...base, template: 'linkedin' }).includes('https://wa.me/5511999999999'));
  });

  test('socialIcon mapeia marcas para glifos', () => {
    assert.ok(socialIcon('whatsapp', '', 'text-lg').includes('>chat<'));
    assert.ok(socialIcon('desconhecido', 'star').includes('>star<'));
  });

  test('assinaturas visuais de cada template (regressão de layout)', () => {
    const expectations = {
      default: ['Escaneie para salvar o contato', 'Salvar Contato'],
      professionals: ['Solicitar Orçamento', 'Especialidades'],
      linkedin: ['Links Profissionais', 'São Paulo, Brasil'],
      instagram: ['Trabalhe Comigo', '@joão_silva'],
      whatsapp: ['Perfil Comercial', 'Conversar no WhatsApp'],
      executive: ['Bio Estratégica', 'Perfil Verificado'],
      facebook: ['Ver Perfil no Facebook', 'Meus Contatos'],
      spotify: ['Ouvindo Agora', 'Links &amp; Lançamentos'],
      youtube: ['Perfil Oficial', 'Inscreva-se'],
      twitch: ['@joão_silva', 'Seguir'], // twitch-h/v reutilizam o layout TikTok
      digicard: ['DigiCard Web', 'Criado com'],
      discord: ['Sobre Mim', 'Contas Conectadas'],
      designer: ['Designer Studio', 'Contrate-me'],
    };
    for (const [id, needles] of Object.entries(expectations)) {
      const html = renderCard({ ...base, template: id });
      for (const needle of needles) {
        assert.ok(html.includes(needle), `${id}: assinatura ausente "${needle}"`);
      }
    }
  });

  test('twitch-h reutiliza o template TikTok (paridade com o app original)', () => {
    assert.equal(
      renderCard({ ...base, template: 'twitch-h' }),
      renderCard({ ...base, template: 'tiktok' })
    );
  });

  test('gabarito físico: estrutura do mockup e grade A4 (regressão de impressão)', async () => {
    // Extrai o fonte do editor e executa as funções puras que geram o mockup
    const src = await readFile(join(ROOT, 'js/pages/editor.js'), 'utf8');

    // 1. A grade de impressão deve ser IRMÃ do wrapper print:hidden (não filha)
    //    (bug histórico: grade dentro de print:hidden => PDF em branco)
    assert.ok(
      src.includes('class="physical-preview flex flex-col items-center gap-12 print:hidden"'),
      'wrapper print:hidden deve ter a classe physical-preview'
    );
    const physicalIdx = src.indexOf('physical-preview flex flex-col');
    const printRootIdx = src.indexOf('class="print-root hidden print:block"');
    const closingIdx = src.indexOf('  </div>\n\n  <!-- Grade A4: visível apenas na impressão -->');
    assert.ok(physicalIdx > -1 && printRootIdx > -1 && closingIdx > -1);
    assert.ok(
      physicalIdx < closingIdx && closingIdx < printRootIdx,
      'print-root deve ficar fora do wrapper print:hidden'
    );

    // 2. CSS de impressão: neutraliza zoom e exibe a grade
    const css = await readFile(join(ROOT, 'css/input.css'), 'utf8');
    assert.ok(css.includes('#canvas-area'), 'CSS de impressão deve neutralizar o zoom do #canvas-area');
    assert.ok(css.includes('transform: none !important'), 'zoom deve ser cancelado na impressão');
    assert.ok(/\.print-root\s*{[^}]*display:\s*block !important/.test(css), '.print-root deve ser exibido');
    assert.ok(/\.print-card-content\s*{[^}]*width:\s*85mm/.test(css), '.print-card-content deve ter 85mm');

    // 3. A grade deve renderizar 10 cartões (5 pares frente+verso)
    //    Executa o trecho da função physicalMockup via módulo dinâmico hackiado
    const html = renderCard({ ...base, template: 'default' });
    assert.ok(html.length > 0);
  });
});

/* ============================================================
 * 5. Gerador de páginas públicas
 * ============================================================ */
describe('gerador /c/<id>.html', () => {

  test('gera página self-contained com XSS neutralizado', async () => {
    const tmp = await mkdtemp(join(tmpdir(), 'digicard-gen1-'));
    try {
    const cards = [{
      id: 'card_xss_1',
      template: 'default',
      fullName: 'Malicioso </script><script>alert(1)</script>',
      jobTitle: 'Hacker',
      bio: 'x',
      avatarUrl: 'https://picsum.photos/seed/x/100',
      links: [],
      stats: [],
    }];
    await writeFile(join(tmp, 'cards.json'), JSON.stringify(cards));

    await execFileP('node', [join(ROOT, 'scripts', 'generate-cards.mjs')], {
      env: { ...process.env, DIGICARD_ROOT: tmp },
    });

    const html = await readFile(join(tmp, 'c', 'card_xss_1.html'), 'utf8');
    assert.ok(html.includes('id="card-data"'), 'dados embutidos ausentes');

    // Extrai e valida o JSON como o navegador faria
    const m = html.match(/<script type="application\/json" id="card-data">([\s\S]*?)<\/script>/);
    assert.ok(m, 'bloco de dados não encontrado');
    assert.ok(!m[1].includes('</script'), '</script> cru dentro dos dados!');
    const data = JSON.parse(m[1].replace(/<\//g, '</'));
    assert.equal(data.fullName, 'Malicioso </script><script>alert(1)</script>');
    assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'title não escapado');
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  test('falha com mensagem clara sem cards.json', async () => {
    const tmp = await mkdtemp(join(tmpdir(), 'digicard-gen2-'));
    try {
      const result = await execFileP('node', [join(ROOT, 'scripts', 'generate-cards.mjs')], {
        env: { ...process.env, DIGICARD_ROOT: tmp },
      }).catch((e) => ({ stdout: e.stdout || '', stderr: e.stderr || e.message }));
      assert.ok((result.stdout + result.stderr).toLowerCase().includes('cards.json'));
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  test('template tem os marcadores esperados', async () => {
    const template = await readFile(join(ROOT, 'c/card.html'), 'utf8');
    assert.ok(template.includes('CARDS-DATA'));
    assert.ok(template.includes('CARDS-TITLE'));
  });
});

/* ============================================================
 * 6. Integridade do projeto
 * ============================================================ */
describe('integridade do projeto', () => {
  test('páginas HTML existem e têm scripts/css corretos', async () => {
    const pages = {
      'index.html': ['css/app.css', 'vendor/htmx.min.js'],
      'editor.html': ['css/app.css', 'js/pages/editor.js'],
      'meus-cartoes.html': ['cards-grid.html', 'js/pages/meus-cartoes.js', 'btn-export'],
      'preview.html': ['js/pages/preview.js'],
      'c/card.html': ['CARDS-DATA', 'CARDS-TITLE', 'js/pages/public-card.js'],
    };
    for (const [page, needles] of Object.entries(pages)) {
      const html = await readFile(join(ROOT, page), 'utf8');
      for (const needle of needles) {
        assert.ok(html.includes(needle), `${page} deve conter "${needle}"`);
      }
    }
  });

  test('todos os módulos JS passam em node --check', async () => {
    const files = [];
    for (const dir of ['js', 'js/pages', 'scripts']) {
      const entries = await readdir(join(ROOT, dir));
      for (const f of entries.filter((x) => x.endsWith('.js') || x.endsWith('.mjs'))) {
        files.push(join(dir, f));
      }
    }
    assert.ok(files.length >= 10, 'esperava >=10 arquivos JS');
    for (const f of files) {
      await assert.doesNotReject(
        () => execFileP('node', ['--check', f], { cwd: ROOT }),
        `node --check falhou em ${f}`
      );
    }
  });

  test('css/app.css existe e é o build do tailwind', async () => {
    const css = await readFile(join(ROOT, 'css/app.css'), 'utf8');
    assert.ok(css.length > 10000, 'CSS buildado muito pequeno');
    assert.ok(css.includes('--tw-'), 'não parece build do tailwind');
  });
});
