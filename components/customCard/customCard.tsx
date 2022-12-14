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
			<Card bg={themeBg} className={`${themeText} ${themeBorder}`}>
				{header && <Card.Header className={`h5`}>{header}</Card.Header>}
				{(title || text || children) && (
					<Card.Body className={`py-2 border ${themeBorder}`}>
						{title && <Card.Title>{title}</Card.Title>}
						{text && <Card.Text>{text}</Card.Text>}
						{children && <>{children}</>}
					</Card.Body>
				)}
			</Card>
		</>
	);
}
