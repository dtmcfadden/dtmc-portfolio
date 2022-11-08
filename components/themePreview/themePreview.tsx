import { Button, Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { previewThemeState } from '@/recoil/atoms/themeSiteAtom';

export default function ThemePreview() {
	const getPreviewTheme = useRecoilValue(previewThemeState);

	return (
		<>
			{getPreviewTheme.usePreview && (
				<Button type="button" variant="outline-success" size="sm">
					Preview
				</Button>
			)}
		</>
	);
}
