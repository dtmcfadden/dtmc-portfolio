import { Card } from 'react-bootstrap';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useRecoilValue } from 'recoil';

interface Props {
	header?: string | undefined;
	title?: string | undefined;
	text?: string | undefined;
	children?: React.ReactNode | undefined;
}

export default function CustomCard({ header, title, text, children }: Props) {
	const {
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`${themeText} ${themeBorder}`} data-test="testCard">
				{header && (
					<Card.Header className={`h5`} data-test="testHeader">
						{header}
					</Card.Header>
				)}
				{(title || text || children) && (
					<Card.Body className={`py-2 border ${themeBorder}`} data-test="testBody">
						{title && <Card.Title data-test="testTitle">{title}</Card.Title>}
						{text && <Card.Text data-test="testText">{text}</Card.Text>}
						{children && <>{children}</>}
					</Card.Body>
				)}
			</Card>
		</>
	);
}
