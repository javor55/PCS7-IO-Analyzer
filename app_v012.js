/**
 * PCS 7 I/O Analyzer - Internationalization (i18n) Module
 * Supports English (default) and Czech with instant toggle and persistent preference.
 */
(() => {
  'use strict';

  const translations = {
    en: {
      appName: 'PCS 7 I/O Analyzer',
      appSubtitle: 'HW Config · Cross-References · Reserves',
      loadFiles: '＋ Load files',
      overview: 'Overview',
      dataHealth: 'Data Health',
      searchPlaceholder: 'Search RIO, slot, MLFB, address, symbol or chart…',
      expand: 'Expand',
      collapse: 'Collapse',
      compare: 'Compare',
      bulkEdit: 'Bulk Edit',
      exportCsv: 'Export CSV',
      report: 'Report',
      catalogue: 'Catalogue',
      saveProject: 'Save Project',
      hwConfigTitle: 'HW Configuration',
      expandedLabel: 'expanded',
      collapsedLabel: 'collapsed',
      recVerified: 'verified',
      recDerived: 'derived',
      recUnknown: 'unverified',
      recSystem: 'system',
      recDevice: 'device',
      allPlus: 'All +',
      allMinus: 'All −',
      colHwObject: 'HW Configuration Object',
      colIoSummary: 'I/O Summary',
      emptyTree: 'Drag & drop or load CFG and CSV exports.',
      detailTitle: 'Detail',
      emptyStateTitle: 'Load HW Configuration',
      emptyStateDesc: 'Select original CFG and matching Cross-References CSV.<br>You can also drag & drop files into the window.',
      localProcessingBadge: 'Local in-browser processing · No upload',
      filtersTitle: 'Filters & Health',
      xrefAssignmentTitle: 'Cross-References Assignment',
      unassigned: 'Unassigned',
      noXrefLoaded: 'No Cross-References loaded',
      ioTypeLabel: 'I/O Type',
      statusLabel: 'Status',
      physicalStatusLabel: 'Physical Status',
      physicalFilterNote: 'Filters cards and RIOs containing selected physical state.',
      optAll: 'All',
      optOther: 'Other',
      optDev: 'Device (DEV)',
      optReserve: 'HW reserves',
      optUsed: 'Used',
      optNamed: 'Named, unused',
      optUnverified: 'Unverified',
      optAllFree: 'Completely free modules',
      optPartial: 'Partially used modules',
      optUnchecked: 'Unchecked',
      optFree: 'Physically free',
      optWired: 'Cable connected',
      optBlocked: 'Do not use',
      optReserved: 'Reserved for project',
      checkDeviceOnly: 'RIO structure only',
      checkHideNoIo: 'Hide without process I/O',
      clearFilters: 'Clear filters',
      reserveSearchTitle: 'Find Reserves',
      sameRioCheck: 'All on single RIO',
      verifiedOnlyCheck: 'Verified modules only',
      wholeModulesCheck: 'Completely free modules only',
      findReservesBtn: 'Find suitable RIO',
      compatPrompt: 'Load HW export and Cross-References to check compatibility.',
      compatBad: 'Warning: only {0}% of references match HW addresses. Files may belong to different projects.',
      compatWarn: 'Low match: {0}%. Verify whether CFG and CSV belong to the same AS.',
      compatGood: 'File validation: {0}% of references matched HW addresses.',
      loadedSummary: 'Loaded',
      hwExportsCount: 'HW exports',
      xrefRowsCount: 'Cross-Reference rows',
      ioChannelsCount: 'I/O channels',
      channelsTotal: 'Total',
      hwReservesCount: 'HW reserves',
      usedCount: 'Used',
      namedUnusedCount: 'Named without reference',
      unverifiedCount: 'Unverified',
      validationTitle: 'Validation',
      mlfbInCatalog: 'MLFB in catalogue',
      unknownMlfb: 'Unknown MLFB',
      refsWithoutHw: 'References without HW',
      matchRatio: 'Reference match ratio',
      parserWarnings: 'Parser warnings',
      showDiagnosticsBtn: 'View Diagnostics',
      statusReady: 'Local processing · No upload to server',
      projectsCount: 'projects',
      channelsLabel: 'channels',
      reservesLabel: 'reserves',
      selectionSelected: 'selected',
      clearSelectionBtn: 'Clear selection',
      editSelectedBtn: 'Edit selected',
      processingFiles: 'Processing files…',
      loadedFilesSuccess: 'Loaded {0} files',
      unrecognizedFile: 'File {0} was not recognized as HW CFG, Cross-References CSV or saved project JSON.',
      cannotReadFile: 'Cannot read file {0}: {1}',
      compareNeedTwo: 'Load at least two HW projects or two saved JSON projects for comparison.',
      compareTitle: 'Comparison: {0} → {1}',
      changesTotal: 'Total changes',
      addedLabel: 'Added',
      removedLabel: 'Removed',
      changedLabel: 'Changed',
      exportDiffCsv: 'Export Diff CSV',
      printPdf: 'Print / PDF',
      diffColChange: 'Change',
      diffColAddress: 'Address',
      diffColBefore: 'Before',
      diffColAfter: 'After',
      diffColFields: 'Changed Fields',
      noReservesFound: 'No suitable HW reserves found.',
      reserveResultNotice: 'Found reserves are software & HW comment reserves. Physical wiring must be verified in cabinet.',
      meetsReq: 'MEETS REQUIREMENTS',
      doesNotMeetReq: 'DOES NOT MEET REQUIREMENTS',
      missingReq: 'Missing: {0}',
      noSelectionForReport: 'First load a project and select a RIO or module.',
      reportHeader: 'PCS 7 I/O ANALYZER – SUMMARY',
      reportObject: 'Object',
      reportSource: 'Source',
      reportCreated: 'Created',
      reportUsedChannels: 'USED CHANNELS',
      reportNone: 'None',
      reportHwReserves: 'HW RESERVES',
      reportReservedProj: 'RESERVED FOR PROJECTS',
      reportNotice: 'Note: Software state does not confirm physical wiring.',
      heroEyebrow: 'PCS 7 I/O ANALYZER',
      heroHeading: 'Hardware inspection & I/O reserves',
      heroSub: 'Loaded {0} HW projects and {1} Cross-References files.',
      runDataHealthHero: 'Run data health check',
      metricProcessChannels: 'Process channels',
      metricProcessSub: 'across all loaded projects',
      metricReserves: 'HW reserves',
      metricReservesSub: 'without program reference',
      metricUsed: 'Used',
      metricUsedSub: 'including multiple references',
      metricCheck: 'Requires check',
      metricCheckSub: 'named or unverified',
      projectHealthTitle: 'Project Health',
      hwRecCounts: 'HW verified / probable / unknown',
      fieldDevicesCount: 'Field / bus devices (DEV)',
      hwConflictsCount: 'Physical address conflicts',
      legendTitle: 'Status Legend',
      legendNotice: 'A green HW reserve does not guarantee confirmed physical cabinet wiring.',
      testResultTitle: 'Health check result',
      testsPassing: 'tests passing without issues',
      rerunTestsBtn: 'Rerun checks',
      testNotice: 'Checks verify structural consistency and parser clarity. Does not replace physical cabinet check.',
      diagTitle: 'Project Diagnostics',
      diagNotice: 'Unverified results must not be assumed to be safely available spares.',
      unknownMlfbTitle: 'Unknown MLFB ({0})',
      refsWithoutHwTitle: 'References without corresponding HW address ({0})',
      conflictsTitle: 'Conflicting physical addresses ({0})',
      parserWarnTitle: 'Parser warnings ({0})',
      noneList: 'None',
      colSymbol: 'Symbol',
      colChart: 'Chart',
      channelsHeading: 'Channels',
      btnAll: 'All',
      btnReserves: 'HW reserves',
      btnPhysFree: 'Physically free',
      btnInvert: 'Invert',
      btnCancel: 'Cancel',
      thCheck: '✓',
      thStatus: 'Status',
      thAddress: 'Address',
      thHwSymbol: 'HW symbol',
      thXref: 'Cross-References',
      thConfidence: 'Confidence',
      thPhysical: 'Physical status',
      btnEdit: 'Edit',
      parserDiagBlock: 'Parser diagnostics and raw source block',
      propObject: 'Object',
      propBus: 'Bus',
      propDevAddress: 'Device address',
      propSlotSubslot: 'Slot / subslot',
      propMlfb: 'MLFB',
      propFamilyType: 'Family / type',
      propRecHw: 'HW recognition',
      propObjConfidence: 'Object confidence',
      propComment: 'Comment',
      propSourceLine: 'Source, line {0}',
      promptPhysicalBulk: 'Bulk physical status for {0} HW reserves:\n0 = Unchecked\n1 = Physically free\n2 = Cable connected\n3 = Do not use\n4 = Reserved for project',
      promptPhysicalSingle: 'Physical status for {0}:\n0 = Unchecked\n1 = Physically free\n2 = Cable connected\n3 = Do not use\n4 = Reserved for project',
      promptPhysicalMarked: 'Physical status for {0} selected channels:\n0 = Unchecked\n1 = Physically free\n2 = Cable connected\n3 = Do not use\n4 = Reserved for project',
      promptReservationName: 'Project / reservation name:',
      promptSharedNote: 'Common note:',
      promptChannelNote: 'Channel note:',
      toastEditedCount: 'Updated {0} channels',
      toastSelectFirst: 'First select a RIO or module',
      toastNoReservesInObj: 'Selected object contains no HW reserves.',
      toastSelectRioFirst: 'First select a RIO or module in tree.',
      // Status labels
      stReserve: 'HW reserve',
      stUsed: 'Used',
      stMultiple: 'Multiple refs',
      stNamedUnused: 'Named, unused',
      stDevUnused: 'Device without ref.',
      stUnknown: 'Unverified',
      // Physical labels
      phUnchecked: 'Unchecked',
      phFree: 'Physically free',
      phWired: 'Cable connected',
      phBlocked: 'Do not use',
      phReserved: 'Reserved for project',
      // Recognition badge labels
      badgeVerified: 'Verified',
      badgeDerived: 'Derived',
      badgeUnknown: 'Unverified',
      badgeSystem: 'System',
      badgeDevice: 'Device',
      // Test suite names
      testIdUniqueness: 'Object ID uniqueness',
      testAddrFormat: 'Process address format',
      testMlfbPresence: 'Process module MLFB',
      testByteAddressing: 'Byte-level digital addressing',
      testXrefBindings: 'Cross-References bindings',
      testHwRecognition: 'HW module recognition',
      testModelConfidence: 'Channel model confidence',
      testRioConflicts: 'RIO context address conflicts'
    },
    cs: {
      appName: 'PCS 7 I/O Analyzer',
      appSubtitle: 'HW Config · Cross-References · rezervy',
      loadFiles: '＋ Načíst soubory',
      overview: 'Přehled',
      dataHealth: 'Kontrola dat',
      searchPlaceholder: 'Hledat RIO, slot, MLFB, adresu, symbol nebo chart…',
      expand: 'Rozbalit',
      collapse: 'Sbalit',
      compare: 'Porovnat',
      bulkEdit: 'Hromadná kontrola',
      exportCsv: 'Export CSV',
      report: 'Report',
      catalogue: 'Katalog',
      saveProject: 'Uložit projekt',
      hwConfigTitle: 'HW konfigurace',
      expandedLabel: 'rozbaleno',
      collapsedLabel: 'sbaleno',
      recVerified: 'ověřeno',
      recDerived: 'odvozeno',
      recUnknown: 'nerozpoznáno',
      recSystem: 'systémové',
      recDevice: 'zařízení',
      allPlus: 'Vše +',
      allMinus: 'Vše −',
      colHwObject: 'Objekt HW konfigurace',
      colIoSummary: 'Přehled I/O',
      emptyTree: 'Přetáhni nebo načti CFG a CSV exporty.',
      detailTitle: 'Detail',
      emptyStateTitle: 'Načti HW konfiguraci',
      emptyStateDesc: 'Vyber původní <b>CFG</b> a odpovídající <b>CSV</b> Cross-References.<br>Soubory můžeš také přetáhnout do okna.',
      localProcessingBadge: 'Lokální zpracování v prohlížeči · Žádný upload',
      filtersTitle: 'Filtry a kontrola',
      xrefAssignmentTitle: 'Přiřazení Cross-References',
      unassigned: 'Nepřiřazeno',
      noXrefLoaded: 'Žádné Cross-References',
      ioTypeLabel: 'Typ I/O',
      statusLabel: 'Stav',
      physicalStatusLabel: 'Fyzický stav',
      physicalFilterNote: 'Filtruje karty a RIO obsahující daný fyzický stav.',
      optAll: 'Všechny',
      optOther: 'Ostatní',
      optDev: 'Zařízení (DEV)',
      optReserve: 'HW rezervy',
      optUsed: 'Použité',
      optNamed: 'Pojmenované, nepoužité',
      optUnverified: 'Neověřené',
      optAllFree: 'Kompletně volné moduly',
      optPartial: 'Částečně obsazené moduly',
      optUnchecked: 'Neověřeno',
      optFree: 'Fyzicky volné',
      optWired: 'Kabel připojen',
      optBlocked: 'Nepoužívat',
      optReserved: 'Rezervováno pro projekt',
      checkDeviceOnly: 'Pouze struktura po RIO',
      checkHideNoIo: 'Skrýt bez procesních I/O',
      clearFilters: 'Vymazat filtry',
      reserveSearchTitle: 'Hledání rezerv',
      sameRioCheck: 'Vše na jednom RIO',
      verifiedOnlyCheck: 'Pouze verified moduly',
      wholeModulesCheck: 'Pouze kompletně volné moduly',
      findReservesBtn: 'Najít vhodné RIO',
      compatPrompt: 'Načti HW export i Cross-References pro kontrolu kompatibility.',
      compatBad: 'Varování: pouze {0} % referencí odpovídá načtené HW konfiguraci. Soubory mohou patřit k jiným projektům.',
      compatWarn: 'Nízká shoda: {0} %. Zkontroluj, zda CFG a CSV patří ke stejné AS.',
      compatGood: 'Kontrola souborů: {0} % referencí bylo nalezeno v HW adresách.',
      loadedSummary: 'Načteno',
      hwExportsCount: 'HW exporty',
      xrefRowsCount: 'Cross-reference řádky',
      ioChannelsCount: 'I/O kanály',
      channelsTotal: 'Celkem',
      hwReservesCount: 'HW rezervy',
      usedCount: 'Použité',
      namedUnusedCount: 'Pojmenované bez použití',
      unverifiedCount: 'Neověřené',
      validationTitle: 'Validace',
      mlfbInCatalog: 'MLFB v katalogu',
      unknownMlfb: 'Neznámé MLFB',
      refsWithoutHw: 'Reference bez HW',
      matchRatio: 'Shoda referencí s HW',
      parserWarnings: 'Varování parseru',
      showDiagnosticsBtn: 'Zobrazit diagnostiku',
      statusReady: 'Lokální zpracování · žádný upload',
      projectsCount: 'projekty',
      channelsLabel: 'kanálů',
      reservesLabel: 'rezerv',
      selectionSelected: 'označeno',
      clearSelectionBtn: 'Zrušit výběr',
      editSelectedBtn: 'Upravit označené',
      processingFiles: 'Zpracovávám soubory…',
      loadedFilesSuccess: 'Načteno {0} souborů',
      unrecognizedFile: 'Soubor {0} nebyl rozpoznán jako HW CFG, Cross-References CSV ani uložený projekt.',
      cannotReadFile: 'Soubor {0} nelze přečíst: {1}',
      compareNeedTwo: 'Pro porovnání načti alespoň dva HW projekty nebo dva uložené JSON projekty.',
      compareTitle: 'Porovnání: {0} → {1}',
      changesTotal: 'Změny celkem',
      addedLabel: 'Přidáno',
      removedLabel: 'Odebráno',
      changedLabel: 'Změněno',
      exportDiffCsv: 'Export změn CSV',
      printPdf: 'Tisk / PDF',
      diffColChange: 'Změna',
      diffColAddress: 'Adresa',
      diffColBefore: 'Předtím',
      diffColAfter: 'Nyní',
      diffColFields: 'Změněná pole',
      noReservesFound: 'Nebyla nalezena žádná použitelná HW rezerva.',
      reserveResultNotice: 'Nalezené rezervy jsou rezervy v programu a HW komentářích. Fyzickou kabeláž je nutné ověřit.',
      meetsReq: 'VYHOVUJE',
      doesNotMeetReq: 'NEVYHOVUJE',
      missingReq: 'Chybí: {0}',
      noSelectionForReport: 'Nejprve načti projekt a vyber RIO nebo modul.',
      reportHeader: 'PCS 7 I/O ANALYZER – SOUHRN',
      reportObject: 'Objekt',
      reportSource: 'Zdroj',
      reportCreated: 'Vytvořeno',
      reportUsedChannels: 'POUŽITÉ KANÁLY',
      reportNone: 'Žádné',
      reportHwReserves: 'HW REZERVY',
      reportReservedProj: 'REZERVOVÁNO PRO PROJEKTY',
      reportNotice: 'Poznámka: Stav programu nepotvrzuje fyzické zapojení kabeláže.',
      heroEyebrow: 'PCS 7 I/O ANALYZER',
      heroHeading: 'Kontrola hardwaru a I/O rezerv',
      heroSub: 'Načteno {0} HW projektů a {1} souborů Cross-References.',
      runDataHealthHero: 'Spustit kontrolu dat',
      metricProcessChannels: 'Procesní kanály',
      metricProcessSub: 've všech načtených projektech',
      metricReserves: 'HW rezervy',
      metricReservesSub: 'bez programové reference',
      metricUsed: 'Použité',
      metricUsedSub: 'včetně více referencí',
      metricCheck: 'Vyžaduje kontrolu',
      metricCheckSub: 'pojmenované nebo neověřené',
      projectHealthTitle: 'Stav projektu',
      hwRecCounts: 'HW verified / probable / unknown',
      fieldDevicesCount: 'Polní / sběrnicová zařízení (DEV)',
      hwConflictsCount: 'Konflikty fyzických adres',
      legendTitle: 'Legenda stavů',
      legendNotice: 'Zelená HW rezerva stále neznamená potvrzenou fyzickou kabeláž.',
      testResultTitle: 'Výsledek kontroly',
      testsPassing: 'testů bez nálezu',
      rerunTestsBtn: 'Spustit znovu',
      testNotice: 'Kontrola hledá strukturální chyby a nejasnosti parseru. Nenahrazuje ověření zapojení ve skutečném rozvaděči.',
      diagTitle: 'Diagnostika projektu',
      diagNotice: 'Neověřené výsledky se nemají považovat za bezpečně volnou rezervu.',
      unknownMlfbTitle: 'Neznámá MLFB ({0})',
      refsWithoutHwTitle: 'Reference bez odpovídající HW adresy ({0})',
      conflictsTitle: 'Konfliktní fyzické adresy ({0})',
      parserWarnTitle: 'Varování parseru ({0})',
      noneList: 'Žádné',
      colSymbol: 'Symbol',
      colChart: 'Chart',
      channelsHeading: 'Kanály',
      btnAll: 'Vše',
      btnReserves: 'HW rezervy',
      btnPhysFree: 'Fyzicky volné',
      btnInvert: 'Invertovat',
      btnCancel: 'Zrušit',
      thCheck: '✓',
      thStatus: 'Stav',
      thAddress: 'Adresa',
      thHwSymbol: 'HW symbol',
      thXref: 'Cross-References',
      thConfidence: 'Jistota',
      thPhysical: 'Fyzický stav',
      btnEdit: 'Upravit',
      parserDiagBlock: 'Diagnostika parseru a zdrojový blok',
      propObject: 'Objekt',
      propBus: 'Sběrnice',
      propDevAddress: 'Adresa zařízení',
      propSlotSubslot: 'Slot / subslot',
      propMlfb: 'MLFB',
      propFamilyType: 'Rodina / typ',
      propRecHw: 'Rozpoznání HW',
      propObjConfidence: 'Jistota objektu',
      propComment: 'Komentář',
      propSourceLine: 'Zdroj, řádek {0}',
      promptPhysicalBulk: 'Hromadný fyzický stav pro {0} HW rezerv:\n0 = Neověřeno\n1 = Fyzicky volné\n2 = Kabel připojen\n3 = Nepoužívat\n4 = Rezervováno pro projekt',
      promptPhysicalSingle: 'Fyzický stav {0}:\n0 = Neověřeno\n1 = Fyzicky volné\n2 = Kabel připojen\n3 = Nepoužívat\n4 = Rezervováno pro projekt',
      promptPhysicalMarked: 'Fyzický stav pro {0} označených kanálů:\n0 = Neověřeno\n1 = Fyzicky volné\n2 = Kabel připojen\n3 = Nepoužívat\n4 = Rezervováno pro projekt',
      promptReservationName: 'Název projektu / rezervace:',
      promptSharedNote: 'Společná poznámka:',
      promptChannelNote: 'Poznámka ke kanálu:',
      toastEditedCount: 'Upraveno {0} kanálů',
      toastSelectFirst: 'Nejprve vyber RIO nebo modul',
      toastNoReservesInObj: 'Vybraný objekt neobsahuje HW rezervy.',
      toastSelectRioFirst: 'Nejprve vyber RIO nebo modul ve stromu.',
      // Status labels
      stReserve: 'HW rezerva',
      stUsed: 'Použito',
      stMultiple: 'Více referencí',
      stNamedUnused: 'Pojmenované, nepoužité',
      stDevUnused: 'Zařízení bez ref.',
      stUnknown: 'Neověřené',
      // Physical labels
      phUnchecked: 'Neověřeno',
      phFree: 'Fyzicky volné',
      phWired: 'Kabel připojen',
      phBlocked: 'Nepoužívat',
      phReserved: 'Rezervováno pro projekt',
      // Recognition badge labels
      badgeVerified: 'Ověřeno',
      badgeDerived: 'Odvozeno',
      badgeUnknown: 'Nerozpoznáno',
      badgeSystem: 'Systémové',
      badgeDevice: 'Zařízení',
      // Test suite names
      testIdUniqueness: 'Jedinečnost ID objektů',
      testAddrFormat: 'Formát procesních adres',
      testMlfbPresence: 'MLFB procesních modulů',
      testByteAddressing: 'Digitální adresování přes bajty',
      testXrefBindings: 'Přiřazení Cross-References',
      testHwRecognition: 'Rozpoznání HW modulů',
      testModelConfidence: 'Jistota kanálového modelu',
      testRioConflicts: 'Konflikty v kontextu RIO'
    }
  };

  let currentLang = 'en';
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('pcs7_lang');
      if (saved && (saved === 'en' || saved === 'cs')) currentLang = saved;
    }
  } catch {}

  function t(key, ...args) {
    const dict = translations[currentLang] || translations.en;
    let val = dict[key] ?? translations.en[key] ?? key;
    if (args.length) {
      args.forEach((a, i) => { val = val.replace(new RegExp(`\\{${i}\\}`, 'g'), a); });
    }
    return val;
  }

  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'cs') return;
    currentLang = lang;
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem('pcs7_lang', lang);
    } catch {}
  }

  function getLanguage() {
    return currentLang;
  }

  const exp = { translations, t, setLanguage, getLanguage };
  if (typeof module !== 'undefined' && module.exports) module.exports = exp;
  if (typeof window !== 'undefined') window.PCSI18n = exp;
  if (typeof globalThis !== 'undefined') globalThis.PCSI18n = exp;
})();

/**
 * PCS 7 I/O Analyzer - Module Catalogue & MLFB Normalization
 * Contains physical and communication specifications for Siemens S7-300 / S7-400,
 * ET 200SP, ET 200M, ET 200S, ET 200iSP, ET 200SP HA/Ex, Axioline, SIMOCODE,
 * Danfoss & SINAMICS drives, PA field devices, and power/network infrastructure.
 */
(() => {
  'use strict';

  function normMlfb(s) {
    if (!s) return '';
    const m = String(s).match(/(6ES[0-9]|6DL1|6GK[0-9]|3RK1|3UF7|6SL[0-9])[ _]([0-9]{3})[-_]([0-9A-Z*]{5})[-_]([0-9A-Z*]{1,4})/i);
    if (m) return `${m[1].toUpperCase()} ${m[2]}-${m[3].toUpperCase()}-${m[4].toUpperCase()}`;
    return String(s).replace(/^[^:]*:/, '').replace(/\s+/g, ' ').trim();
  }

  const catalog = {
    // --- ET 200SP Digital Input ---
    '6ES7 131-6BF00-0BA0': { type: 'DI', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6BF00-0CA0': { type: 'DI', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6BF01-0BA0': { type: 'DI', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6BF00-0DA0': { type: 'DI', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6FD00-0BB1': { type: 'DI', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 131-6FD01-0BB1': { type: 'DI', channels: 4, family: 'ET 200SP', width: 'bit' },

    // --- ET 200SP Digital Output ---
    '6ES7 132-6BF00-0BA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6BF00-0CA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6BF01-0BA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6BF01-0CA0': { type: 'DO', channels: 8, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6GD50-0BA0': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6GD51-0BA0': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6HD00-0BB0': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6HD00-0BB1': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },
    '6ES7 132-6HD01-0BB1': { type: 'DO', channels: 4, family: 'ET 200SP', width: 'bit' },

    // --- ET 200SP Analog Input ---
    '6ES7 134-6GB00-0BA1': { type: 'AI', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6GD00-0BA1': { type: 'AI', channels: 4, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6GD01-0BA1': { type: 'AI', channels: 4, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6GF00-0AA1': { type: 'AI', channels: 8, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6HB00-0CA1': { type: 'AI', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 134-6TD00-0CA1': { type: 'AI', channels: 4, family: 'ET 200SP', width: 'word' },

    // --- ET 200SP Analog Output ---
    '6ES7 135-6GB00-0BA1': { type: 'AO', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 135-6HB00-0CA1': { type: 'AO', channels: 2, family: 'ET 200SP', width: 'word' },
    '6ES7 135-6HD00-0BA1': { type: 'AO', channels: 4, family: 'ET 200SP', width: 'word' },

    // --- ET 200M (S7-300) ---
    '6ES7 321-1BH02-0AA0': { type: 'DI', channels: 16, family: 'ET 200M', width: 'bit' },
    '6ES7 321-1BL00-0AA0': { type: 'DI', channels: 32, family: 'ET 200M', width: 'bit' },
    '6ES7 322-1BH01-0AA0': { type: 'DO', channels: 16, family: 'ET 200M', width: 'bit' },
    '6ES7 322-1BL00-0AA0': { type: 'DO', channels: 32, family: 'ET 200M', width: 'bit' },
    '6ES7 323-1BH01-0AA0': { type: 'DI/DO', channels: 16, diChannels: 8, doChannels: 8, family: 'ET 200M', width: 'bit' },
    '6ES7 331-7KF02-0AB0': { type: 'AI', channels: 8, family: 'ET 200M', width: 'word' },
    '6ES7 331-7TF01-0AB0': { type: 'AI', channels: 8, family: 'ET 200M', width: 'word' },
    '6ES7 332-5HB01-0AB0': { type: 'AO', channels: 2, family: 'ET 200M', width: 'word' },
    '6ES7 332-5HD01-0AB0': { type: 'AO', channels: 4, family: 'ET 200M', width: 'word' },
    '6ES7 332-5HF00-0AB0': { type: 'AO', channels: 8, family: 'ET 200M', width: 'word' },

    // --- ET 200S ---
    '6ES7 131-4BF00-0AA0': { type: 'DI', channels: 8, family: 'ET 200S', width: 'bit' },
    '6ES7 131-4FB00-0AB0': { type: 'DI', channels: 2, family: 'ET 200S', width: 'bit' },
    '6ES7 132-4HB01-0AB0': { type: 'DO', channels: 2, family: 'ET 200S', width: 'bit' },
    '6ES7 134-4GB11-0AB0': { type: 'AI', channels: 2, family: 'ET 200S', width: 'word' },

    // --- ET 200iSP ---
    '6ES7 131-7RF00-0AB0': { type: 'DI', channels: 8, family: 'ET 200iSP', width: 'bit' },
    '6ES7 132-7RD20-0AB0': { type: 'DO', channels: 4, family: 'ET 200iSP', width: 'bit' },
    '6ES7 134-7TD00-0AB0': { type: 'AI', channels: 4, family: 'ET 200iSP', width: 'word' },
    '6ES7 135-7TD00-0AB0': { type: 'AO', channels: 4, family: 'ET 200iSP', width: 'word' },

    // --- ET 200SP HA / Ex ---
    '6DL1 131-6BH00-0PH1': { type: 'DI', channels: 16, family: 'ET 200SP HA', width: 'bit' },
    '6DL1 132-6BH00-0PH1': { type: 'DO', channels: 16, family: 'ET 200SP HA', width: 'bit' },
    '6DL1 132-6TD00-0HX1': { type: 'DI', channels: 4, family: 'ET 200SP Ex', width: 'bit' },
    '6DL1 134-6AF00-0PH1': { type: 'AI', channels: 8, family: 'ET 200SP HA', width: 'word' },
    '6DL1 134-6TB00-0HX1': { type: 'AI', channels: 2, family: 'ET 200SP Ex', width: 'word' },

    // --- Axioline (Phoenix Contact) ---
    'AXL SE DI16/1': { type: 'DI', channels: 16, family: 'Axioline', width: 'bit' },
    'AXL F DI16 NAM XC 1F': { type: 'DI', channels: 16, family: 'Axioline', width: 'bit' },
    'AXL F AI8 1F': { type: 'AI', channels: 8, family: 'Axioline', width: 'word' },
    'AXL F AI8 HART XC 1F': { type: 'AI', channels: 8, family: 'Axioline', width: 'word' },

    // --- ET 200SP Motor Starters (3RK1) -> DEV ---
    '3RK1 308-0AB00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 0.3-1A HF' },
    '3RK1 308-0AC00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 0.9-3A HF' },
    '3RK1 308-0AD00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 2.8-9A HF' },
    '3RK1 308-0AE00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'DS 4.0-12A HF' },
    '3RK1 308-0BC00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'RS 0.9-3A HF' },
    '3RK1 308-0DC00-0CP0': { type: 'DEV', family: 'ET 200SP Motor Starter', devType: 'F-DS 0.9-3A HF' },

    // --- SIMOCODE (3UF7) -> DEV ---
    '3UF7 011-1A*00-0': { type: 'DEV', family: 'SIMOCODE', devType: 'SIMOCODE pro V PN' },
    '3UF7 011-1A*00-1': { type: 'DEV', family: 'SIMOCODE', devType: 'SIMOCODE pro V PN GP' },

    // --- ET 200SP Energy Meter -> DEV ---
    '6ES7 134-6PA00-0BD0': { type: 'DEV', family: 'ET 200SP Energy Meter', devType: 'AI Energy Meter 400VAC' },
    '6ES7 134-6PA01-0BD0': { type: 'DEV', family: 'ET 200SP Energy Meter', devType: 'AI Energy Meter 400VAC ST' },

    // --- ET 200SP Communication PtP -> DEV ---
    '6ES7 137-6AA00-0BA0': { type: 'DEV', family: 'ET 200SP Comm', devType: 'CM PtP' },

    // --- System / Infrastructure / Non-Process (OTHER) ---
    '6ES7 193-6PA00-0AA0': { type: 'OTHER', family: 'ET 200SP Server Module', isSystem: true },
    '6ES7 193-6AR00-0AA0': { type: 'OTHER', family: 'ET 200SP BusAdapter', isSystem: true },
    '6ES7 133-6CV15-1AM0': { type: 'OTHER', family: 'ET 200SP BU Cover', isSystem: true },
    '6ES7 155-6AU00-0CN0': { type: 'OTHER', family: 'ET 200SP IM 155-6 PN ST', isSystem: true },
    '6ES7 155-6AU01-0CN0': { type: 'OTHER', family: 'ET 200SP IM 155-6 PN HF', isSystem: true },
    '6ES7 151-3AA23-0AB0': { type: 'OTHER', family: 'ET 200S IM 151-3 PN', isSystem: true },
    '6ES7 151-3BA23-0AB0': { type: 'OTHER', family: 'ET 200S IM 151-3 PN HF', isSystem: true },
    '6ES7 138-4CA01-0AA0': { type: 'OTHER', family: 'ET 200S PM-E DC24V', isSystem: true },
    '6ES7 138-4CB11-0AB0': { type: 'OTHER', family: 'ET 200S PM-E DC24..48V', isSystem: true },
    '6ES7 153-2BA70-0XB0': { type: 'OTHER', family: 'ET 200M IM 153-2 Redundancy', isSystem: true },
    '6ES7 153-4BA00-0XB0': { type: 'OTHER', family: 'ET 200M IM 153-4 PN HF', isSystem: true },
    '6DL1 155-6AU00-0PM0': { type: 'OTHER', family: 'ET 200SP HA IM 155-6 PN', isSystem: true },
    '6DL1 193-6AR00-0AA0': { type: 'OTHER', family: 'ET 200SP HA BusAdapter', isSystem: true },
    '6DL1 133-6PX00-0HW0': { type: 'OTHER', family: 'ET 200SP Ex PM-E', isSystem: true },
    '6ES7 158-3AD10-0XA0': { type: 'DEV', family: 'PN/PN Coupler', devType: 'PN/PN Coupler V4.2' },
    '6GK1 411-5BB00': { type: 'OTHER', family: 'PN/PB LINK HA', isSystem: true },
    '6GK1 411-5BB00-V40': { type: 'OTHER', family: 'PN/PB LINK HA', isSystem: true },
    '6ES7 400-1JA00-0AA0': { type: 'OTHER', family: 'S7-400 Rack UR2', isSystem: true },
    '6ES7 400-1JA11-0AA1': { type: 'OTHER', family: 'S7-400 Rack UR2', isSystem: true },
    '6ES7 400-2JA10-0AA0': { type: 'OTHER', family: 'S7-400 Rack CR3', isSystem: true },
    '6ES7 405-0KA02-0AA0': { type: 'OTHER', family: 'S7-400 PS 405 10A DC', isSystem: true },
    '6ES7 407-0KA02-0AA0': { type: 'OTHER', family: 'S7-400 PS 407 10A AC', isSystem: true },
    '6ES7 410-5HX08-0AB0': { type: 'OTHER', family: 'CPU 410-5H', isSystem: true },
    '6ES7 416-3ES06-0AB0': { type: 'OTHER', family: 'CPU 416-3 PN/DP', isSystem: true },
    '6ES7 960-1AA06-0XA0': { type: 'OTHER', family: 'H Sync module', isSystem: true },
    '6GK7 443-1EX30-0XE0': { type: 'OTHER', family: 'CP 443-1', isSystem: true },
    '6GK5 204-0BA00-2AF2': { type: 'OTHER', family: 'SCALANCE X204', isSystem: true },
    '6GK5 204-2BB10-2AA3': { type: 'OTHER', family: 'SCALANCE X204-2', isSystem: true },
    '6GK5 206-2BB00-2AC2': { type: 'OTHER', family: 'SCALANCE XC206-2', isSystem: true },
    '6GK5 206-2BS00-2AC2': { type: 'OTHER', family: 'SCALANCE XC206-2SFP', isSystem: true }
  };

  const exp = { normMlfb, catalog };
  if (typeof module !== 'undefined' && module.exports) module.exports = exp;
  if (typeof window !== 'undefined') window.PCS7Catalog = exp;
  if (typeof globalThis !== 'undefined') globalThis.PCS7Catalog = exp;
})();

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