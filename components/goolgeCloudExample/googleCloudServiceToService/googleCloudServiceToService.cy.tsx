import GoogleCloudRunServiceToService from './googleCloudServiceToService';

describe('componenets', () => {
	describe('GoogleCloudRunServiceToService', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunServiceToService />);
		});

		describe('check links on page', () => {
			it('should check all links for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunServiceToService />,
					statusCodeList: [{ l: 200, h: 399 }],
					checkIsOkStatusCode: true,
					selector: {
						selector: '[href]',
						urlAttr: 'href',
					},
				};
				cy.requestStatusCheck(props);
			});
		});
	});
});
