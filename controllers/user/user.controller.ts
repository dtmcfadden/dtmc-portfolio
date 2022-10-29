import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { UserProfile } from '@/interfaces/index';
import * as userMapper from './user.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';

// const userProfile = Prisma.validator<Prisma.UserSelect>()({
//   name: true,
// })

export const getProfileBySessionToken = async (sessionToken: string): Promise<UserProfile | null> => {
	// return userMapper.toProfile(await userService.getBySessionToken(sessionToken));
	const profile = await prisma.user.findFirst({
		select: {
			name: true,
		},
	});

	return profile;
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
