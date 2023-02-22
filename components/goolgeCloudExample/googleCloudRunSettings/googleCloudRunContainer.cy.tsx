import GoogleCloudRunContainer from './googleCloudRunContainer';

describe('componenets', () => {
	describe('GoogleCloudRunContainer', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunContainer />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunContainer />,
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
