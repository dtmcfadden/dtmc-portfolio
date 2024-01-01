import AccessDenied from './access-denied';

describe('components', () => {
	describe('AccessDenied', () => {
		it('should render', () => {
			cy.recoilMount(<AccessDenied />);
		});
	});
});
