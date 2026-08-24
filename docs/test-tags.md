# Test Tagging Conventions

Use Playwright test title prefixes to tag tests. Example:

```
test('@smoke @authentication valid user can login', async ({ page }) => {
  // ...
});
```

Common tags:
- `@smoke`
- `@regression`
- `@api`
- `@ui`
- `@negative`
- `@accessibility`
- `@mobile`

Run by tag:

```
npx playwright test --grep @smoke
```
