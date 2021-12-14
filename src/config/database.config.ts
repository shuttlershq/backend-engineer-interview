import { isTestEnv } from './vars';

export const getDbConfig = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'antarctica',
  synchronize: true,
  logging: false,
  entities: isTestEnv()
    ? ['src/modules/**/entities/*.entity.{ts,js}']
    : ['dist/src/modules/**/entities/*.entity.{ts,js}'],
  migrations: ['dist/src/migration/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
