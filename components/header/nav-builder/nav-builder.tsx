import { FC, useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './nav-builder.module.css';
import { NavDropdown } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useOnClickShared } from '@/lib/hooks/use-sharedHooks';

interface props {
	navHref: string;
}

const NavBuilder: FC<props> = ({ navHref }) => {
	const { handleHrefOnClick } = useOnClickShared();
	const themeSite = useRecoilValue(getThemeSiteState);
	const [navLinkData, setNavLinkData] = useState([]);

	const getNavData = async (navHref: string) => {
		const response = await fetch(navHref);
		const data = await response.json();
		setNavLinkData(data);
	};

	useEffect(() => {
		getNavData(navHref);
	}, [navHref]);

	return <>{secureNav(0, navLinkData, themeSite, handleHrefOnClick)}</>;
};
export default NavBuilder;

const secureNav = (
	depth: number,
	navLinks: any,
	themeSite: any,
	handleHrefOnClick: (e: React.MouseEvent<HTMLElement>) => void,
) => {
	const { bg: themeBg, text: themeText, border: themeBorder } = themeSite;

	return navLinks.map((navLink: any) => {
		const tKey = depth + navLink.type + navLink.title + Math.random();

		if (navLink.type === 'dd') {
			return (
				<NavDropdown
					className={`navDropdown bg-${themeBg} ${themeText} ${themeBorder}`}
					title={navLink.title}
					key={tKey}
				>
					{secureNav(depth + 1, navLink.children, themeSite, handleHrefOnClick)}
				</NavDropdown>
			);
		}
		if (navLink.type === 'ddItem') {
			return (
				<NavDropdown.Item
					className={`navDropDownItem bg-${themeBg} ${themeText}`}
					href={navLink.href}
					key={tKey}
					onClick={handleHrefOnClick}
				>
					{navLink.title}
				</NavDropdown.Item>
			);
		}
		if (navLink.type === 'divider') {
			return <NavDropdown.Divider key={tKey} className={`${themeBorder}`} />;
		}
		return <></>;
	});
};
