const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalHtml = `
  <div id="modal-cat-config" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; justify-content:center; align-items:center;">
    <div style="background:var(--card); border:1px solid var(--border); border-radius:12px; padding:20px; width:300px; box-shadow:0 10px 30px rgba(0,0,0,0.3);">
      <h3 style="margin:0 0 16px 0; color:var(--text); font-size:16px;">Configure Category</h3>
      <input type="hidden" id="cat-config-old-name" />
      <div style="margin-bottom:12px;">
        <label style="display:block; margin-bottom:6px; font-size:12px; color:var(--muted);">Category Name</label>
        <input type="text" id="cat-config-name" class="form-input" style="width:100%;" />
      </div>
      <div style="margin-bottom:20px;">
        <label style="display:block; margin-bottom:6px; font-size:12px; color:var(--muted);">Category Color</label>
        <input type="color" id="cat-config-color" style="width:100%; height:40px; cursor:pointer; border:1px solid var(--border); border-radius:6px; background:var(--bg);" />
      </div>
      <div style="display:flex; justify-content:flex-end; gap:8px;">
        <button onclick="closeCatConfig()" class="btn-ghost">Cancel</button>
        <button onclick="saveCatConfig()" class="btn-primary">Save</button>
      </div>
    </div>
  </div>
`;

// Insert the modal before the closing </body> tag
html = html.replace('</body>', modalHtml + '\n</body>');

const jsLogic = `
  function openCatConfig(cat) {
    document.getElementById('cat-config-old-name').value = cat;
    document.getElementById('cat-config-name').value = cat;
    document.getElementById('cat-config-color').value = catColor(cat);
    const m = document.getElementById('modal-cat-config');
    m.style.display = 'flex';
  }
  function closeCatConfig() {
    document.getElementById('modal-cat-config').style.display = 'none';
  }
  async function saveCatConfig() {
    const oldCat = document.getElementById('cat-config-old-name').value;
    const newCat = document.getElementById('cat-config-name').value.trim();
    const newCol = document.getElementById('cat-config-color').value;
    
    if (!newCat) {
      showToast('Name cannot be empty');
      return;
    }

    if (!db.categoryColors) db.categoryColors = {};
    
    // If name changed
    if (newCat !== oldCat) {
      db.skills.forEach(s => {
        if (s.Category === oldCat) s.Category = newCat;
      });
      // Delete old color mapping
      delete db.categoryColors[oldCat];
    }
    
    db.categoryColors[newCat] = newCol;
    
    await saveFile();
    renderSkills();
    if(currentView === 'dashboard') renderDashboard();
    if(currentView === 'people') renderPeople();
    closeCatConfig();
    showToast('Category updated');
  }

  async function renameSkillPrompt(e, oldName) {
    e.preventDefault();
    const newName = prompt(\`Rename skill '\${oldName}' to:\`, oldName);
    if (!newName || newName.trim() === "" || newName === oldName) return;
    
    const cleanNew = newName.trim();
    
    // 1. Update db.skills
    const sk = db.skills.find(x => x['Skill / Specialization'] === oldName);
    if (sk) sk['Skill / Specialization'] = cleanNew;
    
    // 2. Update db.people's Specialization (which drives personSkills)
    db.people.forEach(p => {
      let raw = p['Specialization'] || p['Current Title'] || '';
      if (raw) {
        let arr = raw.split(/[,;\\/]/).map(s => s.trim()).filter(Boolean);
        let changed = false;
        arr = arr.map(s => {
          if (s === oldName) { changed = true; return cleanNew; }
          return s;
        });
        if (changed) {
          p['Specialization'] = arr.join(', ');
        }
      }
    });

    await saveFile();
    renderSkills();
    if(currentView === 'dashboard') renderDashboard();
    if(currentView === 'people') renderPeople();
    showToast('Skill renamed');
  }
`;

// Insert the JS logic before the final </body> tag (or after other functions)
const targetLoc = "  // ─── INIT ───────────────────────────────────────────────────────";
html = html.replace(targetLoc, jsLogic + "\n" + targetLoc);

fs.writeFileSync('index.html', html);
console.log("Injected modal and logic successfully");
