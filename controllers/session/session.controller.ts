import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { UserId } from '@/interfaces/index.interface';
import * as userMapper from './session.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { formName } from '@/lib/yup/schema/user.schema';

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
