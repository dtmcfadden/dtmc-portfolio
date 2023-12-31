import { describe, expect, test } from '@jest/globals';
import { yupSearchForm } from './fraudgameSearch.yup';

const yupSearchFormObj = {
	id: '',
	device_id: '',
};

describe('yup validation', () => {
	describe('yupSearchForm', () => {
		describe('given the yupSearchFormObj structure is not valid', () => {
			test.todo('should return false');
		});
		// describe('given the yupThemePrefsObj has an invalid property added', () => {
		// 	test('should return false', async () => {
		// 		let yupThemePrefsObj_alt: any = { ...yupThemePrefsObj, ...{} };
		// 		// @ts-ignore
		// 		yupThemePrefsObj_alt.invalidProp = 'blah';
		// 		const yupThemePrefsObjCheck = await yupThemePrefs.isValid(yupThemePrefsObj_alt);
		// 		// console.log('yupThemePrefsObjCheck3', yupThemePrefsObjCheck);
		// 		expect(yupThemePrefsObjCheck).toBe(false);
		// 	});
		// });
		// describe('given the yupThemePrefsObj is valid', () => {
		// 	test('should return true', async () => {
		// 		// console.log('yupThemePrefsObj4', yupThemePrefsObj);
		// 		const yupThemePrefsObjCheck = await yupThemePrefs.isValid(yupThemePrefsObj);
		// 		// console.log('yupThemePrefsObjCheck4', yupThemePrefsObjCheck);
		// 		expect(yupThemePrefsObjCheck).toBe(true);
		// 	});
		// });
	});
});
