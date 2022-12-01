import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoview.module.css';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

const TodoView = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return <Container className={`border ${themeBorder} rounded`}>TodoView</Container>;
};

export default TodoView;
