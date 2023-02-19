import CustomCard from './customCard';

describe('componenets', () => {
	describe('CustomCard', () => {
		it('should render with an empty card', () => {
			cy.recoilMount(<CustomCard />);
			cy.dataTest('testCard').should('have.value', '');
			cy.dataTest('testHeader').should('not.exist');
			cy.dataTest('testBody').should('not.exist');
			cy.dataTest('testTitle').should('not.exist');
			cy.dataTest('testText').should('not.exist');
		});

		const textHeader = 'Test Header';
		const textTitle = 'Test Title';
		const textText = 'Test Text';
		const testChild = <div>Test Child</div>;
		const testChildString = '<div>Test Child</div>';

		it('should render with only header', () => {
			cy.recoilMount(<CustomCard header={textHeader} />);
			cy.dataTest('testCard').should('exist');
			cy.dataTest('testHeader').should('have.text', textHeader);
			cy.dataTest('testBody').should('not.exist');
			cy.dataTest('testTitle').should('not.exist');
			cy.dataTest('testText').should('not.exist');
		});

		it('should render with header and title', () => {
			cy.recoilMount(<CustomCard header={textHeader} title={textTitle} />);
			cy.dataTest('testCard').should('exist');
			cy.dataTest('testHeader').should('have.text', textHeader);
			cy.dataTest('testBody').should('exist');
			cy.dataTest('testTitle').should('have.text', textTitle);
			cy.dataTest('testText').should('not.exist');
		});

		it('should render with header, title, and text', () => {
			cy.recoilMount(<CustomCard header={textHeader} title={textTitle} text={textText} />);
			cy.dataTest('testCard').should('exist');
			cy.dataTest('testHeader').should('have.text', textHeader);
			cy.dataTest('testBody').should('exist');
			cy.dataTest('testTitle').should('have.text', textTitle);
			cy.dataTest('testText').should('have.text', textText);
		});

		it('should render with header, title, text, and child', () => {
			cy.recoilMount(
				<CustomCard header={textHeader} title={textTitle} text={textText}>
					{testChild}
				</CustomCard>,
			);
			cy.dataTest('testCard').should('exist');
			cy.dataTest('testHeader').should('have.text', textHeader);
			cy.dataTest('testBody').should('exist');
			cy.dataTest('testTitle').should('have.text', textTitle);
			cy.dataTest('testText').should('have.text', textText);
			cy.dataTest('testCard').should('contain.html', testChildString);
		});

		it('should render with div with text as child', () => {
			cy.recoilMount(<CustomCard>{testChild}</CustomCard>);
			cy.dataTest('testCard').should('contain.html', testChildString);
			cy.dataTest('testHeader').should('not.exist');
			cy.dataTest('testBody').should('exist');
			cy.dataTest('testTitle').should('not.exist');
			cy.dataTest('testText').should('not.exist');
		});
	});
});
