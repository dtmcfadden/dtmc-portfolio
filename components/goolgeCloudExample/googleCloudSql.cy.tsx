import GoogleCloudSql from './googleCloudSql';

describe('componenets', () => {
	describe('GoogleCloudSql', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudSql />);
		});

		describe('check links on page', () => {
			it('should check all links for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudSql />,
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

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudSql />,
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
