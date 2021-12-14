import dotenv from 'dotenv';
dotenv.config();

type varsDto = {
  port?: string;
  secret: string;
};

export const Vars: varsDto = {
  port: process.env.PORT,
  secret: process.env.SECRET,
};

export const isTestEnv = () => process.env.NODE_ENV === 'test';
