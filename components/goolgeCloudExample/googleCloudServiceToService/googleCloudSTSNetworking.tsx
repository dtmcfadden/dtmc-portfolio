import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from '../googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudRunSTSNetworking() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						The receivng service is set to only allow internal traffic. Located in Cloud Run Service details. Under the
						networking tab.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Run Ingress Control"
						variant="top"
						className={`border ${themeBorder} ${styles.image} ${styles.imgControlInternal}`}
						src="/static/images/examples/GoogleCloudRunIngressControlInternalSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
