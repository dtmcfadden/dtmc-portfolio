import { selector } from 'recoil';
import { defaultLight, defaultDark, previewThemeState, siteThemeState } from '../atoms/themeSiteAtom';
import axios from 'axios';
import { server } from '@/config/index';
import _ from 'lodash';
import { todoContainerState, todoDefault } from '../atoms/todoAtom';

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

const visibleSetting = (isVisible: boolean): TodoVisible => {
	return isVisible === true ? 'inline' : 'd-none';
};
