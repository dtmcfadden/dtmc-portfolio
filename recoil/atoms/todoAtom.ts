import { atom } from 'recoil';

interface KeyValyeString {
	[key: string]: string;
}

export const todoDefault = {
	visibleTodoSideMenu: true,
	visibleTodoList: true,
	visibleTodoView: true,
};

export const todoContainerState = atom({
	key: 'todoContainerStatus',
	default: todoDefault,
});

export const todoCategoryIdState = atom<string | null>({
	key: 'todoParentIdStatus',
	default: ' ',
});

//categoryId key with parentId attribute
export const todoCategoryState = atom<KeyValyeString>({
	key: 'todoParentStatus',
	default: {},
});
//parentId key with categoryId children
export const todoParentState = atom({
	key: 'todoCategoryStatus',
	default: {},
});

export const todoBreadcrumbState = atom<string[]>({
	key: 'todoBreadcrumbStatus',
	default: [],
});
