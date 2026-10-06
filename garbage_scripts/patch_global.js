const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const anchor = `  function showToast(msg) {`;
const globalFunc = `
  window._addSelectChip = function(sel) {
    if (sel.value) {
      const val = sel.value.trim();
      const existing = Array.from(sel.parentElement.querySelectorAll('.chip-badge')).map(b => b.childNodes[0].textContent.trim());
      if (!existing.includes(val)) {
        const badge = document.createElement('span');
        badge.className = 'chip-badge';
        badge.innerHTML = val + ' <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span>';
        sel.parentElement.insertBefore(badge, sel);
      }
      sel.value = '';
    }
  };

`;

html = html.replace(anchor, globalFunc + anchor);
fs.writeFileSync('index.html', html);
console.log("Global function injected correctly");
