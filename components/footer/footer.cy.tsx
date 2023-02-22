import Footer from './footer';

describe('componenets', () => {
	describe('Footer', () => {
		it('should render', () => {
			cy.recoilMount(<Footer />);
		});

		describe('check links on page', () => {
			it('should check all links for accepted statusCodes', () => {
				// const statusCodeList = [
				// 	{ l: 200, h: 399 },
				// 	{ l: 999, h: 999 },
				// ];
				// cy.hrefLinkStatusCheck(<Footer />, statusCodeList, true);

				const props = {
					component: <Footer />,
					statusCodeList: [
						{ l: 200, h: 399 },
						{ l: 999, h: 999 },
					],
					checkIsOkStatusCode: true,
					selector: {
						selector: '[href]',
						urlAttr: 'href',
					},
				};
				cy.requestStatusCheck(props);
			});
		});

		describe('package versions listed', () => {
			it('should make sure package versions exist and get displayed', () => {
				cy.recoilMount(<Footer />);
				cy.dataTest('packageCheck').each((curEl) => {
					const elText = curEl.text();
					let pkgVer = '';
					if (elText != '') {
						const pkg = elText.split('@');
						if (pkg.length > 1) {
							pkgVer = pkg[1];
						}
					}
					expect(pkgVer).to.not.be.empty;
				});
			});
		});
	});
});
