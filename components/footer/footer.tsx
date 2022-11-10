import Link from 'next/link';
import styles from './footer.module.css';
import packageJSON from '../../package.json';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function Footer() {
	const {
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(getThemeSiteState);

	return (
		<>
			<Container className="mt-1">
				<ListGroup horizontal="md" variant={themeVariant}>
					<ListGroup.Item variant={themeVariant} className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
						<Link href="https://www.linkedin.com/in/davidtmcfadden/">David McFadden Linkedin</Link>
					</ListGroup.Item>
					<ListGroup.Item variant={themeVariant} className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
						<Link href="https://github.com/dtmcfadden">GitHub</Link>
					</ListGroup.Item>
					<ListGroup.Item variant={themeVariant} className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
						<em>next@{packageJSON.dependencies['next']}</em>
					</ListGroup.Item>
					<ListGroup.Item variant={themeVariant} className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
						<em>react@{packageJSON.dependencies['react']}</em>
					</ListGroup.Item>
					<ListGroup.Item variant={themeVariant} className={`flex-fill bg-${themeBg} ${themeText} ${themeBorder}`}>
						<em>next-auth@{packageJSON.dependencies['next-auth']}</em>
					</ListGroup.Item>
				</ListGroup>
			</Container>
		</>
	);
}
