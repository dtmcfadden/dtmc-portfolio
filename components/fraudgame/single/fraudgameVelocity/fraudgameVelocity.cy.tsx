import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameVelocity from './fraudgameVelocity';

describe('componenets', () => {
	describe('FraudGameVelocity', () => {
		beforeEach(() => {
			cy.fixture('fraudgameData').then(function (fraudgameDataFixture: PurchaseTrans[]) {
				this.fraudgameDataFixture = fraudgameDataFixture;
			});
		});

		it('should render with empty values', () => {
			cy.recoilMount(
				<FraudGameVelocity
					device_fingerprint_velocity={''}
					ip_address_velocity={''}
					purchase_fingerprint_velocity={''}
					user_fingerprint_velocity={''}
				/>,
			);
			cy.dataTest('device_fingerprint_velocity').should('have.text', '');
			cy.dataTest('ip_address_velocity').should('have.text', '');
			cy.dataTest('purchase_fingerprint_velocity').should('have.text', '');
			cy.dataTest('user_fingerprint_velocity').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameDataFixture = this.fraudgameDataFixture;
			for (let i in fraudgameDataFixture) {
				const trans = fraudgameDataFixture[i];
				const device_fingerprint_velocity_val = trans.device_fingerprint_velocity;
				const ip_address_velocity_val = trans.ip_address_velocity;
				const purchase_fingerprint_velocity_val = trans.purchase_fingerprint_velocity;
				const user_fingerprint_velocity_val = trans.user_fingerprint_velocity;

				cy.recoilMount(
					<FraudGameVelocity
						device_fingerprint_velocity={device_fingerprint_velocity_val}
						ip_address_velocity={ip_address_velocity_val}
						purchase_fingerprint_velocity={purchase_fingerprint_velocity_val}
						user_fingerprint_velocity={user_fingerprint_velocity_val}
					/>,
				);
				cy.dataTest('device_fingerprint_velocity').should('have.text', device_fingerprint_velocity_val);
				cy.dataTest('ip_address_velocity').should('have.text', ip_address_velocity_val);
				cy.dataTest('purchase_fingerprint_velocity').should('have.text', purchase_fingerprint_velocity_val);
				cy.dataTest('user_fingerprint_velocity').should('have.text', user_fingerprint_velocity_val);
			}
		});
	});
});
