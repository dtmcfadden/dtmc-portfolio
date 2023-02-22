import PortfolioImageCard from './portfolioImageCard';

describe('componenets', () => {
	describe('PortfolioImageCard', () => {
		it('should render', () => {
			cy.recoilMount(<PortfolioImageCard />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <PortfolioImageCard />,
					statusCodeList: [{ l: 200, h: 399 }],
					checkIsOkStatusCode: true,
					selector: {
						selector: 'img[src]',
						urlAttr: 'src',
					},
				};
				cy.requestStatusCheck(props);
			});
		});
	});
});
