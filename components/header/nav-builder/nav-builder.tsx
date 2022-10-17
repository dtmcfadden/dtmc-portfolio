import { FC, useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './nav-builder.module.css';
import { NavDropdown } from 'react-bootstrap';

interface props {
	navHref: string;
}

const NavBuilder: FC<props> = ({ navHref }) => {
	const [navLinkData, setNavLinkData] = useState([]);
	const getNavData = async (navHref: string) => {
		const response = await fetch(navHref);
		const data = await response.json();
		setNavLinkData(data);
	};

	useEffect(() => {
		getNavData(navHref);
	}, [navHref]);

	return <>{secureNav(0, navLinkData)}</>;
};
export default NavBuilder;

const secureNav = (depth: number, navLinks: any) => {
	return navLinks.map((navLink: any) => {
		const tKey = depth + navLink.type + navLink.title + Math.random();

		if (navLink.type === 'dd') {
			return (
				<NavDropdown title={navLink.title} key={tKey}>
					{secureNav(depth + 1, navLink.children)}
				</NavDropdown>
			);
		}
		if (navLink.type === 'ddItem') {
			return (
				<NavDropdown.Item href={navLink.href} key={tKey}>
					{navLink.title}
				</NavDropdown.Item>
			);
		}
		if (navLink.type === 'divider') {
			return <NavDropdown.Divider key={tKey} />;
		}
		return <></>;
	});
};
