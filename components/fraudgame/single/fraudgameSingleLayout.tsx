// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useState } from 'react';
import { PurchaseTrans } from '@/interfaces/fraud.interface';
import CustomCard from '@/components/customCard/customCard';
import FraudGameVelocity from './fraudgameVelocity/fraudgameVelocity';
import FraudGameDates from './fraudgameDates/fraudgameDates';
import FraudGameIP from './fraudgameIP/fraudgameIP';
import FraudGameDevice from './fraudgameDevice/fraudgameDevice';
import FraudGamePurchase from './fraudgamePurchase/fraudgamePurchase';
import FraudGameUser from './fraudgameUser/fraudgameUser';
import FraudGameAction from '../action/fraudgameAction';

interface Props {
	transSingle: PurchaseTrans;
	index: number;
	getFraudData: Function;
}

export default function FraudGameSingleLayout({ transSingle, index, getFraudData }: Props) {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<CustomCard key={transSingle.id} header={`Transaction ID: ${transSingle.id}`}>
			<Row className={'m-0'}>
				<Col md={'auto'} className={'p-1'}>
					<Row className={'m-0'}>
						<Col sm={'auto'} className={'p-1'}>
							<FraudGameDates
								key={transSingle.id}
								signup_time={transSingle.signup_time}
								purchase_time={transSingle.purchase_time}
								signup_purchase_diff_sec={transSingle.signup_purchase_diff_sec}
							/>
						</Col>
						{/* <Col sm={'auto'} className={'p-1'}>
							<FraudGameVelocity
								key={transSingle.id}
								device_fingerprint_velocity={transSingle.device_fingerprint_velocity}
								ip_address_velocity={transSingle.ip_address_velocity}
								purchase_fingerprint_velocity={transSingle.purchase_fingerprint_velocity}
								user_fingerprint_velocity={transSingle.user_fingerprint_velocity}
							/>
						</Col> */}
						<Col sm={'auto'} className={'p-1'}>
							<FraudGameUser
								key={transSingle.id}
								sex={transSingle.sex}
								age={transSingle.age}
								user_fingerprint={transSingle.user_fingerprint}
								user_fingerprint_velocity={transSingle.user_fingerprint_velocity}
							/>
						</Col>
					</Row>
				</Col>
				<Col md={'auto'} className={'p-1'}>
					<Row className={'m-0'}>
						<Col sm={'auto'} className={'p-1'}>
							<FraudGamePurchase
								key={transSingle.id}
								purchase_value={transSingle.purchase_value}
								purchase_fingerprint={transSingle.purchase_fingerprint}
								purchase_fingerprint_velocity={transSingle.purchase_fingerprint_velocity}
								source={transSingle.source}
							/>
						</Col>
						<Col sm={'auto'} className={'p-1'}>
							<FraudGameIP
								key={transSingle.id}
								ip_address={transSingle.ip_address}
								ip_country={transSingle.ip_country}
								ip_history_fraudulent={transSingle.ip_history_fraudulent}
								ip_history_total={transSingle.ip_history_total}
								ip_address_velocity={transSingle.ip_address_velocity}
							/>
						</Col>
						<Col sm={'auto'} className={'p-1'}>
							<FraudGameDevice
								key={transSingle.id}
								device_id={transSingle.device_id}
								browser={transSingle.browser}
								device_fingerprint={transSingle.device_fingerprint}
								device_fingerprint_velocity={transSingle.device_fingerprint_velocity}
							/>
						</Col>
						<Col sm={'auto'} className={'p-1'}>
							<FraudGameAction
								key={transSingle.id}
								id={transSingle.id}
								is_fraud={transSingle.is_fraud}
								getFraudData={getFraudData}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</CustomCard>
	);
}
