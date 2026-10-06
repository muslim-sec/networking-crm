const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// For tags-select
const selectMatch = `if (this.value) {
                const badge = document.createElement('span');
                badge.className = 'chip-badge';
                badge.innerHTML = this.value + ' <span class=\\'chip-badge-remove\\' onclick=\\'this.parentElement.remove()\\'>✕</span>';
                this.parentElement.insertBefore(badge, this);
                this.value = '';
              }`;
const selectRep = `if (this.value) {
                const val = this.value.trim();
                const existing = Array.from(this.parentElement.querySelectorAll('.chip-badge')).map(b => b.childNodes[0].textContent.trim());
                if (!existing.includes(val)) {
                  const badge = document.createElement('span');
                  badge.className = 'chip-badge';
                  badge.innerHTML = val + ' <span class=\\'chip-badge-remove\\' onclick=\\'this.parentElement.remove()\\'>✕</span>';
                  this.parentElement.insertBefore(badge, this);
                }
                this.value = '';
              }`;
html = html.replace(selectMatch, selectRep);

// For text input tags (keydown event)
const keydownMatch = `        const val = e.target.value.trim();
        if (val) {
          const badge = document.createElement('span');
          badge.className = 'chip-badge';
          badge.innerHTML = \\\`\\\${val} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span>\\\`;
          e.target.parentElement.insertBefore(badge, e.target);
          e.target.value = '';
        }`;
const keydownRep = `        const val = e.target.value.trim();
        if (val) {
          const existing = Array.from(e.target.parentElement.querySelectorAll('.chip-badge')).map(b => b.childNodes[0].textContent.trim());
          if (!existing.includes(val)) {
            const badge = document.createElement('span');
            badge.className = 'chip-badge';
            badge.innerHTML = \\\`\\\${val} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span>\\\`;
            e.target.parentElement.insertBefore(badge, e.target);
          }
          e.target.value = '';
        }`;
html = html.replace(keydownMatch, keydownRep);

fs.writeFileSync('index.html', html);
console.log("duplicates prevented");
