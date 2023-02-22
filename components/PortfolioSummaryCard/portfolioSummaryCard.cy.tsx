import PortfolioSummaryCard from './portfolioSummaryCard';

describe('componenets', () => {
	describe('PortfolioSummaryCard', () => {
		it('should render', () => {
			cy.recoilMount(<PortfolioSummaryCard />);
		});
	});
});
