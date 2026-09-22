#!/usr/bin/env python3
"""Generate search data and sync root pages to docs/; --check never writes."""
import argparse
import json
import unicodedata
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
notes = json.loads((ROOT / 'notes.json').read_text(encoding='utf-8'))
ids = set()
tag_names = {}
for note in notes:
    for key in ('id', 'type', 'title', 'updated', 'takeaway', 'keywords', 'tags', 'url'):
        if key not in note:
            raise SystemExit(f'Missing {key}: {note}')
    if note['id'] in ids:
        raise SystemExit(f'Duplicate id: {note["id"]}')
    ids.add(note['id'])
    if note['type'] not in ('reading-note', 'journal-club'):
        raise SystemExit(f'Unknown type: {note["type"]}')
    try:
        if date.fromisoformat(note['updated']).isoformat() != note['updated']:
            raise ValueError()
    except (ValueError, TypeError):
        raise SystemExit(f'Invalid updated date (use YYYY-MM-DD): {note["id"]}')
    for field in ('keywords', 'tags'):
        values = note[field]
        if not isinstance(values, list) or any(not isinstance(v, str) or not v.strip() or v != v.strip() for v in values):
            raise SystemExit(f'{field} must be an array of nonempty, trimmed strings: {note["id"]}')
    if not 3 <= len(note['tags']) <= 5:
        raise SystemExit(f'Use 3–5 topic tags: {note["id"]}')
    seen_tags = set()
    for tag in note['tags']:
        normalized = unicodedata.normalize('NFKC', tag).casefold()
        if normalized in seen_tags:
            raise SystemExit(f'Duplicate topic tag: {note["id"]}: {tag}')
        seen_tags.add(normalized)
        if normalized in tag_names and tag_names[normalized] != tag:
            raise SystemExit(f'Use canonical tag spelling {tag_names[normalized]!r}, not {tag!r}')
        tag_names[normalized] = tag
    url = note['url']
    path = ROOT / url
    prefix = 'notes/' if note['type'] == 'reading-note' else 'journal-club/'
    if not url.startswith(prefix) or not url.endswith('.html') or not path.resolve().is_relative_to(ROOT) or not path.is_file():
        raise SystemExit(f'Invalid or missing content page: {url}')

generated = '// Generated from notes.json by scripts/sync-site.py; do not edit.\nwindow.IDNOTES = ' + json.dumps(notes, ensure_ascii=False, indent=2) + ';\n'
expected = {ROOT / 'notes-data.js': generated.encode('utf-8')}
paths = [ROOT / name for name in ('.nojekyll', 'index.html', 'notes.json', 'search.js')]
for directory in ('assets', 'notes', 'journal-club'):
    paths.extend(p for p in (ROOT / directory).rglob('*') if p.is_file())
for path in paths:
    expected[ROOT / 'docs' / path.relative_to(ROOT)] = path.read_bytes()
expected[ROOT / 'docs/notes-data.js'] = generated.encode('utf-8')
stale = [p for p, data in expected.items() if not p.exists() or p.read_bytes() != data]
extra = [p for p in (ROOT / 'docs').rglob('*') if p.is_file() and p not in expected]
if args.check:
    if stale or extra:
        raise SystemExit('Run python3 scripts/sync-site.py:\n' + '\n'.join(str(p.relative_to(ROOT)) for p in stale + extra))
else:
    for path, data in expected.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    # Only docs/ is generated; the root source tree is never removed.
    for path in extra:
        path.unlink()
print(f'OK: {len(notes)} indexed article(s); root/docs synchronized.')
