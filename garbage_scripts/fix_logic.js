const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

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
    if(typeof currentView !== 'undefined') {
      if(currentView === 'dashboard') renderDashboard();
      if(currentView === 'people') renderPeople();
    }
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
    if(typeof currentView !== 'undefined') {
      if(currentView === 'dashboard') renderDashboard();
      if(currentView === 'people') renderPeople();
    }
    showToast('Skill renamed');
  }
`;

// remove any old stray logic if we mistakenly injected somewhere else
if (html.includes("function openCatConfig(cat)")) {
  console.log("Already injected? Exiting.");
  process.exit(0);
}

// Just replace the LAST </script> with the logic + </script>
const scriptEndPos = html.lastIndexOf('</script>');
html = html.substring(0, scriptEndPos) + jsLogic + "\n</script>" + html.substring(scriptEndPos + 9);

fs.writeFileSync('index.html', html);
console.log("Fixed missing JS functions.");
