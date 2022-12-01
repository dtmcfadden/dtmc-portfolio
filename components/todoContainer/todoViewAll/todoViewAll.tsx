import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoViewAll.module.css';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

const TodoViewAll = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return <Container className={`border ${themeBorder} rounded`}>View All</Container>;
};

export default TodoViewAll;
