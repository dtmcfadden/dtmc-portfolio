import * as yup from 'yup';

export const yupUUID = yup
	.string()
	.matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 'Must match UUID mask')
	.required()
	.strict(true);

export const yupCUID = yup
	.string()
	.matches(/^c[a-z0-9]{24}$/, 'Must match CUID mask')
	.required()
	.strict(true);

export const yupDateRequired = yup.date().required();

// export const yupDateNotRequired = yup.date().test('date', 'Invalid Date or undefined', (value) => {
// 	console.log('yupDateNotRequired value', value, 'type', typeof value);
// 	return true;
// 	// switch (typeof value) {
// 	// 	case 'undefined':
// 	// 		return true
// 	// 	case 'string':
// 	// 		return yupDateRequired;
// 	// 	default:
// 	// 		throw new yup.ValidationError('Value must be a date or `undefined`');
// 	// }
// });

// export const yupDateNotRequired = yup.lazy((value) => {
// 	console.log('yupDateNotRequired value', value, 'type', typeof value);
// 	switch (typeof value) {
// 		case 'undefined':
// 			return yup.string().default('myDefaultString');
// 		case 'string':
// 			return yupDateRequired;
// 		default:
// 			throw new yup.ValidationError('Value must be a date or `undefined`');
// 	}
// });
export const yupDateNotRequired = yup.date().notRequired();
