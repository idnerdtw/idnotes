const NOTES = [{"id": "lung-tx-influenza-a", "title": "肺移植 A 型流感治療", "updated": "2026-09-17", "takeaway": "可靠 PO/NG 以腎調 oseltamivir 為首選；抗生素依肺炎／重症／共感染個別化。", "keywords": ["肺移植", "流感", "influenza", "oseltamivir", "peramivir", "baloxavir", "zanamivir", "抗生素", "transplant", "LTx", "TAMIFLU", "AST", "CDC", "IDSA"], "url": "notes/lung-tx-influenza-a.html"}];
const listEl = document.getElementById('list');
const qEl = document.getElementById('q');
const sugEl = document.getElementById('suggest');
let active = -1;

function norm(s) {
  return (s || '').toLowerCase().normalize('NFKC');
}

function matches(note, q) {
  if (!q) return true;
  const hay = norm([note.title, note.takeaway, ...(note.keywords||[])].join(' '));
  return q.split(/\s+/).filter(Boolean).every(t => hay.includes(norm(t)));
}

function renderList(q) {
  listEl.innerHTML = '';
  const hits = NOTES.filter(n => matches(n, q));
  if (!hits.length) {
    listEl.innerHTML = '<p style="color:#64748b">沒有符合的筆記。</p>';
    return;
  }
  for (const n of hits) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h2><a href="${n.url}">${n.title}</a></h2>
      <p class="meta">更新日期：${n.updated}（Asia/Taipei）</p>
      <p style="margin:0;color:#475569;font-size:0.95rem">${n.takeaway}</p>`;
    listEl.appendChild(div);
  }
}

function renderSuggest(q) {
  sugEl.innerHTML = '';
  active = -1;
  if (!q) {
    sugEl.style.display = 'none';
    qEl.setAttribute('aria-expanded', 'false');
    return;
  }
  const hits = NOTES.filter(n => matches(n, q)).slice(0, 8);
  if (!hits.length) {
    sugEl.style.display = 'none';
    qEl.setAttribute('aria-expanded', 'false');
    return;
  }
  hits.forEach((n, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role', 'option');
    btn.setAttribute('aria-selected', 'false');
    btn.innerHTML = `<span class="title">${n.title}</span><span class="hint">${n.takeaway}</span>`;
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      location.href = n.url;
    });
    sugEl.appendChild(btn);
  });
  sugEl.style.display = 'block';
  qEl.setAttribute('aria-expanded', 'true');
}

qEl.addEventListener('input', () => {
  const q = qEl.value.trim();
  renderList(q);
  renderSuggest(q);
});

qEl.addEventListener('keydown', (e) => {
  const opts = [...sugEl.querySelectorAll('button')];
  if (!opts.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    active = (active + 1) % opts.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    active = (active - 1 + opts.length) % opts.length;
  } else if (e.key === 'Enter' && active >= 0) {
    e.preventDefault();
    opts[active].dispatchEvent(new Event('mousedown'));
    return;
  } else if (e.key === 'Escape') {
    sugEl.style.display = 'none';
    qEl.setAttribute('aria-expanded', 'false');
    return;
  } else {
    return;
  }
  opts.forEach((b, i) => b.setAttribute('aria-selected', i === active ? 'true' : 'false'));
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrap')) {
    sugEl.style.display = 'none';
    qEl.setAttribute('aria-expanded', 'false');
  }
});

renderList('');
