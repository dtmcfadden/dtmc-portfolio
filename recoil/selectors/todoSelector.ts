import { DefaultValue, selector } from 'recoil';
import { defaultLight, defaultDark, previewThemeState, siteThemeState } from '../atoms/themeSiteAtom';
import axios from 'axios';
import { server } from '@/config/index';
import _ from 'lodash';
import {
	todoBreadcrumbState,
	todoCategoryIdState,
	todoCategoryState,
	todoContainerState,
	todoDefault,
	todoParentState,
} from '../atoms/todoAtom';
import { TodoCategoryToStringReturn } from '@/interfaces/todo.interface';

export type TodoVisible = 'd-none' | 'inline';

export interface TodoProps {
	visibleTodoSideMenu: TodoVisible;
	visibleTodoList: TodoVisible;
	visibleTodoView: TodoVisible;
}

export const getTodoContainer = selector<TodoProps>({
	key: 'todoContainerSelector',
	get: ({ get }) => {
		const todoContainer = get(todoContainerState);

		const returnContainer = {
			visibleTodoSideMenu: visibleSetting(
				todoDefault.visibleTodoSideMenu ? todoDefault.visibleTodoSideMenu : todoContainer.visibleTodoSideMenu,
			),
			visibleTodoList: visibleSetting(
				todoDefault.visibleTodoList ? todoDefault.visibleTodoList : todoContainer.visibleTodoList,
			),
			visibleTodoView: visibleSetting(
				todoDefault.visibleTodoView ? todoDefault.visibleTodoView : todoContainer.visibleTodoView,
			),
		};

		return returnContainer;
	},
	cachePolicy_UNSTABLE: {
		eviction: 'most-recent',
	},
});

export const selectorAddTodoCategoryListState = selector<any>({
	key: 'todoContainerSelector',
	get: ({ get }) => {
		const todoCategory = get(todoCategoryState);
		return todoCategory;
	},
	set: ({ get, set }, newCategoryList) => {
		console.log('selectorTodoCategoryListState newCategoryList', newCategoryList);
		let todoCategory = get(todoCategoryState);
		let todoParent = get(todoParentState);

		console.log('selectorTodoCategoryListState todoParent1', todoParent);
		console.log('selectorTodoCategoryListState todoCategory1', todoCategory);
		if (_.isEmpty(newCategoryList) === false && newCategoryList.length > 0) {
			const parentId = newCategoryList instanceof DefaultValue ? ' ' : newCategoryList[0].parentId;
			console.log('selectorTodoCategoryListState parentId', parentId);
			const i = parentId ? parentId : ' ';
			todoParent = { ...todoParent, ...{ [i]: newCategoryList } };

			const categoryList = newCategoryList instanceof DefaultValue ? ' ' : newCategoryList;

			if (categoryList && categoryList.length > 0) {
				categoryList.forEach((e: TodoCategoryToStringReturn, i: number) => {
					todoCategory = { ...todoCategory, ...{ [e.categoryId ? e.categoryId : ' ']: e.parentId ? e.parentId : ' ' } };
				});
			}
		}
		console.log('selectorTodoCategoryListState todoParent2', todoParent);
		console.log('selectorTodoCategoryListState todoCategory2', todoCategory);

		set(todoParentState, todoParent);
		set(todoCategoryState, todoCategory);
	},
	cachePolicy_UNSTABLE: {
		eviction: 'most-recent',
	},
});

export const selectorTodoBreadcrumbState = selector<any>({
	key: 'todoBreadcrumbSelector',
	get: ({ get }) => {
		let categoryId = get(todoCategoryIdState);
		let todoCategory = get(todoCategoryState);
		let todoBreadcrumb = get(todoBreadcrumbState);
		do {
			if (categoryId && todoCategory[categoryId]) {
				todoBreadcrumb.unshift(todoCategory[categoryId] != ' ' ? todoCategory[categoryId] : 'TOP');
			} else {
				break;
			}
		} while (categoryId != ' ');
		console.log('selectorTodoBreadcrumbState todoBreadcrumb', todoBreadcrumb);
		return todoBreadcrumb;
	},
	cachePolicy_UNSTABLE: {
		eviction: 'most-recent',
	},
});

const visibleSetting = (isVisible: boolean): TodoVisible => {
	return isVisible === true ? 'inline' : 'd-none';
};
