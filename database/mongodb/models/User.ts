import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
	name: {
		type: String,
		requeired: true,
		unique: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	emailVerified: {
		type: String,
		required: false,
	},
	image: {
		type: String,
	},
	role: {
		type: [String],
		enum: ['owner', 'admin', 'guest'],
		default: 'guest',
	},
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
