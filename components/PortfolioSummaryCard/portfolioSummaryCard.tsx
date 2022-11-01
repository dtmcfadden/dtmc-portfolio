// import type { NextApiRequest, NextApiResponse } from 'next';
import { Card, Image } from 'react-bootstrap';
import styles from './portfolioSummaryCard.module.css';

export default function PortfolioSummaryCard() {
	return (
		<>
			<Card className="h-100">
				{/* <Card.Header>&nbsp;</Card.Header> */}
				<Card.Body className={`d-flex align-items-center ${styles.summary}`}>
					<Card.Text className={styles.summaryText}>
						Full Stack Software Engineer with 14+ years&apos; experience in Fraud Operations. Responsible for developing
						and improving fraud tools and fraud case management system. Working with database, server /{' '}
						<span className="text-nowrap">client-side</span> design, implementation, and maintenance. Excel at digging
						through databases to connect everything properly and efficiently. Always excited to listen to new ideas and
						feedback on refining tools and making everyone&apos;s job easier. Appreciate learning new technology to
						enhance systems and tools.
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}
