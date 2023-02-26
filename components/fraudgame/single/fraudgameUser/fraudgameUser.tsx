// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useState } from 'react';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../../fraudgameDescription';
import { TitleConstDesc } from '../../fraudgameEnum';

interface IUser {
	sex: string;
	age: string;
	user_fingerprint: string;
	user_fingerprint_velocity: string;
}

export default function FraudGameUser({ sex, age, user_fingerprint, user_fingerprint_velocity }: IUser) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="User">
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Gender} text="Gender" />
						</td>
						<td data-test="sex">{sex}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Age} text="Age" />
						</td>
						<td data-test="age">{age}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.User_fingerprint} text="User Fingerprint" />
						</td>
						<td data-test="user_fingerprint">{user_fingerprint}</td>
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
		</CustomCard>
	);
}
