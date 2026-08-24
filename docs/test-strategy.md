# Test Strategy (Phases 3–10)

This repository implements the testing strategy described in the project plan. The files added here scaffold the inventory, tagging, environment, authentication-state, API+UI patterns, mobile projects, reporting, and CI.

Sections:
- Test inventory: `tests/inventory/*.md`
- Tagging conventions: `docs/test-tags.md`
- Environment templates: `.env.example`, `.env.qa.example`
- Auth state helper: `tests/helpers/save-auth-state.spec.js`
- API+UI example: `tests/e2e/api-ui.spec.js`
- CI workflows: `.github/workflows/playwright-smoke.yml`

Use the npm scripts in `package.json`:

```
npm run test            # run all tests
npm run test:smoke      # run @smoke tests
npm run test:regression # run @regression tests
npm run test:api        # run API project tests
npm run test:mobile     # run mobile projects
npm run auth:record     # record storageState for authenticated runs
```
