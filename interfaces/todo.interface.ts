export interface TodoCategoryForm {
	name: string;
	parentId?: Date;
}

export interface TodoCategory {
	userId: string;
	id: Date;
	parentId?: Date | null | undefined;
	name: string;
}
