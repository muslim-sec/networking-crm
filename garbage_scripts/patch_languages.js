const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const langMatch = `{k: 'Languages', key: 'Languages', val: getArray(p, 'Languages'), type: 'tags'},`;
const langRep = `{k: 'Languages', key: 'Languages', val: getArray(p, 'Languages'), type: 'tags-select', opts: ['Arabic 🇸🇦', 'English 🇬🇧', 'French 🇫🇷']},`;

html = html.replace(langMatch, langRep);

const tagsMatch = `      } else if (r.type === 'tags') {
        const chipsHtml = r.val.map(v => \`<span class="chip-badge">\${v} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span></span>\`).join('');
        inputHtml = \`
          <div class="chip-container dp-edit-tags" data-key="\${r.key}" onclick="this.querySelector('input').focus()">
            \${chipsHtml}
            <input type="text" class="chip-input" placeholder="Type and press Enter...">
          </div>
        \`;
      }`;

const tagsRep = `      } else if (r.type === 'tags') {
        const chipsHtml = r.val.map(v => \`<span class="chip-badge">\${v} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span></span>\`).join('');
        inputHtml = \`
          <div class="chip-container dp-edit-tags" data-key="\${r.key}" onclick="this.querySelector('input') && this.querySelector('input').focus()">
            \${chipsHtml}
            <input type="text" class="chip-input" placeholder="Type and press Enter...">
          </div>
        \`;
      } else if (r.type === 'tags-select') {
        const chipsHtml = r.val.map(v => \`<span class="chip-badge">\${v} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span></span>\`).join('');
        const selectOpts = r.opts.map(o => \`<option value="\${o}">\${o}</option>\`).join('');
        inputHtml = \`
          <div class="chip-container dp-edit-tags" data-key="\${r.key}">
            \${chipsHtml}
            <select class="chip-select" style="border:none; outline:none; background:transparent; font-size:13px; color:var(--fg); padding:2px; flex:1;" onchange="
              if (this.value) {
                const badge = document.createElement('span');
                badge.className = 'chip-badge';
                badge.innerHTML = this.value + ' <span class=\\'chip-badge-remove\\' onclick=\\'this.parentElement.remove()\\'>✕</span>';
                this.parentElement.insertBefore(badge, this);
                this.value = '';
              }
            ">
              <option value="" disabled selected>Add Language...</option>
              \${selectOpts}
            </select>
          </div>
        \`;
      }`;

html = html.replace(tagsMatch, tagsRep);
fs.writeFileSync('index.html', html);
console.log('Languages dropdown patched');
