const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldSelectHTML = `            <select class="chip-select" style="border:none; outline:none; background:transparent; font-size:13px; color:var(--fg); padding:2px; flex:1;" onchange="
              if (this.value) {
                const val = this.value.trim();
                const existing = Array.from(this.parentElement.querySelectorAll('.chip-badge')).map(b => b.childNodes[0].textContent.trim());
                if (!existing.includes(val)) {
                  const badge = document.createElement('span');
                  badge.className = 'chip-badge';
                  badge.innerHTML = val + ' <span class=\\'chip-badge-remove\\' onclick=\\'this.parentElement.remove()\\'>✕</span>';
                  this.parentElement.insertBefore(badge, this);
                }
                this.value = '';
              }
            ">`;

const newSelectHTML = `            <select class="chip-select" style="border:none; outline:none; background:transparent; font-size:13px; color:var(--fg); padding:2px; flex:1;" onchange="window._addSelectChip(this)">`;

html = html.replace(oldSelectHTML, newSelectHTML);

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

html = html.replace("const dbStr = localStorage.getItem('crmDB');", globalFunc + "\n  const dbStr = localStorage.getItem('crmDB');");

fs.writeFileSync('index.html', html);
console.log("Global handler added");
