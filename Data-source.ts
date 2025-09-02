import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Bet } from './entities/Bet';
import { Transaction } from './entities/Transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: [User, Bet, Transaction],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
  cache: {
    type: 'redis',
    options: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    duration: 60000, // 1 minute cache
  },
});
