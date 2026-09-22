(() => {
  'use strict';
  const notes = [...(window.IDNOTES || [])].sort((a, b) =>
    b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, 'zh-Hant'));
  const list = document.getElementById('list');
  const q = document.getElementById('q');
  const suggest = document.getElementById('suggest');
  const status = document.getElementById('result-status');
  const filters = [...document.querySelectorAll('[data-type]')];
  const cloud = document.getElementById('tag-cloud');
  const activeTag = document.getElementById('active-tag');
  const moreTags = document.getElementById('more-tags');
  const clearFilters = document.getElementById('clear-filters');
  const loadMore = document.getElementById('load-more');
  const pageSize = 20;
  const tagLimit = 16;
  let visibleCount = pageSize;
  let selectedTag = '';
  let expandedTags = false;
  const labels = {'reading-note': 'Reading Notes 讀書筆記', 'journal-club': 'Journal Club 期刊選讀'};
  const requested = new URLSearchParams(location.search).get('type');
  let type = Object.hasOwn(labels, requested) ? requested : 'all';
  let active = -1;
  let suggestions = [];
  const norm = value => String(value || '').normalize('NFKC').toLowerCase();
  function hits(ignoreTag = false) {
    const words = norm(q.value).trim().split(/\s+/).filter(Boolean);
    return notes.filter(note => (type === 'all' || note.type === type) &&
      (ignoreTag || !selectedTag || (note.tags || []).includes(selectedTag)) && words.every(word =>
      norm([note.title, note.takeaway, ...(note.tags || []), ...(note.keywords || [])].join(' ')).includes(word)));
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
  function selectTag(tag) {
    selectedTag = selectedTag === tag ? '' : tag;
    visibleCount = pageSize;
    render();
    // The clicked button is rebuilt; move focus to its replacement.
    const target = [...cloud.querySelectorAll('button')].find(button => button.dataset.tag === tag);
    (target?.getClientRects().length ? target : q).focus();
  }
  function renderTags() {
    const counts = new Map();
    hits(true).forEach(note => new Set(note.tags || []).forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1)));
    if (selectedTag && !counts.has(selectedTag)) counts.set(selectedTag, 0);
    const tags = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-Hant'));
    cloud.replaceChildren();
    tags.forEach(([tag, count], i) => {
      const button = element('button', 'tag', `${tag} (${count})`);
      button.type = 'button';
      button.dataset.tag = tag;
      button.setAttribute('aria-pressed', String(tag === selectedTag));
      button.hidden = !expandedTags && i >= tagLimit && tag !== selectedTag;
      button.addEventListener('click', () => selectTag(tag));
      cloud.append(button);
    });
    if (!tags.length) cloud.append(element('p', 'hint', '沒有符合的主題標籤'));
    moreTags.hidden = tags.length <= tagLimit;
    moreTags.textContent = expandedTags ? '收合標籤' : `顯示全部標籤 (${tags.length})`;
    moreTags.setAttribute('aria-expanded', String(expandedTags));
    activeTag.replaceChildren();
    if (selectedTag) {
      const remove = element('button', 'tag selected-tag', `主題：${selectedTag} ×`);
      remove.type = 'button';
      remove.setAttribute('aria-label', `移除主題篩選：${selectedTag}`);
      remove.addEventListener('click', () => selectTag(selectedTag));
      activeTag.append(remove);
    }
    clearFilters.hidden = !selectedTag && !q.value && type === 'all';
  }
  function render(showSuggestions = false) {
    const results = hits();
    list.replaceChildren();
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.type === type)));
    renderTags();
    status.textContent = results.length > visibleCount
      ? `${results.length} 篇，顯示前 ${visibleCount} 篇 · 最新更新在前`
      : `${results.length} 篇 · 最新更新在前`;
    loadMore.hidden = results.length <= visibleCount;
    for (const note of results.slice(0, visibleCount)) {
      const card = element('article', 'card');
      const heading = element('h2');
      const link = element('a', '', note.title);
      link.href = note.url;
      heading.append(link);
      card.append(element('span', 'badge', labels[note.type]), heading,
        element('p', 'date', `更新日期：${note.updated}（Asia/Taipei）`), element('p', '', note.takeaway));
      const tags = element('div', 'tag-list card-tags');
      (note.tags || []).forEach(tag => {
        const button = element('button', 'tag', tag);
        button.type = 'button';
        button.setAttribute('aria-pressed', String(tag === selectedTag));
        button.addEventListener('click', () => selectTag(tag));
        tags.append(button);
      });
      card.append(tags);
      list.append(card);
    }
    if (!results.length) {
      const empty = element('div', 'empty-state');
      const pending = type === 'journal-club' && !notes.some(note => note.type === type);
      empty.append(element('h2', '', pending ? 'Journal Club 內容待補' : '沒有符合的內容'),
        element('p', '', pending ? '期刊選讀將陸續加入。' : '請更換關鍵字、主題或內容類型，也可清除所有條件。'));
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
  q.addEventListener('input', () => { visibleCount = pageSize; render(true); });
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
    visibleCount = pageSize;
    render();
  }));
  moreTags.addEventListener('click', () => {
    expandedTags = !expandedTags;
    renderTags();
  });
  clearFilters.addEventListener('click', () => {
    q.value = '';
    type = 'all';
    selectedTag = '';
    visibleCount = pageSize;
    render();
    q.focus();
  });
  loadMore.addEventListener('click', () => {
    const previousCount = visibleCount;
    visibleCount += pageSize;
    render();
    list.children[previousCount]?.querySelector('h2 a')?.focus();
  });
  document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) close(); });
  render();
})();
