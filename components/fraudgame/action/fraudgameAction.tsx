// import type { NextApiRequest, NextApiResponse } from 'next';
import { Button, Card, Col, Container, Image, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
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
	const [modalShown, setModalShown] = useState(false);
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);

	const handleModalShow = (show: boolean) => setModalShown(show);

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
		setResultMessage(msg);
		setModalShown(true);
	};
	const handleReject = () => {
		let msg = 'You chose to reject this order ';
		if (checkFraud('1')) {
			msg += 'and it was correct.';
		} else {
			msg += 'when it was actually a good order.';
		}
		setResultMessage(msg);
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
			{errorMessage && <div className={'text-danger'}>{errorMessage}</div>}
			<FraudGameResultModal
				resultMsg={resultMessage}
				passShown={modalShown}
				handleModalShow={handleModalShow}
				getFraudData={getFraudData}
			/>
		</CustomCard>
	);
}
