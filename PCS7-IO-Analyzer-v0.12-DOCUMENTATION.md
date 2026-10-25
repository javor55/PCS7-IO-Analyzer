# PCS 7 I/O Analyzer v0.12

**Complete user, technical, maintenance, testing, and agent handover documentation**

- Document version: 1.0
- Application version: 0.12
- Date: 23 October 2026
- Runtime: offline HTML application in Microsoft Edge or Google Chrome
- Main deliverable: `PCS7-IO-Analyzer-v0.12.html`
- Source files: `app_v012.js`, `styles_v012.css`

---

## 1. Purpose and scope

PCS 7 I/O Analyzer is a standalone browser application for analyzing Siemens PCS 7 / STEP 7 hardware configuration exports and program Cross-References. It combines the physical hardware hierarchy with program references and provides a quick overview of I/O capacity, occupancy, reserves, confidence of hardware recognition, physical verification, project reservations, and differences between project versions.

The application is intended for engineering support, brownfield modifications, I/O reserve surveys, preparation of new projects, and review of hardware configuration changes.

The application does **not** replace:

- physical inspection of cabinets, terminals, wiring, or field devices;
- an approved PCS 7 engineering station;
- electrical documentation and loop diagrams;
- functional safety verification;
- review of safety-related, HART, PA, drive, or communication telegram configuration.

A channel shown as free in the software can still have a connected cable. A channel should only be treated as physically available after verification in the cabinet.

## 2. Delivery package

Recommended handover package:

```text
PCS7-IO-Analyzer-v0.12.html
app_v012.js
styles_v012.css
PCS7-IO-Analyzer-v0.12-DOCUMENTATION.md
PCS7-IO-Analyzer-v0.12-DOCUMENTATION.docx
README-PCS7-IO-Analyzer-v0.12.md
```

The HTML file is self-contained and is the normal end-user deliverable. The separate JavaScript and CSS files are supplied for maintenance and agent handover.

## 3. System requirements

- Microsoft Windows, Linux, or macOS with a modern browser.
- Recommended browser: current Microsoft Edge or Google Chrome.
- JavaScript enabled.
- No web server, installation, administrator rights, or internet connection is required.
- Input files remain in browser memory and are not uploaded by the application.

## 4. Supported input files

### 4.1 Hardware configuration export

Expected content resembles a PCS 7 / STEP 7 HW Config text export and includes constructs such as:

```text
STATION ...
CONTROLLER IO SUBSYSTEM ...
IO SUBSYSTEM ...
SLOT ...
MLFB ...
LOCAL_IN_ADDRESSES ...
LOCAL_OUT_ADDRESSES ...
SYMBOL ...
PARAMETER ...
BEGIN
END
```

The extension may be `.cfg` or `.txt`. Recognition is based primarily on content, not only the extension.

### 4.2 Cross-References CSV

Expected semicolon-separated columns include:

```text
Symbol;Address;Data type;R/W;Chart;Chart element;Element comment;Type
```

The parser supports quoted fields and escaped quotation marks. Addresses are normalized to uppercase without spaces.

### 4.3 Saved working project

The application can save and reload a JSON working project containing:

- parsed hardware projects;
- Cross-Reference rows;
- CSV-to-project bindings;
- user-supplied external MLFB catalogue;
- physical states;
- reservations and notes;
- verification timestamps.

### 4.4 External MLFB catalogue

A JSON object keyed by MLFB can extend or override the built-in catalogue.

Example:

```json
{
  "6ES7 321-1BH02-0AA0": {
    "type": "DI",
    "channels": 16,
    "family": "ET 200M",
    "width": "bit",
    "verified": true
  }
}
```

## 5. Quick start

1. Open `PCS7-IO-Analyzer-v0.12.html`.
2. Select **Load files** / **Načíst soubory**.
3. Load one or more hardware exports and the corresponding Cross-References CSV files.
4. Check **Cross-References assignment** in the right panel.
5. Open **Overview** and then **Data check**.
6. Navigate through the hardware tree.
7. Review red `!`, orange `~`, green `✓`, and grey `S` recognition badges.
8. Use filters to display reserves, used channels, unknown channels, or physical states.
9. Save the working project to JSON after adding physical verification or reservations.

## 6. Main interface

### 6.1 Top toolbar

The toolbar contains:

- file loading;
- Overview dashboard;
- Data check;
- global search;
- expand/collapse tree;
- project comparison;
- bulk physical check;
- CSV export;
- report creation;
- catalogue export;
- working project save.

### 6.2 Hardware tree

The left panel presents the hierarchy:

```text
Project
  Station
    Controller / I/O subsystem
      RIO / field device
        Module / slot / subslot
```

Tree branches use connecting lines and small `+` / `−` controls. Leaf modules do not display a redundant expansion marker.

Each applicable node includes:

- hardware recognition badge;
- DI occupied / total;
- DO occupied / total;
- AI occupied / total;
- AO occupied / total;
- optional `P<number>` warning for named channels without a Cross-Reference.

Values on a module apply to that module. Values on an RIO, controller, station, or project are aggregated from all child modules.

### 6.3 Detail panel

The centre panel shows:

- object kind;
- bus;
- device address;
- slot and subslot;
- MLFB;
- family and inferred I/O type;
- hardware recognition summary;
- object confidence and inference basis;
- comments;
- source file and line;
- channel table;
- parser diagnostics and original source block.

### 6.4 Filters and reserve finder

The right panel provides:

- I/O type filter;
- program state filter;
- physical state filter;
- show only RIO structure;
- hide objects without process I/O;
- DI/DO/AI/AO reserve request;
- same-RIO requirement;
- verified-modules-only option;
- completely-free-modules-only option;
- CSV-to-hardware project assignment;
- compatibility and parser summary.

### 6.5 Status bar

The lower status bar displays project count, Cross-Reference file count, process I/O channel count, reserve count, and local-processing status.

## 7. Hardware recognition status

Hardware recognition is separate from program usage and physical status.

### 7.1 Recognition badges

- `✓ Ověřeno / Verified`: process module recognized from the MLFB catalogue.
- `~ Odvozeno / Probable`: type or channel count inferred from symbols, parameters, names, or process image length.
- `! Nerozpoznáno / Unknown`: process data exists but a safe channel model could not be created.
- `S Systémové / System`: system, diagnostic, interface, or non-process object.

A parent node shows the worst state found below it. Priority is:

```text
Unknown > Probable > Verified > System
```

Hovering over a badge shows counts of verified, probable, unknown, and system modules.

### 7.2 Important interpretation

A red `!` on an RIO does not mean every card is wrong. It means at least one descendant process module is unknown. Expand the RIO and identify the card carrying the unknown state.

The purple `P<number>` marker is different. It means named channels exist without a matching Cross-Reference and does not by itself indicate a parser error.

## 8. Program channel states

- `HW reserve`: no Cross-Reference and the channel is blank or marked Reserve / Rezerva.
- `Used`: exactly one matching Cross-Reference.
- `Multiple references`: more than one reference to the same address.
- `Named, unused`: a specific HW symbol exists but no Cross-Reference was found.
- `Unknown`: the channel model is not safe enough to classify as a usable reserve.

A named but unused channel should be reviewed before reuse. It may represent an intentionally prepared signal, obsolete logic, an incomplete export, or a symbol not represented by the loaded Cross-References.

## 9. Physical channel states

Physical state is manually maintained and independent of program state:

- Unchecked;
- Physically free;
- Cable connected;
- Do not use;
- Reserved for project.

A project name, note, and automatic check timestamp can be stored per channel.

Recommended rule for a reusable I/O point:

```text
Program state = HW reserve
AND physical state = Physically free
AND recognition = Verified
```

## 10. Address generation

### 10.1 Digital channels

Digital channels are packed across bytes:

```text
byte = startByte + floor(channel / 8)
bit  = channel mod 8
```

Example for a 16 DI module starting at byte 100:

```text
Channel 0  = I100.0
Channel 7  = I100.7
Channel 8  = I101.0
Channel 15 = I101.7
```

### 10.2 Analog channels

The generic model uses word increments:

```text
AI channel n = IW(startByte + 2*n)
AO channel n = QW(startByte + 2*n)
```

This generic rule must not be assumed correct for every HART, PA, telegram, status-byte, or configurable module. Such modules should be backed by an explicit catalogue entry.

## 11. CSV-to-project assignment

When multiple hardware projects are loaded, every Cross-Reference CSV is assigned to one specific hardware project.

Automatic assignment:

1. build the set of process I/O addresses for each hardware project;
2. count address matches for each CSV;
3. bind the CSV to the project with the largest non-zero match count.

The user can manually change the assignment. This prevents an address such as `I100.0` in one AS from incorrectly marking `I100.0` in another AS as used.

## 12. Searching and filtering

Global search includes:

- object name;
- MLFB and family;
- hardware comments;
- I/O address;
- HW symbol and comment;
- Cross-Reference symbol, chart, and element;
- physical state;
- reservation name and user note.

When a search term is entered, the tree expands to expose matching paths.

Filters are evaluated recursively, so a parent is retained when any descendant matches.

## 13. Selecting and editing channels

Every channel row has a checkbox. For the selected module or RIO, quick actions are available:

- All;
- HW reserves;
- Physically free;
- Invert;
- Clear.

A floating selection bar shows the selected count and DI/DO/AI/AO breakdown. **Edit selected** applies physical state, project reservation, note, and timestamp to all selected channels.

The stable selection key is constructed from project, station, controller, RIO, slot, subslot, and address.

## 14. Reserve finder

The reserve finder accepts desired numbers of DI, DO, AI, and AO.

Optional constraints:

- all channels on one RIO;
- verified modules only;
- completely free modules only.

Candidate selection:

1. start from channels classified as HW reserve;
2. reject physical states Cable connected, Do not use, and Reserved for project;
3. prefer Physically free over Unchecked;
4. group candidates by module;
5. prefer groups with more physically free channels and greater capacity;
6. select the requested count while minimizing card fragmentation where possible.

The result is an engineering recommendation, not an automatic approval for wiring.

## 15. Project comparison

The last two loaded hardware projects can be compared by normalized I/O address.

Compared fields include:

- hardware path;
- module;
- slot;
- MLFB;
- type;
- program status;
- HW symbol and comment;
- physical state;
- reservation;
- note.

Changes are classified as Added, Removed, or Changed and can be exported to CSV or printed to PDF through the browser print dialog.

For projects with identical address ranges in different AS systems, compare the systems separately.

## 16. Exports and reports

### 16.1 Main CSV export

Columns:

```text
Project
Device
Slot
Subslot
MLFB
Type
Address
Status
Confidence
HW Symbol
Reference Symbol
Chart
Element
Physical status
Reservation
Note
Checked at
```

### 16.2 Catalogue export

Exports all MLFB items found in loaded projects. Unknown items are marked as inferred and should be reviewed before setting `verified: true`.

### 16.3 Text report

Creates a text summary for the currently selected project, RIO, or module, including totals, used channels, reserves, physical states, project reservations, and the physical-verification disclaimer.

### 16.4 Working project JSON

Use this as the normal continuation format when manual verification data has been entered.

## 17. Dashboard and diagnostics

### 17.1 Dashboard

Shows:

- process channel total;
- HW reserve count;
- used count;
- channels requiring review;
- verified / probable / unknown module totals;
- unknown MLFB count;
- contextual address conflicts;
- parser warnings;
- unassigned CSV files.

### 17.2 Data check

Built-in checks include:

- unique internal object IDs;
- valid process address format;
- MLFB presence on process modules;
- digital bit range 0–7;
- CSV binding completeness;
- hardware recognition summary;
- unknown channel model count;
- address conflicts inside RIO context.

### 17.3 Parser diagnostics

The diagnostics view lists:

- unknown MLFB values;
- Cross-References without matching physical HW addresses;
- contextual duplicate physical addresses;
- parser warnings with source file and line;
- original source block for a selected object.

## 18. Internal architecture

The application is intentionally dependency-free:

```text
HTML shell
  + embedded CSS
  + embedded vanilla JavaScript
  + browser File API
  + TextDecoder
  + Blob download
```

No frameworks, database, server, API, cookies, or browser storage are required.

### 18.1 Processing flow

```text
Input files
  -> content-based type detection
  -> encoding decode
  -> HW or CSV parser
  -> normalized project tree
  -> MLFB catalogue inference
  -> process/system classification
  -> generated channel addresses
  -> CSV-project binding
  -> address linking
  -> channel status calculation
  -> tree/detail/dashboard rendering
  -> export or working-project save
```

### 18.2 Primary state object

The in-memory state stores:

```text
projects
refs
selected tree node
search query
I/O and status filters
physical-state filter
parser warnings
Cross-Reference bindings
external catalogue
collapsed tree nodes
selected channel keys
```

### 18.3 Main data model

A hardware node contains, among other fields:

```text
id
kind
name
file and source lines
children
comments
symbols
input and output address declarations
parameters
MLFB
slot and subslot
bus and device address
I/O type
processData flag
channel count
confidence and inference basis
channels
warnings
raw source block
```

A generated channel contains:

```text
index
address
HW symbol
HW comment
Cross-References
program status
recognition confidence
physical state
reservation
note
checked timestamp
```

## 19. Important implementation functions

### Parsing and normalization

- `decode`: UTF-8, Windows-1250, ISO-8859-2 fallback decoding.
- `detect`: content-based file type detection.
- `parseHw`: hierarchy parser for hardware export.
- `parseCsv`: semicolon CSV parser.
- `header`: extracts object name, slot, subslot, address, bus, and MLFB candidates.
- `infer`: resolves known MLFB or infers an I/O model.
- `enrich`: applies process classification and creates channels.
- `address`: generates DI/DO/AI/AO addresses.

### Linking and status

- `autoBindRefs`: proposes CSV-to-project assignment.
- `relink`: links references and recalculates channel program states.
- `isReserve`: applies reserve classification.
- `contextFor` and `scopedKey`: provide project/RIO-aware identity.
- `addressConflicts`: detects duplicate addresses inside context.

### Presentation

- `renderTree`, `renderDetail`, `renderSummary`, `dashboard`.
- `ioBreakdown`: aggregates DI/DO/AI/AO totals and occupancy.
- `recognitionSummary`, `recognitionState`, `recognitionBadge`.
- `visible`: recursive filter evaluation.

### Engineering workflows

- `findReserves`, `selectCandidate`, `physicalRank`.
- `compareProjects`, `projectSnapshot`, `showDiff`.
- `toggleChannel`, `selectScope`, `editSelected`.
- `exportCsv`, `exportCatalog`, `createReport`.

## 20. Built-in MLFB catalogue

At version 0.12 the embedded catalogue is intentionally small and includes selected ET 200SP and ET 200M examples. Unknown MLFB entries are handled conservatively.

Catalogue maintenance rules:

1. normalize MLFB exactly as it appears after removal of a `V_...:` prefix;
2. verify type, channel count, process image width, and family from authoritative engineering information;
3. do not mark an item verified solely because an inferred result looks plausible;
4. use an external catalogue during review;
5. merge an approved entry into the embedded catalogue only after regression testing.

## 21. Known limitations

- Generic analog word mapping is not sufficient for every complex module.
- HART, PA, safety, drive, SIMOCODE, telegram, and configurable modules may require explicit catalogue models.
- System/process separation uses conservative heuristics and may need project-specific refinement.
- Project comparison primarily uses normalized I/O addresses.
- Browser `prompt()` dialogs are still used for some manual editing.
- The application does not inspect physical wiring.
- Browser memory limits apply to very large exports.
- The user interface is currently Czech-first, while this complete technical document is written in English for easier agent handover.

## 22. Test baseline

Known regression reference from the supplied Lisovna project:

```text
Module: RM7P3-A1.6
MLFB: 6ES7 131-6FD00-0BB1
Type: DI
Recognition: verified
Channels:
  I1336.0
  I1336.1
  I1336.2
  I1336.3
```

The parent RIO `N21-RM7P3` produced the following recognition summary during version 0.12 verification:

```text
verified: 12
probable: 0
unknown: 1
system: 4
process modules total: 13
```

The RIO must therefore display the worst state, `Unknown`, until the one unknown descendant module is reviewed.

## 23. Manual acceptance test

1. Open the HTML file offline.
2. Load a known CFG and matching CSV.
3. Confirm correct CSV assignment.
4. Run Data check.
5. Search for `I1336.2`.
6. Confirm the path expands to `RM7P3-A1.6`.
7. Confirm four DI channels and addresses `I1336.0–I1336.3`.
8. Confirm the module shows `✓ Ověřeno`.
9. Confirm the parent RIO reports the worst descendant recognition state.
10. Confirm DI/DO/AI/AO occupied/total values aggregate correctly.
11. Select several channel checkboxes and apply a physical state.
12. Save the working JSON, reload it, and verify notes and reservations remain.
13. Export CSV and inspect all expected columns.
14. Load two project versions and run comparison.
15. Test the reserve finder with verified-only enabled.

## 24. Regression checklist for an agent

After any parser, catalogue, or status change:

- run JavaScript syntax check;
- test all supplied hardware exports;
- verify known module/channel baselines;
- verify 16-channel digital byte rollover;
- verify analog word increments;
- verify an unknown MLFB remains non-verified;
- verify parent recognition uses the worst child state;
- verify a CSV is linked only to its assigned project;
- verify repeated addresses in two different projects do not conflict;
- verify saved JSON round-trip;
- verify selection keys survive navigation;
- verify no horizontal overflow in the tree;
- verify the self-test screen;
- verify main CSV export.

## 25. Recommended next development steps

1. Replace browser prompts with an accessible modal editor.
2. Add an in-application unknown-MLFB editor.
3. Add explicit per-module addressing profiles for complex devices.
4. Add transfer of physical verification between old and new project versions using RIO/slot/channel matching.
5. Add selection-based formal PDF/DOCX reports.
6. Move parsing to a Web Worker for very large projects.
7. Add automated browser tests and fixture files.
8. Add an optional English/Czech language switch.
9. Package as an internal web application or portable Windows application if centrally managed distribution is required.

Email generation is intentionally excluded from the roadmap.

## 26. Agent handover instructions

Use the following as the initial task statement for another software agent:

```text
You are maintaining PCS 7 I/O Analyzer v0.12, a standalone dependency-free offline HTML application.

Primary files:
- PCS7-IO-Analyzer-v0.12.html: end-user self-contained application
- app_v012.js: readable JavaScript source
- styles_v012.css: readable CSS source
- PCS7-IO-Analyzer-v0.12-DOCUMENTATION.md: source-of-truth documentation

Non-negotiable behavior:
1. Keep all file processing local in the browser.
2. Keep the standalone HTML deliverable functional without a server or internet.
3. Do not classify probable or unknown modules as safely verified reserves.
4. Keep hardware recognition, program usage, and physical state as separate concepts.
5. Scope Cross-References and address conflicts by project and RIO context.
6. Preserve correct digital byte rollover and analog word addressing.
7. Preserve saved-project compatibility or provide a migration path.
8. Do not add email generation.

Before changing code:
- read the complete documentation;
- inspect app_v012.js and styles_v012.css;
- identify affected parser, state, rendering, and export paths;
- create a new version instead of overwriting v0.12.

After changing code:
- run node --check on the JavaScript and extracted inline script;
- test the known RM7P3-A1.6 baseline;
- run all available export fixtures;
- verify tree layout, recognition badges, channel selection, CSV assignment, and JSON round-trip;
- update the version number, README, complete documentation, and ZIP package.
```

## 27. Version history

- v0.2: initial robust CFG/CSV parser, diagnostics, CSV export.
- v0.3: reserve finder, compatibility check, contextual diagnostics, catalogue export.
- v0.4: physical states, reservations, notes, text report.
- v0.5: project comparison and bulk physical check.
- v0.6: correct digital byte rollover, process/system separation, CSV-project assignment, external catalogue import.
- v0.7: dashboard, redesigned interface, built-in data checks.
- v0.8: connected tree lines and persistent expand/collapse state.
- v0.9: DI/DO/AI/AO occupied/total summaries in the tree.
- v0.10: tree overflow and duplicate leaf-marker cleanup.
- v0.11: channel checkboxes, bulk selected-channel editing, physical filter, improved reserve candidate ranking.
- v0.12: separate hardware-recognition badges and parent recognition aggregation.

## 28. Safety and engineering disclaimer

Outputs are decision-support information generated from exported configuration and Cross-Reference files. Before modifying a live system, verify the result against the approved PCS 7 project, cabinet documentation, terminal plan, field wiring, process interlocks, safety requirements, and site management-of-change procedure.
