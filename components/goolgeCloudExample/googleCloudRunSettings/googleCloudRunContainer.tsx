import { Card } from 'react-bootstrap';
import styles from '../googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudRunContainer() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5 ${themeBorder}`}>Cloud Run Container</Card.Header>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						Point Google Cloud Run to the Container image used. The image was created using Cloud Build which is
						connected to GitHub repository.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Run Container"
						variant="top"
						className={`border ${themeBorder} ${styles.image}`}
						src="/static/images/examples/GoogleCloudRunContainerSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
