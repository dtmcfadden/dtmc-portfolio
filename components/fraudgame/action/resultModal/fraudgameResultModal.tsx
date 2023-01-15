// import type { NextApiRequest, NextApiResponse } from 'next';
import { Button, Card, Col, Container, Image, Modal, Row, Stack, Table } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface IAction {
	resultMsg: string;
	passShown: boolean | undefined;
	handleModalShow: Function;
	getFraudData: Function;
}

export default function FraudGameResultModal({ resultMsg, passShown, handleModalShow, getFraudData }: IAction) {
	const router = useRouter();

	const handleClose = () => handleModalShow(false);
	const handleQuit = () => {
		// console.log('Quitting');
		router.push('/fraudgame');
	};
	const handlePlay = () => {
		// console.log('Playing Again');
		getFraudData(router.query);
	};
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);

	return (
		<Modal show={passShown} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Action Result</Modal.Title>
			</Modal.Header>
			<Modal.Body>{resultMsg}</Modal.Body>
			<Modal.Footer>
				<Button variant="info" onClick={handleClose}>
					Try Again
				</Button>
				<Button variant="primary" onClick={handleQuit}>
					Quit
				</Button>
				<Button variant="success" onClick={handlePlay}>
					Next
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
