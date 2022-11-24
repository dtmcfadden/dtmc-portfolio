import * as yup from 'yup';
import { yupDateNotRequired, yupDateRequired, yupUUID } from '../database.yup';
import { yupCategoryName } from './todoTests.yup';

export const yupCreateCategoryForm = yup
	.object()
	.shape({
		parent: yupDateNotRequired,
		formCategoryName: yupCategoryName,
	})
	.required()
	.noUnknown(true)
	.strict(true);
