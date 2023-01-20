import { FraudSearchParams } from '@/interfaces/fraud.interface';
import { yupIpAddress, yupUserIdString } from '@/lib/yup/fraud/fraudgameTests.yup';

interface IReturn {
	validated: boolean;
	paramsObj: FraudSearchParams;
}

export const fraudParameterCheck = async (params: string[]): Promise<IReturn | undefined> => {
	if (params.length % 2 == 0) {
		let paramsObj: FraudSearchParams = {};
		let validated = true;
		for (let i = 0; i < params.length; i = i + 2) {
			if (validated === true) {
				let pK = params[i].toLocaleLowerCase();
				let pV = params[i + 1];
				// console.log('pK', pK, 'pV', pV);
				switch (pK) {
					case 'id':
						if ((await yupUserIdString.isValid(pV)) === true) {
							paramsObj.id = pV;
						} else {
							validated = false;
						}
						break;
					case 'ip':
					case 'ip_address':
						// console.log('yupIpAddress', await yupIpAddress.isValid(pV));
						if ((await yupIpAddress.isValid(pV)) === true) {
							paramsObj.ip_address = pV;
						} else {
							validated = false;
						}
						break;
				}
				// console.log('param:', params[i], 'value:', params[i + 1], 'validated', validated);
			} else {
				break;
			}
		}
		return { validated: validated, paramsObj: paramsObj };
	}
};
