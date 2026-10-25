# PCS 7 I/O Analyzer

Klientský nástroj pro rychlou kontrolu, analýzu obsazenosti a vyhledávání rezerv v hardwarových konfiguracích **Siemens SIMATIC PCS 7 / STEP 7** spojených s programovými **Cross-References**.

🌐 **Online aplikace (GitHub Pages):**  
👉 **[https://javor55.github.io/PCS7-IO-Analyzer/](https://javor55.github.io/PCS7-IO-Analyzer/)**

---

## 🚀 Hlavní přednosti

- **100% lokální zpracování v prohlížeči**: Žádná data, HW konfigurace ani exporty proměnných se neodesílají na žádný server ani do cloudu. Vše běží v paměti RAM vašeho prohlížeče.
- **Bez instalace**: Otevřete v Google Chrome nebo Microsoft Edge a přetáhněte soubory (`.cfg`, `.txt`, `.csv`, `.json`).
- **Kompletní katalog MLFB**: Rozpoznává 88+ modulů Siemens (ET 200SP, ET 200M, ET 200S, ET 200iSP, ET 200SP HA / Ex), Phoenix Contact Axioline i polní sběrnicová zařízení.
- **Inteligentní rozpoznání sběrnicových zařízení (DEV)**: Měniče frekvence Danfoss (VLT/FC), Siemens SINAMICS, motorové spouštěče ET 200SP 3RK1, inteligentní ochrany SIMOCODE pro V, převodníky Profibus-PA a analyzátory sítě.
- **Automatické párování Cross-References**: Propojí HW adresy modulů s CFC charty a symboly, včetně podpory pro wordové (`IW`/`QW`) i bajtové/floatové (`IB`/`ID`) reference.
- **Hledač rezerv (Spare Finder)**: Okamžitě najde vhodné volné kanály (DI, DO, AI, AO) na jednom RIO nebo napříč systémem s prioritou fyzicky volných svorek.
- **Dark / Light Mode (🌙 / ☀️)**: Elegantní tmavý režim šetřící zrak při noční práci, přepínatelný jedním kliknutím.
- **Dvojjazyčné rozhraní (EN / CS)**: Výchozí profesionální angličtina s možností okamžitého přepnutí do češtiny (`🌐 EN | CS`).
- **Dvě formy použití**:
  1. **Online přes GitHub Pages** pro okamžitou práci bez stahování.
  2. **Offline 1-souborový balíček (`dist/PCS7-IO-Analyzer.html`)** pro servisní notebooky v rozvodnách a izolovaných OT sítích bez internetu.

---

## 📂 Struktura repozitáře

```text
PCS7-IO-Analyzer/
├── index.html                   # Hlavní vstupní stránka pro GitHub Pages i lokální běh
├── css/
│   └── styles.css               # Kompletní styly rozhraní a design systém (Light & Dark mode)
├── js/
│   ├── i18n.js                  # Internationalizace: kompletní EN a CS slovníky + přepínač
│   ├── catalog.js               # MLFB katalog, rodiny modulů a normalizace kódů
│   ├── parser.js                # Parser HW exportů (CFG) a Cross-References (CSV)
│   ├── analyzer.js              # Párování relink(), statistiky, vyhledávání rezerv a diff
│   └── app.js                   # UI řadič, strom, dashboard, obsluha filtrů a událostí
├── scripts/
│   ├── bundle.js                # Build skript sestavující offline 1-souborový balíček
│   └── test.js                  # Automatizovaná testovací sada pro kontrolu rozpoznání
├── dist/
│   └── PCS7-IO-Analyzer.html    # Samostatná distribuce v 1 souboru (vhodné na flash disk)
├── package.json                 # Konfigurace NPM skriptů (build, test)
└── .gitignore                   # Zajišťuje, že se interní PCS7 exporty nenahrávají do gitu
```

---

## ⚙️ Vývoj a sestavení

Projekt nemá žádné runtime závislosti. K vývoji stačí libovolný prohlížeč nebo Node.js.

### Spuštění testů:
```bash
npm test
```
Ověří správné rozpoznání modulů, nulový výskyt chyb (`unknown: 0, probable: 0`) a párování referencí.

### Sestavení offline balíčku:
```bash
npm run build
```
Vytvoří plně soběstačný HTML soubor v `dist/PCS7-IO-Analyzer.html`.

---

## 🌐 Aktivace GitHub Pages

Pokud ještě nemáte aktivní GitHub Pages na svém repozitáři:

1. Otevřete repozitář na GitHubu: `https://github.com/javor55/PCS7-IO-Analyzer`
2. V horní navigaci klikněte na **Settings** ⚙️.
3. V levém menu zvolte **Pages**.
4. Pod **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: zvolte `main` a složku `/ (root)`
5. Klikněte na **Save**.
6. Během 1–2 minut je web živý na:  
   👉 `https://javor55.github.io/PCS7-IO-Analyzer/`

---

## 🔒 Bezpečnost a ochrana průmyslových dat

Aplikace pracuje výhradně na principu **HTML5 File API** a **Blob URL**. Při načtení exportů ze STEP 7 / PCS 7 se soubory zpracovávají přímo ve webovém engine prohlížeče uživatele. Žádná data, názvy chartů, proměnné ani IP/MAC adresy se neodesílají na GitHub ani na žádný vzdálený server.
