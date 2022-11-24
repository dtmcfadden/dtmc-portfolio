import * as yup from 'yup';
import { yupCUID, yupDateNotRequired, yupDateRequired } from '../database.yup';
import { yupCategoryName } from './todoTests.yup';

export const yupTodoCategorySchema = yup
	.object()
	.shape({
		userId: yupCUID,
		// id: yupDateNotRequired,
		parent: yupDateNotRequired,
		name: yupCategoryName,
	})
	.required()
	// .noUnknown(false)
	.strict(true);
