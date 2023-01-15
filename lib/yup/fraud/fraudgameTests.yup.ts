import * as yup from 'yup';

export const yupUserId = yup
	.number()
	.required()
	.positive()
	.integer()
	.min(1, 'Min 1 characters')
	.max(10, 'Max 10 characters');

export const yupUserIdString = yup.string().min(1, 'Min 1 characters').max(10, 'Max 10 characters');

export const yupDeviceId = yup.string().matches(/^[A-Z]{13}$/, 'Incorrect device_id format');

export const yupIpAddress = yup.string().min(6).max(10);

export const yupIpCountry = yup.string().min(4).max(37);

export const yupFingerprint = yup.string().matches(/^[a-z0-9]{32}$/);
