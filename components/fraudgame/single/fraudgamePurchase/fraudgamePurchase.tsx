// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useState } from 'react';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../../fraudgameDescription';
import { TitleConstDesc } from '../../fraudgameEnum';

interface IPurchase {
	purchase_value: string;
	purchase_fingerprint: string;
	purchase_fingerprint_velocity: string;
	source: string;
}

export default function FraudGamePurchase({
	purchase_value,
	purchase_fingerprint,
	purchase_fingerprint_velocity,
	source,
}: IPurchase) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="Purchase">
			{/* <Card.Text>
				<Container fluid> */}
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Purchase_value} text="Purchase Amount" />
						</td>
						<td>{purchase_value}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Source} text="Source" />
						</td>
						<td>{source}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Purchase_fingerprint} text="Purchase Fingerprint" />
						</td>
						<td>{purchase_fingerprint}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription
								titleText={TitleConstDesc.Purchase_fingerprint_velocity}
								text="Purchase Fingerprint Velocity"
							/>
						</td>
						<td>{purchase_fingerprint_velocity}</td>
					</tr>
				</tbody>
			</Table>
			{/* <Row>
						<Col>
							<FraudGameDescription titleText={TitleConstDesc.Purchase_value} text="Purchase Amount" />
						</Col>
						<Col>{purchase_value}</Col>
					</Row>
					<Row>
						<Col>
							<FraudGameDescription titleText={TitleConstDesc.Source} text="Source" />
						</Col>
						<Col>{source}</Col>
					</Row>
					<Row>
						<Col>
							<FraudGameDescription titleText={TitleConstDesc.Purchase_fingerprint} text="Purchase Fingerprint" />
						</Col>
						<Col>{purchase_fingerprint}</Col>
					</Row>
					<Row>
						<Col>
							<FraudGameDescription
								titleText={TitleConstDesc.Purchase_fingerprint_velocity}
								text="Purchase Fingerprint Velocity"
							/>
						</Col>
						<Col>{purchase_fingerprint_velocity}</Col>
					</Row> */}
			{/* </Container>
			</Card.Text> */}
		</CustomCard>
	);
}
