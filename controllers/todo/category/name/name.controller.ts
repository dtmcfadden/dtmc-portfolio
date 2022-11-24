import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { TodoCategoryForm, TodoCategory } from '@/interfaces/todo.interface';
import * as userMapper from './name.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { yupThemePrefs } from '@/lib/yup/form/theme.yup';
import { date } from 'yup';
import { BorderColor, ButtonColor, DefaultColor, TextColor, VariantColor } from '@/interfaces/userPrefs.interface';
import { yupInsertTodoCategoryById } from '@/lib/yup/todo/todoFunction.yup';
import { yupTodoCategorySchema } from '@/lib/yup/todo/todoSchema.yup';

interface TodoCategoryInsert {
	id: string | undefined;
	name: string;
	parentId: string | null;
}

export const insertTodoCategoryById = async ({
	id,
	name,
	parentId,
}: TodoCategoryInsert): Promise<TodoCategory | null> => {
	// const categoryCheck = await yupInsertTodoCategoryById.isValid({ name, parentId: parentId || null });
	// console.log('insertTodoCategoryById categoryCheck', categoryCheck);
	let returnCategory = null;

	let todoCategoryData = {
		userId: id || '',
		// id: new Date(),
		parentId: parentId,
		name: name,
	};

	console.log('insertTodoCategoryById todoCategoryData', todoCategoryData);
	const todoCategoryDataCheck = await yupTodoCategorySchema.isValid(todoCategoryData);
	console.log('insertTodoCategoryById todoCategoryDataCheck', todoCategoryDataCheck);

	if (todoCategoryDataCheck == false) {
		return returnCategory;
	} else {
		const categoryData = await prisma.todoCategory.create({
			data: todoCategoryData,
		});
		console.log('upsertTodoCategoryById categoryData', categoryData);
		returnCategory = categoryData;
	}

	console.log('upsertTodoCategoryById returnCategory', returnCategory);
	return returnCategory;
};
