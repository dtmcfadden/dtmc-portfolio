import FraudGameSingleLayout from './fraudgameSingleLayout';
import { PurchaseTrans } from '@/interfaces/fraud.interface';

describe('componenets', () => {
	describe('FraudGameSingleLayout', () => {
		it('should render', () => {
			cy.fixture('fraudgameData').then((fraudgameDataFixture) => {
				// cy.log(`fraudgameDataFixture:`);
				// cy.log(fraudgameDataFixture);
				const fraudgameDataJSON: PurchaseTrans = fraudgameDataFixture[0];
				// cy.log(`fraudgameDataJSON:`);
				// cy.log(JSON.stringify(fraudgameDataJSON));
				const index: number = 0;
				const getFraudData: Function = () => {};
				cy.recoilMount(
					<FraudGameSingleLayout
						key={fraudgameDataJSON.id}
						transSingle={fraudgameDataJSON}
						index={index}
						getFraudData={getFraudData}
					/>,
				);
			});
		});
	});
});
