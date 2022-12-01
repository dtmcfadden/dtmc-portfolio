import { Card } from 'react-bootstrap';
import styles from './googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudBuild() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5 ${themeBorder}`}>Cloud Build</Card.Header>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						Connect Google Cloud Build to GitHub repository with the branch of main. The Dockerfile is used to create an
						image that can be later used in Cloud run to build the website. Need to make sure the Region used is the
						same on Cloud Run.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Build"
						variant="top"
						className={`border ${themeBorder} ${styles.image}`}
						src="/static/images/examples/GoogleCloudBuildSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
