const dev = process.env.NODE_ENV !== 'production';
const FRAUD_API = process.env.FRAUD_API;

export const server = dev ? 'http://localhost:3000' : '';
export const fraudAPI = dev ? 'http://localhost:5000' : FRAUD_API;
