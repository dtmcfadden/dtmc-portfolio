import { yupUUID, yupCUID, yupDateRequired, yupDateNotRequired } from './database.yup';

describe('yup validation', () => {
	describe('database', () => {
		const yupUUIDObj = '123e4567-e89b-12d3-a456-426614174000';
		describe('yupUUID', () => {
			describe('string is empty', () => {
				it('should return false', async () => {
					const yupUUIDObj_alt = '';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupUUIDCheck = await yupUUID.isValid(yupUUIDObj_alt);
					// console.log('yupUUIDCheck1', yupUUIDCheck);
					expect(yupUUIDCheck).toBe(false);
				});
			});

			describe('has invalid characters', () => {
				it('should return false with uppercase letters', async () => {
					const yupUUIDObj_alt = yupUUIDObj.toUpperCase();
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupUUIDCheck = await yupUUID.isValid(yupUUIDObj_alt);
					// console.log('yupUUIDCheck1', yupUUIDCheck);
					expect(yupUUIDCheck).toBe(false);
				});
				it('should return false with space at the end', async () => {
					const yupUUIDObj_alt = yupUUIDObj + ' ';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupUUIDCheck = await yupUUID.isValid(yupUUIDObj_alt);
					// console.log('yupUUIDCheck1', yupUUIDCheck);
					expect(yupUUIDCheck).toBe(false);
				});
				it('should return false with an dollar sign', async () => {
					const yupUUIDObj_alt = '123e4567-e89b-12d3-a456-42661417400$';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupUUIDCheck = await yupUUID.isValid(yupUUIDObj_alt);
					// console.log('yupUUIDCheck1', yupUUIDCheck);
					expect(yupUUIDCheck).toBe(false);
				});
			});

			describe('is a UUID string with a regex /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/', () => {
				it('should return true', async () => {
					const yupUUIDCheck = await yupUUID.isValid(yupUUIDObj);
					// console.log('yupCUIDCheck2', yupCUIDCheck);
					expect(yupUUIDCheck).toBe(true);
				});
			});
		});

		const yupCUIDObj = 'ckfritrvg0000kdtwc766fful';
		describe('yupCUID', () => {
			describe('string is empty', () => {
				it('should return false', async () => {
					const yupCUIDObjObj_alt = '';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupCUIDCheck = await yupCUID.isValid(yupCUIDObjObj_alt);
					// console.log('yupCUIDCheck1', yupCUIDCheck);
					expect(yupCUIDCheck).toBe(false);
				});
			});

			describe('has invalid characters', () => {
				it('should return false with uppercase letters', async () => {
					const yupCUIDObj_alt = yupCUIDObj.toUpperCase();
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupCUIDCheck = await yupCUID.isValid(yupCUIDObj_alt);
					// console.log('yupCUIDCheck1', yupCUIDCheck);
					expect(yupCUIDCheck).toBe(false);
				});
				it('should return false with space at the end', async () => {
					const yupCUIDObj_alt = yupCUIDObj + ' ';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupCUIDCheck = await yupCUID.isValid(yupCUIDObj_alt);
					// console.log('yupCUIDCheck1', yupCUIDCheck);
					expect(yupCUIDCheck).toBe(false);
				});
				it('should return false with an dollar sign', async () => {
					const yupCUIDObj_alt = 'ckfritrvg0000kdtwc766ffu$';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupCUIDCheck = await yupCUID.isValid(yupCUIDObj_alt);
					// console.log('yupCUIDCheck1', yupCUIDCheck);
					expect(yupCUIDCheck).toBe(false);
				});
			});

			describe('is a CUID string with a regex /^c[a-z0-9]{24}$/', () => {
				it('should return true', async () => {
					const yupCUIDCheck = await yupCUID.isValid(yupCUIDObj);
					// console.log('yupCUIDCheck2', yupCUIDCheck);
					expect(yupCUIDCheck).toBe(true);
				});
			});
		});
	});
});
