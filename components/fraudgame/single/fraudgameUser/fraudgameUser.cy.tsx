import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameUser from './fraudgameUser';

describe('componenets', () => {
	describe('FraudGameUser', () => {
		beforeEach(() => {
			cy.fixture('fraudgameData').then(function (fraudgameDataFixture: PurchaseTrans[]) {
				this.fraudgameDataFixture = fraudgameDataFixture;
			});
		});

		it('should render with empty values', () => {
			cy.recoilMount(<FraudGameUser sex={''} age={''} user_fingerprint={''} user_fingerprint_velocity={''} />);
			cy.dataTest('sex').should('have.text', '');
			cy.dataTest('age').should('have.text', '');
			cy.dataTest('user_fingerprint').should('have.text', '');
			cy.dataTest('user_fingerprint_velocity').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameDataFixture = this.fraudgameDataFixture;
			for (let i in fraudgameDataFixture) {
				const trans = fraudgameDataFixture[i];
				const sex_val = trans.sex;
				const age_val = trans.age;
				const user_fingerprint_val = trans.user_fingerprint;
				const user_fingerprint_velocity_val = trans.user_fingerprint_velocity;

				cy.recoilMount(
					<FraudGameUser
						sex={sex_val}
						age={age_val}
						user_fingerprint={user_fingerprint_val}
						user_fingerprint_velocity={user_fingerprint_velocity_val}
					/>,
				);
				cy.dataTest('sex').should('have.text', sex_val);
				cy.dataTest('age').should('have.text', age_val);
				cy.dataTest('user_fingerprint').should('have.text', user_fingerprint_val);
				cy.dataTest('user_fingerprint_velocity').should('have.text', user_fingerprint_velocity_val);
			}
		});
	});
});
