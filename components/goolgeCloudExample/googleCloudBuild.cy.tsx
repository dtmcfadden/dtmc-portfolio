import GoogleCloudBuild from './googleCloudBuild';

describe('componenets', () => {
	describe('GoogleCloudBuild', () => {
		it('should render', () => {
			cy.recoilMount(<GoogleCloudBuild />);
		});

		describe('check links on page', () => {
			it('should check all links for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudBuild />,
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

		// describe('check images on page', () => {
		// 	it('should check all images for accepted statusCodes', () => {
		// 		const statusCodeList = [{ l: 200, h: 399 }];
		// 		cy.imgStatusCheck(<GoogleCloudSql />, statusCodeList, true);
		// 	});
		// });

		describe('check images on page', () => {
			it('should check all images for accepted statusCodes', () => {
				const props = {
					component: <GoogleCloudBuild />,
					statusCodeList: [{ l: 200, h: 399 }],
					checkIsOkStatusCode: true,
					selector: {
						selector: 'img[src]',
						urlAttr: 'src',
					},
				};
				cy.requestStatusCheck(props);
				// cy.requestStatusCheck(props).then((statusReturn: IRequestStatusCheckReturn) =>{
				// 	console.log('statusReturn', statusReturn);
				// })
			});
		});

		// beforeEach(() => {
		// 	cy.recoilMount(<GoogleCloudSql />);
		// });

		// describe('Form Input Focus', () => {
		// 	it('should select all text in input on focus', () => {
		// 		const selectText = 'testUsername';
		// 		cy.get('#formDisplayName').invoke('attr', 'value', selectText).focus();
		// 		cy.get('#formDisplayName').then(($input) => {
		// 			if ($input.length > 0) {
		// 				const document = $input[0].ownerDocument;
		// 				const selectedValue = document.getSelection()?.toString();
		// 				expect(selectedValue).equals(selectText);
		// 			}
		// 		});
		// 	});
		// });

		// describe('Form Input', () => {
		// 	const displayNameMatchErrorMsg = 'Only letters or numbers are allowed.';
		// 	it(`should return error message "${displayNameMatchErrorMsg}" from space`, () => {
		// 		cy.get('#formDisplayName').type('test name');
		// 		cy.dataTest('errDisplayName').should('have.text', displayNameMatchErrorMsg);
		// 		cy.dataTest('btnDisplayNameSubmit').should('be.disabled');
		// 	});
		// 	it(`should return error message "${displayNameMatchErrorMsg}" from symbol`, () => {
		// 		cy.get('#formDisplayName').type('testname$');
		// 		cy.dataTest('errDisplayName').should('have.text', displayNameMatchErrorMsg);
		// 		cy.dataTest('btnDisplayNameSubmit').should('be.disabled');
		// 	});

		// 	const displayNameMinErrorMsg = 'Min length of 4';
		// 	it(`should return error message "${displayNameMinErrorMsg}" from length 3 entry`, () => {
		// 		cy.get('#formDisplayName').type('min');
		// 		cy.dataTest('errDisplayName').should('have.text', displayNameMinErrorMsg);
		// 		cy.dataTest('btnDisplayNameSubmit').should('be.disabled');
		// 	});
		// 	it(`should return error message "${displayNameMinErrorMsg}" from length 4 entry`, () => {
		// 		cy.get('#formDisplayName').type('min1');
		// 		cy.dataTest('errDisplayName').should('have.text', displayNameMinErrorMsg);
		// 		cy.dataTest('btnDisplayNameSubmit').should('be.disabled');
		// 	});

		// 	const displayNameMaxErrorMsg = 'Max length of 50';
		// 	it(`should return error message "${displayNameMaxErrorMsg}" from length 58 entry`, () => {
		// 		cy.get('#formDisplayName').type('maxlengthtestingvavlvjahvklahvklahvlkahvalvkagvjkagvagvkav');
		// 		cy.dataTest('errDisplayName').should('have.text', displayNameMaxErrorMsg);
		// 		cy.dataTest('btnDisplayNameSubmit').should('be.disabled');
		// 	});
		// 	it(`should return error message "${displayNameMaxErrorMsg}" from length 50 entry`, () => {
		// 		cy.get('#formDisplayName').type('maxlengthtestingvavlvjahvklahvklahvlkahvalvkagvjka');
		// 		cy.dataTest('errDisplayName').should('have.text', displayNameMaxErrorMsg);
		// 		cy.dataTest('btnDisplayNameSubmit').should('be.disabled');
		// 	});

		// 	it(`should not return error message from appropriate entry`, () => {
		// 		cy.get('#formDisplayName').type('testingName123');
		// 		cy.dataTest('errDisplayName').should('have.text', '');
		// 	});
		// });

		// describe('Form Submit', () => {
		// 	it('should return a success response', () => {
		// 		const testName = 'testingName123';
		// 		cy.intercept('PUT', `/api/user/profile`, { error: '', profile: { name: testName, roles: 'guest' } }).as(
		// 			'put-displayuser',
		// 		);

		// 		cy.get('#formDisplayName').type(testName);
		// 		cy.dataTest('btnDisplayNameSubmit').click();
		// 		cy.wait('@put-displayuser').then((interception) => {
		// 			expect(interception.response?.statusCode).equals(200);
		// 		});
		// 		cy.dataTest('btnDisplayNameSubmit').should('have.class', 'border-success');
		// 		cy.dataTest('errorMessage').should('not.exist');
		// 	});

		// 	it('should return an error response', () => {
		// 		const testName = 'testingName123';
		// 		const errorMessage = 'Not updated. Try a different name.';
		// 		cy.intercept('PUT', `/api/user/profile`, { error: errorMessage, profile: {} }).as('put-displayuser');

		// 		cy.get('#formDisplayName').type(testName);
		// 		cy.dataTest('btnDisplayNameSubmit').click();
		// 		cy.wait('@put-displayuser').then((interception) => {
		// 			expect(interception.response?.statusCode).equals(200);
		// 		});
		// 		cy.dataTest('btnDisplayNameSubmit').should('have.class', 'border-danger');
		// 		cy.dataTest('errorMessage').should('have.text', errorMessage);
		// 	});
		// });
	});
});
