import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import { Container, Spinner } from 'react-bootstrap';
import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameSingleLayout from '@/components/fraudgame/single/fraudgameSingleLayout';
import styles from '@/components/fraudgame/fraudgameContainer.module.css';

const FraudPlay = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [transData, setTransData] = useState([]);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const getFraudData = async () => {
		setIsLoading(true);
		// const response = await fetch(`${server}/api/fraud/play`);
		const response = await fetch(`${server}/api/fraud/play`);
		console.log('getFraudData response', response);
		// console.log('getFraudData response.text()', await response.text());
		try {
			// const data = await response.json();
			const text = await response.text();
			if (text != '') {
				const data = JSON.parse(text);
				console.log('getFraudData data', data);
				if (data) {
					console.log('getFraudData data', data);
					if (data.error) {
						setErrorMsg(data.error);
					} else {
						setErrorMsg(null);
						setTransData(data);
					}
				} else {
					setErrorMsg('No order found');
				}
			} else {
				setErrorMsg('Service not running');
			}
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				setErrorMsg(error.message);
				console.error(error.message);
			}
		}
	};

	useEffect(() => {
		getFraudData();
	}, []);
	// console.log('router.query', router.query);

	// return <p>Test</p>;
	return (
		<Container fluid className={`${styles.topContainer}`}>
			{isLoading && <Spinner animation="border" />}
			{errorMsg && <div className={'text-danger text-center'}>{errorMsg}</div>}
			{!errorMsg &&
				transData &&
				Object.values(transData).map((trans: PurchaseTrans, index: number) => (
					<FraudGameSingleLayout key={trans.id} transSingle={trans} index={index} getFraudData={getFraudData} />
				))}
		</Container>
	);
};

export default FraudPlay;
