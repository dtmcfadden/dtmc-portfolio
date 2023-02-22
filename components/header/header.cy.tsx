import Header from './header';

//TODO compelete cypress test

// describe('componenets', () => {
// 	describe('Header', () => {
// 		it('should render', () => {
// 			cy.recoilMount(<Header />);
// 		});

// 		describe('check links on page', () => {
// 			it('should check all links for accepted statusCodes', () => {
// 				const props = {
// 					component: <Header />,
// 					statusCodeList: [{ l: 200, h: 399 }],
// 					checkIsOkStatusCode: true,
// 					selector: {
// 						selector: '[href]',
// 						urlAttr: 'href',
// 					},
// 				};
// 				cy.requestStatusCheck(props);
// 			});

// 			// it('should ', () =>{
// 			// 	cy.request({ url: url, failOnStatusCode: false }).then((curRes) => {
// 			// 		// console.log('curRes', curRes);
// 			// 		let statusMatch = false;
// 			// 		if (curRes) {
// 			// 			if (checkIsOkStatusCode === true && curRes.isOkStatusCode === true) {
// 			// 				statusMatch = true;
// 			// 			}
// 			// 			if (statusMatch === false) {
// 			// 				for (const scLH in statusCodeList) {
// 			// 					if (statusCodeList[scLH].l <= curRes.status && curRes.status <= statusCodeList[scLH].h) {
// 			// 						statusMatch = true;
// 			// 						break;
// 			// 					}
// 			// 				}
// 			// 			}
// 			// 		}
// 			// 		urlResults[url] = {
// 			// 			...urlResults[url],
// 			// 			...{
// 			// 				status: curRes.status,
// 			// 				isOkStatusCode: curRes.isOkStatusCode,
// 			// 				statusMatch: statusMatch,
// 			// 			},
// 			// 		};
// 			// 		if (statusMatch === false) {
// 			// 			console.log('requestStatusCheck statusMatch Fail', {
// 			// 				url: url,
// 			// 				status: curRes.status,
// 			// 				statusText: curRes.statusText,
// 			// 				isOkStatusCode: curRes.isOkStatusCode,
// 			// 			});
// 			// 		}
// 			// 		expect(statusMatch).equals(true);
// 			// 	});
// 			// })
// 		});
// 	});
// });
