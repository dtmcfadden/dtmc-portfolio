import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoContainer.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoContainerState } from '@/recoil/atoms/todoAtom';
import { getTodoContainer } from '@/recoil/selectors/todoSelector';

const FraudGameContainer = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(selectThemeSiteState);
	const { visibleTodoSideMenu, visibleTodoList, visibleTodoView } = useRecoilValue(getTodoContainer);

	// return (
	// 	<Container className={`border ${themeBorder} rounded p-0`}>
	// 		<Row className={`m-0`}>
	// 			<Col md="auto" className={`p-0 ${visibleTodoSideMenu}`}>
	// 				<TodoSideMenu />
	// 			</Col>
	// 			<Col md="auto" className={`p-0 ${visibleTodoList}`}>
	// 				<TodoList />
	// 			</Col>
	// 			<Col md="auto" className={`p-0 ${visibleTodoView}`}>
	// 				<TodoView />
	// 			</Col>
	// 		</Row>
	// 	</Container>
	// );
};
