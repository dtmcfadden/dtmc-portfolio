import styles from './underConstructionIcon.module.css';
import { ConeStriped } from 'react-bootstrap-icons';
// import { useRecoilValue } from 'recoil';
// import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function UnderConstructionIcon() {
	// const {
	// 	isDark,
	// 	bg: themeBg,
	// 	variant: themeVariant,
	// 	text: themeText,
	// 	border: themeBorder,
	// } = useRecoilValue(selectThemeSiteState);

	return <ConeStriped className={`${styles.coneColor} ${styles.conePosition}`} />;
}
