import GoogleCloudRunSecurity from './googleCloudRunSecurity';

describe('componenets', () => {
	describe('GoogleCloudRunSecurity', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunSecurity />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunSecurity />,
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
