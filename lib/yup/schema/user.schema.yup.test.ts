import { yupFormName } from './user.schema.yup';

describe('yupFormName', () => {
	const yupFormNameObj = {
		formDisplayName: 'displayName123',
	};
	describe('yupUserIdString', () => {
		describe('length is short than 4', () => {
			it('should return false', async () => {
				let yupFormNameObj_alt: any = { ...yupFormNameObj, ...{} };
				yupFormNameObj_alt.formDisplayName = '';
				// console.log('yupFormNameObj_alt1', yupFormNameObj_alt);
				const yupFormNameCheck = await yupFormName.isValid(yupFormNameObj_alt);
				// console.log('yupFormNameCheck1', yupFormNameCheck);
				expect(yupFormNameCheck).toBe(false);
			});
		});

		describe('length is longer than 50', () => {
			it('should return false', async () => {
				let yupFormNameObj_alt: any = { ...yupFormNameObj, ...{} };
				yupFormNameObj_alt.formDisplayName = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
				// console.log('yupFormNameObj_alt1', yupFormNameObj_alt);
				const yupFormNameCheck = await yupFormName.isValid(yupFormNameObj_alt);
				// console.log('yupFormNameCheck1', yupFormNameCheck);
				expect(yupFormNameCheck).toBe(false);
			});
		});

		describe('has invalid symbol', () => {
			it('should return false with space', async () => {
				let yupFormNameObj_alt: any = { ...yupFormNameObj, ...{} };
				yupFormNameObj_alt.formDisplayName = 'first last';
				// console.log('yupFormNameObj_alt1', yupFormNameObj_alt);
				const yupFormNameCheck = await yupFormName.isValid(yupFormNameObj_alt);
				// console.log('yupFormNameCheck1', yupFormNameCheck);
				expect(yupFormNameCheck).toBe(false);
			});
			it('should return false with period', async () => {
				let yupFormNameObj_alt: any = { ...yupFormNameObj, ...{} };
				yupFormNameObj_alt.formDisplayName = 'first.last';
				// console.log('yupFormNameObj_alt1', yupFormNameObj_alt);
				const yupFormNameCheck = await yupFormName.isValid(yupFormNameObj_alt);
				// console.log('yupFormNameCheck1', yupFormNameCheck);
				expect(yupFormNameCheck).toBe(false);
			});
			it('should return false with underscore', async () => {
				let yupFormNameObj_alt: any = { ...yupFormNameObj, ...{} };
				yupFormNameObj_alt.formDisplayName = 'first_last';
				// console.log('yupFormNameObj_alt1', yupFormNameObj_alt);
				const yupFormNameCheck = await yupFormName.isValid(yupFormNameObj_alt);
				// console.log('yupFormNameCheck1', yupFormNameCheck);
				expect(yupFormNameCheck).toBe(false);
			});
		});

		describe('string between 4 and 50 and matches regex /^[a-z0-9]+$/i', () => {
			it('should return true', async () => {
				const yupFormNameCheck = await yupFormName.isValid(yupFormNameObj);
				// console.log('yupFormNameCheck2', yupFormNameCheck);
				expect(yupFormNameCheck).toBe(true);
			});
		});
	});
});
