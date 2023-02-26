import { Button } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';
import { useOnClickShared } from '@/lib/sharedHooks';

export default function FraudPlayTheGame() {
	const { handleHrefOnClick } = useOnClickShared();
	const {
		bg: themeBg,
		border: themeBorder,
		button: themeButton,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard>
			<Button
				variant="success"
				href="/fraudgame/play"
				data-test="fraud_play_btn"
				className={`w-100 submit ${themeButton} border ${themeBorder}`}
				onClick={handleHrefOnClick}
			>
				Play
			</Button>
		</CustomCard>
	);
}
