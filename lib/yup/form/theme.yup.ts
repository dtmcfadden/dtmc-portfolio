import * as yup from 'yup';
import { BorderColor, ButtonColor, DefaultColor, TextColor } from '@/interfaces/userPrefs.interface';

const validateThemeInterface = (value: String | undefined, themeType: any) => {
	// console.log('validateThemeInterface value', value);
	// console.log('validateThemeInterface themeType', themeType);
	// console.log('validateThemeInterface Object.values(themeType)', Object.values(themeType));
	// console.log(
	// 	'validateThemeInterface Object.values(themeType).indexOf(value)',
	// 	Object.values(themeType).indexOf(value),
	// );

	let returnBoolean = false;
	if (value && Object.values(themeType).indexOf(value) != -1) {
		returnBoolean = true;
	}
	// const stringValidationSchema = yup.string().min(3);

	// for (let i = 0; i < value.length - 1; i++) {
	// 	if (!stringValidationSchema.isValidSync(value[i])) {
	// 		return false;
	// 	}
	// }
	// console.log('validateThemeInterface returnBoolean', returnBoolean);
	return returnBoolean;
};

const yupBoolean = yup.boolean().required('Selection is required.');
const yupPageDefaultColor = yup
	.string()
	.test('page', 'Invalid page color', (value) => {
		return validateThemeInterface(value, DefaultColor);
	})
	.required()
	.strict(true);
const yupBgDefaultColor = yup
	.string()
	.test('bg', 'Invalid BG color', (value) => {
		return validateThemeInterface(value, DefaultColor);
	})
	.required()
	.strict(true);
const yupTextColor = yup
	.string()
	.test('text', 'Invalid Text color', (value) => {
		return validateThemeInterface(value, TextColor);
	})
	.required()
	.strict(true);
const yupButtonColor = yup
	.string()
	.test('button', 'Invalid Button color', (value) => {
		return validateThemeInterface(value, ButtonColor);
	})
	.required()
	.strict(true);
const yupBorderColor = yup
	.string()
	.test('border', 'Invalid Border color', (value) => {
		return validateThemeInterface(value, BorderColor);
	})
	.required()
	.strict(true);

export const yupThemePrefsBlock = yup
	.object()
	.shape({
		page: yupPageDefaultColor,
		bg: yupBgDefaultColor,
		text: yupTextColor,
		button: yupButtonColor,
		border: yupBorderColor,
	})
	.required()
	.noUnknown(true)
	.strict(true);

export const yupThemeBlock = yup
	.object()
	.shape({
		0: yupThemePrefsBlock,
		1: yupThemePrefsBlock,
	})
	.required()
	.noUnknown(true)
	.strict(true);

export const yupThemePrefs = yup
	.object()
	.shape({
		isDark: yupBoolean,
		useCustom: yupBoolean,
		theme: yupThemeBlock,
	})
	.required()
	.noUnknown(true)
	.strict(true);

export const yupThemePrefsForm = yup.object().shape({
	formPage: yupPageDefaultColor,
	formBg: yupBgDefaultColor,
	formText: yupTextColor,
	formButton: yupButtonColor,
	formBorder: yupBorderColor,
});
