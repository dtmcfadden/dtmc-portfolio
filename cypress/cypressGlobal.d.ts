/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		dataTest(value: string): Chainable<JQuery<HTMLElement>>;
	}
}
