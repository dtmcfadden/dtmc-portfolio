import * as yup from 'yup';
import { yupCUID, yupDateNotRequired, yupDateRequired, yupUUID } from '../database.yup';
import { yupCategoryName } from './todoTests.yup';

export const yupInsertTodoCategoryById = yup
	.object()
	.shape({
		id: yupUUID,
		parent: yupDateNotRequired,
		name: yupCategoryName,
	})
	.required()
	.noUnknown(true)
	.strict(true);

export const yupGetTodoCategoryByUserIdAndParentId = yup
	.object()
	.shape({
		userId: yupCUID,
		parentId: yupDateNotRequired,
	})
	.required()
	.noUnknown(true)
	.strict(true);
