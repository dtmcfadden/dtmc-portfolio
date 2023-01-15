import * as yup from 'yup';
import { yupDeviceId, yupFingerprint, yupIpAddress, yupIpCountry, yupUserIdString } from './fraudgameTests.yup';

export const yupSearchForm = yup
	.object()
	.shape({
		id: yupUserIdString,
		device_id: yupDeviceId,
		// ip_address: yupIpAddress,
		// ip_country: yupIpCountry,
		// device_fingerprint: yupFingerprint,
		// purchase_fingerprint: yupFingerprint,
	})
	.required()
	.strict(true);
