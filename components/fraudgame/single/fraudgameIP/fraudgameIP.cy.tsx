import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameIP from './fraudgameIP';

describe('componenets', () => {
	describe('FraudGameIP', () => {
		beforeEach(() => {
			cy.fixture('fraudgameData').then(function (fraudgameDataFixture: PurchaseTrans[]) {
				this.fraudgameDataFixture = fraudgameDataFixture;
			});
		});

		it('should render with empty values', () => {
			cy.recoilMount(
				<FraudGameIP
					ip_address={''}
					ip_country={''}
					ip_history_fraudulent={''}
					ip_history_total={''}
					ip_address_velocity={''}
				/>,
			);
			cy.dataTest('ip_address').should('have.text', '');
			cy.dataTest('ip_country').should('have.text', '');
			cy.dataTest('ip_history_fraudulent').should('have.text', '');
			cy.dataTest('ip_history_total').should('have.text', '');
			cy.dataTest('ip_address_velocity').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameDataFixture = this.fraudgameDataFixture;
			for (let i in fraudgameDataFixture) {
				const trans = fraudgameDataFixture[i];
				const ip_address_val = trans.ip_address;
				const ip_country_val = trans.ip_country;
				const ip_history_fraudulent_val = trans.ip_history_fraudulent;
				const ip_history_total_val = trans.ip_history_total;
				const ip_address_velocity_val = trans.ip_address_velocity;

				cy.recoilMount(
					<FraudGameIP
						ip_address={ip_address_val}
						ip_country={ip_country_val}
						ip_history_fraudulent={ip_history_fraudulent_val}
						ip_history_total={ip_history_total_val}
						ip_address_velocity={ip_address_velocity_val}
					/>,
				);
				cy.dataTest('ip_address').should('have.text', ip_address_val);
				cy.dataTest('ip_country').should('have.text', ip_country_val);
				cy.dataTest('ip_history_fraudulent').should('have.text', ip_history_fraudulent_val);
				cy.dataTest('ip_history_total').should('have.text', ip_history_total_val);
				cy.dataTest('ip_address_velocity').should('have.text', ip_address_velocity_val);
			}
		});
	});
});
