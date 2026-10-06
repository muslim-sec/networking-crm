const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The current code builds bodyHtml from rows, then appends Picture, then Skills.
// I will change it so bodyHtml starts with Picture, then the rows, then Skills.

const oldRowsToHtml = `    let bodyHtml = rows.map(r => {`;
const newRowsToHtml = `    let dpEditAvatarB64 = p.Picture || null;
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

    let bodyHtml = \`
      <div class="static-row">
        <div class="static-row-label">Picture</div>
        <div class="static-row-val" style="display:flex; align-items:center; gap:8px;">
          <label for="dp-avatar-input" class="btn" style="cursor:pointer; padding:4px 8px; font-size:12px;">Upload</label>
          <input type="file" id="dp-avatar-input" accept="image/png, image/jpeg, image/webp" style="display:none" onchange="window._handleDpAvatarUpload(this)">

          <span class="btn-ghost" id="btn-dp-avatar-remove" style="cursor:pointer; font-size:12px; color:var(--red); display:\${dpEditAvatarB64 ? 'inline-block' : 'none'};" onclick="window._handleDpAvatarRemove()">Remove</span>
          <img id="dp-edit-avatar-preview" class="avatar-img" src="\${dpEditAvatarB64 || ''}" style="width:30px; height:30px; border-radius:6px; display:\${dpEditAvatarB64 ? 'block' : 'none'};">
        </div>
      </div>
    \`;

    bodyHtml += rows.map(r => {`;

html = html.replace(oldRowsToHtml, newRowsToHtml);

// Now remove the old Picture html block at the bottom
const oldPictureBlockMatch = `    let dpEditAvatarB64 = p.Picture || null;
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
          <label for="dp-avatar-input" class="btn" style="cursor:pointer; padding:4px 8px; font-size:12px;">Upload</label>
          <input type="file" id="dp-avatar-input" accept="image/png, image/jpeg, image/webp" style="display:none" onchange="window._handleDpAvatarUpload(this)">

          <span class="btn-ghost" id="btn-dp-avatar-remove" style="cursor:pointer; font-size:12px; color:var(--red); display:\${dpEditAvatarB64 ? 'inline-block' : 'none'};" onclick="window._handleDpAvatarRemove()">Remove</span>
          <img id="dp-edit-avatar-preview" class="avatar-img" src="\${dpEditAvatarB64 || ''}" style="width:30px; height:30px; border-radius:6px; display:\${dpEditAvatarB64 ? 'block' : 'none'};">
        </div>
      </div>
    \`;`;

html = html.replace(oldPictureBlockMatch, '');

fs.writeFileSync('index.html', html);
console.log("Moved picture to top");
