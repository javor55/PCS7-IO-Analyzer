# PCS 7 I/O Analyzer

> **Client-side hardware configuration & I/O spare channel analyzer for Siemens SIMATIC PCS 7 and STEP 7 systems.**

[![Live Web App](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=flat-square&logo=github)](https://javor55.github.io/PCS7-IO-Analyzer/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla%20JS)-success?style=flat-square)](package.json)
[![OT Air-Gap Safe](https://img.shields.io/badge/Security-100%25%20Client--Side%20%2F%20Air--Gap%20Safe-brightgreen?style=flat-square)](README.md#privacy--industrial-cybersecurity)
[![Theme](https://img.shields.io/badge/UI-Dark%20%2F%20Light%20Mode-orange?style=flat-square)](README.md#key-features)
[![Languages](https://img.shields.io/badge/Languages-English%20%7C%20%C4%8Ce%C5%A1tina-indigo?style=flat-square)](README.md#key-features)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

## 🌐 Launch the App

- **Online Web App (GitHub Pages):**  
  👉 **[https://javor55.github.io/PCS7-IO-Analyzer/](https://javor55.github.io/PCS7-IO-Analyzer/)**
- **Offline Standalone Bundle (Air-Gapped / Isolated OT Networks):**  
  Download or copy [`dist/PCS7-IO-Analyzer.html`](dist/PCS7-IO-Analyzer.html) directly to a service laptop or maintenance USB flash drive. Double-click to run in any modern web browser without internet access or web servers.

---

## 💡 Overview

Managing hardware configurations and identifying spare I/O channels across distributed **Siemens SIMATIC PCS 7 / STEP 7** automation projects is often time-consuming, requiring engineers to cross-reference HW Konfig racks against extensive software Cross-Reference tables.

**PCS 7 I/O Analyzer** solves this by providing an instant, visual, and client-side analysis tool:
1. **Drop your HW Config export (`.cfg` / `.txt`)**: Instantly visualizes the entire system topology (Controllers, PROFIBUS/PROFINET racks, Distributed I/O stations, Interface Modules, and I/O cards).
2. **Drop your Cross-Reference export (`.csv`)**: Automatically links hardware channel addresses (`I`, `Q`, `IW`, `QW`) with software CFC chart locations, block names, and engineering symbols.
3. **Find spare capacity**: Detect unused channels, verify reserved wiring, and export spare channel lists in seconds.

---

## 🚀 Key Features

### 🛡️ 100% Client-Side & Air-Gap Safe
- Runs entirely in your browser using the HTML5 File API and memory blobs.
- **Zero data transmission**: No hardware configurations, chart names, IP/MAC addresses, or process tags are ever sent to any remote server or cloud.
- Fully compatible with strictly isolated industrial OT networks (Level 2 / Level 3 DCS environments).

### ⚡ Extensive Hardware & Module Recognition
- **88+ Siemens SIMATIC Catalog Cards**:
  - **ET 200SP**: Digital and analog cards (DI 8x24VDC, DQ 8x24VDC, AI 4xI, AI 4xRTD/TC, AQ 2xU/I, AQ 4xU/I).
  - **ET 200M (S7-300)**: DI 16/32, DO 16/32, DI/DO 16, AI 8 (standard & HART), AO 2/4/8.
  - **ET 200S & ET 200iSP**: Intrinsically safe process automation modules.
  - **ET 200SP HA & ET 200SP Ex**: NAMUR inputs, HART transmitters, and power modules.
  - **Third-Party I/O**: Phoenix Contact Axioline (AXL SE / AXL F).
- **Subslot & Multi-Carrier Support**:
  - Automatically resolves modular PROFINET / HSP carriers (such as ET 200SP `_S7H_HSP_*` submodules), propagating subslot I/O addresses, channel counts, and symbols up to the physical carrier slot.

### 🔌 Intelligent Bus Device (DEV) Inference
- Recognizes intelligent field devices on PROFIBUS-DP, PROFINET, and PROFIBUS-PA:
  - **Frequency Inverters**: Danfoss VLT / VLT AutomationDrive FC series, Siemens SINAMICS (telegram 352, PZD).
  - **Motor Starters & Protection**: Siemens SIMOCODE pro V / pro S, ET 200SP 3RK1 motor starters.
  - **Process Transmitters**: PROFIBUS-PA field devices (flowmeters, pressure, temperature transmitters via PA couplers).
  - **Power & Energy Management**: Phoenix Contact EEM-MA770 / CAPAROC, QUINT-UPS.

### 🔗 Automated Cross-Reference (CSV) Pairing
- Correlates hardware module addresses with SIMATIC Cross-Reference data.
- Handles bit addresses (`I0.0`, `Q1.2`), word addresses (`IW512`, `QW512`), and overlapping byte/double-word references (`IB`, `ID`).
- Flags multiple assignments, used channels, named spares, and unassigned channels.

### 🔍 Spare Channel Finder (Hledač rezerv)
- One-click discovery of spare capacity filtered by I/O type (DI, DO, AI, AO) across specific RIO stations or the entire plant.
- Physical terminal check tracking (Unchecked, Terminal Free, Terminal Wired) with exportable audit reports.

### 🎨 Modern UI & Bilingual Experience
- **Dark / Light Mode (🌙 / ☀️)**: High-contrast, eye-friendly industrial dark theme with persistent theme preference.
- **Bilingual Support (🌐 EN | CS)**: English default with an instant Czech language toggle.

---

## 📋 How to Export Data from SIMATIC PCS 7 / STEP 7

### 1. Hardware Configuration (`.cfg`)
1. In **SIMATIC Manager**, open your project.
2. Open **HW Config** for the desired station (e.g. S7-400 CPU or PC Station).
3. In the top menu, select **Station** -> **Export...**
4. Choose a file destination (e.g. `Plant_HW.cfg`) and ensure the format is set to readable text/cfg.
5. Repeat for any additional stations or subsystems if desired.

### 2. Cross-Reference Data (`.csv`)
1. In **SIMATIC Manager**, select your S7 Program folder.
2. In the top menu, go to **Options** -> **Reference Data** -> **Display**.
3. Choose the **Address** or **I/O Reference** view.
4. Filter by the required range (inputs and outputs).
5. In the Reference Data window, select **Export...** and save as a semicolon-separated CSV file (e.g. `Plant_XRef.csv`).

---

## 🖥️ How to Use

1. Open **[PCS 7 I/O Analyzer](https://javor55.github.io/PCS7-IO-Analyzer/)** in Google Chrome, Microsoft Edge, or Mozilla Firefox.
2. **Drag & drop** your exported `.cfg` or `.txt` file into the upload zone (or click to browse).
3. *(Optional)* **Drag & drop** the matching `.csv` Cross-Reference file. The analyzer will automatically bind the reference file to the corresponding station.
4. **Navigate the tree**:
   - Inspect station topology, controllers, distributed I/O racks, and individual cards.
   - Click any card to see its full channel map, addresses, engineering symbols, and cross-reference chart locations.
5. **Analyze spares**:
   - Use the top metric tiles or search bar to filter by status (`Reserves`, `Used`, `Check Needed`).
   - Use the **Spares** dialog to generate a consolidated list of free channels for expansion engineering.

---

## 📁 Repository Structure

```text
PCS7-IO-Analyzer/
├── index.html                   # Main web application entry point (modular, GitHub Pages ready)
├── css/
│   └── styles.css               # Design system tokens, responsive layout, Dark & Light themes
├── js/
│   ├── i18n.js                  # Internationalization dictionary (English & Czech)
│   ├── catalog.js               # MLFB catalog definitions, hardware families & normalization
│   ├── parser.js                # Grammar parsers for HW Config (.cfg) and Cross-References (.csv)
│   ├── analyzer.js              # Address binding, reserve detection, stats & self-tests
│   └── app.js                   # Application controller, DOM rendering, tree & event handlers
├── dist/
│   └── PCS7-IO-Analyzer.html    # Standalone 1-file distribution (inlined HTML/CSS/JS for offline use)
├── scripts/
│   ├── bundle.js                # Builder script that packages modular sources into dist/
│   └── test.js                  # Automated test suite (synthetic tests + benchmark checks)
├── package.json                 # Project configuration and npm scripts
└── .gitignore                   # Excludes internal/private project export benchmarks
```

---

## 🛠️ Development & Building

The project is built with vanilla HTML5, CSS3, and JavaScript — **no bundlers, frameworks, or runtime dependencies are required**.

### Running Locally
Simply open `index.html` directly in your browser:
```bash
# Or serve using any static file server:
npx serve .
```

### Running Automated Tests
```bash
npm test
```
The test suite validates:
- Subslot address and symbol propagation for ET 200SP modules.
- Verification of MLFB card recognition across hardware families.
- Cross-Reference pairing accuracy.
- Spare channel classification and self-tests.

### Building the Standalone Offline HTML Bundle
```bash
npm run build
```
Generates `dist/PCS7-IO-Analyzer.html` (approx. 148 KB) containing all HTML, CSS, JavaScript, and catalog data in a single portable file.

---

## 🔒 Privacy & Industrial Cybersecurity

Industrial control systems and DCS configurations contain sensitive asset information (network architecture, tag naming conventions, instrumentation details).

- **Air-Gap Compliance**: This software does not require an internet connection, does not load remote CDN resources (Google Fonts, external JS libraries, analytics), and contains **zero telemetry tracking**.
- **Local Browser Execution**: All file parsing, string parsing, and data linking take place exclusively inside the user's browser memory via the standard JavaScript DOM engine.
- **Data Protection**: No user files are uploaded to GitHub, any third party, or stored in persistent external caches.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
