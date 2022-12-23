import { userState } from '@/recoil/atoms/userAtom';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
import styles from './todoCategoryContainer.module.css';
import { Container, ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { selectorAddTodoCategoryListState } from '@/recoil/selectors/todoSelector';
import { TodoCategoryToStringReturn } from '@/interfaces/todo.interface';

const TodoCategoryContainer = () => {
	const { variant: themeVariant, border: themeBorder } = useRecoilValue(selectThemeSiteState);
	const getSelectorAddTodoCategoryListState = useRecoilValue(selectorAddTodoCategoryListState);
	const [parent, setParent] = useState(' ');
	const [categories, setCategories] = useState<TodoCategoryToStringReturn[]>();
	console.log('categories', categories);
	useEffect(() => {
		console.log('TodoCategoryContainer parent', parent);
		console.log('TodoCategoryContainer getSelectorAddTodoCategoryListState', getSelectorAddTodoCategoryListState);
		console.log(
			'TodoCategoryContainer getSelectorAddTodoCategoryListState[parent]',
			getSelectorAddTodoCategoryListState[parent],
		);
		setCategories(getSelectorAddTodoCategoryListState[parent]);
	}, [getSelectorAddTodoCategoryListState, parent]);

	return (
		<Container className={`border ${themeBorder} rounded`}>
			<ListGroup>
				{categories &&
					categories.map(({ categoryId, parentId, name }: TodoCategoryToStringReturn) => (
						<ListGroup.Item key={categoryId} className={`px-2 py-1`}>
							{name}
						</ListGroup.Item>
					))}
			</ListGroup>
		</Container>
	);
};

export default TodoCategoryContainer;
