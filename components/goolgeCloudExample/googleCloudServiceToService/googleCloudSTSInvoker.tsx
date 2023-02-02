import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from '../googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function GoogleCloudRunSTSInvoker() {
	const { bg: themeBg, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						Select receiving service. Add calling service to Cloud Run Invoker. Located in Cloud Run Services list. If
						Cloud Run Invoker is set to allUsers Authentication automatically gets changed to Allo unauthenticated
						invocations.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Run Add Invoker"
						variant="top"
						className={`border ${themeBorder} ${styles.image} ${styles.imgPrincipalInvoker}`}
						src="/static/images/examples/GoogleCloudRunPrincipalInvokerSS.jpg"
					/>
				</Card.Body>
			</Card>
		</>
	);
}
