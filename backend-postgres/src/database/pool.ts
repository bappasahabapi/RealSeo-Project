import { Pool } from 'pg';
import { config } from '../config/env';

export const pool = new Pool({
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT, 10),
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  max: 10,
});
