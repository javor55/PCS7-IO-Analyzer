/**
 * PCS 7 I/O Analyzer - Main Application Controller
 * Manages UI interactions, tree views, diagnostics, reports, internationalization, and browser events.
 */
(() => {
  'use strict';

  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const I18n = (typeof globalThis !== 'undefined' && globalThis.PCSI18n) || (typeof window !== 'undefined' && window.PCSI18n) || { t: (k) => k, getLanguage: () => 'en', setLanguage: () => {} };
  const t = (k, ...args) => I18n.t(k, ...args);

  const Cat = (typeof globalThis !== 'undefined' && globalThis.PCS7Catalog) || (typeof window !== 'undefined' && window.PCS7Catalog) || {};
  const Parser = (typeof globalThis !== 'undefined' && globalThis.PCS7Parser) || (typeof window !== 'undefined' && window.PCS7Parser) || {};
  const Analyzer = (typeof globalThis !== 'undefined' && globalThis.PCS7Analyzer) || (typeof window !== 'undefined' && window.PCS7Analyzer) || {};

  const state = {
    projects: [],
    refs: [],
    selected: null,
    q: '',
    type: 'all',
    status: 'all',
    deviceOnly: false,
    hideNoIo: false,
    parseWarnings: [],
    xrefBindings: {},
    externalCatalog: {},
    collapsed: new Set(),
    selectedChannels: new Set(),
    physicalFilter: 'all'
  };

  function getStatusLabel(s) {
    const map = {
      reserve: t('stReserve'),
      used: t('stUsed'),
      multiple: t('stMultiple'),
      'named-unused': t('stNamedUnused'),
      'dev-unused': t('stDevUnused'),
      unknown: t('stUnknown')
    };
    return map[s] || s;
  }

  function getPhysicalLabel(p) {
    const map = {
      unchecked: t('phUnchecked'),
      free: t('phFree'),
      wired: t('phWired'),
      blocked: t('phBlocked'),
      reserved: t('phReserved')
    };
    return map[p] || p;
  }

  function toast(message, type = 'info') {
    const host = $('#toasts');
    if (!host) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    host.append(el);
    setTimeout(() => el.remove(), 3500);
  }

  function setBusy(on, text = t('processingFiles')) {
    const el = $('#busy');
    if (!el) return;
    el.hidden = !on;
    const sp = el.querySelector('span');
    if (sp) sp.textContent = text;
  }

  function download(name, text, type = 'text/plain') {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function channelKey(n, c) {
    const ctx = Analyzer.contextFor(n, state);
    return [ctx.project, ctx.station, ctx.controller, ctx.device, n.slot ?? '', n.subslot ?? '', c.address].join('|');
  }

  function selectedPairs(scope = null) {
    const out = [];
    const roots = scope ? [scope] : state.projects;
    const walk = n => {
      for (const c of n.channels || []) if (state.selectedChannels.has(channelKey(n, c))) out.push({ n, c, key: channelKey(n, c) });
      n.children?.forEach(walk);
    };
    roots.forEach(walk);
    return out;
  }

  function toggleChannel(nodeId, index, checked) {
    const n = Analyzer.nodes(state).find(x => x.id === nodeId), c = n?.channels?.find(x => x.index === index);
    if (!c) return;
    const key = channelKey(n, c);
    if (checked) state.selectedChannels.add(key); else state.selectedChannels.delete(key);
    updateSelectionBar();
  }

  function selectScope(mode) {
    const n = state.selected ? Analyzer.nodes(state).find(x => x.id === state.selected) : null;
    if (!n) { toast(t('toastSelectFirst'), 'info'); return; }
    const pairs = deviceChannels(n);
    if (mode === 'none') {
      for (const { n: x, c } of pairs) state.selectedChannels.delete(channelKey(x, c));
    } else if (mode === 'invert') {
      for (const { n: x, c } of pairs) {
        const k = channelKey(x, c);
        state.selectedChannels.has(k) ? state.selectedChannels.delete(k) : state.selectedChannels.add(k);
      }
    } else {
      for (const { n: x, c } of pairs) {
        const match = mode === 'all' || (mode === 'reserves' && c.status === 'reserve') || (mode === 'physical-free' && c.physical === 'free');
        if (match) state.selectedChannels.add(channelKey(x, c));
      }
    }
    renderDetail(n);
    updateSelectionBar();
  }

  function updateSelectionBar() {
    const box = $('#selectionBar');
    if (!box) return;
    const count = state.selectedChannels.size;
    box.hidden = !count;
    $('#selectionCount').textContent = count;
    const labelText = $('#selectionLabelText');
    if (labelText) labelText.textContent = t('selectionSelected');
    const grouped = { DI: 0, DO: 0, AI: 0, AO: 0, DEV: 0 };
    for (const { n, c } of selectedPairs()) {
      const typ = c.ioType || n.ioType;
      if (grouped[typ] != null) grouped[typ]++;
    }
    $('#selectionTypes').textContent = Object.entries(grouped).filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join(' · ');
  }

  function editSelected() {
    const pairs = selectedPairs();
    if (!pairs.length) return;
    const answer = prompt(t('promptPhysicalMarked', pairs.length), '0');
    if (answer === null) return;
    const values = ['unchecked', 'free', 'wired', 'blocked', 'reserved'], v = values[Math.max(0, Math.min(4, parseInt(answer, 10) || 0))];
    let reservation = '';
    if (v === 'reserved') reservation = prompt(t('promptReservationName'), '') || '';
    const note = prompt(t('promptSharedNote'), '') || '';
    for (const { c } of pairs) { c.physical = v; c.reservation = v === 'reserved' ? reservation : ''; c.note = note; c.checkedAt = new Date().toISOString(); }
    const n = state.selected ? Analyzer.nodes(state).find(x => x.id === state.selected) : null;
    if (n) renderDetail(n);
    renderTree();
    renderSummary();
    toast(t('toastEditedCount', pairs.length), 'success');
  }

  function clearSelection() {
    state.selectedChannels.clear();
    updateSelectionBar();
    const n = state.selected ? Analyzer.nodes(state).find(x => x.id === state.selected) : null;
    if (n) renderDetail(n);
  }

  function editChannel(nodeId, index) {
    const n = Analyzer.nodes(state).find(x => x.id === nodeId), c = n?.channels?.find(x => x.index === index);
    if (!c) return;
    const current = c.physical || 'unchecked';
    const answer = prompt(t('promptPhysicalSingle', c.address), ({ unchecked: 0, free: 1, wired: 2, blocked: 3, reserved: 4 })[current]);
    if (answer === null) return;
    const values = ['unchecked', 'free', 'wired', 'blocked', 'reserved'];
    const v = values[Math.max(0, Math.min(4, parseInt(answer, 10) || 0))];
    c.physical = v;
    if (v === 'reserved') c.reservation = prompt(t('promptReservationName'), c.reservation || '') || '';
    else if (v !== 'reserved') c.reservation = '';
    c.note = prompt(t('promptChannelNote'), c.note || '') ?? c.note ?? '';
    c.checkedAt = new Date().toISOString();
    renderDetail(n);
    renderTree();
    renderSummary();
  }

  function bulkEditSelected() {
    const n = state.selected ? Analyzer.nodes(state).find(x => x.id === state.selected) : null;
    if (!n) { alert(t('toastSelectRioFirst')); return; }
    const pairs = deviceChannels(n).filter(x => x.c.status === 'reserve');
    if (!pairs.length) { alert(t('toastNoReservesInObj')); return; }
    const answer = prompt(t('promptPhysicalBulk', pairs.length), '0');
    if (answer === null) return;
    const values = ['unchecked', 'free', 'wired', 'blocked', 'reserved'], v = values[Math.max(0, Math.min(4, parseInt(answer, 10) || 0))];
    let reservation = '';
    if (v === 'reserved') reservation = prompt(t('promptReservationName'), '') || '';
    const note = prompt(t('promptSharedNote'), '') || '';
    for (const { c } of pairs) { c.physical = v; c.reservation = v === 'reserved' ? reservation : ''; c.note = note; c.checkedAt = new Date().toISOString(); }
    renderDetail(n);
    renderTree();
    renderSummary();
  }

  function deviceChannels(n) {
    const out = [];
    const walk = x => { out.push(...(x.channels || []).map(c => ({ n: x, c }))); x.children?.forEach(walk); };
    walk(n);
    return out;
  }

  function hay(n) {
    return [
      n.name, n.mlfb, n.family, n.devType, n.header, n.comments?.join(' '),
      ...(n.channels || []).flatMap(c => [c.address, c.hwSymbol, c.hwComment, c.note, c.reservation, getPhysicalLabel(c.physical || 'unchecked'), ...c.refs.flatMap(r => [r.symbol, r.chart, r.element])])
    ].join(' ').toLowerCase();
  }

  function hasDesc(n, p) {
    return p(n) || n.children?.some(x => hasDesc(x, p));
  }

  function visible(n) {
    if (n.kind === 'submodule') return false;
    const s = Analyzer.stats(n), q = state.q;
    if (state.deviceOnly && !['project', 'station', 'controller', 'device'].includes(n.kind)) return false;
    if (state.hideNoIo && !s.all) return false;
    if (state.type !== 'all' && !hasDesc(n, x => x.ioType === state.type)) return false;
    if (state.status === 'reserve' && !s.free) return false;
    if (state.status === 'used' && !(s.used || s.multiple)) return false;
    if (state.status === 'named' && !s.named) return false;
    if (state.status === 'unknown' && !s.unknown) return false;
    if (state.physicalFilter !== 'all' && !hasDesc(n, x => (x.channels || []).some(c => (c.physical || 'unchecked') === state.physicalFilter))) return false;
    if (state.status === 'allfree' && !(s.all && s.free === s.all)) return false;
    if (state.status === 'partial' && !(s.free && (s.used || s.named || s.multiple))) return false;
    if (q && !hasDesc(n, x => hay(x).includes(q))) return false;
    return true;
  }

  function recognitionBadge(n) {
    const r = Analyzer.recognitionState(n);
    return r.key === 'none' ? '' : `<span class="recognition ${r.key}" title="${esc(r.title)}"><b>${r.mark}</b><span>${r.label}</span></span>`;
  }

  function ioSummaryHtml(n) {
    const b = Analyzer.ioBreakdown(n);
    const chips = ['DI', 'DO', 'AI', 'AO'].filter(typ => b[typ].total).map(typ => `<span class="io-chip ${typ.toLowerCase()}" title="${typ}: ${b[typ].used}/${b[typ].total}"><b>${typ}</b><strong>${b[typ].used}/${b[typ].total}</strong></span>`);
    if (b.DEV.total) {
      chips.push(`<span class="io-chip dev" title="DEV: ${b.DEV.used}/${b.DEV.total}"><b>DEV</b><strong>${b.DEV.used}/${b.DEV.total}</strong></span>`);
    }
    return `<span class="io-summary">${chips.join('')}</span>`;
  }

  function renderTree() {
    const host = $('#tree');
    host.innerHTML = '';
    if (!state.projects.length) { host.innerHTML = `<div class="empty">${t('emptyTree')}</div>`; return; }
    function add(n, p, depth = 0, isLast = false) {
      if (!visible(n)) return;
      const wrap = document.createElement('div');
      wrap.className = `node depth-${depth}${isLast ? ' is-last' : ''}`;
      const kids = n.children.filter(visible), st = Analyzer.stats(n), collapsed = state.collapsed.has(n.id);
      wrap.innerHTML = `<div class="node-row ${state.selected === n.id ? 'sel' : ''}" data-kind="${esc(n.kind)}" title="${esc(n.name || n.kind)}"><button type="button" class="tw ${kids.length ? 'has-children' : 'leaf'}" aria-label="${kids.length ? (collapsed ? t('expandedLabel') : t('collapsedLabel')) : ''}" aria-expanded="${kids.length ? !collapsed : false}">${kids.length ? (collapsed ? '+' : '−') : ''}</button><span class="node-icon ${esc(n.kind)}"></span><span class="kind">${esc(n.name || n.kind)}</span>${recognitionBadge(n)}${ioSummaryHtml(n)}${st.named ? `<b class="tree-alert channel-warning" title="${t('optNamed')}: ${st.named}">P${st.named}</b>` : ''}</div>`;
      const row = wrap.firstElementChild;
      row.onclick = e => {
        if (e.target.classList.contains('tw') && kids.length) {
          if (state.collapsed.has(n.id)) state.collapsed.delete(n.id); else state.collapsed.add(n.id); renderTree();
        } else { state.selected = n.id; renderTree(); renderDetail(n); }
      };
      p.append(wrap);
      if (kids.length) {
        const c = document.createElement('div'); c.className = 'children'; c.hidden = collapsed; kids.forEach((k, i) => add(k, c, depth + 1, i === kids.length - 1)); wrap.append(c);
      }
    }
    state.projects.filter(visible).forEach((x, i, a) => add(x, host, 0, i === a.length - 1));
  }

  function renderDetail(n) {
    const s = Analyzer.stats(n);
    $('#detailTitle').textContent = n.name || t('detailTitle');
    let rows = '';
    for (const c of n.channels || []) {
      rows += `<tr><td class="select-cell"><input type="checkbox" aria-label="Select ${esc(c.address)}" ${state.selectedChannels.has(channelKey(n, c)) ? 'checked' : ''} onchange="__PCS7IO.toggleChannel('${n.id}',${c.index},this.checked)"></td><td><span class="status ${c.status}">${getStatusLabel(c.status)}</span></td><td><b>${esc(c.address)}</b></td><td>${esc(c.hwSymbol || '—')}<small>${esc(c.hwComment)}</small></td><td>${c.refs.length ? c.refs.map(r => `<div><b>${esc(r.symbol || '—')}</b><small>${esc(r.chart)} · ${esc(r.element)}</small></div>`).join('') : '—'}</td><td>${esc(c.confidence)}</td><td><span class="physical ${esc(c.physical || 'unchecked')}">${esc(getPhysicalLabel(c.physical || 'unchecked'))}</span>${c.reservation ? `<small>${esc(c.reservation)}</small>` : ''}${c.note ? `<small>${esc(c.note)}</small>` : ''}</td><td><button class="mini" onclick="__PCS7IO.editChannel('${n.id}',${c.index})">${t('btnEdit')}</button></td></tr>`;
    }
    const d = $('#detail');
    d.innerHTML = `<div class="cards"><div><span>${t('channelsHeading')}</span><b>${s.all}</b></div><div><span>${t('optReserve')}</span><b class="free-t">${s.free}</b></div><div><span>${t('optUsed')}</span><b class="used-t">${s.used + s.multiple}</b></div><div><span>${t('metricCheck')}</span><b class="warn-t">${s.named + s.unknown}</b></div></div><dl><dt>${t('propObject')}</dt><dd>${esc(n.kind)}</dd><dt>${t('propBus')}</dt><dd>${esc(n.bus || '—')}</dd><dt>${t('propDevAddress')}</dt><dd>${n.address ?? '—'}</dd><dt>${t('propSlotSubslot')}</dt><dd>${n.slot ?? '—'} / ${n.subslot ?? '—'}</dd><dt>${t('propMlfb')}</dt><dd>${esc(n.mlfb || '—')}</dd><dt>${t('propFamilyType')}</dt><dd>${esc(n.family || '—')} / ${esc(n.devType || n.ioType || '—')}</dd><dt>${t('propRecHw')}</dt><dd>${recognitionBadge(n)} <span class="recognition-detail">${esc(Analyzer.recognitionState(n).title)}</span></dd><dt>${t('propObjConfidence')}</dt><dd><span class="confidence ${n.confidence}">${esc(n.confidence)}</span> ${esc(n.basis || '')}</dd><dt>${t('propComment')}</dt><dd>${esc((n.comments || []).filter(Boolean).join(' | ') || '—')}</dd><dt>${t('reportSource')}</dt><dd>${esc(n.file)}, line ${n.lineStart}</dd></dl>${rows ? `<div class="channel-heading"><h3>${t('channelsHeading')}</h3><div class="channel-actions"><button onclick="__PCS7IO.selectScope('all')">${t('btnAll')}</button><button onclick="__PCS7IO.selectScope('reserves')">${t('btnReserves')}</button><button onclick="__PCS7IO.selectScope('physical-free')">${t('btnPhysFree')}</button><button onclick="__PCS7IO.selectScope('invert')">${t('btnInvert')}</button><button onclick="__PCS7IO.selectScope('none')">${t('btnCancel')}</button></div></div><div class="tablewrap"><table><thead><tr><th class="select-cell">${t('thCheck')}</th><th>${t('thStatus')}</th><th>${t('thAddress')}</th><th>${t('thHwSymbol')}</th><th>${t('thXref')}</th><th>${t('thConfidence')}</th><th>${t('thPhysical')}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : ''}<details><summary>${t('parserDiagBlock')}</summary>${n.warnings?.map(w => `<p class="warning">${esc(w)}</p>`).join('') || ''}<pre>${esc(n.raw || n.header || '')}</pre></details>`;
  }

  function renderBindings() {
    const box = $('#bindings');
    if (!box) return;
    const opts = state.projects.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
    box.innerHTML = Analyzer.refFiles(state).map(f => `<label class="binding"><span>${esc(f)}</span><select data-file="${esc(f)}"><option value="">${t('unassigned')}</option>${opts}</select></label>`).join('') || `<small>${t('noXrefLoaded')}</small>`;
    box.querySelectorAll('select').forEach(sel => {
      sel.value = state.xrefBindings[sel.dataset.file] || '';
      sel.onchange = () => { state.xrefBindings[sel.dataset.file] = sel.value; Analyzer.relink(state); render(); };
    });
  }

  function renderSummary() {
    const tStats = Analyzer.stats({ children: state.projects, channels: [] }), u = Analyzer.unmatched(state), known = Analyzer.nodes(state).filter(n => n.mlfb && (Cat.catalog[n.mlfb] || Cat.catalog[Cat.normMlfb(n.mlfb)])).length, unknown = [...new Set(Analyzer.nodes(state).filter(n => n.mlfb && (n.inAddrs.length || n.outAddrs.length) && !Cat.catalog[n.mlfb] && !Cat.catalog[Cat.normMlfb(n.mlfb)]).map(n => n.mlfb))];
    const ratio = state.refs.length ? Math.round((state.refs.length - u.length) / state.refs.length * 100) : 0;
    $('#summary').innerHTML = `<b>${t('loadedSummary')}</b><br>${t('hwExportsCount')}: ${state.projects.length}<br>${t('xrefRowsCount')}: ${state.refs.length}<br><br><b>${t('ioChannelsCount')}</b><br>${t('channelsTotal')}: ${tStats.all}<br><span class="free-t">${t('hwReservesCount')}: ${tStats.free}</span><br><span class="used-t">${t('usedCount')}: ${tStats.used + tStats.multiple}</span><br><span class="warn-t">${t('namedUnusedCount')}: ${tStats.named}</span><br>${t('unverifiedCount')}: ${tStats.unknown}<br><br><b>${t('validationTitle')}</b><br>${t('mlfbInCatalog')}: ${known}<br>${t('unknownMlfb')}: ${unknown.length}<br>${t('refsWithoutHw')}: ${u.length}<br>${t('matchRatio')}: ${ratio}%<br>${t('parserWarnings')}: ${state.parseWarnings.length}<div class="actions"><button id="showWarnings">${t('showDiagnosticsBtn')}</button></div>`;
    $('#showWarnings').onclick = showDiagnostics;
  }

  function renderCompatibility() {
    const tStats = Analyzer.stats({ children: state.projects, channels: [] }), u = Analyzer.unmatched(state), ratio = state.refs.length ? Math.round((state.refs.length - u.length) / state.refs.length * 100) : 0;
    const box = $('#compatibility');
    if (!state.refs.length || !tStats.all) { box.textContent = t('compatPrompt'); box.className = 'compat neutral'; }
    else if (ratio < 10) { box.textContent = t('compatBad', ratio); box.className = 'compat bad'; }
    else if (ratio < 40) { box.textContent = t('compatWarn', ratio); box.className = 'compat warn'; }
    else { box.textContent = t('compatGood', ratio); box.className = 'compat good'; }
  }

  function updateStatusBar() {
    const el = $('#statusbar');
    if (!el) return;
    const tStats = Analyzer.stats({ children: state.projects, channels: [] });
    el.innerHTML = `<span><b>${state.projects.length}</b> ${t('projectsCount')}</span><span><b>${Analyzer.refFiles(state).length}</b> Cross-References</span><span><b>${tStats.all}</b> ${t('channelsLabel')}</span><span class="free-t"><b>${tStats.free}</b> ${t('reservesLabel')}</span><span class="status-ready">${t('statusReady')}</span>`;
  }

  function render() {
    renderTree();
    renderSummary();
    renderCompatibility();
    renderBindings();
    updateStatusBar();
    if (state.selected) {
      const n = Analyzer.nodes(state).find(x => x.id === state.selected);
      if (n) renderDetail(n);
    }
  }

  function dashboard() {
    const tStats = Analyzer.stats({ children: state.projects, channels: [] }), unknown = [...new Set(Analyzer.nodes(state).filter(n => n.mlfb && (n.inAddrs.length || n.outAddrs.length) && !Cat.catalog[n.mlfb] && !Cat.catalog[Cat.normMlfb(n.mlfb)]).map(n => n.mlfb))], projects = state.projects.length, conflicts = Analyzer.addressConflicts(state).length, recognition = Analyzer.recognitionSummary({ children: state.projects, kind: 'workspace' });
    $('#detailTitle').textContent = t('overview');
    $('#detail').innerHTML = `<div class="hero"><div><span class="eyebrow">${t('heroEyebrow')}</span><h2>${t('heroHeading')}</h2><p>${t('heroSub', projects, Analyzer.refFiles(state).length)}</p></div><button id="runTestsHero" class="primary-action">${t('runDataHealthHero')}</button></div><div class="dashboard-grid"><article class="metric"><span>${t('metricProcessChannels')}</span><strong>${tStats.all}</strong><small>${t('metricProcessSub')}</small></article><article class="metric green"><span>${t('metricReserves')}</span><strong>${tStats.free}</strong><small>${t('metricReservesSub')}</small></article><article class="metric orange"><span>${t('metricUsed')}</span><strong>${tStats.used + tStats.multiple}</strong><small>${t('metricUsedSub')}</small></article><article class="metric red"><span>${t('metricCheck')}</span><strong>${tStats.named + tStats.unknown}</strong><small>${t('metricCheckSub')}</small></article></div><div class="dashboard-columns"><section class="surface"><h3>${t('projectHealthTitle')}</h3><div class="health-row"><span>${t('hwRecCounts')}</span><b><span class="good-text">${recognition.verified}</span> / <span class="warn-text">${recognition.probable}</span> / <span class="bad-text">${recognition.unknown}</span></b></div><div class="health-row"><span>${t('fieldDevicesCount')}</span><b><span class="good-text">${recognition.device}</span></b></div><div class="health-row"><span>${t('unknownMlfb')}</span><b class="${unknown.length ? 'bad-text' : 'good-text'}">${unknown.length}</b></div><div class="health-row"><span>${t('hwConflictsCount')}</span><b class="${conflicts ? 'bad-text' : 'good-text'}">${conflicts}</b></div><div class="health-row"><span>${t('parserWarnings')}</span><b class="${state.parseWarnings.length ? 'warn-text' : 'good-text'}">${state.parseWarnings.length}</b></div><div class="health-row"><span>${t('unassigned')} CSV</span><b>${Analyzer.refFiles(state).filter(f => !state.xrefBindings[f]).length}</b></div></section><section class="surface"><h3>${t('legendTitle')}</h3><div class="legend-grid"><span><i class="dot reserve"></i>${t('optReserve')}</span><span><i class="dot used"></i>${t('optUsed')}</span><span><i class="dot named"></i>${t('optNamed')} / DEV</span><span><i class="dot unknown"></i>${t('optUnverified')}</span></div><p class="muted">${t('legendNotice')}</p></section></div>`;
    $('#runTestsHero').onclick = runSelfTests;
  }

  function runSelfTests() {
    const results = [];
    const add = (name, ok, detail) => results.push({ name, ok, detail });
    const ns = Analyzer.nodes(state), ids = new Set(), dupes = [];
    for (const n of ns) { if (ids.has(n.id)) dupes.push(n.id); ids.add(n.id); }
    add(t('testIdUniqueness'), !dupes.length, dupes.length ? `${dupes.length} duplicates` : `${ids.size} unique IDs`);
    const channels = ns.flatMap(n => n.channels || []), invalid = channels.filter(c => !(/^(I|Q)\d+\.[0-7]$|^(IW|QW|IB|QB|ID|QD)\d+$/.test(c.address)));
    add(t('testAddrFormat'), !invalid.length, invalid.length ? `${invalid.length} invalid addresses` : `${channels.length} valid addresses`);
    const missingMlfb = ns.filter(n => n.processData && n.ioType !== 'DEV' && !n.mlfb);
    add(t('testMlfbPresence'), !missingMlfb.length, missingMlfb.length ? `${missingMlfb.length} modules missing MLFB` : 'All process modules have MLFB');
    const badBits = channels.filter(c => /^[IQ]\d+\.(?:[89]|\d{2,})$/.test(c.address));
    add(t('testByteAddressing'), !badBits.length, badBits.length ? `${badBits.length} addresses with bit > 7` : 'Zero bits > 7');
    const bindings = Analyzer.refFiles(state).filter(f => state.xrefBindings[f]);
    add(t('testXrefBindings'), bindings.length === Analyzer.refFiles(state).length, `${bindings.length}/${Analyzer.refFiles(state).length} assigned`);
    const rec = Analyzer.recognitionSummary({ children: state.projects, kind: 'workspace' });
    add(t('testHwRecognition'), !rec.unknown, `verified ${rec.verified} (incl. ${rec.device} devs), probable ${rec.probable}, unknown ${rec.unknown}, system ${rec.system}`);
    const unknown = channels.filter(c => c.confidence === 'unknown');
    add(t('testModelConfidence'), !unknown.length, unknown.length ? `${unknown.length} unverified channels` : 'All channels verified');
    const conflicts = Analyzer.addressConflicts(state);
    add(t('testRioConflicts'), !conflicts.length, conflicts.length ? `${conflicts.length} conflicts` : 'Zero conflicts');
    showTests(results);
  }

  function showTests(results) {
    const pass = results.filter(x => x.ok).length;
    $('#detailTitle').textContent = t('dataHealth');
    $('#detail').innerHTML = `<div class="test-summary ${pass === results.length ? 'pass' : 'warn'}"><div><span>${t('testResultTitle')}</span><strong>${pass}/${results.length}</strong><small>${t('testsPassing')}</small></div><button id="rerunTests">${t('rerunTestsBtn')}</button></div><div class="test-list">${results.map(r => `<article class="test-item ${r.ok ? 'pass' : 'fail'}"><span class="test-icon">${r.ok ? '✓' : '!'}</span><div><b>${esc(r.name)}</b><small>${esc(r.detail)}</small></div></article>`).join('')}</div><p class="notice">${t('testNotice')}</p>`;
    $('#rerunTests').onclick = runSelfTests;
  }

  function showDiagnostics() {
    const conflicts = Analyzer.addressConflicts(state), u = Analyzer.unmatched(state), unknown = [...new Set(Analyzer.nodes(state).filter(n => n.mlfb && (n.inAddrs.length || n.outAddrs.length) && !Cat.catalog[n.mlfb] && !Cat.catalog[Cat.normMlfb(n.mlfb)]).map(n => n.mlfb))];
    $('#detailTitle').textContent = t('diagTitle');
    $('#detail').innerHTML = `<div class="notice">${t('diagNotice')}</div><h3>${t('unknownMlfbTitle', unknown.length)}</h3><ul>${unknown.slice(0, 300).map(x => `<li>${esc(x)}</li>`).join('') || `<li>${t('noneList')}</li>`}</ul><h3>${t('refsWithoutHwTitle', u.length)}</h3><div class="tablewrap"><table><thead><tr><th>${t('thAddress')}</th><th>${t('colSymbol')}</th><th>${t('colChart')}</th></tr></thead><tbody>${u.slice(0, 1000).map(r => `<tr><td>${esc(r.address)}</td><td>${esc(r.symbol)}</td><td>${esc(r.chart)}</td></tr>`).join('')}</tbody></table></div><h3>${t('conflictsTitle', conflicts.length)}</h3><ul>${conflicts.slice(0, 500).map(c => `<li>${esc(c.address)}: ${c.items.map(i => esc(i.node.name)).join(', ')}</li>`).join('') || `<li>${t('noneList')}</li>`}</ul><h3>${t('parserWarnTitle', state.parseWarnings.length)}</h3><ul>${state.parseWarnings.slice(0, 1000).map(w => `<li>${esc(w.file)}:${w.line} ${esc(w.node)} – ${esc(w.message)}</li>`).join('') || `<li>${t('noneList')}</li>`}</ul>`;
  }

  function findReserves() {
    const need = { DI: Math.max(0, +$('#needDI').value || 0), DO: Math.max(0, +$('#needDO').value || 0), AI: Math.max(0, +$('#needAI').value || 0), AO: Math.max(0, +$('#needAO').value || 0) }, same = $('#sameRio').checked, verified = $('#verifiedOnly').checked, onlyWhole = $('#wholeModules').checked;
    let rows = Analyzer.reserveRows(state);
    if (verified) rows = rows.filter(r => r.confidence === 'verified');
    if (onlyWhole) {
      const ok = new Set(Analyzer.nodes(state).filter(n => n.channels?.length && n.channels.every(c => c.status === 'reserve')).map(n => n.name + '|' + n.slot));
      rows = rows.filter(r => ok.has(r.module + '|' + r.slot));
    }
    const groups = new Map();
    if (same) {
      for (const r of rows) {
        if (!groups.has(r.device)) groups.set(r.device, []);
        groups.get(r.device).push(r);
      }
    } else groups.set('All loaded projects', rows);

    const allNodes = Analyzer.nodes(state);
    const result = [];
    for (const [name, items] of groups) {
      const eligible = items.filter(r => {
        const pair = allNodes.flatMap(n => (n.channels || []).map(c => ({ n, c }))).find(x => x.c.address === r.address && x.n.name === r.module);
        const c = pair?.c;
        return !c || (!['blocked', 'reserved', 'wired'].includes(c.physical || 'unchecked'));
      });
      const counts = { DI: 0, DO: 0, AI: 0, AO: 0 };
      eligible.forEach(r => { if (r.type in counts) counts[r.type]++; });
      const missing = Object.keys(need).filter(k => counts[k] < need[k]);
      result.push({ name, items: eligible, counts, ok: !missing.length, missing });
    }
    result.sort((a, b) => Number(b.ok) - Number(a.ok) || b.items.length - a.items.length);
    $('#detailTitle').textContent = t('reserveSearchTitle');
    $('#detail').innerHTML = `<div class="notice">${t('reserveResultNotice')}</div>${result.map(g => `<section class="reserve-result ${g.ok ? 'ok' : ''}"><h3>${esc(g.name || 'RIO')} ${g.ok ? `<span class="result-ok">${t('meetsReq')}</span>` : `<span class="result-no">${t('doesNotMeetReq')}</span>`}</h3><p>DI ${g.counts.DI}/${need.DI} · DO ${g.counts.DO}/${need.DO} · AI ${g.counts.AI}/${need.AI} · AO ${g.counts.AO}/${need.AO}</p>${g.ok ? `<div class="tablewrap"><table><thead><tr><th>${t('ioTypeLabel')}</th><th>${t('thAddress')}</th><th>${t('propObject')}</th><th>${t('propSlotSubslot')}</th><th>${t('propMlfb')}</th></tr></thead><tbody>${Analyzer.selectCandidate(g.items, need, allNodes).map(r => `<tr><td>${r.type}</td><td><b>${r.address}</b></td><td>${esc(r.module)}</td><td>${r.slot ?? ''}</td><td>${esc(r.mlfb)}</td></tr>`).join('')}</tbody></table></div>` : `<p>${t('missingReq', g.missing.join(', '))}</p>`}</section>`).join('') || `<div class="empty">${t('noReservesFound')}</div>`}`;
  }

  function compareProjects() {
    if (state.projects.length < 2) { alert(t('compareNeedTwo')); return; }
    const a = state.projects[state.projects.length - 2], b = state.projects[state.projects.length - 1];
    state.lastDiff = Analyzer.compareProjects(a, b);
    showDiff(state.lastDiff);
  }

  function showDiff(d) {
    const labels = { added: t('addedLabel'), removed: t('removedLabel'), changed: t('changedLabel') };
    $('#detailTitle').textContent = t('compareTitle', d.a, d.b);
    $('#detail').innerHTML = `<div class="cards"><div><span>${t('changesTotal')}</span><b>${d.changes.length}</b></div><div><span>${t('addedLabel')}</span><b class="free-t">${d.changes.filter(x => x.kind === 'added').length}</b></div><div><span>${t('removedLabel')}</span><b class="warn-t">${d.changes.filter(x => x.kind === 'removed').length}</b></div><div><span>${t('changedLabel')}</span><b class="used-t">${d.changes.filter(x => x.kind === 'changed').length}</b></div></div><div class="actions"><button id="exportDiff">${t('exportDiffCsv')}</button><button id="printDiff">${t('printPdf')}</button></div><div class="tablewrap diff-table"><table><thead><tr><th>${t('diffColChange')}</th><th>${t('diffColAddress')}</th><th>${t('diffColBefore')}</th><th>${t('diffColAfter')}</th><th>${t('diffColFields')}</th></tr></thead><tbody>${d.changes.map(c => `<tr><td><span class="diff ${c.kind}">${labels[c.kind]}</span></td><td><b>${esc(c.address)}</b></td><td>${snapshotHtml(c.before)}</td><td>${snapshotHtml(c.after)}</td><td>${esc((c.diff || []).join(', '))}</td></tr>`).join('')}</tbody></table></div>`;
    $('#exportDiff').onclick = exportDiff;
    $('#printDiff').onclick = () => window.print();
  }

  function snapshotHtml(x) {
    if (!x) return '—';
    return `${esc(x.module)}<small>${esc(x.path)}</small><small>${esc(x.mlfb)} · ${esc(getStatusLabel(x.status))}</small>${x.hwSymbol ? `<small>Symbol: ${esc(x.hwSymbol)}</small>` : ''}${x.reservation ? `<small>${t('optReserved')}: ${esc(x.reservation)}</small>` : ''}`;
  }

  function exportDiff() {
    const d = state.lastDiff;
    if (!d) return;
    const rows = [['Change', 'Address', 'Old module', 'New module', 'Old MLFB', 'New MLFB', 'Old status', 'New status', 'Old symbol', 'New symbol', 'Changed fields']];
    for (const c of d.changes) rows.push([c.kind, c.address, c.before?.module || '', c.after?.module || '', c.before?.mlfb || '', c.after?.mlfb || '', c.before?.status || '', c.after?.status || '', c.before?.hwSymbol || '', c.after?.hwSymbol || '', (c.diff || []).join(', ')]);
    download(`PCS7-IO-diff-${d.a}-${d.b}.csv`, '\ufeff' + rows.map(r => r.map(v => '"' + String(v).replaceAll('"', '""') + '"').join(';')).join('\r\n'), 'text/csv');
  }

  function createReport() {
    const n = state.selected ? Analyzer.nodes(state).find(x => x.id === state.selected) : state.projects[0];
    if (!n) { alert(t('noSelectionForReport')); return; }
    const pairs = deviceChannels(n), s = Analyzer.stats(n), used = pairs.filter(x => ['used', 'multiple'].includes(x.c.status)), free = pairs.filter(x => x.c.status === 'reserve'), reserved = pairs.filter(x => x.c.physical === 'reserved');
    let text = `${t('reportHeader')}\n\n${t('reportObject')}: ${n.name}\n${t('reportSource')}: ${n.file || ''}\n${t('reportCreated')}: ${new Date().toLocaleString()}\n\n${t('ioChannelsCount')}: ${s.all}\n${t('hwReservesCount')}: ${s.free}\n${t('usedCount')}: ${s.used + s.multiple}\n${t('namedUnusedCount')}: ${s.named}\n${t('unverifiedCount')}: ${s.unknown}\n\n${t('reportUsedChannels')}\n`;
    text += used.length ? used.map(x => `${x.c.address} – ${x.c.hwSymbol || x.c.refs[0]?.symbol || ''} – ${x.n.name}`).join('\n') : t('reportNone');
    text += `\n\n${t('reportHwReserves')}\n`;
    text += free.length ? free.map(x => `${x.c.address} – ${x.n.name}${x.c.physical && x.c.physical !== 'unchecked' ? ` – ${getPhysicalLabel(x.c.physical)}` : ''}`).join('\n') : t('reportNone');
    if (reserved.length) {
      text += `\n\n${t('reportReservedProj')}\n` + reserved.map(x => `${x.c.address} – ${x.c.reservation || 'untitled'}${x.c.note ? ' – ' + x.c.note : ''}`).join('\n');
    }
    text += `\n\n${t('reportNotice')}\n`;
    download(`PCS7-IO-report-${(n.name || 'object').replace(/[^a-z0-9_-]+/gi, '_')}.txt`, text, 'text/plain');
  }

  function exportCatalog() {
    const used = Analyzer.nodes(state).filter(n => n.mlfb && (n.inAddrs.length || n.outAddrs.length));
    const m = {};
    for (const n of used) {
      const norm = Cat.normMlfb(n.mlfb);
      if (!m[n.mlfb]) m[n.mlfb] = Cat.catalog[norm] || Cat.catalog[n.mlfb] || { type: n.ioType, channels: n.channelCount || 0, family: n.family || '', width: ['DI', 'DO'].includes(n.ioType) ? 'bit' : 'word', verified: false, note: 'Derived from project, verify before deployment' };
    }
    download('pcs7-io-module-catalog.json', JSON.stringify(m, null, 2), 'application/json');
  }

  function exportCsv() {
    const out = [['Project', 'Device', 'Slot', 'Subslot', 'MLFB', 'Type', 'Address', 'Status', 'Confidence', 'HW Symbol', 'Reference Symbol', 'Chart', 'Element', 'Physical status', 'Reservation', 'Note', 'Checked at']];
    for (const p of state.projects) {
      const walk = (n, dev = '') => {
        if (n.kind === 'device') dev = n.name;
        for (const c of n.channels || []) {
          for (const r of c.refs.length ? c.refs : [{}]) {
            out.push([p.name, dev, n.slot ?? '', n.subslot ?? '', n.mlfb, c.ioType || n.ioType, c.address, getStatusLabel(c.status), c.confidence, c.hwSymbol, r.symbol || '', r.chart || '', r.element || '', getPhysicalLabel(c.physical || 'unchecked'), c.reservation || '', c.note || '', c.checkedAt || '']);
          }
        }
        n.children.forEach(x => walk(x, dev));
      };
      walk(p);
    }
    download('pcs7-io-analyzer.csv', '\ufeff' + out.map(r => r.map(v => '"' + String(v).replaceAll('"', '""') + '"').join(';')).join('\r\n'), 'text/csv');
  }

  async function ingest(files) {
    setBusy(true, t('processingFiles'));
    let loaded = 0;
    try {
      for (const f of files) {
        let text;
        try { text = Parser.decode(await f.arrayBuffer()); }
        catch (e) { alert(t('cannotReadFile', f.name, e.message)); continue; }
        const typ = Parser.detect(text, f.name);
        if (typ === 'hw') state.projects.push(Parser.parseHw(text, f.name));
        else if (typ === 'xref') state.refs.push(...Parser.parseCsv(text, f.name));
        else if (typ === 'catalog') {
          const o = JSON.parse(text);
          Object.assign(Cat.catalog, o);
          Object.assign(state.externalCatalog, o);
          for (const p of state.projects) {
            const walk = n => { n.children?.forEach(walk); Parser.enrich(n, Cat.catalog); };
            walk(p);
          }
        } else if (typ === 'project') {
          const o = JSON.parse(text);
          state.projects.push(...(o.projects || []));
          state.refs.push(...(o.refs || []));
          Object.assign(state.xrefBindings, o.xrefBindings || {});
          Object.assign(state.externalCatalog, o.externalCatalog || {});
          Object.assign(Cat.catalog, o.externalCatalog || {});
        } else alert(t('unrecognizedFile', f.name));
        loaded++;
      }
      Analyzer.relink(state);
      render();
      toast(t('loadedFilesSuccess', loaded), 'success');
    } finally { setBusy(false); }
  }

  function updateStaticTexts() {
    const lang = I18n.getLanguage();
    const btn = $('#langToggle');
    if (btn) btn.textContent = lang === 'en' ? '🌐 EN' : '🌐 CS';

    const sub = $('#appSubtitle');
    if (sub) sub.textContent = t('appSubtitle');

    const filesLbl = $('#filesLabel');
    if (filesLbl && filesLbl.childNodes && filesLbl.childNodes[0]) filesLbl.childNodes[0].textContent = t('loadFiles') + '\n';

    const sDash = $('#showDashboard');
    if (sDash) sDash.textContent = t('overview');

    const rTests = $('#runTests');
    if (rTests) rTests.textContent = t('dataHealth');

    const sInput = $('#search');
    if (sInput) sInput.placeholder = t('searchPlaceholder');

    const expBtn = $('#expand');
    if (expBtn) expBtn.textContent = t('expand');

    const colBtn = $('#collapse');
    if (colBtn) colBtn.textContent = t('collapse');

    const cmpBtn = $('#compareProjects');
    if (cmpBtn) cmpBtn.textContent = t('compare');

    const blkBtn = $('#bulkEdit');
    if (blkBtn) blkBtn.textContent = t('bulkEdit');

    const expCsv = $('#exportCsv');
    if (expCsv) expCsv.textContent = t('exportCsv');

    const cRep = $('#createReport');
    if (cRep) cRep.textContent = t('report');

    const eCat = $('#exportCatalog');
    if (eCat) eCat.textContent = t('catalogue');

    const sProj = $('#save');
    if (sProj) sProj.textContent = t('saveProject');

    const hwHead = $('#hwConfigHeader');
    if (hwHead) hwHead.textContent = t('hwConfigTitle');

    const legExp = $('#legExpanded');
    if (legExp) legExp.textContent = t('expandedLabel');

    const legCol = $('#legCollapsed');
    if (legCol) legCol.textContent = t('collapsedLabel');

    const legVer = $('#legVerified');
    if (legVer) legVer.textContent = t('recVerified');

    const legDer = $('#legDerived');
    if (legDer) legDer.textContent = t('recDerived');

    const legUnk = $('#legUnknown');
    if (legUnk) legUnk.textContent = t('recUnknown');

    const legSys = $('#legSystem');
    if (legSys) legSys.textContent = t('recSystem');

    const legDev = $('#legDevice');
    if (legDev) legDev.textContent = t('recDevice');

    const tExp = $('#treeExpand');
    if (tExp) tExp.textContent = t('allPlus');

    const tCol = $('#treeCollapse');
    if (tCol) tCol.textContent = t('allMinus');

    const colHw = $('#colHwObjText');
    if (colHw) colHw.textContent = t('colHwObject');

    const colIo = $('#colIoSummText');
    if (colIo) colIo.textContent = t('colIoSummary');

    const eTitle = $('#emptyTitle');
    if (eTitle) eTitle.textContent = t('emptyStateTitle');

    const eDesc = $('#emptyDesc');
    if (eDesc) eDesc.innerHTML = t('emptyStateDesc');

    const eBadge = $('#emptyBadge');
    if (eBadge) eBadge.textContent = t('localProcessingBadge');

    const fHead = $('#filtersHeader');
    if (fHead) fHead.textContent = t('filtersTitle');

    const xrHead = $('#xrefAssignHeading');
    if (xrHead) xrHead.textContent = t('xrefAssignmentTitle');

    const lDevOnly = $('#lblDeviceOnly');
    if (lDevOnly) lDevOnly.textContent = t('checkDeviceOnly');

    const lHide = $('#lblHideNoIo');
    if (lHide) lHide.textContent = t('checkHideNoIo');

    const clrBtn = $('#clear');
    if (clrBtn) clrBtn.textContent = t('clearFilters');

    const rHead = $('#reserveSearchHeading');
    if (rHead) rHead.textContent = t('reserveSearchTitle');

    const lSame = $('#lblSameRio');
    if (lSame) lSame.textContent = t('sameRioCheck');

    const lVer = $('#lblVerifiedOnly');
    if (lVer) lVer.textContent = t('verifiedOnlyCheck');

    const lWhl = $('#lblWholeModules');
    if (lWhl) lWhl.textContent = t('wholeModulesCheck');

    const fRes = $('#findReserves');
    if (fRes) fRes.textContent = t('findReservesBtn');

    const cSel = $('#clearSelection');
    if (cSel) cSel.textContent = t('clearSelectionBtn');

    const eSel = $('#editSelected');
    if (eSel) eSel.textContent = t('editSelectedBtn');
  }

  function getTheme() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('pcs7_theme');
        if (saved) return saved;
      }
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {}
    return 'light';
  }

  function applyTheme(theme) {
    if (typeof document === 'undefined') return;
    if (document.documentElement && document.documentElement.setAttribute) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem('pcs7_theme', theme);
    } catch {}
    const btn = $('#themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  function toggleLanguage() {
    const next = I18n.getLanguage() === 'en' ? 'cs' : 'en';
    I18n.setLanguage(next);
    updateStaticTexts();
    render();
  }

  function init() {
    const thBtn = $('#themeToggle');
    if (thBtn) thBtn.onclick = toggleTheme;
    applyTheme(getTheme());

    const lBtn = $('#langToggle');
    if (lBtn) lBtn.onclick = toggleLanguage;

    $('#files').onchange = e => ingest(e.target.files);
    $('#showDashboard').onclick = dashboard;
    $('#runTests').onclick = runSelfTests;
    $('#search').oninput = e => { state.q = e.target.value.trim().toLowerCase(); if (state.q) state.collapsed.clear(); renderTree(); };
    $('#typeFilter').onchange = e => { state.type = e.target.value; renderTree(); };
    $('#stateFilter').onchange = e => { state.status = e.target.value; renderTree(); };
    $('#deviceOnly').onchange = e => { state.deviceOnly = e.target.checked; renderTree(); };
    $('#hideNoIo').onchange = e => { state.hideNoIo = e.target.checked; renderTree(); };
    $('#physicalFilter').onchange = e => { state.physicalFilter = e.target.value; renderTree(); };
    $('#editSelected').onclick = editSelected;
    $('#clearSelection').onclick = clearSelection;
    $('#clear').onclick = () => {
      Object.assign(state, { q: '', type: 'all', status: 'all', deviceOnly: false, hideNoIo: false, physicalFilter: 'all' });
      $('#search').value = '';
      $('#typeFilter').value = $('#stateFilter').value = $('#physicalFilter').value = 'all';
      $('#deviceOnly').checked = $('#hideNoIo').checked = false;
      renderTree();
    };
    $('#expand').onclick = () => { state.collapsed.clear(); renderTree(); };
    $('#collapse').onclick = () => { state.collapsed = new Set(Analyzer.nodes(state).filter(n => n.children?.length).map(n => n.id)); renderTree(); };
    $('#treeExpand').onclick = () => { state.collapsed.clear(); renderTree(); };
    $('#treeCollapse').onclick = () => { state.collapsed = new Set(Analyzer.nodes(state).filter(n => n.children?.length).map(n => n.id)); renderTree(); };
    $('#exportCsv').onclick = exportCsv;
    $('#findReserves').onclick = findReserves;
    $('#compareProjects').onclick = compareProjects;
    $('#bulkEdit').onclick = bulkEditSelected;
    $('#createReport').onclick = createReport;
    $('#exportCatalog').onclick = exportCatalog;
    $('#save').onclick = () => download('pcs7-io-project.json', JSON.stringify({ version: 6, projects: state.projects, refs: state.refs, xrefBindings: state.xrefBindings, externalCatalog: state.externalCatalog }, null, 2), 'application/json');

    const dz = $('#drop');
    ['dragenter', 'dragover'].forEach(x => dz.addEventListener(x, e => { e.preventDefault(); dz.classList.add('drag'); }));
    ['dragleave', 'drop'].forEach(x => dz.addEventListener(x, e => { e.preventDefault(); dz.classList.remove('drag'); }));
    dz.addEventListener('drop', e => ingest(e.dataTransfer.files));

    updateStaticTexts();
    render();
  }

  // Export full public API for browser console inspection & automated test suites
  globalThis.__PCS7IO = {
    state,
    catalog: Cat.catalog,
    normMlfb: Cat.normMlfb,
    i18n: I18n,
    detect: Parser.detect,
    parseHw: Parser.parseHw,
    parseCsv: Parser.parseCsv,
    inferDevice: Parser.inferDevice,
    infer: Parser.infer,
    enrich: Parser.enrich,
    nodes: () => Analyzer.nodes(state),
    relink: () => Analyzer.relink(state),
    stats: (n) => Analyzer.stats(n),
    ioBreakdown: (n) => Analyzer.ioBreakdown(n),
    recognitionSummary: (n) => Analyzer.recognitionSummary(n),
    recognitionState: (n) => Analyzer.recognitionState(n),
    reserveRows: () => Analyzer.reserveRows(state),
    addressConflicts: () => Analyzer.addressConflicts(state),
    findReserves,
    runSelfTests,
    toggleChannel,
    selectScope,
    editSelected,
    editChannel,
    toggleLanguage,
    toggleTheme,
    applyTheme,
    getTheme,
    ingest
  };

  if (typeof document !== 'undefined' && document.readyState !== 'loading') {
    init();
  } else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
