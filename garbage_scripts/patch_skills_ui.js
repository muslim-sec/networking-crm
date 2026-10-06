const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCatTitle = `          <div class="skills-cat-title" style="color:\${col}; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span ondblclick="renameCategory('\${encCat}')" title="Double click to rename" style="cursor:text">\${cat}</span>
              <span style="color:var(--muted);font-weight:400;font-size:12px;margin-left:8px;">(\${skList.length})</span>
            </div>
            <div>
              <button onclick="addSkillToCat('\${encCat}')" class="btn-ghost" style="padding:2px 8px;font-size:12px;">+ Add Skill</button>
              <button onclick="deleteCategory('\${encCat}')" class="btn-ghost" style="padding:2px 8px;font-size:12px;color:var(--red);">Delete</button>
            </div>
          </div>`;

const newCatTitle = `          <div class="skills-cat-title" style="color:\${col}; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="cursor:default">\${cat}</span>
              <span style="color:var(--muted);font-weight:400;font-size:12px;">(\${skList.length})</span>
              <button onclick="openCatConfig('\${encCat}')" class="btn-ghost" style="padding:2px; display:flex; align-items:center; color:var(--muted);" title="Configure Category">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </div>
            <div>
              <button onclick="addSkillToCat('\${encCat}')" class="btn-ghost" style="padding:2px 8px;font-size:12px;">+ Add Skill</button>
              <button onclick="deleteCategory('\${encCat}')" class="btn-ghost" style="padding:2px 8px;font-size:12px;color:var(--red);">Delete</button>
            </div>
          </div>`;

const oldSkillPill = `              <div class="skill-pill" draggable="true" 
                   ondragstart="dragStartSkill(event, '\${encS}')"
                   style="border-color:\${col}22;color:\${col}">`;

const newSkillPill = `              <div class="skill-pill" draggable="true" 
                   ondragstart="dragStartSkill(event, '\${encS}')"
                   oncontextmenu="renameSkillPrompt(event, '\${encS}')"
                   title="Right-click to rename"
                   style="border-color:\${col}22;color:\${col}">`;

if (html.includes(oldCatTitle)) {
  html = html.replace(oldCatTitle, newCatTitle);
  if (html.includes(oldSkillPill)) {
    html = html.replace(oldSkillPill, newSkillPill);
    fs.writeFileSync('index.html', html);
    console.log("UI patches applied successfully.");
  } else {
    console.log("Could not find oldSkillPill block.");
  }
} else {
  console.log("Could not find oldCatTitle block.");
}
