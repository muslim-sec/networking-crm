const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const copyMatch = `  function copyField(val) {
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => showToast('Copied!'));
  }`;
const copyRep = `  function copyField(label, val) {
    if (!val) return;
    const cleanLabel = label.replace(/\\(s\\)/g, ''); // strip (s)
    navigator.clipboard.writeText(\`\${cleanLabel}: \${val}\`).then(() => showToast('Copied!'));
  }`;
html = html.replace(copyMatch, copyRep);

const rowMatch = `        <div class="static-row-val">\${displayVal}</div>
        \${!isEmpty ? \`<div class="copy-btn" onclick="copyField('\${copyVal}')" title="Copy \${k}">📋</div>\` : ''}`;
const rowRep = `        <div class="static-row-val">\${displayVal}</div>
        \${!isEmpty ? \`<div class="copy-btn" onclick="copyField('\${k}', '\${copyVal}')" title="Copy \${k}">📋</div>\` : ''}`;
html = html.replace(rowMatch, rowRep);

fs.writeFileSync('index.html', html);
console.log('copyField updated');
