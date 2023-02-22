import ResumePdfButton from './resumepdfbutton';

describe('componenets', () => {
	describe('ResumePdfButton', () => {
		it('should render', () => {
			cy.recoilMount(<ResumePdfButton />);
		});

		describe('check links on page', () => {
			it('should check all links for accepted statusCodes', () => {
				const props = {
					component: <ResumePdfButton />,
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
