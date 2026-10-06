const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldFunc = "  function catColor(cat) { return catColors[cat] || '#6d28d9'; }";
const newFunc = `  function catColor(cat) {
    if (db && db.categoryColors && db.categoryColors[cat]) return db.categoryColors[cat];
    return catColors[cat] || '#6d28d9';
  }`;

if(html.includes(oldFunc)) {
  html = html.replace(oldFunc, newFunc);
  fs.writeFileSync('index.html', html);
  console.log("Updated catColor successfully");
} else {
  console.log("catColor not found exactly as expected");
}
