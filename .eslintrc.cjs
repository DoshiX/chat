/* eslint-env node */
module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
		'no-template-curly-in-string': 'error',
		'no-unreachable-loop': 'error',
		'no-var': 'error',
		'array-callback-return': 'off',
		'no-useless-escape': 'off',
		'prefer-regex-literals': 'off',
		'default-case': 'error',
		'default-param-last': ['error'],
		'dot-location': ['error', 'property'],
		'dot-notation': 'error',
		'no-else-return': 'error',
		'no-empty-function': 'error',
		'no-empty-pattern': 'error',
		'no-implicit-coercion': 'error',
		'no-loop-func': 'error',
		'no-multi-spaces': 'error',
		'no-new': 'error',
		'no-param-reassign': 'error',
		'no-useless-catch': 'error',
		'no-unused-vars': 'off',
		'block-spacing': 'error',
		'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'comma-style': ['error', 'last'],
		'eol-last': ['error', 'always'],
		'key-spacing': [
			'error',
			{
				'afterColon': true,
			},
		],
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'comma-dangle': [
			'error',
			{
				'arrays': 'always-multiline',
				'objects': 'always-multiline',
				'imports': 'never',
				'exports': 'never',
				'functions': 'ignore',
			},
		],
		'no-tabs': 'off',
		'space-before-function-paren': ['error', {
			'anonymous': 'always',
			'named': 'never',
			'asyncArrow': 'always',
		}],
		'keyword-spacing': ['error', { 'before': true }],
		'require-await': 'off',
		'curly': 'error',
		'no-empty': ['error', { 'allowEmptyCatch': true }],
		'no-prototype-builtins': 0,
		'padding-line-between-statements': [
			'warn',
			{
				'blankLine': 'any',
				'prev': ['const', 'let', 'var'],
				'next': ['const', 'let', 'var'],
			},
			{ 'blankLine': 'always', 'prev': '*', 'next': 'return' },
			{ 'blankLine': 'always', 'prev': 'function', 'next': '*' },
		],
		'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
		'eqeqeq': ['error', 'always'],
		'space-before-blocks': 'error',
	},
};
