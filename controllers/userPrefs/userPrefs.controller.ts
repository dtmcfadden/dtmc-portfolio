import * as userService from 'database/services/UserService';
// import { CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO } from '../../dto/ingredient.dto';
import { UserThemePrefs } from '@/interfaces/index.interface';
import * as userMapper from './userPrefs.mapper';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
import { yupThemePrefs } from '@/lib/yup/form/theme.yup';
import { getUserIdBySessionToken } from '../session/session.controller';
import { date } from 'yup';
import { BorderColor, ButtonColor, DefaultColor, TextColor, VariantColor } from '@/interfaces/userPrefs.interface';

const userThemePrefsConst = {
	isDark: true,
	useCustom: false,
	theme: {
		0: {
			variant: VariantColor.LIGHT,
			page: DefaultColor.LIGHT,
			bg: DefaultColor.SECONDARY,
			text: TextColor.DARK,
			button: ButtonColor.LIGHT,
			border: BorderColor.SECONDARY,
		},
		1: {
			variant: VariantColor.DARK,
			page: DefaultColor.PRIMARY,
			bg: DefaultColor.PRIMARY,
			text: TextColor.LIGHT,
			button: ButtonColor.DARK,
			border: BorderColor.LIGHT,
		},
	},
};

export const getThemeById = async (id: string): Promise<UserThemePrefs | null> => {
	const userTheme = await prisma.user.findFirst({
		select: {
			userPrefs: {
				select: {
					theme: true,
				},
			},
		},
		where: {
			id: id,
		},
	});

	let returnUserThemePrefs = userThemePrefsConst;

	if (userTheme?.userPrefs && userTheme?.userPrefs.length > 0) {
		if (userTheme.userPrefs[0].theme) {
			const userThemeObj = JSON.parse(userTheme.userPrefs[0].theme.toString());
			returnUserThemePrefs = { ...userThemePrefsConst, ...userThemeObj };
		}
	}

	return returnUserThemePrefs;
};

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

	let returnUserThemePrefs = userThemePrefsConst;

	if (userTheme?.userPrefs && userTheme?.userPrefs.length > 0) {
		if (userTheme.userPrefs[0].theme) {
			const userThemeObj = JSON.parse(userTheme.userPrefs[0].theme.toString());
			returnUserThemePrefs = { ...userThemePrefsConst, ...userThemeObj };
		}
	}

	return returnUserThemePrefs;
};

export const updateThemePrefsById = async (
	id: string,
	userThemePrefs: UserThemePrefs,
): Promise<UserThemePrefs | null> => {
	// console.log('updateThemePrefsBySessionToken userThemePrefs', userThemePrefs);
	const themeCheck = await yupThemePrefs.isValid(userThemePrefs);
	// console.log('updateThemePrefsBySessionToken themeCheck', themeCheck);
	let returnTheme = null;

	if (themeCheck == false) {
		return returnTheme;
	}

	const userPrefsData = await prisma.userPrefs.upsert({
		select: {
			theme: true,
		},
		where: {
			userId: id,
		},
		create: {
			userId: id,
			theme: JSON.stringify(userThemePrefs),
			createdAt: new Date(),
		},
		update: {
			theme: JSON.stringify(userThemePrefs),
			updatedAt: new Date(),
		},
	});
	// console.log('updateThemePrefsBySessionToken userPrefsData', userPrefsData.theme);
	returnTheme = userPrefsData.theme ? JSON.parse(userPrefsData.theme) : {};

	// console.log('updateThemePrefsBySessionToken returnTheme', returnTheme);
	return returnTheme;
	// return 0;
};

export const updateThemePrefsBySessionToken = async (
	sessionToken: string,
	userThemePrefs: UserThemePrefs,
): Promise<UserThemePrefs | null> => {
	// console.log('updateThemePrefsBySessionToken userThemePrefs', userThemePrefs);
	const themeCheck = await yupThemePrefs.isValid(userThemePrefs);
	// console.log('updateThemePrefsBySessionToken themeCheck', themeCheck);
	let returnTheme = null;

	if (themeCheck == false) {
		return returnTheme;
	}

	const sessionData = await getUserIdBySessionToken(sessionToken);
	// console.log('updateThemePrefsBySessionToken userId', sessionData?.userId);
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
		// console.log('updateThemePrefsBySessionToken userPrefsData', userPrefsData.theme);
		returnTheme = userPrefsData.theme ? JSON.parse(userPrefsData.theme) : {};
	}

	// console.log('updateThemePrefsBySessionToken returnTheme', returnTheme);
	return returnTheme;
	// return 0;
};
