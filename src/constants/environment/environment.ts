console.log('environment:', process);
console.log('environment:', JSON.stringify(process.env));
console.log('environment:', process.env.HOLIDAYS_API_KEY);

export const HOLIDAYS_API_KEY = process.env.HOLIDAYS_API_KEY || '';
