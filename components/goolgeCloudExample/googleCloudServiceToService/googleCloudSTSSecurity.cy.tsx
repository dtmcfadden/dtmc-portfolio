import GoogleCloudRunSTSSecurity from './googleCloudSTSSecurity';

describe('componenets', () => {
	describe('GoogleCloudRunSTSSecurity', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudRunSTSSecurity />);
		});

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudRunSTSSecurity />,
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
