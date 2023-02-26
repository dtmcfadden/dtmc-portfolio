import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudTransStats from './fraudgameTransStats';

describe('componenets', () => {
	describe('FraudTransStats', () => {
		beforeEach(() => {
			cy.fixture('fraudgameTransStatsData').then(function (fraudgameTransStatsDataFixture: PurchaseTrans[]) {
				this.fraudgameTransStatsDataFixture = fraudgameTransStatsDataFixture;
			});
		});

		it('should render with null values', () => {
			cy.recoilMount(<FraudTransStats trans_is_fraud_count={null} trans_total_count={null} />);
			cy.dataTest('trans_is_fraud_count').should('have.text', '');
			cy.dataTest('trans_non_fraud_count').should('have.text', '');
			cy.dataTest('trans_total_count').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameTransStatsDataFixture = this.fraudgameTransStatsDataFixture;
			for (let i in fraudgameTransStatsDataFixture) {
				const trans = fraudgameTransStatsDataFixture[i];

				const trans_is_fraud_count_val = trans.trans_is_fraud_count;
				const trans_total_count_val = trans.trans_total_count;

				cy.recoilMount(
					<FraudTransStats trans_is_fraud_count={trans_is_fraud_count_val} trans_total_count={trans_total_count_val} />,
				);
				cy.dataTest('trans_is_fraud_count').should('have.text', trans_is_fraud_count_val);
				cy.dataTest('trans_non_fraud_count').should('have.text', trans_total_count_val - trans_is_fraud_count_val);
				cy.dataTest('trans_total_count').should('have.text', trans_total_count_val);
			}
		});
	});
});
