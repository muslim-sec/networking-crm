const html = `
<select onchange="
  const val = 'test';
  badge.innerHTML = val + ' <span class=\\'chip-badge-remove\\' onclick=\\'this.parentElement.remove()\\'>✕</span>';
">
`;
console.log(html);
