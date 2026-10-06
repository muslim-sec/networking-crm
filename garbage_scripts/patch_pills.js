const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldArrayFormatMatch = `    const formatArray = (arr) => arr.length ? arr.join(', ') : '';
    const formatLines = (arr) => arr.length ? arr.join('<br/>') : '';

    const rows = [
      ['Role / Title', p['Cybersecurity Role'] || p['Current Title']],
      ['Experience', p['Experience Level']],
      ['Company', p['Current Company']],
      ['Status', p['Status']],
      ['Phone(s)', formatLines(getArray(p, 'Phones')) || p['Phone']],
      ['Email(s)', formatLines(getArray(p, 'Emails')) || p['Email']],
      ['Location', p['Location']],
      ['Languages', formatArray(getArray(p, 'Languages'))],
      ['Telegram(s)', formatArray(getArray(p, 'Telegrams')) || p['Telegram']],
      ['Discord(s)', formatArray(getArray(p, 'Discords')) || p['Discord']],
      ['LinkedIn', p['LinkedIn'] ? \`<a href="\${p['LinkedIn']}" target="_blank" style="color:var(--accent);">\${p['LinkedIn']}</a>\` : ''],
      ['GitHub', p['GitHub'] ? \`<a href="\${p['GitHub']}" target="_blank" style="color:var(--accent);">\${p['GitHub']}</a>\` : ''],
      ['Website', p['Website'] ? \`<a href="\${p['Website']}" target="_blank" style="color:var(--accent);">\${p['Website']}</a>\` : ''],
      ['Where Met', p['Where Met']],
      ['Topics', formatArray(getArray(p, 'Topics'))],
      ['Projects', formatArray(getArray(p, 'Projects'))],
      ['Cadence', cadenceText],
      ['Goals', p['Goals']],
      ['Interests', p['Interests']],
      ['Context', p['PersonalContext']],
      ['Notes', p['Note'] || p['Notes']]
    ];`;

const newArrayFormatRep = `    const formatPills = (arr) => arr.length ? arr.map(a => \`<span class="view-pill">\${a}</span>\`).join('') : '';

    const rows = [
      ['Role / Title', p['Cybersecurity Role'] || p['Current Title']],
      ['Experience', p['Experience Level']],
      ['Company', p['Current Company']],
      ['Status', p['Status']],
      ['Phone(s)', formatPills(getArray(p, 'Phones')) || (p['Phone'] ? \`<span class="view-pill">\${p['Phone']}</span>\` : '')],
      ['Email(s)', formatPills(getArray(p, 'Emails')) || (p['Email'] ? \`<span class="view-pill">\${p['Email']}</span>\` : '')],
      ['Location', p['Location']],
      ['Languages', formatPills(getArray(p, 'Languages'))],
      ['Telegram(s)', formatPills(getArray(p, 'Telegrams')) || (p['Telegram'] ? \`<span class="view-pill">\${p['Telegram']}</span>\` : '')],
      ['Discord(s)', formatPills(getArray(p, 'Discords')) || (p['Discord'] ? \`<span class="view-pill">\${p['Discord']}</span>\` : '')],
      ['LinkedIn', p['LinkedIn'] ? \`<a href="\${p['LinkedIn']}" target="_blank" style="color:var(--accent);">\${p['LinkedIn']}</a>\` : ''],
      ['GitHub', p['GitHub'] ? \`<a href="\${p['GitHub']}" target="_blank" style="color:var(--accent);">\${p['GitHub']}</a>\` : ''],
      ['Website', p['Website'] ? \`<a href="\${p['Website']}" target="_blank" style="color:var(--accent);">\${p['Website']}</a>\` : ''],
      ['Where Met', p['Where Met']],
      ['Topics', formatPills(getArray(p, 'Topics'))],
      ['Projects', formatPills(getArray(p, 'Projects'))],
      ['Cadence', cadenceText],
      ['Goals', p['Goals']],
      ['Interests', p['Interests']],
      ['Context', p['PersonalContext']],
      ['Notes', p['Note'] || p['Notes']]
    ];`;

html = html.replace(oldArrayFormatMatch, newArrayFormatRep);
fs.writeFileSync('index.html', html);
console.log('Pills format applied');
