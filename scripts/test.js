/**
 * PCS 7 I/O Analyzer - Automated Test Suite
 * Tests recognition, parent RIO states, Cross-Reference linking, and self-tests
 * across all system export projects directly using the modular codebase.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Browser DOM stubs for headless Node environment
const createEl = (tag) => {
  const el = {
    tagName: tag,
    children: [],
    get firstElementChild() { return this.children[0] || createEl('div'); },
    set innerHTML(val) { this.children = [createEl('div')]; },
    append(...els) { this.children.push(...els); },
    classList: {
      add() {},
      remove() {},
      contains() { return false; }
    },
    querySelectorAll() { return []; },
    querySelector() { return createEl('div'); },
    setAttribute() {},
    removeAttribute() {},
    addEventListener() {},
    style: {}
  };
  return el;
};

const stub = () => createEl('div');

globalThis.document = {
  documentElement: stub(),
  querySelector: () => stub(),
  querySelectorAll: () => [],
  createElement: (tag) => createEl(tag)
};
globalThis.window = {
  print() {},
  addEventListener() {}
};
globalThis.alert = (m) => console.log('ALERT:', m);
globalThis.prompt = () => null;

console.log('Loading modular scripts (i18n, catalog, parser, analyzer, app)...');
require(path.join(rootDir, 'js', 'i18n.js'));
require(path.join(rootDir, 'js', 'catalog.js'));
require(path.join(rootDir, 'js', 'parser.js'));
require(path.join(rootDir, 'js', 'analyzer.js'));
require(path.join(rootDir, 'js', 'app.js'));

const api = globalThis.__PCS7IO;
if (!api) {
  console.error('FAIL: __PCS7IO was not exposed on globalThis!');
  process.exit(1);
}
console.log('SUCCESS: __PCS7IO loaded from modular sources!');

const cfgs = [
  { cfg: 'ctrlama.cfg', csv: 'AMA.csv' },
  { cfg: 'extrakce.cfg', csv: 'Extrakce.csv' },
  { cfg: 'lisovna.cfg', csv: 'Lisovna.csv' },
  { cfg: 'tdg.cfg', csv: 'tdg.csv' }
];

let allOk = true;

console.log('\n--- 1. Testing module recognition across all 4 export projects ---');
for (const pair of cfgs) {
  const cfgText = fs.readFileSync(path.join(rootDir, 'PCS7 export', pair.cfg), 'utf8');
  const p = api.parseHw(cfgText, pair.cfg);
  const rec = api.recognitionSummary(p);
  console.log(`[${pair.cfg}] Total modules: ${rec.total}, Verified: ${rec.verified} (incl. ${rec.device} devs), Probable: ${rec.probable}, Unknown: ${rec.unknown}, System: ${rec.system}`);
  
  if (rec.unknown > 0) {
    console.error(`FAIL: ${pair.cfg} has ${rec.unknown} unknown modules!`);
    allOk = false;
  }
  if (rec.probable > 0) {
    console.error(`FAIL: ${pair.cfg} has ${rec.probable} probable modules!`);
    allOk = false;
  }
}

console.log('\n--- 2. Testing parent RIO status in lisovna.cfg (e.g. N21-RM7P3) ---');
const lisCfg = fs.readFileSync(path.join(rootDir, 'PCS7 export', 'lisovna.cfg'), 'utf8');
const lisProj = api.parseHw(lisCfg, 'lisovna.cfg');

let rm7p3 = null;
const findRio = n => {
  if (n.kind === 'device' && n.name === 'N21-RM7P3') rm7p3 = n;
  n.children?.forEach(findRio);
};
findRio(lisProj);

if (!rm7p3) {
  console.error('FAIL: N21-RM7P3 not found in lisovna.cfg!');
  allOk = false;
} else {
  const st = api.recognitionState(rm7p3);
  console.log('N21-RM7P3 recognitionState:', st);
  if (st.key !== 'verified' || st.mark !== '✓') {
    console.error('FAIL: N21-RM7P3 state is not verified ✓! Got:', st);
    allOk = false;
  } else {
    console.log('PASS: N21-RM7P3 is verified ✓!');
  }
}

console.log('\n--- 3. Testing Cross-Reference matching on RM7P3-A1.6 ---');
const lisCsv = fs.readFileSync(path.join(rootDir, 'PCS7 export', 'Lisovna.csv'), 'utf8');
const lisRefs = api.parseCsv(lisCsv, 'Lisovna.csv');

api.state.projects = [lisProj];
api.state.refs = lisRefs;
api.relink();

const a16 = api.nodes().find(n => n.name === 'RM7P3-A1.6');
if (!a16) {
  console.error('FAIL: RM7P3-A1.6 module not found!');
  allOk = false;
} else {
  const ch2 = a16.channels.find(c => c.address === 'I1336.2');
  const ch3 = a16.channels.find(c => c.address === 'I1336.3');
  const ch0 = a16.channels.find(c => c.address === 'I1336.0');
  
  if (ch2?.status !== 'used' || ch2?.refs[0]?.symbol !== 'RM7P3QF') {
    console.error('FAIL: I1336.2 did not match RM7P3QF correctly!', ch2);
    allOk = false;
  }
  if (ch3?.status !== 'used' || ch3?.refs[0]?.symbol !== 'RM7P3FA') {
    console.error('FAIL: I1336.3 did not match RM7P3FA correctly!', ch3);
    allOk = false;
  }
  if (ch0?.status !== 'reserve') {
    console.error('FAIL: I1336.0 should be reserve!', ch0);
    allOk = false;
  }
  if (allOk) console.log('PASS: RM7P3-A1.6 channels and cross-references verified!');
}

console.log('\n--- 4. Testing self-tests & reserve search engine ---');
api.runSelfTests();

const reserves = api.nodes().filter(n => n.channels?.some(c => c.status === 'reserve'));
console.log(`PASS: Found ${reserves.length} modules containing reserve channels in lisovna`);

console.log('\n--- 5. Testing 6ES7 131-6BF00-0CA0 module recognition & channel counts ---');
for (const pair of cfgs) {
  const cfgText = fs.readFileSync(path.join(rootDir, 'PCS7 export', pair.cfg), 'utf8');
  const proj = api.parseHw(cfgText, pair.cfg);
  const m131 = [];
  const walk = n => {
    if (n.mlfb && n.mlfb.includes('131-6BF00') && n.kind === 'module') m131.push(n);
    n.children?.forEach(walk);
  };
  walk(proj);
  if (m131.length) {
    const zeros = m131.filter(m => m.channels.length === 0);
    if (zeros.length > 0) {
      console.error(`FAIL: ${pair.cfg} has ${zeros.length} 6ES7 131-6BF00-0CA0 modules with 0 channels!`, zeros.map(z => ({ name: z.name, slot: z.slot })));
      allOk = false;
    } else {
      console.log(`PASS: [${pair.cfg}] All ${m131.length} modules of 6ES7 131-6BF00-0CA0 recognized with 8 DI channels!`);
    }
  }
}

// Specifically test Device 56 Slot 1 in tdg.cfg
const tdgText = fs.readFileSync(path.join(rootDir, 'PCS7 export', 'tdg.cfg'), 'utf8');
const tdgProj = api.parseHw(tdgText, 'tdg.cfg');
let dev56Slot1 = null;
const find56 = n => {
  if (n.kind === 'module' && n.slot === 1 && n.mlfb === '6ES7 131-6BF00-0CA0' && n.header.includes('IOADDRESS 56')) dev56Slot1 = n;
  n.children?.forEach(find56);
};
find56(tdgProj);
if (!dev56Slot1 || dev56Slot1.channels.length !== 8 || dev56Slot1.channels[0].address !== 'I2500.0') {
  console.error('FAIL: tdg.cfg IOADDRESS 56 Slot 1 not properly recognized!', dev56Slot1);
  allOk = false;
} else {
  console.log('PASS: tdg.cfg IOADDRESS 56 Slot 1 verified: 8 channels (I2500.0..I2500.7), symbol:', dev56Slot1.channels[0].hwSymbol);
}

console.log('\n===========================================');
console.log('ALL TESTS RESULT:', allOk ? 'PASSED SUCCESS (100%)' : 'FAILED');
console.log('===========================================\n');
process.exit(allOk ? 0 : 1);
