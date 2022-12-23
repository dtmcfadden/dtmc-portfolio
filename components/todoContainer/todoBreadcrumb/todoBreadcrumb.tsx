import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoBreadcrumb.module.css';
import { Container, Breadcrumb } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { selectorTodoBreadcrumbState } from '@/recoil/selectors/todoSelector';

const TodoBreadcrumb = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(selectThemeSiteState);
	const getSelectorTodoBreadcrumb = useRecoilValue(selectorTodoBreadcrumbState);
	console.log('getSelectorTodoBreadcrumb', getSelectorTodoBreadcrumb);
	return (
		<Container className={`border ${themeBorder} rounded`}>
			<Breadcrumb>
				{getSelectorTodoBreadcrumb &&
					getSelectorTodoBreadcrumb.map((category: string) => (
						<Breadcrumb.Item key={category} className={`px-2 py-1`}>
							{category}
						</Breadcrumb.Item>
					))}
			</Breadcrumb>
		</Container>
	);
};

export default TodoBreadcrumb;
