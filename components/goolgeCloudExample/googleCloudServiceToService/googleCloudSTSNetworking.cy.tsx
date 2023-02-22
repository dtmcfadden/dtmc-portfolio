import GoogleCloudRunSTSNetworking from './googleCloudSTSNetworking';

describe('componenets', () => {
	describe('GoogleCloudRunSTSNetworking', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunSTSNetworking />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunSTSNetworking />,
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
