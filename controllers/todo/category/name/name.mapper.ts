import { TodoCategoryReturn, TodoCategoryToStringReturn } from '@/interfaces/todo.interface';

export const toTodoCategoryDateToInt = (
	categoryList: TodoCategoryReturn[] | null,
): TodoCategoryToStringReturn[] | null => {
	// console.log('toUserClientData user', user);
	// console.log('toUserClientData user?.userprefs', user?.userprefs);
	let returnCategory: TodoCategoryToStringReturn[] = [];
	if (categoryList) {
		categoryList.forEach((e, i) => {
			returnCategory[i] = {
				categoryId: convertDateToInt(e?.categoryId?.toString()),
				parentId: convertDateToInt(e?.parentId?.toString()),
				name: e.name,
			};
		});
	}

	return returnCategory;
};

function convertDateToInt(dateStr: string | undefined) {
	return dateStr ? new Date(dateStr).getTime().toString() : dateStr;
}
