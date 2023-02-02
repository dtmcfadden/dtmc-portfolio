import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from '../googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudRunSTSSecurity() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						The receiving service is set to require authentication. Located in Cloud Run Service details. Under the
						security tab. When set to require authentication a specific invoker needs to be setup.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Run Authentication"
						variant="top"
						className={`border ${themeBorder} ${styles.image} ${styles.imgIngressAuthentication}`}
						src="/static/images/examples/GoogleCloudRunIngressAuthenticationSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
