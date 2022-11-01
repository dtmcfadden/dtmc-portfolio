import Link from 'next/link';
import styles from './footer.module.css';
import packageJSON from '../../package.json';
import { Container, ListGroup } from 'react-bootstrap';

export default function Footer() {
	return (
		<>
			<Container>
				<ListGroup horizontal="md">
					<ListGroup.Item className="flex-fill">
						<Link href="https://www.linkedin.com/in/davidtmcfadden/">David McFadden Linkedin</Link>
					</ListGroup.Item>
					<ListGroup.Item className="flex-fill">
						<Link href="https://github.com/dtmcfadden">GitHub</Link>
					</ListGroup.Item>
					<ListGroup.Item className="flex-fill">
						<em>next@{packageJSON.dependencies['next']}</em>
					</ListGroup.Item>
					<ListGroup.Item className="flex-fill">
						<em>react@{packageJSON.dependencies['react']}</em>
					</ListGroup.Item>
					<ListGroup.Item className="flex-fill">
						<em>next-auth@{packageJSON.dependencies['next-auth']}</em>
					</ListGroup.Item>
				</ListGroup>
			</Container>
		</>
	);
}
