import { mount } from 'cypress/react';
import { MountOptions, MountReturn } from 'cypress/react';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { IstatusCodeList, IRequestStatusCheckProp, IRequestStatusCheckReturn } from '../../interfaces/test.interface';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
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
