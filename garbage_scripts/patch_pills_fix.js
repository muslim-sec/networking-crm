const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We will dynamically replace the rows array inside openDetailPanel
const startMarker = "const formatArray = (arr) => arr.length ? arr.join(', ') : '';";
const rowsStart = html.indexOf(startMarker);
if (rowsStart === -1) {
    console.error("Could not find start marker");
    process.exit(1);
}

const formatPillsDef = `const formatPills = (arr) => arr.length ? arr.map(a => \`<span class="view-pill">\${a}</span>\`).join('') : '';`;

html = html.replace("const formatArray = (arr) => arr.length ? arr.join(', ') : '';", formatPillsDef + "\n    const formatArray = (arr) => arr.length ? arr.join(', ') : '';");

// Now replace specific fields in the rows array
html = html.replace(/\[\'Phone\(s\)\',.*/, "['Phone(s)', formatPills(getArray(p, 'Phones')) || (p['Phone'] ? `<span class=\"view-pill\">${p['Phone']}</span>` : '')],");
html = html.replace(/\[\'Email\(s\)\',.*/, "['Email(s)', formatPills(getArray(p, 'Emails')) || (p['Email'] ? `<span class=\"view-pill\">${p['Email']}</span>` : '')],");
html = html.replace(/\[\'Languages\',.*/, "['Languages', formatPills(getArray(p, 'Languages'))],");
html = html.replace(/\[\'Telegram\(s\)\',.*/, "['Telegram(s)', formatPills(getArray(p, 'Telegrams')) || (p['Telegram'] ? `<span class=\"view-pill\">${p['Telegram']}</span>` : '')],");
html = html.replace(/\[\'Discord\(s\)\',.*/, "['Discord(s)', formatPills(getArray(p, 'Discords')) || (p['Discord'] ? `<span class=\"view-pill\">${p['Discord']}</span>` : '')],");
html = html.replace(/\[\'Topics\',.*/, "['Topics', formatPills(getArray(p, 'Topics'))],");
html = html.replace(/\[\'Projects\',.*/, "['Projects', formatPills(getArray(p, 'Projects'))],");

fs.writeFileSync('index.html', html);
console.log("Fixed view pills");
