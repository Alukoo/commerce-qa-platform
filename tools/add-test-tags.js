const fs = require('fs');
const path = require('path');

// Usage: node tools/add-test-tags.js
// This script scans `tests/` and adds simple textual tags into test titles
// based on file location: @api for tests/api, @network for tests/network,
// @smoke for first test in each file, and @negative when title contains
// negative words. It edits files in-place. Run only when you want changes.

const ROOT = path.join(__dirname, '..');
const TESTS = path.join(ROOT, 'tests');

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function tagForFile(file) {
  if (file.includes(path.join('tests', 'api'))) return '@api';
  if (file.includes(path.join('tests', 'network'))) return '@network';
  if (file.includes(path.join('tests', 'ui'))) return '@ui';
  return '@test';
}

function shouldAddNegative(title) {
  const neg = ['invalid', 'negative', 'error', 'fail', 'missing'];
  return neg.some(n => title.toLowerCase().includes(n));
}

walk(TESTS, (file) => {
  if (!file.endsWith('.js')) return;
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let changed = false;
  const tag = tagForFile(file);
  let firstTestSeen = false;
  const out = lines.map(line => {
    const m = line.match(/test\((['\"])(.+?)\1/);
    if (!m) return line;
    let title = m[2];
    const parts = title.split(' ');
    // ensure tag present
    if (!title.includes(tag)) {
      title = `${title} ${tag}`;
      changed = true;
    }
    // add smoke to first test in file
    if (!firstTestSeen) {
      if (!title.includes('@smoke')) { title = `${title} @smoke`; changed = true; }
      firstTestSeen = true;
    }
    // add negative if title implies
    if (shouldAddNegative(title) && !title.includes('@negative')) { title = `${title} @negative`; changed = true; }
    return line.replace(m[0], `test(${m[1]}${title}${m[1]}`);
  });
  if (changed) fs.writeFileSync(file, out.join('\n'), 'utf8');
});

console.log('Tagging script complete. Review changes before committing.');
