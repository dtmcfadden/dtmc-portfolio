import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { UserId } from '@/interfaces/index.interface';
import * as userMapper from './session.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { yupFormName } from '@/lib/yup/schema/user.schema.yup';

export const getUserIdBySessionToken = async (sessionToken: string): Promise<UserId | null> => {
	const userId = await prisma.session.findFirst({
		select: {
			userId: true,
		},
		where: {
			sessionToken: sessionToken,
		},
	});

	return userId;
};
