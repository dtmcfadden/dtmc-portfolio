import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { UserFull, UserProfile } from '@/interfaces/index';
import * as userMapper from './user.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { formName } from '@/lib/yup/schema/user.schema';

// const userProfile = Prisma.validator<Prisma.UserSelect>()({
//   name: true,
// })

export const getUserByName = async (name: string): Promise<UserFull | null> => {
	const userFull = await prisma.user.findFirst({
		select: {
			id: true,
			name: true,
			email: true,
			emailVerified: true,
			image: true,
			roles: true,
			createdAt: true,
			updatedAt: true,
		},
		where: {
			name: name,
		},
	});

	return userFull;
};

export const getProfileById = async (id: string): Promise<UserProfile | null> => {
	const profile = await prisma.user.findFirst({
		select: {
			name: true,
			roles: true,
		},
		where: {
			id: id,
		},
	});
	// console.log('profile', profile);
	return profile;
};

export const getProfileBySessionToken = async (sessionToken: string): Promise<UserProfile | null> => {
	const profile = await prisma.user.findFirst({
		select: {
			name: true,
			roles: true,
		},
		where: {
			sessions: {
				some: {
					sessionToken: sessionToken,
				},
			},
		},
	});
	// console.log('profile', profile);
	return profile;
};

export const updateNameById = async (id: string, originalDisplayName: string, displayname: string): Promise<number> => {
	// console.log('updateNameBySessionToken originalDisplayName', originalDisplayName, 'displayname', displayname);
	const nameCheck = await formName.isValid({ formDisplayName: displayname });

	if (nameCheck == false || originalDisplayName.toLowerCase() == displayname.toLowerCase()) {
		return 0;
	}
	const updateCount = await prisma.user.updateMany({
		data: {
			name: displayname,
		},
		where: {
			name: originalDisplayName,
			id: id,
		},
	});

	// console.log('updateCount', updateCount);
	return updateCount.count;
};

export const updateNameBySessionToken = async (
	sessionToken: string,
	originalDisplayName: string,
	displayname: string,
): Promise<number> => {
	// console.log('updateNameBySessionToken originalDisplayName', originalDisplayName, 'displayname', displayname);
	const nameCheck = await formName.isValid({ formDisplayName: displayname });

	if (nameCheck == false || originalDisplayName.toLowerCase() == displayname.toLowerCase()) {
		return 0;
	}
	const updateCount = await prisma.user.updateMany({
		data: {
			name: displayname,
		},
		where: {
			name: originalDisplayName,
			sessions: {
				some: {
					sessionToken: sessionToken,
				},
			},
		},
	});

	// console.log('updateCount', updateCount);
	return updateCount.count;
};

// export const getProfileBySessionToken = async (sessionToken: string): Promise<UserProfile> => {
// 	return userMapper.toProfile(await userService.getBySessionToken(sessionToken));
// };

// export const create = async(payload: CreateIngredientDTO): Promise<Ingredient> => {
//     return mapper.toIngredient(await service.create(payload))
// }

// export const update = async (id: number, payload: UpdateIngredientDTO): Promise<Ingredient> => {
//     return mapper.toIngredient(await service.update(id, payload))
// }

// export const getById = async (id: number): Promise<Ingredient> => {
//     return mapper.toIngredient(await service.getById(id))
// }

// export const deleteById = async(id: number): Promise<Boolean> => {
//     const isDeleted = await service.deleteById(id)

//     return isDeleted
// }

// export const getAll = async(filters: FilterIngredientsDTO): Promise<Ingredient[]> => {
//     return (await service.getAll(filters)).map(mapper.toIngredient)
// }
