const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update renderDetailEdit rows
const rowsMatch = `    const rows = [
      {k: 'Role / Title', key: 'Cybersecurity Role', val: p['Cybersecurity Role'] || p['Current Title'] || '', type: 'input'},`;
const rowsRep = `    const rows = [
      {k: 'Full Name', key: 'Full Name', val: p['Full Name'] || '', type: 'input'},
      {k: 'AKA', key: 'Preferred Name', val: p['Preferred Name'] || '', type: 'input'},
      {k: 'Role / Title', key: 'Cybersecurity Role', val: p['Cybersecurity Role'] || p['Current Title'] || '', type: 'input'},`;
html = html.replace(rowsMatch, rowsRep);

// 2. Fix the file input label click issue in renderDetailEdit
const avatarHtmlMatch = `        <div class="static-row-val" style="display:flex; align-items:center; gap:8px;">
          <label class="btn" style="cursor:pointer; padding:4px 8px; font-size:12px;">
            Upload
            <input type="file" accept="image/png, image/jpeg, image/webp" style="display:none" onchange="window._handleDpAvatarUpload(this)">
          </label>`;
const avatarHtmlRep = `        <div class="static-row-val" style="display:flex; align-items:center; gap:8px;">
          <label for="dp-avatar-input" class="btn" style="cursor:pointer; padding:4px 8px; font-size:12px;">Upload</label>
          <input type="file" id="dp-avatar-input" accept="image/png, image/jpeg, image/webp" style="display:none" onchange="window._handleDpAvatarUpload(this)">
`;
html = html.replace(avatarHtmlMatch, avatarHtmlRep);

// 3. Display AKA in person card
const personNameMatch = `<div class="person-name">\${p['Full Name'] || '—'}</div>`;
const personNameRep = `<div class="person-name">\${p['Full Name'] || '—'}\${p['Preferred Name'] ? \` <span style="color:var(--muted); font-size:12px;">(\${p['Preferred Name']})</span>\` : ''}</div>`;
html = html.replace(personNameMatch, personNameRep);

// 4. Display AKA in Detail panel
const dpNameMatch = `document.getElementById('dp-name').textContent = p['Full Name'] || '—';`;
const dpNameRep = `document.getElementById('dp-name').innerHTML = (p['Full Name'] || '—') + (p['Preferred Name'] ? \` <span style="color:var(--muted); font-size:14px; font-weight:500;">(\${p['Preferred Name']})</span>\` : '');`;
html = html.replace(dpNameMatch, dpNameRep);

fs.writeFileSync('index.html', html);
console.log('Patch complete');
