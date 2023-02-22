import UnderConstructionIcon from './underConstructionIcon';

describe('componenets', () => {
	describe('UnderConstructionIcon', () => {
		it('should render', () => {
			cy.recoilMount(<UnderConstructionIcon />);
		});
	});
});
