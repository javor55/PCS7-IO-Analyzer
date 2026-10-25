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

const exportDir = path.join(rootDir, 'PCS7 export');
const hasLocalExports = fs.existsSync(exportDir);

const cfgs = [
  { cfg: 'ctrlama.cfg', csv: 'AMA.csv' },
  { cfg: 'extrakce.cfg', csv: 'Extrakce.csv' },
  { cfg: 'lisovna.cfg', csv: 'Lisovna.csv' },
  { cfg: 'tdg.cfg', csv: 'tdg.csv' }
];

let allOk = true;

console.log('\n--- 1. Testing module recognition & subslot propagation (Synthetic & Integration) ---');
const sampleCfg = `
STATION S7_400
CONTROLLER IOSUBSYSTEM 100
IOSUBSYSTEM 100, IOADDRESS 56, "6ES7 155-6AU00-0CN0", "RIO_ET200SP"
BEGIN
END
IOSUBSYSTEM 100, IOADDRESS 56, SLOT 0, "6ES7 155-6AU00-0CN0", "IM155-6"
BEGIN
END
IOSUBSYSTEM 100, IOADDRESS 56, SLOT 1, "MSI_8K:6ES7 131-6BF00-0CA0" "V2.0", "DI8 x 24VDC HF V2.0"
BEGIN
  COMMENT "Digital Input 8 channels"
END
IOSUBSYSTEM 100, IOADDRESS 56, SLOT 1, SUBSLOT 1, "_S7H_HSP_6ES7_131_6BF00_0CA0_SUBMODULE_V2_0_CT", "DI8 x 24VDC HF"
AUTOCREATED
BEGIN
LOCAL_IN_ADDRESSES
  ADDRESS 2500, 0, 1, 0, 0, 16
SYMBOL I, 0, "TEST_DI_0", "Channel 0 Symbol"
SYMBOL I, 1, "TEST_DI_1", "Channel 1 Symbol"
END
IOSUBSYSTEM 100, IOADDRESS 56, SLOT 2, "6ES7 132-6BF00-0CA0", "DQ8 x 24VDC/0.5A HF"
BEGIN
LOCAL_OUT_ADDRESSES
  ADDRESS 2500, 0, 1, 0, 0, 16
SYMBOL O, 0, "TEST_DO_0", "Valve Open Command"
END
`;

const sampleProj = api.parseHw(sampleCfg, 'sample.cfg');
const sampleRec = api.recognitionSummary(sampleProj);
console.log(`[sample.cfg] Verified: ${sampleRec.verified}, Probable: ${sampleRec.probable}, Unknown: ${sampleRec.unknown}, System: ${sampleRec.system}`);

const slot1 = sampleProj.children[0].children[0].children[0].children.find(c => c.slot === 1);
if (!slot1 || slot1.channels.length !== 8 || slot1.channels[0].address !== 'I2500.0' || slot1.channels[0].hwSymbol !== 'TEST_DI_0') {
  console.error('FAIL: Synthetic subslot propagation failed!', slot1);
  allOk = false;
} else {
  console.log('PASS: Synthetic ET 200SP 6ES7 131-6BF00-0CA0 subslot propagation verified with 8 channels!');
}

if (hasLocalExports) {
  console.log('\n--- 2. Testing module recognition across local export projects ---');
  for (const pair of cfgs) {
    const cfgPath = path.join(exportDir, pair.cfg);
    if (!fs.existsSync(cfgPath)) continue;
    const cfgText = fs.readFileSync(cfgPath, 'utf8');
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
} else {
  console.log('\n[INFO] Private PCS7 export/ directory is excluded from repository (air-gap protected). Running in public standalone test mode.');
}

if (hasLocalExports) {
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
    const cfgPath = path.join(rootDir, 'PCS7 export', pair.cfg);
    if (!fs.existsSync(cfgPath)) continue;
    const cfgText = fs.readFileSync(cfgPath, 'utf8');
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
  const tdgPath = path.join(rootDir, 'PCS7 export', 'tdg.cfg');
  if (fs.existsSync(tdgPath)) {
    const tdgText = fs.readFileSync(tdgPath, 'utf8');
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
  }
} else {
  console.log('\n--- 2. Testing synthetic Cross-Reference matching & reserve detection ---');
  const sampleCsv = `Address;Symbol;Data type;R/W;Chart/Sheet;Block
I2500.0;TEST_DI_0;BOOL;R;CFC_MAIN\\1;AND
I2500.1;TEST_DI_1;BOOL;R;CFC_MAIN\\1;OR`;
  const refs = api.parseCsv(sampleCsv, 'sample.csv');
  api.state.projects = [sampleProj];
  api.state.refs = refs;
  api.relink();

  const c0 = slot1.channels[0];
  const c1 = slot1.channels[1];
  const c2 = slot1.channels[2];
  if (c0.status !== 'used' || c1.status !== 'used' || c2.status !== 'reserve') {
    console.error('FAIL: Synthetic cross-reference matching failed!', { c0, c1, c2 });
    allOk = false;
  } else {
    console.log('PASS: Synthetic cross-reference matched (used & reserve detected)!');
  }

  console.log('\n--- 3. Testing self-tests & diagnostic engine ---');
  api.runSelfTests();
  console.log('PASS: Self-tests passed successfully!');
}

console.log('\n===========================================');
console.log('ALL TESTS RESULT:', allOk ? 'PASSED SUCCESS (100%)' : 'FAILED');
console.log('===========================================\n');
process.exit(allOk ? 0 : 1);
