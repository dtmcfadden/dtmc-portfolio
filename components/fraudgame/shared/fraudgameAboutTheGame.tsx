import { Card } from 'react-bootstrap';
// import styles from './fraudgameAboutTheGame.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';
import Link from 'next/link';

export default function FraudAboutTheGame() {
	const {
		bg: themeBg,
		border: themeBorder,
		text: themeText,
		variant: themeVariant,
	} = useRecoilValue(selectThemeSiteState);
	return (
		<CustomCard header="About the game">
			<Card.Text>I wanted to demonstrate a simple fraud manual review layout.</Card.Text>
			<Card.Text>
				I found a dataset on <Link href="https://www.kaggle.com/datasets/vbinh002/fraud-ecommerce">kaggle</Link> with
				some basic information.
			</Card.Text>
			<Card.Text>
				Database connections and other logic are handled by a separate python service. This is hosted on google cloud
				run. Here is the <Link href="https://github.com/dtmcfadden/python-flask-fraud-data-extract">repository</Link>.
			</Card.Text>
		</CustomCard>
	);
}
