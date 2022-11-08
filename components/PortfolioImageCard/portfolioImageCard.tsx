// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Image } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function PortfolioImageCard() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(getThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5`}>David McFadden</Card.Header>
				<Card.Img
					alt="David McFadden"
					variant="top"
					className={`border ${themeBorder} styles.image`}
					src="/static/images/DavidMcFadden.jpg"
				/>
				<Card.Body>
					<Card.Title>Software Engineer</Card.Title>
					<Card.Text>
						Specializing in creating tools to fight the never ending battle against{' '}
						<span className="text-nowrap">E-Commerce</span> fraud.
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}
