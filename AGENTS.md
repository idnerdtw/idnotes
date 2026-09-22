# Multi-agent maintenance

1. Start from current `main`; one task per branch and pull request. Do not push or force-push `main`. Merge only when the owner authorizes it.
2. Check open PRs before editing shared files (`index.html`, `notes.json`, `search.js`, `assets/site.css`); describe overlaps in the PR. Never overwrite another agent's changes.
3. One article per HTML file. Use `notes/` for Reading Notes and `journal-club/` for Journal Club; preserve existing URLs and article content unless asked to revise it.
4. `notes.json` is the only editable search index. Set `type` to `reading-note` or `journal-club`; add only published content, not placeholders.
5. Edit root source files; `docs/` and `notes-data.js` are generated. Run `python3 scripts/sync-site.py`, then `python3 scripts/sync-site.py --check`; commit generated changes together.
6. Keep the shared teal/green/blue palette in `assets/site.css`. Check search, keyboard navigation, links and narrow screens after UI edits.
7. Never commit patient identifiers, private case files, secrets, or copyrighted papers/figures without redistribution permission. Link to original publications.
8. Before merge, check latest `main`, reconcile shared-file changes and rerun checks. State changes and validation in the PR; do not treat a clean merge as proof the combined index is correct.
9. Follow README.md's metadata and navigation contract. Each article needs 3–5 canonical `tags` for visible topics; retain `keywords` for aliases, drugs, authors and study names. Reuse existing topic spellings and keep medical synonyms out of separate visible tags. Do not change an article's `updated` date for navigation-only metadata edits.
10. Preserve combined text/type/single-topic filtering, removable visible conditions, latest-updated ordering, 20-result loading, and the collapsible tag section (16 tags before expansion). Counts mean matching article counts, not clinical importance; never publish synthetic test articles.
11. After navigation changes, run `node scripts/test-navigation.cjs` with Playwright/Chromium installed, in addition to sync checks. Cover root/docs and file://, search aliases, tag intersections, clear/reset, keyboard links, narrow screens, and larger synthetic indexes. Keep article content/URLs unchanged unless the task explicitly requires it.
