const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const saveMatch = `    // Collect inputs
    document.querySelectorAll('#dp-body .dp-edit-input, #dp-body .dp-edit-textarea, #dp-body .dp-edit-select').forEach(el => {
      const k = el.dataset.key;
      const v = el.value.trim();
      
      // Multi-value handling
      if (['Phones','Emails','Languages','Telegrams','Discords','Topics','Projects'].includes(k)) {
        p[k] = v ? v.split(',').map(x=>x.trim()).filter(Boolean) : [];
      } else {
        p[k] = v;
      }
    });`;

const saveRep = `    // Collect standard inputs
    document.querySelectorAll('#dp-body .dp-edit-input, #dp-body .dp-edit-textarea, #dp-body .dp-edit-select').forEach(el => {
      const k = el.dataset.key;
      const v = el.value.trim();
      p[k] = v;
    });

    // Collect tags inputs
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

html = html.replace(saveMatch, saveRep);
fs.writeFileSync('index.html', html);
console.log("saveDetailEdits patched");
