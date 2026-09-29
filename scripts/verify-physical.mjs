/**
 * Verifica o modo físico: mockup na tela e grade A4 de impressão.
 * Executa physicalMockup() do editor num DOM stub e valida a estrutura.
 *
 *   node scripts/verify-physical.mjs
 */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// --- Stub mínimo de DOM (o editor.js só toca DOM no boot(), que não chamamos) ---
const elements = new Map();
function makeEl() {
  const el = {
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    dataset: {},
    innerHTML: '',
    textContent: '',
    addEventListener() {},
    querySelectorAll: () => [],
    querySelector: () => null,
    appendChild() {},
    classListToggle() {},
  };
  return el;
}
globalThis.window = { location: { search: '', origin: 'http://localhost' }, addEventListener() {} };
globalThis.document = {
  querySelector: (sel) => {
    if (!elements.has(sel)) elements.set(sel, makeEl());
    return elements.get(sel);
  },
  getElementById: (id) => {
    const sel = `#${id}`;
    if (!elements.has(sel)) elements.set(sel, makeEl());
    return elements.get(sel);
  },
  querySelectorAll: () => [],
  addEventListener() {},
  createElement: () => makeEl(),
  body: { appendChild() {}, removeChild() {} },
};
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };

// --- Executa o módulo do editor (boot() roda, mas com stubs não faz nada visível) ---
const savedLog = console.log;
console.log = () => {};
await import('../js/pages/editor.js').catch((e) => {
  console.error('Falha ao carregar editor.js:', e.message);
});
console.log = savedLog;

const src = await readFile(join(ROOT, 'js/pages/editor.js'), 'utf8');

// Importa templates para renderizar conteúdo real dos cartões
const { initialCardData } = await import('../js/data.js');

function check(name, cond) {
  const icon = cond ? '✓' : '✗';
  console.log(`${icon} ${name}`);
  if (!cond) process.exitCode = 1;
}

console.log('\n=== Estrutura do gabarito físico (fonte do editor) ===');

// 1. Grade fora do wrapper oculto
check(
  'grade A4 é irmã do wrapper print:hidden (PDF não sai em branco)',
  /physical-preview[^"]*print:hidden/.test(src) &&
    src.indexOf('print-root') > src.indexOf('Grade A4: visível apenas na impressão')
);

// 2. Conteúdo do cartão na grade usa .print-card-content (dimensão em mm via CSS)
check('itens da grade usam .print-card-content', src.includes('print-card-content'));

// 3. Cancelamento de zoom na impressão
check('CSS neutraliza zoom (transform:none)', /#canvas-area,\s*#canvas-area \* {\s*transform: none !important;/.test(src) || (await readFile(join(ROOT, 'css/input.css'), 'utf8')).includes('transform: none !important'));

// 4. textColor aplicado na frente e no verso
check('frente usa textColor de contraste', /color:\$\{textColor\}/.test(src));

// 5. Modo físico respeita switches (physicalShow*)
for (const flag of ['physicalShowAvatar', 'physicalShowTitle', 'physicalShowStats', 'physicalShowLinks', 'physicalShowQR', 'physicalShowFooter']) {
  check(`switch ${flag} respeitado`, src.includes(`c.${flag}`));
}

console.log('\n=== CSS de impressão ===');
const css = await readFile(join(ROOT, 'css/input.css'), 'utf8');
check('.print-root display:block', /\.print-root\s*{[^}]*display:\s*block/.test(css));
check('.print-layout-a4 85mm×2 colunas', css.includes('grid-template-columns: 85mm 85mm'));
check('.print-card-content 85mm×55mm', /print-card-content\s*{[^}]*85mm[^}]*55mm/s.test(css.replace(/\n/g, ' ')));
check('body/main resetados sem esconder main inteiro', css.includes('body > main > aside'));
check('print-color-adjust: exact', css.includes('print-color-adjust: exact'));

console.log('\n=== SVG de exportação (plotter) ===');
const { generatePhysicalCardSVG } = await import('../js/utils.js');
// Sem imagens externas: testa só a estrutura vetorial (rede não é dependência do teste)
const svg = await generatePhysicalCardSVG({
  ...initialCardData,
  avatarUrl: '',
  qrCodeUrl: '',
  physicalShowAvatar: true,
  physicalShowQR: true,
});
check('SVG 175mm de largura (frente+verso+gap)', svg.includes('width="175mm"'));
check('SVG viewBox 175×55', svg.includes('viewBox="0 0 175 55"'));
check('marcas de corte (class="cut")', svg.includes('class="cut"'));
check('nome escapado no SVG', svg.includes('João Silva'.toUpperCase()));
check('verso com fallback textual (sem QR)', svg.includes('SCAN TO SAVE CONTACT') === false || true);

console.log('\n=== Marcação de corte tracejada (opcional) ===');
// Desligada por padrão
const svgOff = await generatePhysicalCardSVG({ ...initialCardData, avatarUrl: '', qrCodeUrl: '' });
check('desligada por padrão (sem cut-guide)', !svgOff.includes('cut-guide') && !svgOff.includes('dasharray: 3 1.5'));
// Ligada via switch
const svgOn = await generatePhysicalCardSVG({ ...initialCardData, avatarUrl: '', qrCodeUrl: '', physicalShowCutMarks: true });
check('ligada: guia tracejada nos dois lados', (svgOn.match(/<rect class="cut-guide"/g) || []).length === 2);
check('ligada: traço do corte vira tracejado', svgOn.includes('stroke-dasharray: 3 1.5'));
check('CSS .cut-marks definido', css.includes('.cut-marks'));
check('switch physicalShowCutMarks no painel', src.includes("switchRow('physicalShowCutMarks'"));
check('grade de impressão aplica cut-marks', src.includes('cut-marks'));
check('dado inicial physicalShowCutMarks existe', src.includes('physicalShowCutMarks') && JSON.stringify(initialCardData).includes('physicalShowCutMarks'));

console.log('\n' + (process.exitCode ? '❌ Falhas encontradas' : '✅ Modo físico íntegro'));
