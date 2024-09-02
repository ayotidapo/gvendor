// eslint-disable-next-line no-undef
module.exports = {
	ignorePatterns: ['public/'],
	env: {
		browser: true,
		es2021: true,
		amd: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'import'],
	rules: {
		'react/react-in-jsx-scope': 0,
		'import/export': 0,
		'no-mixed-spaces-and-tabs': 'off',
		'no-undef': 'error',
		'no-empty-pattern': 'off',
		'no-func-assign': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'jsx-a11y/href-no-hash': 'off',
		'linebreak-style': 0,
		'no-console': 'error',
		'no-case-declarations': 0,
		'react/prop-types': 0,
		'react-hooks/rules-of-hooks': 0,
		'react-hooks/exhaustive-deps': 0,
	},
	settings: {
		react: {
			version: '18.2.0',
		},
	},
};
