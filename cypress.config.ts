import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {},
		experimentalRunAllSpecs: true,
	},

	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
		supportFile: 'cypress/support/component.tsx',
		specPattern: '**/*.cy.{js,jsx,ts,tsx}',
	},
});
