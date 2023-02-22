import { mount } from 'cypress/react';
import { IstatusCodeList, IRequestStatusCheckReturn, IRequestStatusCheckProp } from './interfaces/test.interface';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
			dataTest(value: string): Chainable<JQuery<HTMLElement>>;
			recoilMount(children: React.ReactNode, options?: MountOptions): Cypress.Chainable<MountReturn>;
			requestStatusCheck({
				component,
				statusCodeList,
				checkIsOkStatusCode,
				selector,
			}: IRequestStatusCheckProp): IRequestStatusCheckReturn;
		}
	}
}
