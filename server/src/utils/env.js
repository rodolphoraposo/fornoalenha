import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3333,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};

export default env;
