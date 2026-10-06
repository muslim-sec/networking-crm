const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`
  <div class="dp-edit-tags" data-key="Languages">
    <span class="chip-badge">Arabic 🇸🇦 <span class="chip-badge-remove">✕</span></span>
  </div>
`);
const el = dom.window.document.querySelector('.dp-edit-tags');
const badges = Array.from(el.querySelectorAll('.chip-badge')).map(b => b.childNodes[0].textContent.trim());
console.log(badges);
