const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cssMatch = `    .dp-edit-textarea { resize: vertical; min-height: 50px; }`;
const cssRep = `    .dp-edit-textarea { resize: vertical; min-height: 50px; }
    
    /* ─── CHIPS & PILLS ─── */
    .view-pill {
      display: inline-block; padding: 4px 10px; background: rgba(109,40,217,0.1); 
      color: var(--accent); border-radius: 14px; font-size: 12px; font-weight: 600; margin: 2px;
    }
    .chip-container {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 6px;
      border: 1px solid var(--border2); border-radius: 6px; background: rgba(0,0,0,0.1);
      min-height: 38px; align-items: center;
    }
    .chip-container:focus-within { border-color: var(--accent); background: rgba(0,0,0,0.2); }
    .chip-badge {
      display: flex; align-items: center; gap: 4px; padding: 4px 8px;
      background: var(--accent); color: #fff; border-radius: 12px; font-size: 12px; font-weight: 500;
    }
    .chip-badge-remove { cursor: pointer; font-weight: bold; opacity: 0.7; }
    .chip-badge-remove:hover { opacity: 1; }
    .chip-input {
      flex: 1; min-width: 60px; border: none; background: transparent; outline: none;
      color: var(--text); font-size: 14px;
    }`;

html = html.replace(cssMatch, cssRep);
fs.writeFileSync('index.html', html);
console.log('CSS updated');
