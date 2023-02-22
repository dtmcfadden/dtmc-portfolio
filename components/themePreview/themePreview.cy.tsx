import ThemePreview from './themePreview';

describe('componenets', () => {
	describe('ThemePreview', () => {
		it('should render', () => {
			cy.recoilMount(<ThemePreview />);
		});

		// describe('check links on page', () => {
		// 	it('should check all links for accepted statusCodes', () => {
		// 		const props = {
		// 			component: <ThemePreview />,
		// 			statusCodeList: [{ l: 200, h: 399 }],
		// 			checkIsOkStatusCode: true,
		// 			selector: {
		// 				selector: '[href]',
		// 				urlAttr: 'href',
		// 			},
		// 		};
		// 		cy.requestStatusCheck(props);
		// 	});
		// });
	});
});
