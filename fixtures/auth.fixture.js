const { test: base } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const authFile = path.join(process.cwd(), 'tests', 'state', 'auth.json');

const test = base.extend({
  storageState: async ({}, use) => {
    if (fs.existsSync(authFile)) {
      await use(authFile);
    } else {
      await use(undefined);
    }
  },
});

module.exports = { test, expect: test.expect };
