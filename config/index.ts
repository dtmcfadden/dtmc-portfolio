const FRAUD_API = process.env.FRAUD_API;

export const isDev = process.env.NODE_ENV !== 'production';
export const server = isDev ? 'http://localhost:3000' : '';
export const fraudAPI = isDev ? 'http://localhost:5000' : FRAUD_API;
