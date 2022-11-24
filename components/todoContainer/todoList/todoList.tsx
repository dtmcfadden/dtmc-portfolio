import { userState } from '@/recoil/atoms/userAtom';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoList.module.css';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

const TodoList = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(getThemeSiteState);

	return <Container className={`border ${themeBorder} rounded`}>TodoList</Container>;
};

export default TodoList;
