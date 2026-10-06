const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const svgDefs = `
<svg width="0" height="0" style="position:absolute">
  <defs>
    <linearGradient id="liquid-phone" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <linearGradient id="liquid-email" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="liquid-name" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#14b8a6" />
    </linearGradient>
  </defs>
</svg>
`;

if (!html.includes('id="liquid-phone"')) {
  html = html.replace('<body>', '<body>' + svgDefs);
}

const icons = {
  'Phone(s)': '<svg style="width:16px;height:16px;margin-right:4px;vertical-align:text-bottom" fill="url(#liquid-phone)" viewBox="0 0 24 24"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>',
  'Email(s)': '<svg style="width:16px;height:16px;margin-right:4px;vertical-align:text-bottom" fill="url(#liquid-email)" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>'
};

const mapMatch = `      return \`
      <div class="static-row \${isEmpty ? 'static-row-empty' : ''}">
        <div class="static-row-label">\${k}</div>`;
const mapRep = `      let icon = '';
      if (k === 'Phone(s)') icon = '${icons['Phone(s)']}';
      else if (k === 'Email(s)') icon = '${icons['Email(s)']}';
      return \`
      <div class="static-row \${isEmpty ? 'static-row-empty' : ''}">
        <div class="static-row-label" style="display:flex;align-items:center;">\${icon}\${k}</div>`;
html = html.replace(mapMatch, mapRep);

// For Name, it's at dp-name
const nameMatch = `document.getElementById('dp-name').innerHTML = (p['Full Name'] || '—') + (p['Preferred Name'] ? \\\` <span style="color:var(--muted); font-size:14px; font-weight:500;">(\\\${p['Preferred Name']})</span>\\\` : '');`;
const nameIcon = '<svg style="width:20px;height:20px;margin-right:6px;vertical-align:text-bottom" fill="url(#liquid-name)" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"/></svg>';
const nameRep = `document.getElementById('dp-name').innerHTML = '${nameIcon}' + (p['Full Name'] || '—') + (p['Preferred Name'] ? \` <span style="color:var(--muted); font-size:14px; font-weight:500;">(\${p['Preferred Name']})</span>\` : '');`;
html = html.replace(nameMatch, nameRep);

fs.writeFileSync('index.html', html);
console.log('Icons patched');
