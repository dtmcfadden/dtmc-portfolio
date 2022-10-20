import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
	userId: {
		type: String,
		requeired: true,
	},
	type: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
	providerAccountId: {
		type: String,
		required: true,
	},
	refresh_token: {
		type: String,
	},
	access_token: {
		type: String,
		required: true,
	},
	expires_at: {
		type: Number,
	},
	token_type: {
		type: String,
		required: true,
	},
	scope: {
		type: String,
		required: true,
	},
	id_token: {
		type: String,
	},
	session_state: {
		type: String,
	},
	oauth_token_secret: {
		type: String,
	},
	oauth_token: {
		type: String,
	},
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Accounts = mongoose.models.Accounts || mongoose.model('Accounts', accountSchema);
export default Accounts;
