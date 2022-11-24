import { atom } from 'recoil';

export const todoDefault = {
	visibleTodoSideMenu: true,
	visibleTodoList: true,
	visibleTodoView: true,
};

export const todoContainerState = atom({
	key: 'todoContainerStatus',
	default: todoDefault,
});
