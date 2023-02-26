// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useState } from 'react';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../../fraudgameDescription';
import { TitleConstDesc } from '../../fraudgameEnum';

interface IVelocity {
	device_fingerprint_velocity: string;
	ip_address_velocity: string;
	purchase_fingerprint_velocity: string;
	user_fingerprint_velocity: string;
}

export default function FraudGameVelocity({
	device_fingerprint_velocity,
	ip_address_velocity,
	purchase_fingerprint_velocity,
	user_fingerprint_velocity,
}: IVelocity) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="Velocity">
			{/* <Card.Text> */}
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.IP_address_velocity} text="IP Address Velocity" />
						</td>
						<td data-test="ip_address_velocity">{ip_address_velocity}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription
								titleText={TitleConstDesc.Device_fingerprint_velocity}
								text="Device Fingerprint Velocity"
							/>
						</td>
						<td data-test="device_fingerprint_velocity">{device_fingerprint_velocity}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription
								titleText={TitleConstDesc.Purchase_fingerprint_velocity}
								text="Purchase Fingerprint Velocity"
							/>
						</td>
						<td data-test="purchase_fingerprint_velocity">{purchase_fingerprint_velocity}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription
								titleText={TitleConstDesc.User_fingerprint_velocity}
								text="User Fingerprint Velocity"
							/>
						</td>
						<td data-test="user_fingerprint_velocity">{user_fingerprint_velocity}</td>
					</tr>
				</tbody>
			</Table>
			{/* <Container fluid> */}
			{/* <Row>
					<Col>
						<FraudGameDescription titleText={TitleConstDesc.IP_address_velocity} text="IP Address Velocity" />
					</Col>
					<Col>{ip_address_velocity}</Col>
				</Row>
				<Row>
					<Col>
						<FraudGameDescription
							titleText={TitleConstDesc.Device_fingerprint_velocity}
							text="Device Fingerprint Velocity"
						/>
					</Col>
					<Col>{device_fingerprint_velocity}</Col>
				</Row>
				<Row>
					<Col>
						<FraudGameDescription
							titleText={TitleConstDesc.Purchase_fingerprint_velocity}
							text="Purchase Fingerprint Velocity"
						/>
					</Col>
					<Col>{purchase_fingerprint_velocity}</Col>
				</Row>
				<Row>
					<Col>
						<FraudGameDescription
							titleText={TitleConstDesc.User_fingerprint_velocity}
							text="User Fingerprint Velocity"
						/>
					</Col>
					<Col>{user_fingerprint_velocity}</Col>
				</Row> */}
			{/* </Container> */}
			{/* </Card.Text> */}
		</CustomCard>
	);
}
