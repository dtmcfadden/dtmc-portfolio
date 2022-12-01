import { Card } from 'react-bootstrap';
import styles from './googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudSql() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5 ${themeBorder}`}>Cloud SQL</Card.Header>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						Setup Cloud SQL to use the relational database MySQL. Connected through a VPC so a private IP can be used
						instead of connecting through a public IP. Setup a user that is specifically for the connection used. Set
						the connection information on Cloud Run in the Environment variable section.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud SQL Networking"
						variant="top"
						className={`border ${themeBorder} ${styles.image}`}
						src="/static/images/examples/GoogleCloudSqlNetworkingSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
