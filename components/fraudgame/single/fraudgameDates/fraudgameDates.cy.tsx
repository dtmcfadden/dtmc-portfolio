import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameDates from './fraudgameDates';

describe('componenets', () => {
	describe('FraudGameDates', () => {
		beforeEach(() => {
			cy.fixture('fraudgameData').then(function (fraudgameDataFixture: PurchaseTrans[]) {
				this.fraudgameDataFixture = fraudgameDataFixture;
			});
		});

		it('should render with empty values', () => {
			cy.recoilMount(<FraudGameDates signup_time={''} purchase_time={''} signup_purchase_diff_sec={''} />);
			cy.dataTest('signupDT').should('have.text', 'Invalid Date');
			cy.dataTest('purchaseDT').should('have.text', 'Invalid Date');
			cy.dataTest('signup_purchase_diff_sec').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameDataFixture = this.fraudgameDataFixture;
			for (let i in fraudgameDataFixture) {
				const trans = fraudgameDataFixture[i];

				const signup_time_val = trans.signup_time;
				const purchase_time_val = trans.purchase_time;
				const signup_purchase_diff_sec_val = trans.signup_purchase_diff_sec;

				cy.recoilMount(
					<FraudGameDates
						signup_time={signup_time_val}
						purchase_time={purchase_time_val}
						signup_purchase_diff_sec={signup_purchase_diff_sec_val}
					/>,
				);
				const signupDTNew = new Date(signup_time_val);
				cy.dataTest('signupDT').should('have.text', signupDTNew.toLocaleString());
				const purchaseDTNew = new Date(purchase_time_val);
				cy.dataTest('purchaseDT').should('have.text', purchaseDTNew.toLocaleString());
				cy.dataTest('signup_purchase_diff_sec').should('have.text', `${signup_purchase_diff_sec_val} Sec`);
			}
		});
	});
});
