import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.NODE_ENV || 'development';
const envFile = ENV === 'development' ? '.env.development' : `.env.${ENV}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set in ormconfig.ts',
  );
}

const isTs = path.extname(__filename) === '.ts';

const useSSL = process.env.DATABASE_SSL?.toLowerCase() === 'true';

export default new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: false,
  logging: false,
  entities: [isTs ? 'src/**/*.entity.ts' : 'dist/:**/*.entity.js'],
  migrations: [isTs ? 'src/migrations/**/*.ts' : 'dist/migrations/**/*.js'],
  ssl: useSSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});
