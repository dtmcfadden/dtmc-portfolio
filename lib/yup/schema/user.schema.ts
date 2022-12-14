import * as yup from 'yup';

const yupName = yup
	.string()
	.required('Name is required.')
	.max(50, 'Max length of 50')
	.matches(/^[a-z0-9]+$/i, 'Only letters or numbers are allowed.');

export const formName = yup.object().shape({
	formDisplayName: yupName,
});
