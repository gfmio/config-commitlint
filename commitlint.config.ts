import type { UserConfig } from '@commitlint/types';

// Configuration constants for commit message length constraints
const MAX_LINE_LENGTH = 100;
const MIN_SUBJECT_LENGTH = 3;
const MIN_HEADER_LENGTH = 10;

/**
 * Shared commitlint configuration based on Conventional Commits
 *
 * This configuration enforces strict commit message formatting while remaining
 * flexible enough for various project types. Projects can override any rule
 * to match their specific needs.
 *
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */
export default {
  extends: [
    '@commitlint/config-conventional',
  ],

  /**
   * Help message shown when commit fails validation
   */
  helpUrl: 'https://github.com/gfmio/config-commitlint#usage',

  /**
   * Custom prompt configuration (for use with @commitlint/cz-commitlint)
   */
  prompt: {
    messages: {
      emptyWarning: 'can not be empty',
      lowerLimitWarning: 'below limit',
      max: 'upper %d chars',
      min: '%d chars at least',
      skip: '(press enter to skip)',
      upperLimitWarning: 'over limit',
    },
    questions: {
      body: {
        description: 'Provide a longer description of the change',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      breakingBody: {
        description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      type: {
        description: "Select the type of change you're committing",
        enum: {
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            emoji: '🛠',
            title: 'Builds',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            emoji: '♻️',
            title: 'Chores',
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            emoji: '⚙️',
            title: 'Continuous Integrations',
          },
          docs: {
            // biome-ignore lint/security/noSecrets: False positive - this is a description string, not a secret
            description: 'Documentation only changes',
            emoji: '📚',
            // biome-ignore lint/security/noSecrets: False positive - this is a title string, not a secret
            title: 'Documentation',
          },
          feat: {
            description: 'A new feature',
            emoji: '✨',
            title: 'Features',
          },
          fix: {
            description: 'A bug fix',
            emoji: '🐛',
            title: 'Bug Fixes',
          },
          perf: {
            description: 'A code change that improves performance',
            emoji: '🚀',
            title: 'Performance Improvements',
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            emoji: '📦',
            title: 'Code Refactoring',
          },
          revert: {
            description: 'Reverts a previous commit',
            emoji: '🗑',
            title: 'Reverts',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            emoji: '💎',
            title: 'Styles',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            emoji: '🚨',
            title: 'Tests',
          },
        },
      },
    },
  },

  rules: {
    /**
     * Body case - no restriction
     * Severity: Disabled (0)
     */
    'body-case': [
      0,
    ],

    /**
     * Body is optional but can contain multiple paragraphs
     * Severity: Disabled (0)
     */
    'body-empty': [
      0,
    ],

    // ===========================
    // Body Validation
    // ===========================

    /**
     * Body must have blank line after header
     * Severity: Warning (1) - recommended but not required
     */
    'body-leading-blank': [
      1,
      'always',
    ],

    /**
     * Body maximum total length - disabled (optional)
     * Severity: Disabled (0)
     * Note: Use body-max-line-length to limit line length instead
     */
    'body-max-length': [
      0,
    ],

    /**
     * Body lines should not exceed this length
     * Severity: Error (2)
     */
    'body-max-line-length': [
      2,
      'always',
      MAX_LINE_LENGTH,
    ],

    /**
     * Body minimum length - disabled (optional)
     * Severity: Disabled (0)
     * Projects can enable this if they want to enforce detailed descriptions
     */
    'body-min-length': [
      0,
    ],

    /**
     * Footer is optional
     * Severity: Disabled (0)
     */
    'footer-empty': [
      0,
    ],

    // ===========================
    // Footer Validation
    // ===========================

    /**
     * Footer must have blank line before it
     * Severity: Warning (1) - recommended for readability
     */
    'footer-leading-blank': [
      1,
      'always',
    ],

    /**
     * Footer lines should not exceed this length
     * Severity: Error (2)
     */
    'footer-max-line-length': [
      2,
      'always',
      MAX_LINE_LENGTH,
    ],

    /**
     * Footer minimum length - disabled (optional)
     * Severity: Disabled (0)
     */
    'footer-min-length': [
      0,
    ],

    /**
     * Ensure header uses proper case
     * Severity: Error (2)
     */
    'header-case': [
      2,
      'always',
      'lower-case',
    ],

    /**
     * Header must not end with a period
     * Severity: Error (2)
     */
    'header-full-stop': [
      2,
      'never',
      '.',
    ],

    // ===========================
    // Header Validation
    // ===========================

    /**
     * Entire header (type + scope + subject) max length
     * Severity: Error (2)
     */
    'header-max-length': [
      2,
      'always',
      MAX_LINE_LENGTH,
    ],

    /**
     * Header minimum length
     * Severity: Error (2)
     */
    'header-min-length': [
      2,
      'always',
      MIN_HEADER_LENGTH,
    ],

    /**
     * Header must not have leading or trailing whitespace
     * Severity: Error (2)
     */
    'header-trim': [
      2,
      'always',
    ],

    // ===========================
    // References & Mentions
    // ===========================

    /**
     * Allow GitHub issue references (e.g., "Fixes #123")
     * Severity: Disabled (0) - optional
     */
    'references-empty': [
      0,
    ],

    // ===========================
    // Scope Validation
    // ===========================

    /**
     * Scope must be in lowercase
     * Severity: Error (2)
     */
    'scope-case': [
      2,
      'always',
      'lower-case',
    ],

    /**
     * Scope is optional (no specific scopes enforced in shared config)
     * Projects should override scope-enum with their own list
     * Severity: Disabled (0)
     *
     * @example Override in your project:
     * 'scope-enum': [2, 'always', ['api', 'web', 'mobile', 'docs']]
     */
    'scope-empty': [
      0,
    ],
    'scope-enum': [
      0,
    ],

    // ===========================
    // Signing & Trailer Validation
    // ===========================

    /**
     * Signed-off-by trailer - optional
     * Severity: Disabled (0)
     * Enable if your project requires DCO (Developer Certificate of Origin)
     */
    'signed-off-by': [
      0,
    ],

    /**
     * Prevent uppercase first letter and PascalCase in subject
     * Allows sentence-case for proper nouns (e.g., "fix: update React to v18")
     * Severity: Error (2)
     */
    'subject-case': [
      2,
      'never',
      [
        'upper-case',
        'pascal-case',
      ],
    ],

    // ===========================
    // Subject Validation
    // ===========================

    /**
     * Subject must not be empty
     * Severity: Error (2)
     */
    'subject-empty': [
      2,
      'never',
    ],

    /**
     * Subject should not have leading/trailing whitespace
     * Severity: Error (2)
     */
    'subject-exclamation-mark': [
      0,
    ], // Allow ! for breaking changes

    /**
     * Subject must not end with a period
     * Severity: Error (2)
     */
    'subject-full-stop': [
      2,
      'never',
      '.',
    ],

    /**
     * Subject maximum length (keep subjects concise)
     * Severity: Error (2)
     */
    'subject-max-length': [
      2,
      'always',
      MAX_LINE_LENGTH,
    ],

    /**
     * Subject minimum length (too short subjects are usually not descriptive)
     * Severity: Error (2)
     */
    'subject-min-length': [
      2,
      'always',
      MIN_SUBJECT_LENGTH,
    ],

    /**
     * Trailer validation - allow standard trailers
     * Severity: Disabled (0)
     */
    'trailer-exists': [
      0,
    ],

    /**
     * Ensure type is in lowercase
     * Severity: Error (2)
     */
    'type-case': [
      2,
      'always',
      'lower-case',
    ],

    /**
     * Type must not be empty
     * Severity: Error (2)
     */
    'type-empty': [
      2,
      'never',
    ],
    // ===========================
    // Type Validation
    // ===========================

    /**
     * Restrict commit types to standard Conventional Commits types
     * Severity: Error (2) - commit types must be from this list
     */
    'type-enum': [
      2,
      'always',
      [
        'feat', // New features
        'fix', // Bug fixes
        'docs', // Documentation changes only
        'style', // Code style/formatting (no functional changes)
        'refactor', // Code restructuring (no functional changes)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Build system or dependency changes
        'ci', // CI/CD configuration changes
        'chore', // Maintenance tasks, tooling
        'revert', // Revert previous commits
      ],
    ],
  },
} satisfies UserConfig;
