import UserRoles from './userRoles';

describe('componenets', () => {
	describe('UserRoles', () => {
		it('should render', () => {
			cy.recoilMount(<UserRoles />);
		});
	});
});
