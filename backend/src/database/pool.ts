import mysql from 'mysql2/promise';
import { config } from '../config/env';

export const pool = mysql.createPool({
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT, 10),
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  connectionLimit: 10,
  namedPlaceholders: true,
});
