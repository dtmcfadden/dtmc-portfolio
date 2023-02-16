import { yupUserIdString, yupDeviceId, yupIpAddress, yupIpCountry, yupFingerprint } from './fraudgameTests.yup';

describe('yup validation', () => {
	describe('fraudgameTests', () => {
		const yupUserIdStringObj = '123456';
		describe('yupUserIdString', () => {
			describe('length is longer than 10', () => {
				it('should return false', async () => {
					let yupUserIdStringObj_alt: any = yupUserIdStringObj + '78901';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupUserIdStringObjCheck = await yupUserIdString.isValid(yupUserIdStringObj_alt);
					// console.log('yupUserIdStringObjCheck1', yupUserIdStringObjCheck);
					expect(yupUserIdStringObjCheck).toBe(false);
				});
			});

			describe('is empty', () => {
				it('should return false', async () => {
					let yupUserIdStringObj_alt: any = '';
					// console.log('yupUserIdStringObj_alt2', yupUserIdStringObj_alt);
					const yupUserIdStringObjCheck = await yupUserIdString.isValid(yupUserIdStringObj_alt);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(yupUserIdStringObjCheck).toBe(false);
				});
			});

			describe('is a string with min of 1 and max of 10', () => {
				it('should return true', async () => {
					const yupUserIdStringObjCheck = await yupUserIdString.isValid(yupUserIdStringObj);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(yupUserIdStringObjCheck).toBe(true);
				});
			});
		});

		const yupDeviceIdObj = 'abcdefghijklm';
		describe('yupDeviceId', () => {
			describe('length is longer than 13', () => {
				it('should return false', async () => {
					let yupDeviceIdObj_alt: any = yupDeviceIdObj + 'n';
					// console.log('yupUserIdStringObj_alt1', yupUserIdStringObj_alt);
					const yupDeviceIdObjCheck = await yupDeviceId.isValid(yupDeviceIdObj_alt);
					// console.log('yupUserIdStringObjCheck1', yupUserIdStringObjCheck);
					expect(yupDeviceIdObjCheck).toBe(false);
				});
			});

			describe('is empty', () => {
				it('should return false', async () => {
					let yupUserIdStringObj_alt: any = '';
					// console.log('yupUserIdStringObj_alt2', yupUserIdStringObj_alt);
					const yupUserIdStringObjCheck = await yupUserIdString.isValid(yupUserIdStringObj_alt);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(yupUserIdStringObjCheck).toBe(false);
				});
			});

			describe('is a string with min of 1 and max of 10', () => {
				it('should return true', async () => {
					const yupUserIdStringObjCheck = await yupUserIdString.isValid(yupUserIdStringObj);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(yupUserIdStringObjCheck).toBe(true);
				});
			});
		});

		const yupIpAddressObj = '0.0.0.0';
		describe('yupIpAddress', () => {
			describe('gets a random string', () => {
				it('should return false', async () => {
					const invalidIP = 'test';
					const yupIpAddressCheck = await yupIpAddress.isValid(invalidIP);
					// console.log('yupUserIdStringObjCheck1', yupUserIdStringObjCheck);
					expect(yupIpAddressCheck).toBe(false);
				});
			});

			describe('invalid IP with only 3 numbers', () => {
				it('should return false', async () => {
					const invalidIP = '0.0.0';
					const invalidIPCheck = await yupIpAddress.isValid(invalidIP);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(invalidIPCheck).toBe(false);
				});
			});

			describe('invalid IP with extra number set', () => {
				it('should return false', async () => {
					const invalidIP = '0.0.0.0.0';
					const invalidIPCheck = await yupIpAddress.isValid(invalidIP);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(invalidIPCheck).toBe(false);
				});
			});

			describe('invalid IP with higher digit value', () => {
				it('should return false', async () => {
					const invalidIP = '256.256.256.256';
					const invalidIPCheck = await yupIpAddress.isValid(invalidIP);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(invalidIPCheck).toBe(false);
				});
			});

			describe('valid low end IP', () => {
				it('should return true', async () => {
					const validIP = '0.0.0.0';
					const validIPCheck = await yupIpAddress.isValid(validIP);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(validIPCheck).toBe(true);
				});
			});

			describe('valid low end IP', () => {
				it('should return true', async () => {
					const validIP = '255.255.255.255';
					const validIPCheck = await yupIpAddress.isValid(validIP);
					// console.log('yupUserIdStringObjCheck2', yupUserIdStringObjCheck);
					expect(validIPCheck).toBe(true);
				});
			});
		});
	});
});
