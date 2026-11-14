const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldRenderIf = `      if (k === 'phone') { val = formatPills(getArray(p, 'Phones')) || p['Phone']; mapKey = 'Phone(s)'; }
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
      else if (k === 'where_met') { val = p['Where Met']; mapKey = 'Where Met'; }`;

const newRenderIf = `      if (k === 'phone') { val = formatPills(getArray(p, 'Phones')) || p['Phone']; mapKey = 'Phone(s)'; }
      else if (k === 'location') { val = p['Location']; mapKey = 'Location'; }
      else if (k === 'email') { val = formatPills(getArray(p, 'Emails')) || p['Email']; mapKey = 'Email(s)'; }
      else if (k === 'company') { val = p['Current Company']; mapKey = 'Company'; }
      else if (k === 'languages') { val = formatPills(getArray(p, 'Languages')); mapKey = 'Languages'; }
      else if (k === 'telegram') { val = formatPills(getArray(p, 'Telegrams')) || p['Telegram']; mapKey = 'Telegram(s)'; }
      else if (k === 'discord') { val = formatPills(getArray(p, 'Discords')) || p['Discord']; mapKey = 'Discord(s)'; }
      else if (k === 'linkedin') { val = p['LinkedIn']; mapKey = 'LinkedIn'; }
      else if (k === 'github') { val = p['GitHub']; mapKey = 'GitHub'; }
      else if (k === 'website') { val = p['Website']; mapKey = 'Website'; }
      else if (k === 'topics') { val = formatPills(getArray(p, 'Topics')); mapKey = 'Topics'; }
      else if (k === 'projects') { val = formatPills(getArray(p, 'Projects')); mapKey = 'Projects'; }
      else if (k === 'experience') { val = p['Experience Level']; mapKey = 'Experience'; }
      else if (k === 'status') { val = p['Status']; mapKey = 'Status'; }
      else if (k === 'cadence') {
        const d = nextContactDate(p);
        val = d ? d.toLocaleDateString() : '';
        mapKey = 'Cadence';
      }
      else if (k === 'where_met') { val = p['Where Met']; mapKey = 'Where Met'; }`;

if(html.includes(oldRenderIf)) {
    html = html.replace(oldRenderIf, newRenderIf);
    fs.writeFileSync('index.html', html);
    console.log("Updated renderPersonCard successfully");
} else {
    console.log("Could not find oldRenderIf");
}
