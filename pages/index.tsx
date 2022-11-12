import { Col, Container, Row } from 'react-bootstrap';
import PortfolioImageCard from '@/components/PortfolioImageCard/portfolioImageCard';
import PortfolioSummaryCard from '@/components/PortfolioSummaryCard/portfolioSummaryCard';

export default function IndexPage() {
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
