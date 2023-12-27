import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import { Container, Spinner } from 'react-bootstrap';
import { PurchaseTrans } from '@/interfaces/fraud.interface';
import FraudGameSingleLayout from '@/components/fraudgame/single/fraudgameSingleLayout';
import styles from '@/components/fraudgame/fraudgameContainer.module.css';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const FraudPlayById = () => {
	const params = useParams();
	console.log(`FraudPlayById params: ${params}`);
	console.log(params);

	const [isLoading, setIsLoading] = useState(true);
	const [transData, setTransData] = useState([]);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const getFraudData = async (params: Params) => {
		setIsLoading(true);
		console.log(`getFraudData params: ${params}`);
		if (params && params.id) {
			const response = await fetch(`${server}/api/fraud/id/${params.id}`);
			console.log('getFraudData response', response);
			// console.log('getFraudData response.text()', response.text());
			try {
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
		}
	};

	useEffect(() => {
		getFraudData(params);
	}, [params]);
	// console.log('router.query', router.query);

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

export default FraudPlayById;
