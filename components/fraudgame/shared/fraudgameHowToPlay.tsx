import { Card } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';

export default function FraudHowToPlay() {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="How to play">
			<Card.Text>You will be given a random transaction with data.</Card.Text>
			<Card.Text>If you think the transaction is fraud click the Reject button. Otherwise click Accept.</Card.Text>
		</CustomCard>
	);
}
