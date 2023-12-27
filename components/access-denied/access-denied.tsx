import { Button } from 'react-bootstrap';
import { useOnClickShared } from '@/lib/hooks/use-sharedHooks';
import CustomCard from '../customCard/customCard';

export default function AccessDenied() {
	const { handleHrefOnClick } = useOnClickShared();

	return (
		<CustomCard header="Access Denied">
			<Button variant="primary" href="/" onClick={handleHrefOnClick}>
				You must be signed in to view this page
			</Button>
		</CustomCard>
	);
}
