import * as yup from 'yup';

// export const yupUserId = yup
// .number()
// .integer()
// 	.required()
// 	.positive()
// 	.min(1, 'Min 1 characters')
// 	.max(10, 'Max 10 characters');

export const yupUserIdString = yup.string().min(1, 'Min 1 characters').max(10, 'Max 10 characters');

export const yupDeviceId = yup.string().matches(/^[A-Z]{13}$/, 'Incorrect device_id format');

// export const yupIpAddress = yup.string().min(6).max(10);
export const yupIpAddress = yup
	.string()
	.matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, {
		excludeEmptyString: true,
	});

export const yupIpCountry = yup.string().min(4).max(37);

export const yupFingerprint = yup.string().matches(/^[a-z0-9]{32}$/);
