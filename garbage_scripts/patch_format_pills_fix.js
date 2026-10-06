const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const formatPillsDef = "    const formatPills = (arr) => arr.length ? arr.map(a => `<span class=\"view-pill\">${a}</span>`).join('') : '';\n";

// Remove it from inside openDetailPanel
html = html.replace(formatPillsDef, "");

// Add it to global scope near getArray
html = html.replace("  function getArray(p, field) {", "  function formatPills(arr) {\n    return arr && arr.length ? arr.map(a => `<span class=\"view-pill\">${a}</span>`).join('') : '';\n  }\n\n  function getArray(p, field) {");

fs.writeFileSync('index.html', html);
console.log("Fixed formatPills scope");
