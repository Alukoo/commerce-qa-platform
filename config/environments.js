import fs from 'fs';
import path from 'path';

// Simple env loader: reads .env, .env.qa, .env.staging based on ENV
const root = process.cwd();
const env = process.env.ENV || 'local';
const files = [
  path.join(root, '.env'),
  path.join(root, `.env.${env}`),
];

for (const file of files) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

export default process.env;
