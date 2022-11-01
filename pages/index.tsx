import Layout from '../components/layout/layout';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import { server } from '@/config/index';
import { useSession } from 'next-auth/react';
import { Col, Container, Row } from 'react-bootstrap';
import PortfolioImageCard from '@/components/PortfolioImageCard/portfolioImageCard';
import PortfolioSummaryCard from '@/components/PortfolioSummaryCard/portfolioSummaryCard';

export default function IndexPage() {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	const { data: session, status } = useSession();
	return (
		<>
			<Container fluid="md">
				<Row>
					<Col md="4" className="px-1">
						<PortfolioImageCard />
					</Col>
					<Col md="8" className="px-1">
						<PortfolioSummaryCard />
					</Col>
				</Row>
			</Container>
		</>
	);
}
