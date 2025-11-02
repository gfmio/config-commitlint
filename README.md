# @gfmio/config-commitlint

Shared [commitlint](https://commitlint.js.org/) configuration for enforcing consistent, meaningful commit messages across projects using the Conventional Commits specification.

## Installation

```bash
npm install --save-dev @gfmio/config-commitlint @commitlint/cli @commitlint/config-conventional
```

```bash
yarn add --dev @gfmio/config-commitlint @commitlint/cli @commitlint/config-conventional
```

```bash
pnpm add --save-dev @gfmio/config-commitlint @commitlint/cli @commitlint/config-conventional
```

```bash
bun add --dev @gfmio/config-commitlint @commitlint/cli @commitlint/config-conventional
```

## Usage

Create a `commitlint.config.js` file in your project root:

```javascript
export default {
  extends: ['@gfmio/config-commitlint/commitlint.config.ts']
};
```

Or use a `.commitlintrc.json` file:

```json
{
  "extends": ["@gfmio/config-commitlint/commitlint.config.ts"]
}
```

That's it! The shared configuration will be applied to your commit messages.

### Extending the Configuration

You can override or extend any rules from the shared config:

```javascript
export default {
  extends: ['@gfmio/config-commitlint/commitlint.config.ts'],
  rules: {
    'scope-enum': [2, 'always', ['api', 'web', 'mobile', 'shared', 'docs']],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100]
  }
};
```

## Configuration Highlights

This configuration enforces Conventional Commits with opinionated defaults designed to maintain high-quality commit history while remaining practical for day-to-day development.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Example:**
```
feat(api): add user authentication endpoint

Implement JWT-based authentication with refresh tokens.
Includes middleware for protected routes.

Closes #123
```

### Type Enforcement

**Allowed types** (strictly enforced):
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without functional changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or external dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Revert previous commits

### Scope Guidelines

**Recommended scopes** (warning if missing):
- `config`: Configuration file changes
- `deps`: Dependency updates
- `ci`: CI/CD pipeline changes
- `release`: Release-related changes

**Note:** While these scopes are recommended in the base config, you should override `scope-enum` with project-specific scopes relevant to your codebase (e.g., package names in monorepos, feature areas, or module names).

### Subject Line Rules

**Strictly enforced:**
- Must not start with uppercase (except proper nouns)
- Must not use PascalCase
- Should be concise and descriptive

**Good examples:**
```
feat(api): add rate limiting middleware
fix(auth): resolve token expiration edge case
docs(readme): update installation instructions
```

**Bad examples:**
```
feat(api): Add rate limiting middleware  ❌ (uppercase 'Add')
fix(auth): ResolveTokenIssue  ❌ (PascalCase)
Feat(api): add feature  ❌ (uppercase type)
```

## Workflow Integration

### Husky + Git Hooks

Install [husky](https://typicode.github.io/husky/) to validate commits locally:

```bash
npm install --save-dev husky
npx husky init
```

Create `.husky/commit-msg`:

```bash
#!/usr/bin/env sh
npx --no -- commitlint --edit $1
```

Make it executable:

```bash
chmod +x .husky/commit-msg
```

Now every commit will be validated before it's created.

### Package Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "commitlint": "commitlint --edit",
    "commitlint:check": "commitlint --from HEAD~1 --to HEAD --verbose"
  }
}
```

### Testing Commit Messages

Test a commit message manually:

```bash
echo "feat(api): add new endpoint" | npx commitlint
```

Check recent commits:

```bash
npx commitlint --from HEAD~3 --to HEAD --verbose
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Lint Commits

on: [push, pull_request]

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: oven-sh/setup-bun@v2

      - run: bun install

      - name: Validate PR commits
        if: github.event_name == 'pull_request'
        run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }} --verbose

      - name: Validate push
        if: github.event_name == 'push'
        run: npx commitlint --from HEAD~1 --to HEAD --verbose
```

### Validating PR Titles

Many projects squash commits and use PR titles as commit messages. Add this to your workflow:

```yaml
- name: Lint PR title
  if: github.event_name == 'pull_request'
  run: echo "$PR_TITLE" | npx commitlint --verbose
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
```

## Customization Examples

### Monorepo with Package Scopes

```javascript
export default {
  extends: ['@gfmio/config-commitlint/commitlint.config.ts'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'api',
        'web',
        'mobile',
        'shared',
        'docs',
        'config',
        'deps',
        'ci',
        'release'
      ]
    ],
    'scope-empty': [2, 'never'] // Require scope in monorepos
  }
};
```

### Enforce Body and Footer

```javascript
export default {
  extends: ['@gfmio/config-commitlint/commitlint.config.ts'],
  rules: {
    'body-min-length': [2, 'always', 20],
    'footer-max-line-length': [2, 'always', 100]
  }
};
```

### Custom Types for Specific Workflows

```javascript
export default {
  extends: ['@gfmio/config-commitlint/commitlint.config.ts'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'security',  // Add custom types
        'i18n',
        'a11y'
      ]
    ]
  }
};
```

### Relaxed Configuration

```javascript
export default {
  extends: ['@gfmio/config-commitlint/commitlint.config.ts'],
  rules: {
    'scope-empty': [0], // Disable scope requirement
    'scope-enum': [0],  // Disable scope validation
    'subject-case': [1, 'never', ['upper-case']] // Only warn on uppercase
  }
};
```

## Philosophy

This configuration follows these principles:

1. **Enforce consistency**: Strict type validation ensures uniform commit history
2. **Enable automation**: Conventional Commits enable automated changelog generation and semantic versioning
3. **Improve readability**: Clear structure makes commit history scannable and meaningful
4. **Support tooling**: Compatible with release-please, semantic-release, and conventional-changelog
5. **Stay practical**: Warnings for recommended practices, errors only for critical format violations
6. **Allow flexibility**: Easy to extend and customize for project-specific needs

## Why Conventional Commits?

Conventional Commits provide:

- **Automated versioning**: Tools can determine version bumps (major/minor/patch) from commit types
- **Changelog generation**: Automatic, accurate changelogs grouped by type
- **Better navigation**: Quickly find features, fixes, or breaking changes in history
- **Clear communication**: Team members understand changes at a glance
- **Integration ready**: Works seamlessly with CI/CD, release automation, and project management tools

## Common Patterns

### Breaking Changes

Indicate breaking changes with `!` or `BREAKING CHANGE:` in footer:

```
feat(api)!: change authentication response format

BREAKING CHANGE: The auth endpoint now returns { token, user } instead of just the token string.
```

### Multiple Scopes

Choose the primary scope or use a general one:

```
refactor(api,web): standardize error handling
```

### Referencing Issues

Use the footer to reference issues:

```
fix(auth): resolve session timeout bug

The session was expiring too early due to incorrect timestamp comparison.

Fixes #123
Relates to #456
```

### Work in Progress

For WIP commits during feature development:

```
feat(api): add user endpoint (WIP)

chore: temporary debug logging
```

Clean these up before merging or squash them into meaningful commits.

## Editor Integration

### VS Code

Install [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension:

```bash
code --install-extension vivaxy.vscode-conventional-commits
```

This provides a GUI for creating properly formatted commit messages.

### JetBrains IDEs

Use the [Conventional Commit](https://plugins.jetbrains.com/plugin/13389-conventional-commit) plugin for WebStorm, IntelliJ IDEA, etc.

### Command Line Helper

Install [commitizen](https://github.com/commitizen/cz-cli) for interactive commit message creation:

```bash
npm install --save-dev commitizen cz-conventional-changelog
```

Add to `package.json`:

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

Then use `npm run commit` instead of `git commit`.

## Troubleshooting

### Commits Failing Validation

Run commitlint with verbose output to see which rule failed:

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose
```

### Testing Configuration

Verify your config loads correctly:

```bash
npx commitlint --print-config
```

### Common Errors

**Error: "subject may not be empty"**
- Ensure your commit message has a subject after the type and scope

**Error: "type must be one of [feat, fix, ...]"**
- Use only allowed types or extend `type-enum` rule

**Error: "scope must be one of [...]"**
- Either add a valid scope or override `scope-enum` in your config

## Migration from Other Conventions

### From No Convention

1. Install this config and husky
2. Start using conventional commits for new work
3. Optionally use `git rebase -i` to clean up feature branch history before merging

### From Angular Commit Guidelines

This config extends `@commitlint/config-conventional`, which is based on Angular's convention. You may only need to adjust scope enums.

### From Custom Convention

Review your current types and map them to conventional types, or extend `type-enum` to include your custom types.

## Requirements

- Node.js 18+ or Bun
- commitlint `^20.0.0` or later
- Git

## License

[MIT](LICENSE)

## Author

Frédérique Mittelstaedt ([npm@gfm.io](mailto:npm@gfm.io))

## Contributing

Issues and pull requests are welcome! This is a personal configuration, but suggestions for improvements are appreciated.

## Resources

- [Commitlint Documentation](https://commitlint.js.org/)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [commitlint Rules Reference](https://commitlint.js.org/reference/rules.html)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitizen](https://github.com/commitizen/cz-cli)