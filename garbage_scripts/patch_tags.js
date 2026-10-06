const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Change type to 'tags' for array fields
const oldRowsMatch = `    const formatArray = (arr) => arr.length ? arr.join(', ') : '';
    
    const rows = [
      {k: 'Full Name', key: 'Full Name', val: p['Full Name'] || '', type: 'input'},
      {k: 'AKA', key: 'Preferred Name', val: p['Preferred Name'] || '', type: 'input'},
      {k: 'Role / Title', key: 'Cybersecurity Role', val: p['Cybersecurity Role'] || p['Current Title'] || '', type: 'input'},
      {k: 'Experience', key: 'Experience Level', val: p['Experience Level'] || '', type: 'select', opts: ['Junior','Mid','Senior','Lead','Expert']},
      {k: 'Company', key: 'Current Company', val: p['Current Company'] || '', type: 'input'},
      {k: 'Status', key: 'Status', val: p['Status'] || '', type: 'select', opts: ['Active','Passive','Lost Touch','VIP']},
      {k: 'Phone(s)', key: 'Phones', val: formatArray(getArray(p, 'Phones')) || p['Phone'] || '', type: 'input'},
      {k: 'Email(s)', key: 'Emails', val: formatArray(getArray(p, 'Emails')) || p['Email'] || '', type: 'input'},
      {k: 'Location', key: 'Location', val: p['Location'] || '', type: 'input'},
      {k: 'Languages', key: 'Languages', val: formatArray(getArray(p, 'Languages')), type: 'input'},
      {k: 'Telegram(s)', key: 'Telegrams', val: formatArray(getArray(p, 'Telegrams')) || p['Telegram'] || '', type: 'input'},
      {k: 'Discord(s)', key: 'Discords', val: formatArray(getArray(p, 'Discords')) || p['Discord'] || '', type: 'input'},
      {k: 'LinkedIn', key: 'LinkedIn', val: p['LinkedIn'] || '', type: 'input'},
      {k: 'GitHub', key: 'GitHub', val: p['GitHub'] || '', type: 'input'},
      {k: 'Website', key: 'Website', val: p['Website'] || '', type: 'input'},
      {k: 'Where Met', key: 'Where Met', val: p['Where Met'] || '', type: 'input'},
      {k: 'Topics', key: 'Topics', val: formatArray(getArray(p, 'Topics')), type: 'input'},
      {k: 'Projects', key: 'Projects', val: formatArray(getArray(p, 'Projects')), type: 'input'},`;

const getArrOrString = `(getArray(p, key).length ? getArray(p, key) : (p[fallback] ? [p[fallback]] : []))`;

const newRowsRep = `    const getArrOrLegacy = (key, legacyKey) => getArray(p, key).length ? getArray(p, key) : (p[legacyKey] ? [p[legacyKey]] : []);
    
    const rows = [
      {k: 'Full Name', key: 'Full Name', val: p['Full Name'] || '', type: 'input'},
      {k: 'AKA', key: 'Preferred Name', val: p['Preferred Name'] || '', type: 'input'},
      {k: 'Role / Title', key: 'Cybersecurity Role', val: p['Cybersecurity Role'] || p['Current Title'] || '', type: 'input'},
      {k: 'Experience', key: 'Experience Level', val: p['Experience Level'] || '', type: 'select', opts: ['Junior','Mid','Senior','Lead','Expert']},
      {k: 'Company', key: 'Current Company', val: p['Current Company'] || '', type: 'input'},
      {k: 'Status', key: 'Status', val: p['Status'] || '', type: 'select', opts: ['Active','Passive','Lost Touch','VIP']},
      {k: 'Phone(s)', key: 'Phones', val: getArrOrLegacy('Phones', 'Phone'), type: 'tags'},
      {k: 'Email(s)', key: 'Emails', val: getArrOrLegacy('Emails', 'Email'), type: 'tags'},
      {k: 'Location', key: 'Location', val: p['Location'] || '', type: 'input'},
      {k: 'Languages', key: 'Languages', val: getArray(p, 'Languages'), type: 'tags'},
      {k: 'Telegram(s)', key: 'Telegrams', val: getArrOrLegacy('Telegrams', 'Telegram'), type: 'tags'},
      {k: 'Discord(s)', key: 'Discords', val: getArrOrLegacy('Discords', 'Discord'), type: 'tags'},
      {k: 'LinkedIn', key: 'LinkedIn', val: p['LinkedIn'] || '', type: 'input'},
      {k: 'GitHub', key: 'GitHub', val: p['GitHub'] || '', type: 'input'},
      {k: 'Website', key: 'Website', val: p['Website'] || '', type: 'input'},
      {k: 'Where Met', key: 'Where Met', val: p['Where Met'] || '', type: 'input'},
      {k: 'Topics', key: 'Topics', val: getArray(p, 'Topics'), type: 'tags'},
      {k: 'Projects', key: 'Projects', val: getArray(p, 'Projects'), type: 'tags'},`;

html = html.replace(oldRowsMatch, newRowsRep);

// 2. Render inputHtml for 'tags'
const oldMapMatch = `    bodyHtml += rows.map(r => {
      let inputHtml = '';
      const safeVal = r.val.replace(/"/g, '&quot;');
      if (r.type === 'input') {
        inputHtml = \`<input type="text" class="dp-edit-input" data-key="\${r.key}" value="\${safeVal}">\`;
      } else if (r.type === 'textarea') {
        inputHtml = \`<textarea class="dp-edit-textarea" data-key="\${r.key}">\${safeVal}</textarea>\`;
      } else if (r.type === 'select') {
        const opts = r.opts.map(o => \`<option value="\${o}" \${r.val===o?'selected':''}>\${o==='0'?'None':o}</option>\`).join('');
        inputHtml = \`<select class="dp-edit-select" data-key="\${r.key}"><option value=""></option>\${opts}</select>\`;
      }`;

const newMapRep = `    bodyHtml += rows.map(r => {
      let inputHtml = '';
      if (r.type === 'input') {
        const safeVal = r.val.replace(/"/g, '&quot;');
        inputHtml = \`<input type="text" class="dp-edit-input" data-key="\${r.key}" value="\${safeVal}">\`;
      } else if (r.type === 'textarea') {
        const safeVal = r.val.replace(/"/g, '&quot;');
        inputHtml = \`<textarea class="dp-edit-textarea" data-key="\${r.key}">\${safeVal}</textarea>\`;
      } else if (r.type === 'select') {
        const opts = r.opts.map(o => \`<option value="\${o}" \${r.val===o?'selected':''}>\${o==='0'?'None':o}</option>\`).join('');
        inputHtml = \`<select class="dp-edit-select" data-key="\${r.key}"><option value=""></option>\${opts}</select>\`;
      } else if (r.type === 'tags') {
        const chipsHtml = r.val.map(v => \`<span class="chip-badge">\${v} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span></span>\`).join('');
        inputHtml = \`
          <div class="chip-container dp-edit-tags" data-key="\${r.key}" onclick="this.querySelector('input').focus()">
            \${chipsHtml}
            <input type="text" class="chip-input" placeholder="Type and press Enter...">
          </div>
        \`;
      }`;

html = html.replace(oldMapMatch, newMapRep);

// 3. Global delegate for tag inputs
const initTagJS = `
  // Delegate chip input keydown
  document.addEventListener('keydown', e => {
    if (e.target.classList.contains('chip-input')) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = e.target.value.trim();
        if (val) {
          const badge = document.createElement('span');
          badge.className = 'chip-badge';
          badge.innerHTML = \`\${val} <span class="chip-badge-remove" onclick="this.parentElement.remove()">✕</span>\`;
          e.target.parentElement.insertBefore(badge, e.target);
          e.target.value = '';
        }
      } else if (e.key === 'Backspace' && e.target.value === '') {
        const prev = e.target.previousElementSibling;
        if (prev && prev.classList.contains('chip-badge')) {
          prev.remove();
        }
      }
    }
  });
`;
html = html.replace("const dbStr = localStorage.getItem('crmDB');", initTagJS + "\n  const dbStr = localStorage.getItem('crmDB');");

// 4. Update saveDetailEdits to read tags
const oldSaveMatch = `    document.querySelectorAll('#dp-body .dp-edit-input, #dp-body .dp-edit-textarea, #dp-body .dp-edit-select').forEach(el => {
      const k = el.dataset.key;
      const v = el.value.trim();
      if (v) p[k] = v;
      else delete p[k];
    });`;

const newSaveRep = `    document.querySelectorAll('#dp-body .dp-edit-input, #dp-body .dp-edit-textarea, #dp-body .dp-edit-select').forEach(el => {
      const k = el.dataset.key;
      const v = el.value.trim();
      if (v) p[k] = v;
      else delete p[k];
    });
    document.querySelectorAll('#dp-body .dp-edit-tags').forEach(el => {
      const k = el.dataset.key;
      const badges = Array.from(el.querySelectorAll('.chip-badge')).map(b => b.childNodes[0].textContent.trim());
      if (badges.length) {
        if (k === 'Phones' || k === 'Emails' || k === 'Telegrams' || k === 'Discords') {
          delete p[k.slice(0, -1)]; // delete singular legacy key
        }
        p[k] = badges;
      } else {
        delete p[k];
        if (k === 'Phones' || k === 'Emails' || k === 'Telegrams' || k === 'Discords') {
          delete p[k.slice(0, -1)]; // delete singular legacy key
        }
      }
    });`;

html = html.replace(oldSaveMatch, newSaveRep);

fs.writeFileSync('index.html', html);
console.log('Tags format applied');
