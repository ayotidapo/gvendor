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
		'no-undef': 0,
		'no-empty-pattern': 'off',
		'no-func-assign': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'react/no-unescaped-entities': 'off',
		'no-unsafe-optional-chaining': 'off',
		'@typescript-eslint/no-unsafe-function-type': 'off',
		'jsx-a11y/href-no-hash': 'off',
		'linebreak-style': 0,
		'no-console': 'off',
		'no-useless-catch': 'off',
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
