module.exports = {
	env: {
	  browser: true,
	  es2021: true,
	},
	extends: [
	  'eslint:recommended', // Enables a set of recommended ESLint rules
	  'plugin:react/recommended', // Enables React-specific linting rules
	  'plugin:@typescript-eslint/recommended', // Enables TypeScript-specific linting rules
	],
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
	parserOptions: {
	  ecmaVersion: 12,
	  sourceType: 'module',
	},
	settings: {
	  'import/resolver': {
		typescript: {
		  project: './tsconfig.json', // Use your tsconfig.json for path resolution
		},
	  },
	},
	plugins: ['react', '@typescript-eslint', 'prettier'], // Include React and TypeScript plugins
	rules: {
		"prettier/prettier": [
            "error",
            {
                "arrowParens": "always",
                "bracketSameLine": true,
                "bracketSpacing": true,
                "semi": true,
                "experimentalTernaries": false,
                "singleQuote": true,
                "jsxSingleQuote": true,
                "quoteProps": "as-needed",
                "trailingComma": "es5",
                "singleAttributePerLine": false,
                "htmlWhitespaceSensitivity": "css",
                "vueIndentScriptAndStyle": false,
                "proseWrap": "preserve",
                "insertPragma": false,
                "printWidth": 150,
                "requirePragma": false,
                "tabWidth": 2,
                "useTabs": true,
                "embeddedLanguageFormatting": "auto",
                "endOfLine": "crlf"
            }
        ],
	  // Possible Errors
	  'no-console': 'warn', // Warns about console.log usage (useful for production)
	  'no-debugger': 'error', // Disallows debugger statements (important for production)
  
	  // Best Practices
	  'no-mixed-spaces-and-tabs': ["error", "smart-tabs"],
	  'eqeqeq': ['error', 'always'], // Requires the use of === and !== (no implicit type conversion)
	  'curly': 'error', // Enforces consistent brace style for all control statements
	  'default-case': 'warn', // Warns about switch statements that lack a default case
  
	  // Variables
	  'no-unused-vars': 'error', // Warns about declared but unused variables
	  '@typescript-eslint/no-unused-vars': 'error', // Enforces no unused variables in TypeScript
  
	  // React
	  'react/prop-types': 'off', // Turn off prop-types for TypeScript projects
	  'react/react-in-jsx-scope': 'off', // Not required with React 17 and newer (automatic JSX runtime)
  
	  // TypeScript Specific Rules
	  '@typescript-eslint/no-explicit-any': 'error',
	  '@typescript-eslint/explicit-module-boundary-types': 'warn', // Requires explicit return types on functions and class methods
	  '@typescript-eslint/no-empty-function': 'warn', // Warns about empty functions
  
	  // Complexity
	  'complexity': ['warn', { max: 12 }], // Warns if a function is too complex
	  'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }], // Limits the number of lines in a file
  
	  // Line Length
	  "max-len": ["error", { "code": 150, "ignoreUrls": true, "ignoreStrings": true, "ignoreTemplateLiterals": true }]
	},
  };
  