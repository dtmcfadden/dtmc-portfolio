import User, { UserSchema } from './User';

const mongoDBModels = {
	User: {
		model: User,
		schema: UserSchema,
	},
};

export default mongoDBModels;
