import React from 'react';
import AccessDenied from './access-denied';

describe('components', () => {
	describe('<AccessDenied />', () => {
		it('renders', () => {
			cy.mount(<AccessDenied />);
		});
	});
});
