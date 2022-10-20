import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	expires: {
		type: Date,
		requeired: true,
	},
	sessionToken: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: String,
		required: false,
	},
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Sessions = mongoose.models.Sessions || mongoose.model('Sessions', sessionSchema);
export default Sessions;
