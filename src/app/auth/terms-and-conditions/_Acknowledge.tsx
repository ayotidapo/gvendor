'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import Checkbox from '@/atoms/Checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const _Acknowledge = () => {
	const router = useRouter();
	const [enable, setEnable] = useState(true);
	const searchQ = useSearchParams();

	const token = searchQ.get('ck_token') as string;
	return (
		<>
			<p className='flex mt-7'>
				<Checkbox
					name='accept'
					value='accept'
					className='square'
					onChange={() => setEnable(enable => !enable)}
				/>{' '}
				I acknowledge that I have read and understood the information above.
			</p>
			<SimpleBtn
				className='cont_'
				disabled={enable}
				onClick={() => router.replace(`/business-setup?ck_token=${token}`)}
			>
				Continue
			</SimpleBtn>
		</>
	);
};

export default _Acknowledge;

// // eslint-disable-next-line no-undef
// module.exports = {
// 	ignorePatterns: ['public/'],
// 	env: {
// 		browser: true,
// 		es2021: true,
// 		amd: true,
// 		node: true,
// 	},
// 	extends: [
// 		'eslint:recommended',
// 		'plugin:react/recommended',
// 		'plugin:@typescript-eslint/recommended',
// 	],
// 	overrides: [],
// 	parser: '@typescript-eslint/parser',
// 	parserOptions: {
// 		ecmaVersion: 'latest',
// 		sourceType: 'module',
// 	},
// 	plugins: ['react', '@typescript-eslint', 'import'],
// 	rules: {
// 		'react/react-in-jsx-scope': 0,
// 		'import/export': 0,
// 		'no-mixed-spaces-and-tabs': 'off',
// 		'no-undef': 0,
// 		'no-empty-pattern': 'off',
// 		'no-func-assign': 'error',
// 		'@typescript-eslint/no-unused-vars': 'error',
// 		'@typescript-eslint/no-explicit-any': 'warn',
// 		'@typescript-eslint/no-unused-vars': 'warn',
// 		'react/no-unescaped-entities': 'warn',
// 		'no-unsafe-optional-chaining': 'warn',
// 		'@typescript-eslint/no-unsafe-function-type': 'warn',
// 		'jsx-a11y/href-no-hash': 'off',
// 		'linebreak-style': 0,
// 		'no-console': 'warn',
// 		'no-useless-catch': 'warn',
// 		'no-case-declarations': 0,
// 		'react/prop-types': 0,
// 		'react-hooks/rules-of-hooks': 0,
// 		'react-hooks/exhaustive-deps': 0,
// 	},
// 	settings: {
// 		react: {
// 			version: '18.2.0',
// 		},
// 	},
// };
