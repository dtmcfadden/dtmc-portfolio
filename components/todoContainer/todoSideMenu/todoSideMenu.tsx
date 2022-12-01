import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoSideMenu.module.css';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import TodoBreadcrumb from '../todoBreadcrumb/todoBreadcrumb';
import TodoViewAll from '../todoViewAll/todoViewAll';
import TodoCategoryContainer from '../todoCategoryContainer/todoCategoryContainer';
import TodoCreateCategory from '../todoCreateCategory/todoCreateCategory';

const TodoSideMenu = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(selectThemeSiteState);

	return (
		<Container className={`border ${themeBorder} rounded p-0`}>
			<TodoBreadcrumb />
			{/* <TodoViewAll /> */}
			<TodoCreateCategory />
			<TodoCategoryContainer />
		</Container>
	);
};

export default TodoSideMenu;
