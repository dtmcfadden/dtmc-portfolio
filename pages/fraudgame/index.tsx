import { Card, Col, Container, Row } from 'react-bootstrap';
import CustomCard from '@/components/customCard/customCard';
import Link from 'next/link';

const FraudGame = () => {
	// const {
	// 	bg: themeBg,
	// 	variant: themeVariant,
	// 	text: themeText,
	// 	border: themeBorder,
	// } = useRecoilValue(selectThemeSiteState);

	return (
		<Container>
			<CustomCard
				title="How to play"
				text="You will be given a random transaction with data. If you think the transaction is fraud click the Reject button. Otherwise click Accept."
			/>

			<CustomCard title="About the game" text="I wanted to demonstrate a simple fraud manual review layout.">
				<Card.Text>
					I found a dataset on <Link href="https://www.kaggle.com/datasets/vbinh002/fraud-ecommerce">kaggle</Link> with
					some extremely basic information.
				</Card.Text>
			</CustomCard>
		</Container>
	);
};

export default FraudGame;
