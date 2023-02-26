import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGamePurchase from './fraudgamePurchase';

describe('componenets', () => {
	describe('FraudGamePurchase', () => {
		beforeEach(() => {
			cy.fixture('fraudgameData').then(function (fraudgameDataFixture: PurchaseTrans[]) {
				this.fraudgameDataFixture = fraudgameDataFixture;
			});
		});

		it('should render with empty values', () => {
			cy.recoilMount(
				<FraudGamePurchase
					purchase_value={''}
					source={''}
					purchase_fingerprint={''}
					purchase_fingerprint_velocity={''}
				/>,
			);
			cy.dataTest('purchase_value').should('have.text', '');
			cy.dataTest('source').should('have.text', '');
			cy.dataTest('purchase_fingerprint').should('have.text', '');
			cy.dataTest('purchase_fingerprint_velocity').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameDataFixture = this.fraudgameDataFixture;
			for (let i in fraudgameDataFixture) {
				const trans = fraudgameDataFixture[i];
				const purchase_value_val = trans.ip_address;
				const source_val = trans.source;
				const purchase_fingerprint_val = trans.purchase_fingerprint;
				const purchase_fingerprint_velocity_val = trans.purchase_fingerprint_velocity;

				cy.recoilMount(
					<FraudGamePurchase
						purchase_value={purchase_value_val}
						source={source_val}
						purchase_fingerprint={purchase_fingerprint_val}
						purchase_fingerprint_velocity={purchase_fingerprint_velocity_val}
					/>,
				);
				cy.dataTest('purchase_value').should('have.text', purchase_value_val);
				cy.dataTest('source').should('have.text', source_val);
				cy.dataTest('purchase_fingerprint').should('have.text', purchase_fingerprint_val);
				cy.dataTest('purchase_fingerprint_velocity').should('have.text', purchase_fingerprint_velocity_val);
			}
		});
	});
});
