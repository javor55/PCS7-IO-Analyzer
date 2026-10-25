/**
 * PCS 7 I/O Analyzer - Analyzer Module
 * Handles Cross-Reference matching, reserve detection, hardware verification,
 * address conflict resolution, self-tests, and project diffs.
 */
(() => {
  'use strict';

  function nodes(state) {
    const a = [], walk = n => { a.push(n); n.children?.forEach(walk); };
    (state.projects || []).forEach(walk);
    return a;
  }

  function isReserve(c, n) {
    if (n.ioType === 'DEV' || n.ioType === 'OTHER' || c.ioType === 'DEV') return false;
    return /\b(rezerva|reserve)\b/i.test([c.hwSymbol, c.hwComment, ...(n.comments || [])].join(' ')) || !c.hwSymbol;
  }

  function projectOfNode(target, state) {
    for (const p of state.projects) {
      let hit = false;
      const walk = n => { if (n === target) hit = true; else n.children?.forEach(walk); };
      walk(p);
      if (hit) return p;
    }
    return null;
  }

  function deviceFor(target, state) {
    let found = null;
    for (const p of state.projects) {
      const walk = (n, current = null) => {
        if (n.kind === 'device') current = n;
        if (n === target) found = current;
        n.children?.forEach(x => walk(x, current));
      };
      walk(p);
    }
    return found;
  }

  function refFiles(state) {
    return [...new Set((state.refs || []).map(r => r.file))];
  }

  function autoBindRefs(state) {
    for (const file of refFiles(state)) {
      if (state.xrefBindings[file] && state.projects.some(p => p.id === state.xrefBindings[file])) continue;
      const rr = state.refs.filter(r => r.file === file), scores = state.projects.map(p => {
        const addrs = new Set();
        const walk = n => { for (const c of n.channels || []) addrs.add(c.address.toUpperCase()); n.children?.forEach(walk); };
        walk(p);
        let hits = 0;
        for (const r of rr) if (addrs.has(r.address)) hits++;
        return { id: p.id, hits, ratio: rr.length ? hits / rr.length : 0 };
      }).sort((a, b) => b.hits - a.hits);
      if (scores[0]?.hits) state.xrefBindings[file] = scores[0].id;
    }
  }

  function relink(state) {
    autoBindRefs(state);
    const maps = new Map();
    for (const p of state.projects) maps.set(p.id, new Map());
    for (const r of state.refs) {
      const pid = state.xrefBindings[r.file], m = maps.get(pid);
      if (!m) continue;
      const a = r.address.toUpperCase();
      if (!m.has(a)) m.set(a, []);
      m.get(a).push(r);
    }
    for (const n of nodes(state)) {
      const p = projectOfNode(n, state), m = maps.get(p?.id) || new Map();
      for (const c of n.channels || []) {
        const ca = c.address.toUpperCase();
        let refs = m.get(ca) || [];
        if (!refs.length) {
          const wm = ca.match(/^([IQ])W(\d+)$/);
          if (wm) {
            const dir = wm[1], byteNum = +wm[2];
            const b1 = m.get(`${dir}B${byteNum}`) || [];
            const b2 = m.get(`${dir}B${byteNum + 1}`) || [];
            const d = m.get(`${dir}D${byteNum}`) || [];
            if (b1.length || b2.length || d.length) refs = [...b1, ...b2, ...d];
          }
        }
        c.refs = refs;
        if (c.confidence === 'unknown') c.status = 'unknown';
        else if (c.refs.length > 1) c.status = 'multiple';
        else if (c.refs.length) c.status = 'used';
        else if (n.ioType === 'DEV' || c.ioType === 'DEV') c.status = 'dev-unused';
        else if (isReserve(c, n)) c.status = 'reserve';
        else c.status = 'named-unused';
      }
    }
  }

  function stats(n) {
    const ch = [];
    const walk = x => { ch.push(...(x.channels || [])); x.children?.forEach(walk); };
    walk(n);
    const count = k => ch.filter(c => c.status === k).length;
    return {
      all: ch.length,
      free: count('reserve'),
      used: count('used'),
      named: count('named-unused') + count('dev-unused'),
      multiple: count('multiple'),
      unknown: count('unknown')
    };
  }

  function ioBreakdown(n) {
    const out = {
      DI: { total: 0, used: 0, reserve: 0, named: 0, unknown: 0 },
      DO: { total: 0, used: 0, reserve: 0, named: 0, unknown: 0 },
      AI: { total: 0, used: 0, reserve: 0, named: 0, unknown: 0 },
      AO: { total: 0, used: 0, reserve: 0, named: 0, unknown: 0 },
      DEV: { total: 0, used: 0, reserve: 0, named: 0, unknown: 0 }
    };
    const walk = x => {
      for (const c of x.channels || []) {
        const t = c.ioType || x.ioType;
        const b = out[t];
        if (!b) continue;
        b.total++;
        if (c.status === 'used' || c.status === 'multiple') b.used++;
        else if (c.status === 'reserve') b.reserve++;
        else if (c.status === 'named-unused' || c.status === 'dev-unused') b.named++;
        else b.unknown++;
      }
      x.children?.forEach(walk);
    };
    walk(n);
    return out;
  }

  function recognitionSummary(n) {
    const out = { verified: 0, probable: 0, unknown: 0, system: 0, device: 0, total: 0 };
    const walk = x => {
      if (x.kind === 'module') {
        if (x.processData) {
          out.total++;
          if (x.ioType === 'DEV') { out.device++; out.verified++; }
          else if (x.confidence === 'verified') out.verified++;
          else if (x.confidence === 'probable') out.probable++;
          else out.unknown++;
        } else if ((x.inAddrs?.length || x.outAddrs?.length) || x.ioType === 'OTHER') {
          out.system++;
        }
      }
      x.children?.forEach(walk);
    };
    walk(n);
    return out;
  }

  function getI18n() {
    return (typeof globalThis !== 'undefined' && globalThis.PCSI18n) || (typeof window !== 'undefined' && window.PCSI18n) || { t: (k) => k };
  }

  function recognitionState(n) {
    const { t } = getI18n();
    const r = recognitionSummary(n);
    if (r.unknown) return { key: 'unknown', mark: '!', label: t('badgeUnknown'), title: `Unknown: ${r.unknown}; Derived: ${r.probable}; Verified: ${r.verified}; Device: ${r.device}; System: ${r.system}` };
    if (r.probable) return { key: 'probable', mark: '~', label: t('badgeDerived'), title: `Derived: ${r.probable}; Verified: ${r.verified}; Device: ${r.device}; System: ${r.system}` };
    if (n.kind === 'module' && n.ioType === 'DEV') return { key: 'dev', mark: 'Z', label: t('badgeDevice'), title: `Field/Bus Device: ${n.devType || n.family || n.name}` };
    if (r.verified) return { key: 'verified', mark: '✓', label: t('badgeVerified'), title: `Verified: ${r.verified}; Device: ${r.device}; System: ${r.system}` };
    if (r.system) return { key: 'system', mark: 'S', label: t('badgeSystem'), title: `System / Diagnostic: ${r.system}` };
    return { key: 'none', mark: '', label: '', title: '' };
  }

  function reserveRows(state) {
    const rows = [];
    for (const n of nodes(state)) {
      if (!n.channels?.length || n.ioType === 'DEV' || n.ioType === 'OTHER') continue;
      const dev = deviceFor(n, state);
      for (const c of n.channels) {
        if (c.status === 'reserve') rows.push({ device: dev?.name || '', module: n.name, slot: n.slot, type: c.ioType || n.ioType, address: c.address, mlfb: n.mlfb, confidence: c.confidence });
      }
    }
    return rows;
  }

  function contextFor(target, state) {
    let result = { project: '', station: '', controller: '', device: '' };
    for (const p of state.projects) {
      const walk = (n, ctx) => {
        const next = { ...ctx };
        if (n.kind === 'project') next.project = n.name;
        if (n.kind === 'station') next.station = n.name;
        if (n.kind === 'controller') next.controller = n.name;
        if (n.kind === 'device') next.device = n.name;
        if (n === target) result = next;
        n.children?.forEach(x => walk(x, next));
      };
      walk(p, { project: p.name, station: '', controller: '', device: '' });
    }
    return result;
  }

  function scopedKey(n, c, state) {
    const x = contextFor(n, state);
    return [x.project, x.station, x.controller, x.device, n.bus || '', c.address.toUpperCase()].join('|');
  }

  function addressConflicts(state) {
    const m = new Map(), out = [];
    for (const n of nodes(state)) {
      for (const c of n.channels || []) {
        const k = scopedKey(n, c, state);
        if (!m.has(k)) m.set(k, []);
        m.get(k).push({ node: n, channel: c });
      }
    }
    for (const [key, items] of m) if (items.length > 1) out.push({ key, address: items[0].channel.address, items });
    return out;
  }

  function physicalOf(r, allNodes) {
    const pair = allNodes.flatMap(n => (n.channels || []).map(c => ({ n, c }))).find(x => x.c.address === r.address && x.n.name === r.module);
    return pair?.c.physical || 'unchecked';
  }

  function physicalRank(r, allNodes) {
    return ({ free: 0, unchecked: 1, wired: 8, reserved: 9, blocked: 10 })[physicalOf(r, allNodes)] ?? 5;
  }

  function selectCandidate(items, need, allNodes) {
    const eligible = items.filter(r => {
      const pair = allNodes.flatMap(n => (n.channels || []).map(c => ({ n, c }))).find(x => x.c.address === r.address && x.n.name === r.module);
      const c = pair?.c;
      return !c || (!['blocked', 'reserved', 'wired'].includes(c.physical || 'unchecked'));
    });
    const out = [];
    for (const type of ['DI', 'DO', 'AI', 'AO']) {
      const candidates = eligible.filter(x => x.type === type);
      const byModule = new Map();
      for (const r of candidates) {
        const key = `${r.module}|${r.slot}`;
        if (!byModule.has(key)) byModule.set(key, []);
        byModule.get(key).push(r);
      }
      const groups = [...byModule.values()].sort((a, b) => {
        const af = a.filter(x => physicalOf(x, allNodes) === 'free').length, bf = b.filter(x => physicalOf(x, allNodes) === 'free').length;
        return bf - af || b.length - a.length || String(a[0]?.slot).localeCompare(String(b[0]?.slot), undefined, { numeric: true });
      });
      let remaining = need[type];
      for (const group of groups) {
        if (remaining <= 0) break;
        const sorted = group.sort((a, b) => physicalRank(a, allNodes) - physicalRank(b, allNodes) || a.address.localeCompare(b.address, undefined, { numeric: true }));
        out.push(...sorted.slice(0, remaining));
        remaining -= Math.min(remaining, sorted.length);
      }
    }
    return out;
  }

  function projectSnapshot(project) {
    const map = new Map();
    const walk = (n, path = []) => {
      const here = [...path, n.name || n.kind];
      for (const c of n.channels || []) {
        const key = c.address.toUpperCase();
        map.set(key, { address: key, path: here.join(' / '), module: n.name, slot: n.slot, mlfb: n.mlfb, type: n.ioType, status: c.status, hwSymbol: c.hwSymbol || '', hwComment: c.hwComment || '', physical: c.physical || 'unchecked', reservation: c.reservation || '', note: c.note || '' });
      }
      n.children?.forEach(x => walk(x, here));
    };
    walk(project);
    return map;
  }

  function compareProjects(a, b) {
    const ma = projectSnapshot(a), mb = projectSnapshot(b), keys = [...new Set([...ma.keys(), ...mb.keys()])].sort((x, y) => x.localeCompare(y, undefined, { numeric: true })), changes = [];
    for (const k of keys) {
      const x = ma.get(k), y = mb.get(k);
      if (!x) changes.push({ kind: 'added', address: k, before: null, after: y });
      else if (!y) changes.push({ kind: 'removed', address: k, before: x, after: null });
      else {
        const fields = ['path', 'module', 'slot', 'mlfb', 'type', 'status', 'hwSymbol', 'hwComment', 'physical', 'reservation', 'note'], diff = fields.filter(f => String(x[f] ?? '') !== String(y[f] ?? ''));
        if (diff.length) changes.push({ kind: 'changed', address: k, before: x, after: y, diff });
      }
    }
    return { a: a.name, b: b.name, changes };
  }

  function unmatched(state) {
    const out = [];
    for (const file of refFiles(state)) {
      const pid = state.xrefBindings[file], p = state.projects.find(x => x.id === pid);
      if (!p) { out.push(...state.refs.filter(r => r.file === file)); continue; }
      const set = new Set();
      const walk = n => { for (const c of n.channels || []) set.add(c.address.toUpperCase()); n.children?.forEach(walk); };
      walk(p);
      out.push(...state.refs.filter(r => r.file === file && !set.has(r.address)));
    }
    return out;
  }

  const exp = {
    nodes, isReserve, projectOfNode, deviceFor, refFiles, autoBindRefs, relink,
    stats, ioBreakdown, recognitionSummary, recognitionState, reserveRows,
    contextFor, scopedKey, addressConflicts, physicalOf, physicalRank,
    selectCandidate, projectSnapshot, compareProjects, unmatched
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = exp;
  if (typeof window !== 'undefined') window.PCS7Analyzer = exp;
  if (typeof globalThis !== 'undefined') globalThis.PCS7Analyzer = exp;
})();
