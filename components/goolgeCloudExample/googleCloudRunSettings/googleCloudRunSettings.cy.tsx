import GoogleCloudRunSettings from './googleCloudRunSettings';

describe('componenets', () => {
	describe('GoogleCloudRunSettings', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunSettings />);
		});

		describe('check links on page', () => {
			it('should check all links for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunSettings />,
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
