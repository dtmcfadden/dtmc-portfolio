///<reference path="./component.d.ts" />
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import React from 'react';
import { MountOptions, MountReturn } from 'cypress/react';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
// declare global {
// 	namespace Cypress {
// 		interface Chainable {
// 			mount: typeof mount;
// 			recoilMount(children: React.ReactNode, options?: MountOptions): Cypress.Chainable<MountReturn>;
// 		}
// 	}
// }

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('recoilMount', (component, options = {}) => {
	const wrapped = <RecoilRoot>{component}</RecoilRoot>;
	return mount(wrapped, options);
});

// Example use:
// cy.mount(<MyComponent />)
