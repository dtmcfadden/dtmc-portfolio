import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameDevice from './fraudgameDevice';

describe('componenets', () => {
	describe('FraudGameDevice', () => {
		beforeEach(() => {
			cy.fixture('fraudgameData').then(function (fraudgameDataFixture: PurchaseTrans[]) {
				this.fraudgameDataFixture = fraudgameDataFixture;
			});
		});

		it('should render with empty values', () => {
			cy.recoilMount(
				<FraudGameDevice device_id={''} browser={''} device_fingerprint={''} device_fingerprint_velocity={''} />,
			);
			cy.dataTest('device_id').should('have.text', '');
			cy.dataTest('browser').should('have.text', '');
			cy.dataTest('device_fingerprint').should('have.text', '');
			cy.dataTest('device_fingerprint_velocity').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameDataFixture = this.fraudgameDataFixture;
			for (let i in fraudgameDataFixture) {
				const trans = fraudgameDataFixture[i];

				const device_id_val = trans.device_id;
				const browser_val = trans.browser;
				const device_fingerprint_val = trans.device_fingerprint;
				const device_fingerprint_velocity_val = trans.device_fingerprint_velocity;

				cy.recoilMount(
					<FraudGameDevice
						device_id={device_id_val}
						browser={browser_val}
						device_fingerprint={device_fingerprint_val}
						device_fingerprint_velocity={device_fingerprint_velocity_val}
					/>,
				);
				cy.dataTest('device_id').should('have.text', device_id_val);
				cy.dataTest('browser').should('have.text', browser_val);
				cy.dataTest('device_fingerprint').should('have.text', device_fingerprint_val);
				cy.dataTest('device_fingerprint_velocity').should('have.text', device_fingerprint_velocity_val);
			}
		});
	});
});
