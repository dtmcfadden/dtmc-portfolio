import { UserPrefsFull, UserThemePrefs } from './userPrefs.interface';

export interface UserFull {
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
	roles: string;
	createdAt: Date;
	updatedAt: Date | null;
}

export interface UserCustomSelect {
	id?: boolean;
	name?: boolean;
	email?: boolean;
	emailVerified?: boolean;
	image?: boolean;
	roles?: boolean;
	createdAt?: boolean;
	updatedAt?: boolean;
}

export interface UserCustomReturn {
	id?: string;
	name?: string | null;
	email?: string | null;
	emailVerified?: Date | null;
	image?: string | null;
	roles?: string;
	createdAt?: Date;
	updatedAt?: Date | null;
	userprefs?: UserPrefsFull[] | null;
}

export interface UserClientData {
	name?: string | null;
	roles?: string;
	image?: string | null;
	theme?: UserThemePrefs | null;
}

export interface UserProfile {
	name: string | null;
	roles: string;
}

export interface UserId {
	userId: string;
}
