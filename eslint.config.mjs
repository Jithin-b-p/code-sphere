import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  // 1️⃣ Global ignores (replaces .eslintignore)
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.next/**'],
  },

  // 2️⃣ Base JavaScript recommended rules
  js.configs.recommended,

  // 3️⃣ TypeScript recommended rules
  ...tseslint.configs.recommended,

  // 4️⃣ Prisma JS files (Node environment, relaxed rules)
  {
    files: ['prisma/**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },

  // 5️⃣ Project-wide TypeScript overrides
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-console': 'off',
    },
  },
]
