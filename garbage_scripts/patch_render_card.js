const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldRenderMeta = `      let val = '';
      let label = '';
      if (k === 'phone') { val = getArray(p, 'Phones')[0] || p['Phone']; label = 'Phone'; }
      else if (k === 'location') { val = p['Location']; label = 'Loc'; }
      else if (k === 'email') { val = getArray(p, 'Emails')[0] || p['Email']; label = 'Email'; }
      else if (k === 'company') { val = p['Current Company']; label = 'Org'; }
      else if (k === 'languages') { val = getArray(p, 'Languages').join(', '); label = 'Lang'; }
      else if (k === 'telegram') { val = getArray(p, 'Telegrams')[0] || p['Telegram']; label = 'TG'; }
      else if (k === 'discord') { val = getArray(p, 'Discords')[0] || p['Discord']; label = 'Discord'; }
      else if (k === 'topics') { val = getArray(p, 'Topics').join(', '); label = 'Topics'; }
      else if (k === 'projects') { val = getArray(p, 'Projects').join(', '); label = 'Projects'; }
      else if (k === 'cadence') {
        const d = nextContactDate(p);
        val = d ? d.toLocaleDateString() : '';
        label = 'Next';
      }
      else if (k === 'where_met') { val = p['Where Met']; label = 'Met'; }
      
      if (!val) return '';
      return \`<div style="display:flex; gap:6px; font-size:11.5px; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis"><span style="color:var(--muted); min-width:35px">\${label}:</span> <span style="overflow:hidden; text-overflow:ellipsis">\${val}</span></div>\`;`;

const newRenderMeta = `      let val = '';
      let mapKey = '';
      if (k === 'phone') { val = formatPills(getArray(p, 'Phones')) || p['Phone']; mapKey = 'Phone(s)'; }
      else if (k === 'location') { val = p['Location']; mapKey = 'Location'; }
      else if (k === 'email') { val = formatPills(getArray(p, 'Emails')) || p['Email']; mapKey = 'Email(s)'; }
      else if (k === 'company') { val = p['Current Company']; mapKey = 'Company'; }
      else if (k === 'languages') { val = formatPills(getArray(p, 'Languages')); mapKey = 'Languages'; }
      else if (k === 'telegram') { val = formatPills(getArray(p, 'Telegrams')) || p['Telegram']; mapKey = 'Telegram(s)'; }
      else if (k === 'discord') { val = formatPills(getArray(p, 'Discords')) || p['Discord']; mapKey = 'Discord(s)'; }
      else if (k === 'topics') { val = formatPills(getArray(p, 'Topics')); mapKey = 'Topics'; }
      else if (k === 'projects') { val = formatPills(getArray(p, 'Projects')); mapKey = 'Projects'; }
      else if (k === 'cadence') {
        const d = nextContactDate(p);
        val = d ? d.toLocaleDateString() : '';
        mapKey = 'Cadence';
      }
      else if (k === 'where_met') { val = p['Where Met']; mapKey = 'Where Met'; }
      
      if (!val) return '';

      let iconHtml = '';
      if (iconSvgMap[mapKey]) {
        const d = iconSvgMap[mapKey];
        const isSolid = (mapKey === 'LinkedIn' || mapKey === 'GitHub');
        iconHtml = \`<svg width="14" height="14" viewBox="0 0 24 24" \${isSolid ? 'fill="url(#'+d.g+')"' : 'fill="none" stroke="url(#'+d.g+')" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'} style="min-width:14px; margin-right:4px;">
          <path d="\${d.d}" />
        </svg>\`;
      }

      return \`<div style="display:flex; align-items:center; gap:6px; font-size:11.5px; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis">\${iconHtml}<span style="overflow:hidden; text-overflow:ellipsis">\${val}</span></div>\`;`;

html = html.replace(oldRenderMeta, newRenderMeta);
fs.writeFileSync('index.html', html);
console.log("Updated renderPersonCard");
