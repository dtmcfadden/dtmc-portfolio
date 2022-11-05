import * as yup from 'yup';

const yupIsDark = yup.boolean().required('Selection is required.');

export const yupThemePrefs = yup.object().shape({
	isDark: yupIsDark,
});
