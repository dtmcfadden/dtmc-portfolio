import { yupThemeBlock, yupThemePrefs, yupThemePrefsBlock, yupThemePrefsForm } from './theme.yup';

describe('yup validation', () => {
	describe('theme', () => {
		const yupThemePrefsBlockObj = {
			variant: 'dark',
			page: 'primary',
			bg: 'primary',
			text: 'text-light',
			button: 'btn-dark',
			border: 'border-light',
		};
		describe('yupThemePrefsBlock', () => {
			describe('given the yupThemePrefsBlock structure is not valid', () => {
				it('should return false', async () => {
					let yupThemePrefsBlockObj_alt: any = { ...yupThemePrefsBlockObj, ...{} };
					delete yupThemePrefsBlockObj_alt.page;
					// console.log('yupThemePrefsBlockObj_alt1', yupThemePrefsBlockObj_alt);
					const themePrefBlockCheck = await yupThemePrefsBlock.isValid(yupThemePrefsBlockObj_alt);
					// console.log('themePrefBlockCheck1', themePrefBlockCheck);
					expect(themePrefBlockCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsBlock property value is not valid', () => {
				it('should return false', async () => {
					let yupThemePrefsBlockObj_alt: any = { ...yupThemePrefsBlockObj, ...{} };
					yupThemePrefsBlockObj_alt.variant = 'blah';
					const themePrefBlockCheck = await yupThemePrefsBlock.isValid(yupThemePrefsBlockObj_alt);
					// console.log('themePrefBlockCheck2', themePrefBlockCheck);
					expect(themePrefBlockCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsBlock has an invalid property added', () => {
				it('should return false', async () => {
					let yupThemePrefsBlockObj_alt: any = { ...yupThemePrefsBlockObj, ...{} };
					yupThemePrefsBlockObj_alt.extraprop = 'true';
					const themePrefBlockCheck = await yupThemePrefsBlock.isValid(yupThemePrefsBlockObj_alt);
					// console.log('themePrefBlockCheck3', themePrefBlockCheck);
					expect(themePrefBlockCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsBlock is valid', () => {
				it('should return true', async () => {
					const themePrefBlockCheck = await yupThemePrefsBlock.isValid(yupThemePrefsBlockObj);
					// console.log('themePrefBlockCheck4', themePrefBlockCheck);
					expect(themePrefBlockCheck).toBe(true);
				});
			});
		});

		const yupThemeBlockObj = {
			0: yupThemePrefsBlockObj,
			1: yupThemePrefsBlockObj,
		};

		describe('yupThemeBlock', () => {
			describe('given the yupThemeBlock structure is not valid', () => {
				it('should return false', async () => {
					let yupThemeBlockObj_alt: any = { ...yupThemeBlockObj, ...{} };
					delete yupThemeBlockObj_alt[1];
					// console.log('yupThemeBlockObj_alt1', yupThemeBlockObj_alt);
					const yupThemeBlockObjCheck = await yupThemeBlock.isValid(yupThemeBlockObj_alt);
					// console.log('yupThemeBlockObjCheck1', yupThemeBlockObjCheck);
					expect(yupThemeBlockObjCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsBlock has an invalid property added', () => {
				it('should return false', async () => {
					let yupThemeBlockObj_alt: any = { ...yupThemeBlockObj, ...{} };
					yupThemeBlockObj_alt[2] = yupThemePrefsBlockObj;
					const yupThemeBlockObjCheck = await yupThemeBlock.isValid(yupThemeBlockObj_alt);
					// console.log('yupThemeBlockObjCheck3', yupThemeBlockObjCheck);
					expect(yupThemeBlockObjCheck).toBe(false);
				});
			});

			describe('given the yupThemeBlock is valid', () => {
				it('should return true', async () => {
					const yupThemeBlockObjCheck = await yupThemeBlock.isValid(yupThemeBlockObj);
					// console.log('yupThemeBlockObjCheck4', yupThemeBlockObjCheck);
					expect(yupThemeBlockObjCheck).toBe(true);
				});
			});
		});

		const yupThemePrefsObj = {
			isDark: true,
			useCustom: true,
			theme: yupThemeBlockObj,
		};
		describe('yupThemePrefsObj', () => {
			describe('given the yupThemePrefsObj structure is not valid', () => {
				it('should return false', async () => {
					let yupThemePrefsObj_alt: any = { ...yupThemePrefsObj, ...{} };
					delete yupThemePrefsObj_alt.isDark;
					// console.log('yupThemePrefsObj_alt1', yupThemePrefsObj_alt);
					const yupThemePrefsObjCheck = await yupThemePrefs.isValid(yupThemePrefsObj_alt);
					// console.log('yupThemePrefsObjCheck1', yupThemePrefsObjCheck);
					expect(yupThemePrefsObjCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsObj has an invalid property added', () => {
				it('should return false', async () => {
					let yupThemePrefsObj_alt: any = { ...yupThemePrefsObj, ...{} };
					// @ts-ignore
					yupThemePrefsObj_alt.invalidProp = 'blah';
					const yupThemePrefsObjCheck = await yupThemePrefs.isValid(yupThemePrefsObj_alt);
					// console.log('yupThemePrefsObjCheck3', yupThemePrefsObjCheck);
					expect(yupThemePrefsObjCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsObj is valid', () => {
				it('should return true', async () => {
					// console.log('yupThemePrefsObj4', yupThemePrefsObj);
					const yupThemePrefsObjCheck = await yupThemePrefs.isValid(yupThemePrefsObj);
					// console.log('yupThemePrefsObjCheck4', yupThemePrefsObjCheck);
					expect(yupThemePrefsObjCheck).toBe(true);
				});
			});
		});

		const yupThemePrefsFormObj = {
			formPage: 'primary',
			formBg: 'primary',
			formText: 'text-light',
			formButton: 'btn-dark',
			formBorder: 'border-light',
		};
		describe('yupThemePrefsFormObj', () => {
			describe('given the yupThemePrefsFormObj property value is not valid', () => {
				it('should return false', async () => {
					let yupThemePrefsFormObj_alt: any = { ...yupThemePrefsFormObj, ...{} };
					yupThemePrefsFormObj_alt.formPage = 'blah';
					const yupThemePrefsFormObjCheck = await yupThemePrefsForm.isValid(yupThemePrefsFormObj_alt);
					// console.log('yupThemePrefsFormObjCheck2', yupThemePrefsFormObjCheck);
					expect(yupThemePrefsFormObjCheck).toBe(false);
				});
			});

			describe('given the yupThemePrefsFormObj is valid', () => {
				it('should return true', async () => {
					// console.log('yupThemePrefsObj4', yupThemePrefsObj);
					const yupThemePrefsFormObjCheck = await yupThemePrefsForm.isValid(yupThemePrefsFormObj);
					console.log('yupThemePrefsFormObjCheck4', yupThemePrefsFormObjCheck);
					expect(yupThemePrefsFormObjCheck).toBe(true);
				});
			});
		});
	});
});
