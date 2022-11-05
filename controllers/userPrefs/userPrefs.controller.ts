import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { UserThemePrefs } from '@/interfaces/index';
import * as userMapper from './userPrefs.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { yupThemePrefs } from '@/lib/yup/form/theme.yup';
import { getUserIdBySessionToken } from '../session/session.controller';
import { date } from 'yup';

export const getThemeBySessionToken = async (sessionToken: string): Promise<UserThemePrefs | null> => {
	const userTheme = await prisma.user.findFirst({
		select: {
			userPrefs: {
				select: {
					theme: true,
				},
			},
		},
		where: {
			sessions: {
				some: {
					sessionToken: sessionToken,
				},
			},
		},
	});

	let userThemePrefs = {
		isDark: true,
	};
	if (userTheme?.userPrefs && userTheme?.userPrefs.length > 0) {
		if (userTheme.userPrefs[0].theme) {
			const userThemeObj = JSON.parse(userTheme.userPrefs[0].theme.toString());
			userThemePrefs = { ...userThemePrefs, ...userThemeObj };
		}
	}

	return userThemePrefs;
};

export const updateThemePrefsBySessionToken = async (
	sessionToken: string,
	userThemePrefs: UserThemePrefs,
): Promise<UserThemePrefs | null> => {
	const themeCheck = await yupThemePrefs.isValid(userThemePrefs);
	console.log('updateThemePrefsBySessionToken themeCheck', themeCheck);
	console.log('updateThemePrefsBySessionToken userThemePrefs', userThemePrefs);
	let returnTheme = null;

	if (themeCheck == false) {
		return returnTheme;
	}

	const sessionData = await getUserIdBySessionToken(sessionToken);
	console.log('updateThemePrefsBySessionToken userId', sessionData?.userId);
	if (sessionData?.userId != null) {
		const userPrefsData = await prisma.userPrefs.upsert({
			select: {
				theme: true,
			},
			where: {
				userId: sessionData?.userId,
			},
			create: {
				userId: sessionData?.userId,
				theme: JSON.stringify(userThemePrefs),
				createdAt: new Date(),
			},
			update: {
				theme: JSON.stringify(userThemePrefs),
				updatedAt: new Date(),
			},
		});
		console.log('updateThemePrefsBySessionToken userPrefsData', userPrefsData.theme);
		returnTheme = userPrefsData.theme ? JSON.parse(userPrefsData.theme) : {};
	}

	console.log('updateThemePrefsBySessionToken returnTheme', returnTheme);
	return returnTheme;
	// return 0;
};
