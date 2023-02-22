import GoogleCloudRunConnections from './googleCloudRunConnections';

describe('componenets', () => {
	describe('GoogleCloudRunConnections', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunConnections />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunConnections />,
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
