import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudUserStats from './fraudgameUserStats';

describe('componenets', () => {
	describe('FraudUserStats', () => {
		beforeEach(() => {
			cy.fixture('fraudgameUserActionStatsData').then(function (fraudgameUserActionStatsDataFixture: PurchaseTrans[]) {
				this.fraudgameUserActionStatsDataFixture = fraudgameUserActionStatsDataFixture;
			});
		});

		it('should render with null values', () => {
			cy.recoilMount(
				<FraudUserStats user_action_is_fraud_count={null} user_action_count={null} user_correct_match={null} />,
			);
			cy.dataTest('user_action_is_fraud_count').should('have.text', '');
			cy.dataTest('user_action_non_fraud_count').should('have.text', '');
			cy.dataTest('user_action_count').should('have.text', '');
			cy.dataTest('user_correct_match').should('have.text', '');
		});

		it('should render with filled values', function () {
			const fraudgameUserActionStatsDataFixture = this.fraudgameUserActionStatsDataFixture;
			for (let i in fraudgameUserActionStatsDataFixture) {
				const trans = fraudgameUserActionStatsDataFixture[i];

				const user_action_is_fraud_count_val = trans.user_action_is_fraud_count;
				const user_action_count_val = trans.user_action_count;
				const user_correct_match_val = trans.user_correct_match;

				cy.recoilMount(
					<FraudUserStats
						user_action_is_fraud_count={user_action_is_fraud_count_val}
						user_action_count={user_action_count_val}
						user_correct_match={user_correct_match_val}
					/>,
				);
				cy.dataTest('user_action_is_fraud_count').should('have.text', user_action_is_fraud_count_val);
				cy.dataTest('user_action_non_fraud_count').should(
					'have.text',
					user_action_count_val - user_action_is_fraud_count_val,
				);
				cy.dataTest('user_action_count').should('have.text', user_action_count_val);
				cy.dataTest('user_correct_match').should('have.text', user_correct_match_val);
			}
		});
	});
});
