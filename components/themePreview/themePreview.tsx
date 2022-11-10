import { Button, Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { previewThemeState } from '@/recoil/atoms/themeSiteAtom';
import { useOnClickShared } from '@/lib/hooks/use-sharedHooks';

export default function ThemePreview() {
	const { handleHrefOnClick } = useOnClickShared();
	const getPreviewTheme = useRecoilValue(previewThemeState);

	return (
		<>
			{getPreviewTheme.usePreview && (
				// <Container>
				<Button type="button" variant="outline-success" size="sm" href="/profile" onClick={handleHrefOnClick}>
					Preview
				</Button>
				// </Container>
			)}
		</>
	);
}
