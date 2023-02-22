import GoogleCloudRunSTSInvoker from './googleCloudSTSNetworking';

describe('componenets', () => {
	describe('GoogleCloudRunSTSInvoker', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunSTSInvoker />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunSTSInvoker />,
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
