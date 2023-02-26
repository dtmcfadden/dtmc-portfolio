import FraudGameSingleLayout from './fraudgameSingleLayout';
import { PurchaseTrans } from '@/interfaces/fraud.interface';

describe('componenets', () => {
	describe('FraudGameSingleLayout', () => {
		it('should render', () => {
			cy.fixture('fraudgameData').then((fraudgameDataFixture) => {
				const fraudgameDataJSON: PurchaseTrans = fraudgameDataFixture[0];
				const index: number = 0;
				const getFraudData: Function = () => {};
				cy.recoilMount(
					<FraudGameSingleLayout transSingle={fraudgameDataJSON} index={index} getFraudData={getFraudData} />,
				);
			});
		});
	});
});
