require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const { DataSource } = require("typeorm");

module.exports = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['src/**/*.entity.ts'], // CLI necesita .ts
  migrations: ['src/migrations/**/*.ts'], // CLI necesita .ts
});