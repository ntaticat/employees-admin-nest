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

export default new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: false, // Siempre false aquí para la CLI
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});
