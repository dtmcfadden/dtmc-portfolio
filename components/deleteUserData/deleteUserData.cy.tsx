import DeleteUserData from './deleteUserData';

describe('componenets', () => {
	describe('DeleteUserData', () => {
		it('should render', () => {
			cy.recoilMount(<DeleteUserData />);
		});

		//TODO need to test to make sure all user data gets cleared
	});
});
