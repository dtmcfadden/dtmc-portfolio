import * as yup from 'yup';

export const yupCategoryName = yup
	.string()
	.matches(/^[a-zA-Z0-9 ]+$/, 'Must be only letters, numbers, or spaces')
	.min(4, 'Min 4 characters')
	.max(25, 'Max 4 characters')
	.required()
	.strict(true);
