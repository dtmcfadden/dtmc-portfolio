import { FC, useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './nav-builder.module.css';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useOnClickShared } from '@/lib/hooks/use-sharedHooks';
import UnderConstructionIcon from '@/components/underConstuctionIcon/underConstructionIcon';

interface props {
	navHref: string;
}

const NavBuilder: FC<props> = ({ navHref }) => {
	const { handleHrefOnClick } = useOnClickShared();
	const themeSite = useRecoilValue(selectThemeSiteState);
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
			// console.log('ddItem depth', depth, 'navLink.href', navLink.href);
			return (
				<NavDropdown.Item
					className={`navDropDownItem bg-${themeBg} ${themeText}`}
					href={navLink.href}
					key={tKey}
					onClick={handleHrefOnClick}
				>
					{navLink.construction === true && <UnderConstructionIcon />}
					{navLink.title}
				</NavDropdown.Item>
			);
		}
		if (navLink.type === 'link') {
			// console.log('ddItem depth', depth, 'navLink.href', navLink.href);
			return (
				<Nav.Link href={navLink.href} key={tKey} onClick={handleHrefOnClick} className={`${themeText}`}>
					{navLink.construction === true && <UnderConstructionIcon />}
					{navLink.title}
				</Nav.Link>
			);
		}
		if (navLink.type === 'divider') {
			return <NavDropdown.Divider key={tKey} className={`${themeBorder}`} />;
		}
		return <></>;
	});
};
