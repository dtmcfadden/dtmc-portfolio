// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../../fraudgameDescription';
import { TitleConstDesc } from '../../fraudgameEnum';

interface IDates {
	signup_time: string;
	purchase_time: string;
	signup_purchase_diff_sec: string;
}

export default function FraudGameDates({ signup_time, purchase_time, signup_purchase_diff_sec }: IDates) {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	const [signupDT, setSignupDT] = useState('');
	const [purchaseDT, setPurchaseDT] = useState('');

	useEffect(() => {
		const signupDTNew = new Date(signup_time);
		setSignupDT(signupDTNew.toLocaleString());
	}, [signup_time]);

	useEffect(() => {
		const purchaseDTNew = new Date(purchase_time);
		setPurchaseDT(purchaseDTNew.toLocaleString());
	}, [purchase_time]);

	return (
		<CustomCard header="Dates">
			{/* <Card.Text> */}
			{/* <Container fluid> */}
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Signup_time} text="Signup Date" />
						</td>
						<td>{signupDT}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Purchase_time} text="Purchase Date" />
						</td>
						<td>{purchaseDT}</td>
					</tr>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Signup_purchase_diff_sec} text="Difference" />
						</td>
						<td>
							{signup_purchase_diff_sec}
							{signup_purchase_diff_sec && <span title="Second(s)"> Sec</span>}
						</td>
					</tr>
				</tbody>
			</Table>

			{/* <Row>
						<Col>
							<FraudGameDescription titleText={TitleConstDesc.Signup_time} text="Signup Date" />
						</Col>
						<Col>{signupDT}</Col>
					</Row>
					<Row>
						<Col>
							<FraudGameDescription titleText={TitleConstDesc.Purchase_time} text="Purchase Date" />
						</Col>
						<Col>{purchaseDT}</Col>
					</Row>
					<Row>
						<Col>
							<FraudGameDescription titleText={TitleConstDesc.Signup_purchase_diff_sec} text="Difference" />
						</Col>
						<Col>{signup_purchase_diff_sec}</Col>
					</Row> */}
			{/* </Container> */}
			{/* </Card.Text> */}
		</CustomCard>
	);
}
