module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-react-compiler',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-native',
    'typescript-sort-keys',
    'sort-destructure-keys',
    'sort-keys-fix',
  ],
  root: true,
  rules: {
    'arrow-body-style': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '@/packages/shared/**',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: '@/packages/example/**',
            position: 'before',
          },
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': 'off',
    'no-empty-function': 'off',
    'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prefer-arrow-callback': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        ignoreCase: false,
        locale: 'auto',
        multiline: 'last',
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-compiler/react-compiler': 'error',
    'sort-destructure-keys/sort-destructure-keys': [
      'warn',
      {
        caseSensitive: true,
      },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'warn',
      'asc',
      {
        caseSensitive: true,
        natural: true,
      },
    ],
    'typescript-sort-keys/interface': [
      'warn',
      'asc',
      {
        caseSensitive: true,
        natural: true,
        requiredFirst: true,
      },
    ],
    'typescript-sort-keys/string-enum': [
      'warn',
      'asc',
      {
        caseSensitive: true,
        natural: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [['^@', './src']],
      },
    },
    node: {
      extensions: ['.ts', '.tsx'],
      paths: ['src'],
    },
  },
};
