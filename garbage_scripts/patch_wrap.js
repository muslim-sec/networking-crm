const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldReturn = "      return `<div style=\"display:flex; align-items:center; gap:6px; font-size:11.5px; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis\">${iconHtml}<span style=\"overflow:hidden; text-overflow:ellipsis\">${val}</span></div>`;";

const newReturn = "      return `<div style=\"display:flex; align-items:flex-start; gap:6px; font-size:11.5px; color:var(--text); margin-top:2px; min-width:0;\">` +\n" +
"             `<div style=\"display:flex; align-items:center; height:18px;\">${iconHtml}</div>` +\n" +
"             `<div style=\"display:flex; flex-wrap:wrap; gap:4px; flex:1; min-width:0; line-height:18px; word-break:break-word;\">${val}</div>` +\n" +
"             `</div>`;";

if (html.includes(oldReturn)) {
    html = html.replace(oldReturn, newReturn);
    fs.writeFileSync('index.html', html);
    console.log("Patch applied successfully.");
} else {
    console.log("Could not find the exact return statement to patch.");
}
