const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add currentAvatarB64 variable and file input listeners
const initAvatarJS = `
  let currentAvatarB64 = null;
  document.getElementById('f-avatar-input').addEventListener('change', async (e) => {
    if(!e.target.files.length) return;
    try {
      currentAvatarB64 = await processImageUpload(e.target.files[0]);
      const preview = document.getElementById('f-avatar-preview');
      preview.src = currentAvatarB64;
      preview.style.display = 'block';
      document.getElementById('btn-modal-avatar-remove').style.display = 'inline-block';
    } catch(err) {
      console.log(err);
    }
  });
  document.getElementById('btn-modal-avatar-remove').addEventListener('click', () => {
    currentAvatarB64 = null;
    document.getElementById('f-avatar-preview').style.display = 'none';
    document.getElementById('btn-modal-avatar-remove').style.display = 'none';
    document.getElementById('f-avatar-input').value = '';
  });
`;

html = html.replace("document.getElementById('btn-add').addEventListener('click', openModal);", "document.getElementById('btn-add').addEventListener('click', openModal);\n" + initAvatarJS);

// 2. Clear currentAvatarB64 in openModal / closeModal
const openModalMatch = `  function openModal() {`;
const openModalRep = `  function openModal() {
    currentAvatarB64 = null;
    document.getElementById('f-avatar-preview').style.display = 'none';
    document.getElementById('btn-modal-avatar-remove').style.display = 'none';
    document.getElementById('f-avatar-input').value = '';`;
html = html.replace(openModalMatch, openModalRep);

// 3. Save contact includes Picture
const saveContactMatch = `    const newP = {
      'Person ID': 'P' + Date.now(),
      'Full Name': name,`;
const saveContactRep = `    const newP = {
      'Person ID': 'P' + Date.now(),
      'Full Name': name,
      'Picture': currentAvatarB64 || undefined,`;
html = html.replace(saveContactMatch, saveContactRep);

// 4. renderDetailEdit
const renderDetailEditMatch = `    const rows = [
      {k: 'Role / Title', key: 'Cybersecurity Role', val: p['Cybersecurity Role'] || p['Current Title'] || '', type: 'input'},`;
const renderDetailEditRep = `    const rows = [
      {k: 'Role / Title', key: 'Cybersecurity Role', val: p['Cybersecurity Role'] || p['Current Title'] || '', type: 'input'},`;

// We need to inject an upload button in renderDetailEdit. Wait, renderDetailEdit generates rows. We can add a custom row.
const bodyHtmlMatch = `    bodyHtml += \`
      <div class="static-row" style="flex-direction:column; align-items:stretch;">
        <div class="static-row-label" style="width:100%; margin-bottom:8px;">Skills</div>`;
const bodyHtmlRep = `
    let dpEditAvatarB64 = p.Picture || null;
    window._tempDpAvatar = dpEditAvatarB64;
    window._handleDpAvatarUpload = async function(el) {
      if(!el.files.length) return;
      try {
        window._tempDpAvatar = await processImageUpload(el.files[0]);
        document.getElementById('dp-edit-avatar-preview').src = window._tempDpAvatar;
        document.getElementById('dp-edit-avatar-preview').style.display = 'block';
        document.getElementById('btn-dp-avatar-remove').style.display = 'inline-block';
      } catch(err) { console.log(err); }
    };
    window._handleDpAvatarRemove = function() {
      window._tempDpAvatar = null;
      document.getElementById('dp-edit-avatar-preview').style.display = 'none';
      document.getElementById('btn-dp-avatar-remove').style.display = 'none';
    };

    bodyHtml += \`
      <div class="static-row">
        <div class="static-row-label">Picture</div>
        <div class="static-row-val" style="display:flex; align-items:center; gap:8px;">
          <label class="btn" style="cursor:pointer; padding:4px 8px; font-size:12px;">
            Upload
            <input type="file" accept="image/png, image/jpeg, image/webp" style="display:none" onchange="window._handleDpAvatarUpload(this)">
          </label>
          <span class="btn-ghost" id="btn-dp-avatar-remove" style="cursor:pointer; font-size:12px; color:var(--red); display:\${dpEditAvatarB64 ? 'inline-block' : 'none'};" onclick="window._handleDpAvatarRemove()">Remove</span>
          <img id="dp-edit-avatar-preview" class="avatar-img" src="\${dpEditAvatarB64 || ''}" style="width:30px; height:30px; border-radius:6px; display:\${dpEditAvatarB64 ? 'block' : 'none'};">
        </div>
      </div>
    \`;

` + bodyHtmlMatch;
html = html.replace(bodyHtmlMatch, bodyHtmlRep);

// Update saveDetailEdits to save Picture
const saveDetailEditsMatch = `    // Special fields
    p['Specialization'] = Array.from(document.querySelectorAll('#dp-body .edit-skill-cb:checked')).map(cb => cb.value).join(', ');`;
const saveDetailEditsRep = `    // Special fields
    p['Specialization'] = Array.from(document.querySelectorAll('#dp-body .edit-skill-cb:checked')).map(cb => cb.value).join(', ');
    if (window._tempDpAvatar !== undefined) {
      if (window._tempDpAvatar === null) delete p.Picture;
      else p.Picture = window._tempDpAvatar;
    }`;
html = html.replace(saveDetailEditsMatch, saveDetailEditsRep);

// Update renderPersonCard to use p.Picture
const renderPersonCardMatch = `          <div class="person-avatar">\${initials}</div>`;
const renderPersonCardRep = `          <div class="person-avatar">\${p.Picture ? \`<img src="\${p.Picture}" class="avatar-img">\` : initials}</div>`;
html = html.replace(renderPersonCardMatch, renderPersonCardRep);

// Update openDetailPanel to use p.Picture
const openDetailPanelMatch = `    const initials = (p['Full Name'] || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    document.getElementById('dp-avatar').textContent = initials;`;
const openDetailPanelRep = `    const initials = (p['Full Name'] || '?').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    if (p.Picture) {
      document.getElementById('dp-avatar').innerHTML = \`<img src="\${p.Picture}" class="avatar-img">\`;
    } else {
      document.getElementById('dp-avatar').textContent = initials;
    }`;
html = html.replace(openDetailPanelMatch, openDetailPanelRep);

fs.writeFileSync('index.html', html);
console.log('Avatar JS patched.');
