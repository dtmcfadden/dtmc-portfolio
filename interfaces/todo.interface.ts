import { string } from 'yup';

export interface TodoCategoryForm {
	name: string;
	parentId?: Date;
}

export interface TodoCategory {
	id: string;
	userId: string;
	categoryId: Date;
	parentId?: Date | null | undefined;
	name: string;
}

export interface TodoCategoryReturn {
	categoryId: Date | undefined;
	parentId: Date | null | undefined;
	name: string | undefined;
}

export interface TodoCategoryToStringReturn {
	categoryId: string | undefined;
	parentId: string | null | undefined;
	name: string | undefined;
}
