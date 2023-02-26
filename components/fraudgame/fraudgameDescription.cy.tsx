import FraudGameDescription from './fraudgameDescription';

describe('componenets', () => {
	describe('FraudGameDescription', () => {
		it('should render', () => {
			cy.recoilMount(<FraudGameDescription />);
		});

		const titleText = 'titleText';
		const text = 'text';
		beforeEach(() => {
			cy.recoilMount(<FraudGameDescription titleText={titleText} text={text} />);
		});

		describe('check links on page', () => {
			it('should have the title value from titleText', () => {
				cy.dataTest('span').invoke('attr', 'title').should('eq', titleText);
			});
			it('should have text', () => {
				cy.dataTest('text').should('have.text', text);
			});
		});
	});
});
