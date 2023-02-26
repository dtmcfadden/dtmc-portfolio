import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudPlayTheGame from './fraudgamePlay';

describe('componenets', () => {
	describe('FraudPlayTheGame', () => {
		it('should render', () => {
			cy.recoilMount(<FraudPlayTheGame />);
		});

		beforeEach(() => {
			cy.recoilMount(<FraudPlayTheGame />);
		});

		// describe('Click button open page', () => {
		// 	it('should return a success response', function () {
		// 		cy.intercept('GET', `/fraudgame/play`).as('click-displayuser');

		// 		cy.dataTest('fraud_play_btn').click();
		// 		cy.wait('@click-displayuser').then((interception) => {
		// 			console.log('interception', interception);
		// 			expect(interception.response?.statusCode).equals(200);
		// 		});
		// 	});
		// });
	});
});
