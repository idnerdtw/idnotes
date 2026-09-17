(() => {
  'use strict';
  const notes = window.IDNOTES || [];
  const list = document.getElementById('list');
  const q = document.getElementById('q');
  const suggest = document.getElementById('suggest');
  const status = document.getElementById('result-status');
  const filters = [...document.querySelectorAll('[data-type]')];
  const labels = {'reading-note': 'Reading Notes 讀書筆記', 'journal-club': 'Journal Club 期刊選讀'};
  const requested = new URLSearchParams(location.search).get('type');
  let type = Object.hasOwn(labels, requested) ? requested : 'all';
  let active = -1;
  let suggestions = [];
  const norm = value => String(value || '').normalize('NFKC').toLowerCase();
  function hits() {
    const words = norm(q.value).trim().split(/\s+/).filter(Boolean);
    return notes.filter(note => (type === 'all' || note.type === type) && words.every(word =>
      norm([note.title, note.takeaway, ...(note.keywords || [])].join(' ')).includes(word)));
  }
  function element(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }
  function close() {
    suggest.hidden = true;
    suggest.replaceChildren();
    suggestions = [];
    active = -1;
    q.setAttribute('aria-expanded', 'false');
    q.removeAttribute('aria-activedescendant');
  }
  function render(showSuggestions = false) {
    const results = hits();
    list.replaceChildren();
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.type === type)));
    status.textContent = `${results.length} 篇`;
    for (const note of results) {
      const card = element('article', 'card');
      const heading = element('h2');
      const link = element('a', '', note.title);
      link.href = note.url;
      heading.append(link);
      card.append(element('span', 'badge', labels[note.type]), heading,
        element('p', 'date', `更新日期：${note.updated}（Asia/Taipei）`), element('p', '', note.takeaway));
      list.append(card);
    }
    if (!results.length) {
      const empty = element('div', 'empty-state');
      const pending = type === 'journal-club' && !notes.some(note => note.type === type);
      empty.append(element('h2', '', pending ? 'Journal Club 內容待補' : '沒有符合的內容'),
        element('p', '', pending ? '期刊選讀將陸續加入。' : '請更換關鍵字或內容類型。'));
      list.append(empty);
    }
    close();
    if (!showSuggestions || !q.value.trim() || !results.length) return;
    suggestions = results.slice(0, 8);
    suggestions.forEach((note, i) => {
      const option = element('div');
      option.id = `suggest-${i}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.append(element('span', 'title', note.title), element('span', 'hint', labels[note.type]));
      option.addEventListener('mousedown', e => e.preventDefault());
      option.addEventListener('click', () => location.assign(note.url));
      suggest.append(option);
    });
    suggest.hidden = false;
    q.setAttribute('aria-expanded', 'true');
  }
  q.addEventListener('input', () => render(true));
  q.addEventListener('focus', () => render(true));
  q.addEventListener('blur', close);
  q.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && suggest.hidden) render(true);
    if (suggest.hidden || !suggestions.length) return;
    if (e.key === 'Enter' && active >= 0) {
      e.preventDefault(); location.assign(suggestions[active].url); return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    active = active < 0 ? (e.key === 'ArrowDown' ? 0 : suggestions.length - 1)
      : (active + (e.key === 'ArrowDown' ? 1 : -1) + suggestions.length) % suggestions.length;
    [...suggest.children].forEach((option, i) => option.setAttribute('aria-selected', String(i === active)));
    const selected = suggest.children[active];
    q.setAttribute('aria-activedescendant', selected.id);
    selected.scrollIntoView({block: 'nearest'});
  });
  filters.forEach(button => button.addEventListener('click', () => {
    type = button.dataset.type;
    render();
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) close(); });
  render();
})();
