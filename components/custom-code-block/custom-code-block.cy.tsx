import CustomCodeBlock from './custom-code-block';
describe('componenets', () => {
	const testCode = '{ TestCode: "TestValue" }';
	describe('CustomCodeBlock', () => {
		it('should render', () => {
			cy.recoilMount(<CustomCodeBlock codeCodeBlock={testCode} />);
		});
	});
	// TODO Add more tests for the code block and resizable element
});
