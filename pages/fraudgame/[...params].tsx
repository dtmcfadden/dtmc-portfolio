import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import { ParsedUrlQuery } from 'querystring';
import { Container } from 'react-bootstrap';
import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameSingleLayout from '@/components/fraudgame/single/fraudgameSingleLayout';
import styles from '@/components/fraudgame/fraudgameContainer.module.css';

const FraudGame = () => {
	const router = useRouter();
	const query = router.query;
	// console.log('query', query);
	const [transData, setTransData] = useState([]);

	const getFraudData = async (query: ParsedUrlQuery) => {
		// console.log('getFraudData query', query);
		// console.log('getFraudData typeof query.params', typeof query.params);
		// console.log('getFraudData typeof query.params.length', query.params.length);
		if (query && query.params && typeof query.params === 'object' && query.params.length > 0) {
			const params: string[] = query.params;
			// console.log('params:', params);
			let sendParams = 'play';
			if (params.length == 1) {
				if (params[0] != sendParams) {
					sendParams = 'id/' + params[0];
				}
			} else {
				if (params.length % 2 == 0) {
					sendParams = params.join('/');
				}
			}
			// console.log('sendParams', sendParams);
			// console.log('server', server);
			const response = await fetch(`${server}/api/fraud/${sendParams}`);
			// console.log('getFraudData response', response);
			// console.log('getFraudData response.text()', response.text());

			const data = await response.json();
			// console.log('getFraudData data', data);
			setTransData(data);
		}
	};

	useEffect(() => {
		getFraudData(query);
	}, [query]);
	// console.log('router.query', router.query);

	// return <p>Test</p>;
	return (
		<Container fluid className={`${styles.topContainer}`}>
			{transData &&
				Object.values(transData).map((trans: PurchaseTrans, index: number) => (
					<FraudGameSingleLayout key={trans.id} transSingle={trans} index={index} getFraudData={getFraudData} />
				))}
		</Container>
	);
};

export default FraudGame;
