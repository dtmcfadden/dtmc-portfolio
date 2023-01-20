import { Card, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import CustomCard from '@/components/customCard/customCard';
import { server } from '@/config/index';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import FraudUserStats from '@/components/fraudgame/shared/fraudgameUserStats';
import FraudTransStats from '@/components/fraudgame/shared/fraudgameTransStats';
import FraudHowToPlay from '@/components/fraudgame/shared/fraudgameHowToPlay';
import FraudAboutTheGame from '@/components/fraudgame/shared/fraudgameAboutTheGame';
import FraudPlayTheGame from '@/components/fraudgame/shared/fraudgamePlay';

const FraudGame = () => {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	const { data: session, status } = useSession();

	const [transStats, setTransStats] = useState({ trans_is_fraud_count: 0, trans_total_count: 0 });
	const [userStats, setUserStats] = useState({
		user_action_count: 0,
		user_action_is_fraud_count: 0,
		user_correct_match: 0,
	});

	const getFraudTransStats = async () => {
		// console.log('getFraudTransStats');

		const response = await fetch(`${server}/api/fraud/user/stats`);
		// console.log('getFraudData response', response);

		const data = await response.json();
		// console.log('getFraudTransStats data', data);
		setTransStats({ trans_is_fraud_count: data.trans_is_fraud_count, trans_total_count: data.trans_total_count });
		setUserStats({
			user_action_count: data.user_action_count,
			user_action_is_fraud_count: data.user_action_is_fraud_count,
			user_correct_match: data.user_correct_match,
		});
	};

	useEffect(() => {
		console.log('FraudGame status', status);
		if (['unauthenticated', 'authenticated'].indexOf(status) != -1) {
			getFraudTransStats();
		}
	}, [status]);

	return (
		<Container>
			<Stack gap={3}>
				<FraudPlayTheGame />
				<Row>
					{userStats.user_action_count != null && (
						<Col>
							<FraudUserStats
								user_action_is_fraud_count={userStats.user_action_is_fraud_count}
								user_action_count={userStats.user_action_count}
								user_correct_match={userStats.user_correct_match}
							/>
						</Col>
					)}
					<Col>
						<FraudTransStats
							trans_is_fraud_count={transStats.trans_is_fraud_count}
							trans_total_count={transStats.trans_total_count}
						/>
					</Col>
				</Row>
				<FraudHowToPlay />
				<FraudAboutTheGame />
			</Stack>
		</Container>
	);
};

export default FraudGame;
