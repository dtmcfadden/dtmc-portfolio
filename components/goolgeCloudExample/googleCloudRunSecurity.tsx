import { Card } from 'react-bootstrap';
import styles from './googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudRunSecurity() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5 ${themeBorder}`}>Cloud Run Security</Card.Header>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						A servcice account needs to be setup that has proper roles for Cloud Run, Cloud Build, and Cloud SQL.
						Accounts should be setup to only have access to what it needs and nothing else.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Run Security"
						variant="top"
						className={`border ${themeBorder} ${styles.image}`}
						src="/static/images/examples/GoogleCloudRunSecuritySS.jpg"
					/>

					<Card.Img
						alt="Google Cloud IAM Roles"
						variant="top"
						className={`border ${themeBorder} ${styles.image}`}
						src="/static/images/examples/GoogleCloudIAMRolesSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
