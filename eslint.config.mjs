import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['node_modules', 'dist', 'build', '.next'],
    overrides: [
    {
      files: ['prisma/**/*.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'no-undef': 'off',
      },
    },
  ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-console': 'off',
    },
  },
  
]
