import Link from 'next/link';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import styles from '../googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';
import GoogleCloudRunContainer from './googleCloudRunContainer';
import GoogleCloudRunConnections from './googleCloudRunConnections';
import GoogleCloudRunSecurity from './googleCloudRunSecurity';

export default function GoogleCloudRunSettings() {
	const { bg: themeBg, border: themeBorder, text: themeText } = useRecoilValue(selectThemeSiteState);

	return (
		<CustomCard header="Cloud Run">
			<Row>
				<Col md={'auto'} className={`pt-1 px-1 ${styles.colStyle}`}>
					<GoogleCloudRunContainer />
				</Col>
				<Col md={'auto'} className={`pt-1 px-1 ${styles.colStyle}`}>
					<GoogleCloudRunConnections />
				</Col>
				<Col md={'auto'} className={`pt-1 px-1 ${styles.colStyle}`}>
					<GoogleCloudRunSecurity />
				</Col>
			</Row>
			<CustomCard header="Resources">
				<ListGroup>
					<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
						<Link href="https://cloud.google.com/run/docs/quickstarts/deploy-container">
							Google Cloud - Deploy to Cloud Run
						</Link>
					</ListGroup.Item>
				</ListGroup>
			</CustomCard>
		</CustomCard>
	);
}
