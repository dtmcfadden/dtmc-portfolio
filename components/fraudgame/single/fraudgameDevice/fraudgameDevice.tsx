// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useState } from 'react';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../../fraudgameDescription';
import { TitleConstDesc } from '../../fraudgameEnum';

interface IDevice {
	device_id: string;
	browser: string;
	device_fingerprint: string;
	device_fingerprint_velocity: string;
}

export default function FraudGameDevice({
	device_id,
	browser,
	device_fingerprint,
	device_fingerprint_velocity,
}: IDevice) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="Device">
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Device_id} text="Device ID" />
						</td>
						<td>{device_id}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Browser} text="Browser" />
						</td>
						<td>{browser}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Device_fingerprint} text="Device Fingerprint" />
						</td>
						<td>{device_fingerprint}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription
								titleText={TitleConstDesc.Device_fingerprint_velocity}
								text="Device Fingerprint Velocity"
							/>
						</td>
						<td>{device_fingerprint_velocity}</td>
					</tr>
				</tbody>
			</Table>
		</CustomCard>
	);
}
