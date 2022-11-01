// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Image } from 'react-bootstrap';
import styles from './portfolioImageCard.module.css';

export default function PortfolioImageCard() {
	return (
		<>
			<Card>
				<Card.Header className="h5">David McFadden</Card.Header>
				<Card.Img alt="David McFadden" variant="top" className={styles.image} src="/static/images/DavidMcFadden.jpg" />
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
