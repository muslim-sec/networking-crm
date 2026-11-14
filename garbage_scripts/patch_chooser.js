const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldChooserHTML = `  function buildFieldChooserHTML(panelId) {
    const fields = [
      {k: 'skills', l: 'Skills'}, {k: 'phone', l: 'Phone'}, {k: 'location', l: 'Location'},
      {k: 'email', l: 'Email'}, {k: 'company', l: 'Company'}, {k: 'languages', l: 'Languages'},
      {k: 'telegram', l: 'Telegram'}, {k: 'discord', l: 'Discord'}, {k: 'topics', l: 'Topics'},
      {k: 'projects', l: 'Projects'}, {k: 'cadence', l: 'Cadence'}, {k: 'where_met', l: 'Where Met'}
    ];`;

const newChooserHTML = `  function buildFieldChooserHTML(panelId) {
    const fields = [
      {k: 'skills', l: 'Skills'}, {k: 'phone', l: 'Phone'}, {k: 'location', l: 'Location'},
      {k: 'email', l: 'Email'}, {k: 'company', l: 'Company'}, {k: 'languages', l: 'Languages'},
      {k: 'telegram', l: 'Telegram'}, {k: 'discord', l: 'Discord'}, {k: 'linkedin', l: 'LinkedIn'},
      {k: 'github', l: 'GitHub'}, {k: 'website', l: 'Website'}, {k: 'topics', l: 'Topics'},
      {k: 'projects', l: 'Projects'}, {k: 'experience', l: 'Experience'}, {k: 'status', l: 'Status'},
      {k: 'cadence', l: 'Cadence'}, {k: 'where_met', l: 'Where Met'}
    ];`;

const oldHeading = `<div style="font-size:11px; color:var(--muted); padding:4px; text-transform:uppercase; letter-spacing:0.05em; font-weight:600">Show on cards (pick 2)</div>`;
const newHeading = `<div style="font-size:11px; color:var(--muted); padding:4px; text-transform:uppercase; letter-spacing:0.05em; font-weight:600">Select what you want to show in the preview card</div>`;

if(html.includes(oldChooserHTML)) {
    html = html.replace(oldChooserHTML, newChooserHTML);
    html = html.replace(oldHeading, newHeading); // Will replace the first instance
    html = html.replace(oldHeading, newHeading); // Will replace the second instance if there are two panels
    fs.writeFileSync('index.html', html);
    console.log("Updated field chooser HTML successfully");
} else {
    console.log("Could not find oldChooserHTML");
}
