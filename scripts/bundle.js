/**
 * PCS 7 I/O Analyzer - Bundle Script
 * Combines modular HTML, CSS, and JS files into standalone, zero-dependency,
 * single-file offline distributions (dist/PCS7-IO-Analyzer.html and PCS7-IO-Analyzer-v0.12.html).
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const cssContent = fs.readFileSync(path.join(rootDir, 'css', 'styles.css'), 'utf8').trim();
const i18nJs = fs.readFileSync(path.join(rootDir, 'js', 'i18n.js'), 'utf8').trim();
const catalogJs = fs.readFileSync(path.join(rootDir, 'js', 'catalog.js'), 'utf8').trim();
const parserJs = fs.readFileSync(path.join(rootDir, 'js', 'parser.js'), 'utf8').trim();
const analyzerJs = fs.readFileSync(path.join(rootDir, 'js', 'analyzer.js'), 'utf8').trim();
const appJs = fs.readFileSync(path.join(rootDir, 'js', 'app.js'), 'utf8').trim();

let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Replace external CSS link with inlined <style>
indexHtml = indexHtml.replace(
  /<link\s+rel="stylesheet"\s+href="css\/styles\.css">/i,
  `<style>\n${cssContent}\n</style>`
);

// Replace external script tags with inlined <script>
const combinedJs = [i18nJs, catalogJs, parserJs, analyzerJs, appJs].join('\n\n');

indexHtml = indexHtml.replace(
  /<!-- Modular Scripts -->[\s\S]*?<script src="js\/i18n\.js"><\/script>[\s\S]*?<script src="js\/app\.js"><\/script>/i,
  `<script>\n${combinedJs}\n</script>`
);

// Ensure dist directory exists
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const distPath = path.join(distDir, 'PCS7-IO-Analyzer.html');
fs.writeFileSync(distPath, indexHtml, 'utf8');
console.log(`[BUNDLE] Standalone distribution created: ${distPath} (${indexHtml.length} bytes)`);

// Also keep PCS7-IO-Analyzer-v0.12.html, app_v012.js, and styles_v012.css in root in sync
const legacyPath = path.join(rootDir, 'PCS7-IO-Analyzer-v0.12.html');
fs.writeFileSync(legacyPath, indexHtml, 'utf8');

fs.writeFileSync(path.join(rootDir, 'app_v012.js'), combinedJs, 'utf8');
fs.writeFileSync(path.join(rootDir, 'styles_v012.css'), cssContent, 'utf8');

console.log(`[BUNDLE] Synchronized legacy root deliverables: PCS7-IO-Analyzer-v0.12.html, app_v012.js, styles_v012.css`);
