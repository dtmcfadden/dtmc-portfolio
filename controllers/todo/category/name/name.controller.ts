import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { TodoCategoryForm, TodoCategory, TodoCategoryReturn } from '@/interfaces/todo.interface';
import * as userMapper from './name.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { yupThemePrefs } from '@/lib/yup/form/theme.yup';
import { date } from 'yup';
import { BorderColor, ButtonColor, DefaultColor, TextColor, VariantColor } from '@/interfaces/userPrefs.interface';
import { yupGetTodoCategoryByUserIdAndParentId, yupInsertTodoCategoryById } from '@/lib/yup/todo/todoFunction.yup';
import { yupTodoCategorySchema } from '@/lib/yup/todo/todoSchema.yup';
import _ from 'lodash';

interface TodoCategoryInsert {
	id: string;
	name: string;
	parentId: string | null;
}

interface TodoCategoryParentGet {
	id: string;
	parentId: Date | null | undefined;
}

interface TodoPositionInsert {
	id: string;
	categoryId: string | undefined;
}

export const insertTodoCategoryByUserId = async ({
	id,
	name,
	parentId,
}: TodoCategoryInsert): Promise<TodoCategoryReturn | null> => {
	// const categoryCheck = await yupInsertTodoCategoryById.isValid({ name, parentId: parentId || null });
	// console.log('insertTodoCategoryById categoryCheck', categoryCheck);
	let returnCategory = null;

	let todoCategoryData = {
		userId: id,
		// id: new Date(),
		parentId: parentId,
		name: name,
	};

	// console.log('insertTodoCategoryByUserId todoCategoryData', todoCategoryData);
	const todoCategoryDataCheck = await yupTodoCategorySchema.isValid(todoCategoryData);
	// console.log('insertTodoCategoryByUserId todoCategoryDataCheck', todoCategoryDataCheck);

	if (todoCategoryDataCheck == false) {
		return returnCategory;
	} else {
		const categoryData = await prisma.todoCategory.create({
			data: todoCategoryData,
		});
		// console.log('insertTodoCategoryByUserId categoryData', categoryData);
		returnCategory = {
			categoryId: categoryData.categoryId,
			parentId: categoryData.parentId ? categoryData.parentId : null,
			name: categoryData.name,
		};
	}

	// console.log('insertTodoCategoryByUserId returnCategory', returnCategory);
	return returnCategory;
};

export const getTodoCategoryByUserIdAndParentId = async ({
	id,
	parentId,
}: TodoCategoryParentGet): Promise<TodoCategoryReturn[] | null> => {
	// const categoryCheck = await yupInsertTodoCategoryById.isValid({ name, parentId: parentId || null });
	// console.log('insertTodoCategoryById categoryCheck', categoryCheck);
	let returnCategoryList = null;

	let todoCategoryByParent = {
		userId: id,
		parentId: parentId ? parentId : null,
	};

	// console.log('getTodoCategoryByUserIdAndParentId todoCategoryByParent', todoCategoryByParent);
	const todoCategoryByParentCheck = await yupGetTodoCategoryByUserIdAndParentId.isValid(todoCategoryByParent);
	// console.log('getTodoCategoryByUserIdAndParentId todoCategoryByParentCheck', todoCategoryByParentCheck);

	if (todoCategoryByParentCheck == false) {
		return returnCategoryList;
	} else {
		const categoryList = await prisma.todoCategory.findMany({
			select: {
				categoryId: true,
				parentId: true,
				name: true,
			},
			where: todoCategoryByParent,
			orderBy: [
				{
					parentId: 'desc',
				},
				{
					categoryId: 'desc',
				},
			],
		});

		// console.log('getTodoCategoryByUserIdAndParentId categoryList', categoryList);
		returnCategoryList = categoryList;
	}

	// console.log('getTodoCategoryByUserIdAndParentId returnCategoryList', returnCategoryList);
	return returnCategoryList;
};

// export const upsertTodoPositionByCategoryId = async ({id, categoryId}: TodoPositionInsert): Promise<TodoCategoryReturn | null> => {
// 	// const categoryCheck = await yupInsertTodoCategoryById.isValid({ name, parentId: parentId || null });
// 	// console.log('insertTodoCategoryById categoryCheck', categoryCheck);
// 	let returnPosition = null;

// 	let todoPositionData = {
// 		userId: id,
// 		categoryId: categoryId,
// 	};

// 	console.log('upsertTodoPositionByCategoryId todoPositionData', todoPositionData);
// 	const todoPositionDataCheck = await yupTodoPositionInsert.isValid(todoPositionData);
// 	console.log('upsertTodoPositionByCategoryId todoPositionDataCheck', todoPositionDataCheck);

// 	if (todoPositionDataCheck == false) {
// 		return returnPosition;
// 	} else {
// 		const foundCategory = await prisma.todoPosition.findFirst({
// 			where: {
// 				userId: todoPositionData.userId,
// 				categoryId: todoPositionData.categoryId,
// 			},
// 		});

// 		if(_.isEmpty(foundCategory) === true){
// 			const categoryData = await prisma.todoPosition.create({
// 				data: {...todoPositionData, ...{entryposition: JSON.stringify()}},
// 			});
// 		}else{
// 			const categoryData = await prisma.todoPosition.create({
// 				data: todoCategoryData,
// 			});
// 		}

// 		console.log('upsertTodoCategoryById categoryData', categoryData);
// 		returnCategory = {
// 			categoryId: categoryData.categoryId.toString(),
// 			parentId: categoryData.parentId ? categoryData.parentId.toString() : null,
// 			name: categoryData.name,
// 		};
// 	}

// 	console.log('upsertTodoCategoryById returnCategory', returnCategory);
// 	return returnCategory;
// };
