// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useState } from 'react';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../../fraudgameDescription';
import { TitleConstDesc } from '../../fraudgameEnum';

interface IIP {
	ip_address: string;
	ip_country: string | null;
	ip_history_fraudulent: string;
	ip_history_total: string;
	ip_address_velocity: string;
}

export default function FraudGameIP({
	ip_address,
	ip_country,
	ip_history_fraudulent,
	ip_history_total,
	ip_address_velocity,
}: IIP) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="IP Address">
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.IP_address} text="IP Address" />
						</td>
						<td data-test="ip_address">{ip_address}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.IP_country} text="IP Country" />
						</td>
						<td data-test="ip_country">{ip_country}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.IP_history_fraudulent} text="IP History Fraudulent" />
						</td>
						<td data-test="ip_history_fraudulent">{ip_history_fraudulent}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.IP_history_total} text="IP History Total" />
						</td>
						<td data-test="ip_history_total">{ip_history_total}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.IP_address_velocity} text="IP Address Velocity" />
						</td>
						<td data-test="ip_address_velocity">{ip_address_velocity}</td>
					</tr>
				</tbody>
			</Table>
		</CustomCard>
	);
}
