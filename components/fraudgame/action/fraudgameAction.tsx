// import type { NextApiRequest, NextApiResponse } from 'next';
import { Button, Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import CustomCard from '@/components/customCard/customCard';
import FraudGameDescription from '../fraudgameDescription';
import { TitleConstDesc } from '../fraudgameEnum';
import FraudGameResultModal from './resultModal/fraudgameResultModal';

interface IAction {
	id: string;
	is_fraud: string;
	getFraudData: Function;
}

export default function FraudGameAction({ id, is_fraud, getFraudData }: IAction) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [resultMessage, setResultMessage] = useState('');
	const [resultModalMessage, setResultModalMessage] = useState('');
	const [modalShown, setModalShown] = useState(false);
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);

	const handleModalShow = (show: boolean) => setModalShown(show);

	const submitAction = async (select_fraud: boolean) => {
		setIsSubmitting(true);
		const bodyData = { id: id, is_fraud: select_fraud };
		// console.log('submitAction bodyData', bodyData);
		const response = await fetch(`${server}/api/fraud/user/action`, {
			method: 'POST',
			body: JSON.stringify(bodyData),
		});
		console.log('FraudGameAction submitAction response', response);
		const data = await response.json();
		// console.log('getFraudData data', data);
		if (data.error) {
			setErrorMessage(data.error);
		} else if (data.is_fraud != undefined) {
			const result = `You previously ${data.is_fraud == 0 ? 'Accepted' : 'Rejected'} this transaction.`;
			setResultMessage(result);
		}
		setIsSubmitting(false);
	};

	const checkFraud = (choice: string) => {
		return choice == is_fraud;
	};

	const handleAccept = () => {
		let msg = 'You chose to accept this order ';
		if (checkFraud('0')) {
			msg += 'and it was correct.';
		} else {
			msg += 'when it was actually fraudulent.';
		}
		submitAction(false);
		setResultModalMessage(msg);
		setModalShown(true);
	};

	const handleReject = () => {
		let msg = 'You chose to reject this order ';
		if (checkFraud('1')) {
			msg += 'and it was correct.';
		} else {
			msg += 'when it was actually a good order.';
		}
		submitAction(true);
		setResultModalMessage(msg);
		setModalShown(true);
	};

	return (
		<CustomCard header="Action">
			<Table striped bordered hover variant={themeVariant} size="sm" className={`m-0`}>
				<tbody className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
					<tr>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Accept}>
								<Button variant="success" disabled={isSubmitting} onClick={handleAccept}>
									Accept
								</Button>
							</FraudGameDescription>
						</td>
						<td>
							<FraudGameDescription titleText={TitleConstDesc.Reject}>
								<Button variant="danger" disabled={isSubmitting} onClick={handleReject}>
									Reject
								</Button>
							</FraudGameDescription>
						</td>
					</tr>
				</tbody>
			</Table>
			{resultMessage && <div className={`${themeText}`}>{resultMessage}</div>}
			{errorMessage && <div className={'text-danger'}>{errorMessage}</div>}
			<FraudGameResultModal
				resultMsg={resultModalMessage}
				passShown={modalShown}
				handleModalShow={handleModalShow}
				getFraudData={getFraudData}
			/>
		</CustomCard>
	);
}
