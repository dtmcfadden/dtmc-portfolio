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
import { IRequestStatusCheckReturn, IRequestStatusCheckProp, IstatusCodeList } from '../../interfaces/test.interface';

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

Cypress.Commands.add(
	'requestStatusCheck',
	({ component, statusCodeList, checkIsOkStatusCode, selector }: IRequestStatusCheckProp) => {
		let urlResults: IRequestStatusCheckReturn = {};
		cy.recoilMount(component).then((mounted) => {
			cy.get(selector.selector)
				.each((curEl) => {
					// console.log('hrefEl1', hrefEl);
					const curUrl = curEl.prop(selector.urlAttr);
					urlResults[curUrl] = {
						url: curUrl,
						status: null,
						isOkStatusCode: null,
						statusMatch: null,
					};
				})
				.then((urlRes) => {
					// console.log('urlResults', urlResults);
					Object.keys(urlResults).forEach((url) => {
						// console.log('url', url);
						cy.request({ url: url, failOnStatusCode: false }).then((curRes) => {
							// console.log('curRes', curRes);
							let statusMatch = false;
							if (curRes) {
								if (checkIsOkStatusCode === true && curRes.isOkStatusCode === true) {
									statusMatch = true;
								}
								if (statusMatch === false) {
									for (const scLH in statusCodeList) {
										if (statusCodeList[scLH].l <= curRes.status && curRes.status <= statusCodeList[scLH].h) {
											statusMatch = true;
											break;
										}
									}
								}
							}
							urlResults[url] = {
								...urlResults[url],
								...{
									status: curRes.status,
									isOkStatusCode: curRes.isOkStatusCode,
									statusMatch: statusMatch,
								},
							};
							if (statusMatch === false) {
								console.log('requestStatusCheck statusMatch Fail', {
									url: url,
									status: curRes.status,
									statusText: curRes.statusText,
									isOkStatusCode: curRes.isOkStatusCode,
								});
							}
							expect(statusMatch).equals(true);
						});
					});
				});
		});
		// .then((result) => {
		// 	// console.log('urlResults1', urlResults);
		// 	return urlResults;
		// });
	},
);

// Example use:
// cy.mount(<MyComponent />)
