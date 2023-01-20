import { string } from 'yup';

export interface PurchaseTrans {
	id: string;
	signup_time: string;
	purchase_time: string;
	signup_purchase_diff_sec: string;
	sex: string;
	age: string;
	user_fingerprint: string;
	user_fingerprint_velocity: string;
	purchase_value: string;
	source: string;
	purchase_fingerprint: string;
	purchase_fingerprint_velocity: string;
	ip_address: string;
	ip_country: string | null;
	ip_address_velocity: string;
	ip_history_fraudulent: string;
	ip_history_total: string;
	device_id: string;
	browser: string;
	device_fingerprint: string;
	device_fingerprint_velocity: string;
	is_fraud: string;
}

export interface FraudSearchParams {
	id?: string;
	signup_time?: string;
	purchase_time?: string;
	purchase_value?: string;
	device_id?: string;
	ip_address?: string;
	ip_country?: string;
	source?: string;
	browser?: string;
	sex?: string;
	age?: string;
	device_fingerprint?: string;
	purchase_fingerprint?: string;
	user_fingerprint?: string;
}

export interface FraudUserStats {
	trans_is_fraud_count: number;
	trans_total_count: number;
	user_action_count?: number;
	user_action_is_fraud_count?: number;
	user_correct_match?: number;
}

export interface FraudUserAction {
	user_id: string;
	id: number;
	is_fraud: boolean;
}

export interface FraudUserResult {
	result: number;
}
