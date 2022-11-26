import styles from './underConstructionIcon.module.css';
import { ConeStriped } from 'react-bootstrap-icons';
// import { useRecoilValue } from 'recoil';
// import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function UnderConstructionIcon() {
	// const {
	// 	isDark,
	// 	bg: themeBg,
	// 	variant: themeVariant,
	// 	text: themeText,
	// 	border: themeBorder,
	// } = useRecoilValue(getThemeSiteState);

	return <ConeStriped className={`${styles.coneColor} ${styles.conePosition}`} />;
}
