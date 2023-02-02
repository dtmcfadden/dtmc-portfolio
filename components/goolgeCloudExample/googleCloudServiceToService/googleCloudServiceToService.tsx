import Link from 'next/link';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import styles from '../googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';
import GoogleCloudRunSTSNetworking from './googleCloudSTSNetworking';
import GoogleCloudRunSTSSecurity from './googleCloudSTSSecurity';
import GoogleCloudRunSTSInvoker from './googleCloudSTSInvoker';

export default function GoogleCloudRunServiceToService() {
	const { bg: themeBg, border: themeBorder, text: themeText } = useRecoilValue(selectThemeSiteState);

	return (
		<CustomCard header="Service to Service">
			<Row>
				<Col>
					<Row>
						<Col md={'auto'} className={`pt-1 px-1 ${styles.colStyle}`}>
							<GoogleCloudRunSTSNetworking />
						</Col>
						<Col md={'auto'} className={`pt-1 px-1 ${styles.colStyle}`}>
							<GoogleCloudRunSTSSecurity />
						</Col>
					</Row>
				</Col>
				<Col>
					<Row>
						<Col md={'auto'} className={`pt-1 px-1 ${styles.colStyle}`}>
							<GoogleCloudRunSTSInvoker />
						</Col>
					</Row>
				</Col>
			</Row>
			<CustomCard header="Resources">
				<ListGroup>
					<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
						<Link href="https://cloud.google.com/run/docs/authenticating/service-to-service">
							Google Cloud - Authenticating service-to-service documentation
						</Link>
					</ListGroup.Item>
					<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
						<Link href="https://cloud.google.com/run/docs/securing/managing-access">
							Google Cloud - Access control with IAM
						</Link>
					</ListGroup.Item>
				</ListGroup>
			</CustomCard>
		</CustomCard>
	);
}
