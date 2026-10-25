/**
 * PCS 7 I/O Analyzer - Parser Module
 * Handles hardware configuration export grammar (CFG/TXT),
 * Cross-References CSV parsing, device inference, and module enrichment.
 */
(() => {
  'use strict';

  const uid = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
  const quoted = s => [...s.matchAll(/"([^"]*)"/g)].map(x => x[1]);

  function getCatalog() {
    return (typeof globalThis !== 'undefined' && globalThis.PCS7Catalog) || (typeof window !== 'undefined' && window.PCS7Catalog) || { catalog: {}, normMlfb: s => s };
  }

  function decode(buf) {
    for (const e of ['utf-8', 'windows-1250', 'iso-8859-2']) {
      try {
        return new TextDecoder(e, { fatal: true }).decode(buf);
      } catch {}
    }
    return new TextDecoder().decode(buf);
  }

  function detect(text, name = '') {
    const t = text.slice(0, 120000);
    if (/\bSTATION\s+(?:S7|PC)|\b(?:IO|DP)SUBSYSTEM\s+\d+/i.test(t) && /\bBEGIN\b[\s\S]*\bEND\b/i.test(t)) return 'hw';
    if (/Symbol\s*;\s*Address\s*;\s*Data type\s*;\s*R\/W/i.test(t)) return 'xref';
    if (/^\s*\{[\s\S]*"projects"\s*:/i.test(t)) return 'project';
    if (/^\s*\{[\s\S]*"(?:6ES|6DL|3RK|3UF)/i.test(t)) return 'catalog';
    return /\.csv$/i.test(name) ? 'xref' : 'unknown';
  }

  function baseNode(h, file, line) {
    return { ...h, id: uid(), file, lineStart: line, lineEnd: line, children: [], comments: [], symbols: [], inAddrs: [], outAddrs: [], params: [], raw: '', warnings: [] };
  }

  function header(line) {
    const { normMlfb } = getCatalog();
    const q = quoted(line), o = { header: line.trim(), name: q.at(-1) || line.trim(), mlfb: '', version: '', slot: null, subslot: null, address: null, bus: '', kind: 'object' };
    const sm = line.match(/(?:^|,\s*)SLOT\s+(\d+)/i), su = line.match(/SUBSLOT\s+(\d+)/i), io = line.match(/IOADDRESS\s+(\d+)/i), dp = line.match(/DPADDRESS\s+(\d+)/i);
    if (sm) o.slot = +sm[1];
    if (su) o.subslot = +su[1];
    if (io) { o.address = +io[1]; o.bus = 'PROFINET'; }
    if (dp) { o.address = +dp[1]; o.bus = 'PROFIBUS'; }
    if (q.length > 1) {
      o.mlfb = normMlfb(q.at(-2));
      if (/^V\d/i.test(o.mlfb) && q.length > 2) o.mlfb = normMlfb(q.at(-3));
    }
    if (/^STATION\s/i.test(line)) o.kind = 'station';
    else if (/CONTROLLER\s+(?:IO|DP)SUBSYSTEM/i.test(line)) o.kind = 'controller';
    else if (/^(?:IO|DP)SUBSYSTEM\s+\d+.*(?:IO|DP)ADDRESS/i.test(line) && o.slot == null) o.kind = 'device';
    else if (o.slot != null || /^RACK\s/i.test(line)) o.kind = 'module';
    return o;
  }

  function parseHw(text, file) {
    const { normMlfb } = getCatalog();
    const ls = text.replace(/\r/g, '').split('\n'), root = baseNode({ kind: 'project', name: file.replace(/\.[^.]+$/, ''), header: '', mlfb: '', bus: '' }, file, 1);
    let station = root, controller = null, device = null, current = root, mode = '';
    for (let i = 0; i < ls.length; i++) {
      const t = ls[i].trim(); let n = null;
      if (/^STATION\s/i.test(t)) { n = baseNode(header(t), file, i + 1); root.children.push(n); station = n; controller = device = null; }
      else if (/CONTROLLER\s+(?:IO|DP)SUBSYSTEM/i.test(t)) { n = baseNode(header(t), file, i + 1); station.children.push(n); controller = n; device = null; }
      else if (/^(?:IO|DP)SUBSYSTEM\s/i.test(t) || /^RACK\s/i.test(t)) {
        n = baseNode(header(t), file, i + 1);
        if (n.kind === 'device') { (controller || station).children.push(n); device = n; }
        else { (device || controller || station).children.push(n); }
      }
      if (n) { if (current) current.lineEnd = i; current = n; mode = ''; continue; }
      if (!current) continue;
      if (/^COMMENT\s/i.test(t)) { const q = quoted(t); if (q.length) current.comments.push(q[0]); }
      else if (/^MLFB\s/i.test(t)) { const q = quoted(t); if (q[0]) current.mlfb = normMlfb(q[0]); }
      else if (/^LOCAL_IN_ADDRESSES/i.test(t)) mode = 'in';
      else if (/^LOCAL_OUT_ADDRESSES/i.test(t)) mode = 'out';
      else if (/^PARAMETER/i.test(t)) mode = 'param';
      else if (/^ADDRESS\s/i.test(t)) { const a = (t.match(/-?\d+/g) || []).map(Number); if (a.length) (mode === 'out' ? current.outAddrs : current.inAddrs).push(a); }
      else if (/^SYMBOL\s/i.test(t)) { const m = t.match(/^SYMBOL\s+([IO])\s*,\s*(\d+)/i), q = quoted(t); if (m) current.symbols.push({ dir: m[1].toUpperCase(), offset: +m[2], name: q[0] || '', comment: q[1] || '' }); }
      else if (mode === 'param' && t && !/^END\b/.test(t)) current.params.push(t);
    }
    function finish(n) {
      n.lineEnd = Math.max(n.lineEnd, n.lineStart);
      n.raw = ls.slice(n.lineStart - 1, Math.min(ls.length, n.lineStart + 130)).join('\n');
      n.children.forEach(finish);
      enrich(n);
    }
    finish(root);
    return root;
  }

  function inferDevice(n) {
    const text = (n.name + ' ' + (n.header || '') + ' ' + (n.mlfb || '')).toUpperCase();
    if (/SIMOCODE.*<[12]>|BASIC TYPE [12]/.test(text)) return { type: 'DEV', family: 'SIMOCODE', devType: 'SIMOCODE pro V' };
    if (/DANFOSS|STANDTARD_TELEGRAM|PP0_6_PCD|PPO TYPE [36]|--> 0 PKW|--> PPO 3|--> EXTENDED|\bEXTENDED\b/i.test(text) && /DANFOSS|FC-|298[01]|VLT|DRIVE|PPO|TELEGRAM|PCD/i.test(text)) {
      return { type: 'DEV', family: 'Danfoss Inverter', devType: 'Měnič frekvence Danfoss' };
    }
    if (/SINAMICS|IDS_TEL352|SIEMENS TELEGRAM 352|STANDARD TELEGRAM [12]0?/i.test(text)) {
      return { type: 'DEV', family: 'SINAMICS', devType: 'Měnič frekvence SINAMICS' };
    }
    if (/\bAI\s*:\s*OUT\b|\bTOT:\s*TOTAL|\bBATCHING_|\bDISPLAY_VALUE\b|\bCONTROL_BLOCK\b|\bTOTAL\b|\bDO\s*:\s*SP\b|\bDI\s*:\s*OUT\b/i.test(text) ||
       (/DPSUBSYSTEM\s+\d+.*["']AI["']/i.test(n.header) && (n.inAddrs[0]?.[2] === 5 || n.inAddrs[0]?.[2] === 4))) {
      return { type: 'DEV', family: 'PA Field Device', devType: 'Převodník Profibus-PA' };
    }
    if (/GENERAL CONTROLLER|GENERAL STATUS\/CONTROL|I\/O - [12] WORDS? (?:IN|OUT)|I\/O - 1 FLOAT (?:IN|OUT)/i.test(text)) {
      return { type: 'DEV', family: 'PMA Controller', devType: 'Regulátor PMA KS92' };
    }
    if (/ROTODYNAMICPUMP/i.test(text)) return { type: 'DEV', family: 'KSB Pump', devType: 'Čerpadlo KSB' };
    if (/EEM-MA770|SUBM_METERING|SUBM_COUNTER_ENERGY|ENERGYMETER/i.test(text)) return { type: 'DEV', family: 'Energy Meter', devType: 'Měření energie' };
    if (/\b(?:64|32|16|8)\s*BYTES?\s*(?:INPUT|OUTPUT)|PN_PN_MODUL/i.test(text)) return { type: 'DEV', family: 'PN/PN Coupler', devType: 'PN/PN Coupler' };
    if (/UPS1600|QUINT4-UPS|CAPAROC/i.test(text)) return { type: 'DEV', family: 'Power/UPS', devType: 'Napájení a UPS' };
    return null;
  }

  function infer(n, extCatalog) {
    const { normMlfb, catalog: defCatalog } = getCatalog();
    const cat = extCatalog || defCatalog;
    const norm = normMlfb(n.mlfb || n.name);
    const c = cat[norm] || cat[n.mlfb];
    if (c) {
      if (c.isSystem) return { type: 'OTHER', channels: 0, family: c.family, width: '', confidence: 'verified', basis: 'systémový modul katalogu', isSystem: true };
      if (c.type === 'DEV') return { type: 'DEV', channels: 0, family: c.family, devType: c.devType, width: '', confidence: 'verified', basis: 'zařízení katalogu MLFB' };
      return { ...c, confidence: 'verified', basis: 'katalog MLFB' };
    }
    const dev = inferDevice(n);
    if (dev) {
      return { type: 'DEV', channels: 0, family: dev.family, devType: dev.devType, width: '', confidence: 'verified', basis: 'rozpoznané sběrnicové zařízení' };
    }
    const text = (n.name + ' ' + (n.mlfb || '') + ' ' + (n.header || '')).toUpperCase();
    if (/_DP_INTEGR_|_MPI_DPI_|_PORT_|INTERFACE_CT|SERVER MODULE|-SM\b|SYNC MODULE|H SYNC|SCALANCE|PORT\s*\d|BU COVER|UPS-BAT|QUINT4-PS/i.test(text)) {
      return { type: 'OTHER', channels: 0, family: '', width: '', confidence: 'verified', basis: 'systémový / diagnostický objekt', isSystem: true };
    }
    if (n.slot === 0) {
      return { type: 'OTHER', channels: 0, family: '', width: '', confidence: 'verified', basis: 'objekt slotu 0', isSystem: true };
    }
    const allAddrs = [...n.inAddrs, ...n.outAddrs];
    if (allAddrs.length && allAddrs.every(a => a[2] === 0 || a[0] >= 8000)) {
      return { type: 'OTHER', channels: 0, family: '', width: '', confidence: 'verified', basis: 'diagnostické / systémové adresy', isSystem: true };
    }
    if (n.inAddrs.length && n.outAddrs.length) {
      return { type: 'DEV', channels: 0, family: 'Kombinované zařízení', width: '', confidence: 'verified', basis: 'zařízení s I/O daty' };
    }
    const dir = n.outAddrs.length ? 'out' : n.inAddrs.length ? 'in' : '';
    if (!dir) return { type: 'OTHER', channels: 0, family: '', width: '', confidence: 'verified', basis: 'bez procesních I/O', isSystem: true };

    let type = dir === 'out' ? 'DO' : 'DI';
    if (/\bAI\b|ANALOG INPUT|6ES7 331|6ES7 134/.test(text)) type = 'AI';
    if (/\bAO\b|ANALOG OUTPUT|6ES7 332|6ES7 135/.test(text)) type = 'AO';
    let channels = n.symbols.length ? Math.max(...n.symbols.map(x => x.offset)) + 1 : 0;
    for (const p of n.params) {
      const x = p.match(/CHANNEL_\w+\s*,\s*(?:DI|DO|AI|AO)\s*,\s*(\d+)/i);
      if (x) channels = Math.max(channels, +x[1] + 1);
    }
    const a = (dir === 'out' ? n.outAddrs : n.inAddrs)[0];
    if (!channels && a) {
      const bytes = a[2] || 0;
      channels = (type === 'DI' || type === 'DO') ? Math.min(bytes * 8, 64) : Math.floor(bytes / 2);
    }
    return { type, channels, family: '', width: (type === 'DI' || type === 'DO') ? 'bit' : 'word', confidence: channels ? 'probable' : 'unknown', basis: channels ? 'odvozeno ze symbolů/parametrů/adresy' : 'počet kanálů nelze určit' };
  }

  function isProcessModule(n, x) {
    const text = (n.name + ' ' + n.mlfb + ' ' + n.header).toUpperCase();
    if (n.kind !== 'module') return false;
    if (x.isSystem || x.type === 'OTHER') return false;
    if (n.slot === 0 || /PORT\s*\d|SERVER MODULE|-SM\b|INTERFACE|SUBMODUL|SYNC MODULE|H SYNC|SCALANCE/.test(text)) return false;
    if (x.type === 'DEV') return true;
    if (!['DI', 'DO', 'AI', 'AO', 'DI/DO'].includes(x.type)) return false;
    const addrs = [...n.inAddrs, ...n.outAddrs].map(a => a[0]);
    if (addrs.length && Math.min(...addrs) >= 8000) return false;
    return true;
  }

  function formatAddress(base, type, i) {
    if (type === 'DI') return `I${base + Math.floor(i / 8)}.${i % 8}`;
    if (type === 'DO') return `Q${base + Math.floor(i / 8)}.${i % 8}`;
    if (type === 'AI') return `IW${base + i * 2}`;
    if (type === 'AO') return `QW${base + i * 2}`;
    return '';
  }

  function enrich(n, extCatalog) {
    const x = infer(n, extCatalog), processData = isProcessModule(n, x);
    const prevChannelsMap = new Map((n.channels || []).map(c => [c.address, c]));
    Object.assign(n, {
      ioType: processData ? x.type : 'OTHER',
      processData,
      channelCount: processData ? (x.channels || (x.type === 'DEV' ? n.symbols.length || 1 : 0)) : 0,
      family: x.family || '',
      devType: x.devType || '',
      confidence: x.confidence || (processData ? 'probable' : 'verified'),
      basis: x.basis || '',
      channels: []
    });
    if (!processData) return;

    // 1. Mixed DI/DO module (e.g. 6ES7 323-1BH01-0AA0)
    if (x.type === 'DI/DO') {
      const inBase = n.inAddrs[0]?.[0], outBase = n.outAddrs[0]?.[0];
      const diCh = x.diChannels || 8, doCh = x.doChannels || 8;
      if (inBase != null) {
        for (let i = 0; i < diCh; i++) {
          const sy = n.symbols.find(s => s.dir === 'I' && s.offset === i);
          const addr = `I${inBase + Math.floor(i / 8)}.${i % 8}`;
          const prev = prevChannelsMap.get(addr);
          n.channels.push({
            index: i, ioType: 'DI', address: addr, hwSymbol: sy?.name || '', hwComment: sy?.comment || '',
            refs: [], status: 'unknown', confidence: x.confidence, physical: prev?.physical || 'unchecked',
            reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt
          });
        }
      }
      if (outBase != null) {
        for (let i = 0; i < doCh; i++) {
          const sy = n.symbols.find(s => s.dir === 'O' && s.offset === i);
          const addr = `Q${outBase + Math.floor(i / 8)}.${i % 8}`;
          const prev = prevChannelsMap.get(addr);
          n.channels.push({
            index: diCh + i, ioType: 'DO', address: addr, hwSymbol: sy?.name || '', hwComment: sy?.comment || '',
            refs: [], status: 'unknown', confidence: x.confidence, physical: prev?.physical || 'unchecked',
            reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt
          });
        }
      }
      n.channelCount = n.channels.length;
      return;
    }

    // 2. Standard Process I/O Cards (DI, DO, AI, AO)
    if (['DI', 'DO', 'AI', 'AO'].includes(x.type) && x.channels) {
      const arr = (x.type === 'DO' || x.type === 'AO') ? n.outAddrs : n.inAddrs, base = arr[0]?.[0];
      if (base != null) {
        for (let i = 0; i < x.channels; i++) {
          const sy = n.symbols.find(s => s.offset === i);
          const addr = formatAddress(base, x.type, i);
          const prev = prevChannelsMap.get(addr);
          n.channels.push({
            index: i, ioType: x.type, address: addr, hwSymbol: sy?.name || '', hwComment: sy?.comment || '',
            refs: [], status: 'unknown', confidence: x.confidence, physical: prev?.physical || 'unchecked',
            reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt
          });
        }
      }
      return;
    }

    // 3. Field Devices (DEV)
    if (x.type === 'DEV') {
      if (n.symbols.length) {
        for (let i = 0; i < n.symbols.length; i++) {
          const s = n.symbols[i];
          const addrs = s.dir === 'O' ? n.outAddrs : n.inAddrs;
          const base = addrs[0] ? addrs[0][0] : 0;
          let addr = '';
          if (s.name && /^[IQ]\d+\.[0-7]$/i.test(s.name)) {
            addr = s.name.toUpperCase();
          } else {
            const len = addrs[0] ? addrs[0][2] : 1;
            if (len <= 2 && s.offset < 8 && !/AI|AQ|ANALOG|FLOAT|PA/i.test(n.name + ' ' + n.header)) {
              addr = `${s.dir}${base}.${s.offset}`;
            } else {
              addr = `${s.dir}W${base + s.offset}`;
            }
          }
          const prev = prevChannelsMap.get(addr);
          n.channels.push({
            index: i, ioType: 'DEV', address: addr, hwSymbol: s.name, hwComment: s.comment,
            refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked',
            reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt
          });
        }
      } else {
        let idx = 0;
        for (const a of n.inAddrs) {
          const base = a[0], len = a[2] || 0;
          if (len === 0 || base >= 8000) continue;
          if (len === 1) {
            const addr = `IB${base}`;
            const prev = prevChannelsMap.get(addr);
            n.channels.push({ index: idx++, ioType: 'DEV', address: addr, hwSymbol: '', hwComment: '', refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked', reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt });
          } else if (len === 2) {
            const addr = `IW${base}`;
            const prev = prevChannelsMap.get(addr);
            n.channels.push({ index: idx++, ioType: 'DEV', address: addr, hwSymbol: '', hwComment: '', refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked', reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt });
          } else {
            for (let b = 0; b < len; b += 2) {
              const addr = `IW${base + b}`;
              const prev = prevChannelsMap.get(addr);
              n.channels.push({ index: idx++, ioType: 'DEV', address: addr, hwSymbol: '', hwComment: '', refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked', reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt });
            }
          }
        }
        for (const a of n.outAddrs) {
          const base = a[0], len = a[2] || 0;
          if (len === 0 || base >= 8000) continue;
          if (len === 1) {
            const addr = `QB${base}`;
            const prev = prevChannelsMap.get(addr);
            n.channels.push({ index: idx++, ioType: 'DEV', address: addr, hwSymbol: '', hwComment: '', refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked', reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt });
          } else if (len === 2) {
            const addr = `QW${base}`;
            const prev = prevChannelsMap.get(addr);
            n.channels.push({ index: idx++, ioType: 'DEV', address: addr, hwSymbol: '', hwComment: '', refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked', reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt });
          } else {
            for (let b = 0; b < len; b += 2) {
              const addr = `QW${base + b}`;
              const prev = prevChannelsMap.get(addr);
              n.channels.push({ index: idx++, ioType: 'DEV', address: addr, hwSymbol: '', hwComment: '', refs: [], status: 'dev-unused', confidence: x.confidence, physical: prev?.physical || 'unchecked', reservation: prev?.reservation || '', note: prev?.note || '', checkedAt: prev?.checkedAt });
            }
          }
        }
      }
      n.channelCount = n.channels.length;
    }
  }

  function parseCsv(text, file) {
    const rows = []; let row = [], cell = '', quotedCell = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quotedCell) {
        if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (c === '"') quotedCell = false;
        else cell += c;
      } else if (c === '"') quotedCell = true;
      else if (c === ';') { row.push(cell); cell = ''; }
      else if (c === '\n') { row.push(cell.replace(/\r$/, '')); if (row.some(v => v.trim())) rows.push(row); row = []; cell = ''; }
      else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return [];
    const h = rows.shift().map(v => v.trim().toLowerCase()), idx = k => h.indexOf(k);
    return rows.map(r => ({
      file,
      symbol: r[idx('symbol')] || '',
      address: (r[idx('address')] || '').trim().toUpperCase().replace(/\s/g, ''),
      dataType: r[idx('data type')] || '',
      rw: r[idx('r/w')] || '',
      chart: r[idx('chart')] || '',
      element: r[idx('chart element')] || '',
      comment: r[idx('element comment')] || '',
      type: r[idx('type')] || ''
    })).filter(x => x.address);
  }

  const exp = { detect, decode, header, baseNode, parseHw, parseCsv, inferDevice, infer, isProcessModule, enrich, formatAddress };
  if (typeof module !== 'undefined' && module.exports) module.exports = exp;
  if (typeof window !== 'undefined') window.PCS7Parser = exp;
  if (typeof globalThis !== 'undefined') globalThis.PCS7Parser = exp;
})();
