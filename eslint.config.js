// @ts-check
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularParser = require('@angular-eslint/template-parser');
const prettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      '.angular/**/*',
      'coverage/**/*',
      'eslint.config.js'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json', './tsconfig.server.json']
      }
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      prettier: prettier
    },
    rules: {
      ...angularPlugin.configs.recommended.rules,
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ],
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'none',
          semi: true,
          tabWidth: 2,
          printWidth: 100
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
      prettier: prettier
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'none'
        }
      ]
    }
  }
);
