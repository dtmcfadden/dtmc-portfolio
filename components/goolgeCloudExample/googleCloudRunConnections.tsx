import { Card } from 'react-bootstrap';
import styles from './googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudRunConnections() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5 ${themeBorder}`}>Cloud Run Connections</Card.Header>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						Point Google Cloud Run to the Cloud SQL instance used. Select VPC(Virtual Private Cloud) used so a private
						IP can be used to connect to the selected database. A MYSql database is used in this instance.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Run Connections"
						variant="top"
						className={`border ${themeBorder} ${styles.image}`}
						src="/static/images/examples/GoogleCloudRunConnectionsSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
