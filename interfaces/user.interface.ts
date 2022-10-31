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

export interface UserProfile {
	name: string | null;
	roles: string;
}
