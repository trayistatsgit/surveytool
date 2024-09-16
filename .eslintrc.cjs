module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:import/typescript'],
	ignorePatterns: ['dist', '.eslintrc.cjs', 'src/vite-env.d.ts'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		// sourceType: 'module',
	},
	plugins: ['react-refresh', '@typescript-eslint', 'import'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'import/no-unresolved': 'error',
		'react-refresh/only-export-components': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		// 'import/no-cycle': 'error', // Example rule to disallow cyclic dependencies
		'no-unused-vars': 'warn', // Enable no-unused-vars rule
		'react-hooks/exhaustive-deps': 'off',
	},
};
