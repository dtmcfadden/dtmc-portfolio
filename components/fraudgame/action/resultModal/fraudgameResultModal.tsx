// import type { NextApiRequest, NextApiResponse } from 'next';
import { Button, Modal } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useOnClickShared } from '@/lib/sharedHooks';

interface IAction {
	resultMsg: string;
	passShown: boolean | undefined;
	handleModalShow: Function;
	getFraudData: Function;
}

export default function FraudGameResultModal({ resultMsg, passShown, handleModalShow, getFraudData }: IAction) {
	const { handleHrefOnClick } = useOnClickShared();
	const handleClose = () => handleModalShow(false);
	const handlePlay = () => getFraudData();
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
				<Button variant="primary" href="/fraudgame" onClick={handleHrefOnClick}>
					Quit
				</Button>
				<Button variant="success" onClick={handlePlay}>
					Next
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
