import type { RowDataPacket } from "mysql2/promise";
import { pool } from "../../database/pool";

export type UserRecord = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export const UserRepo = {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    return (rows[0] as any) || null;
  },
  async count(): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as n FROM users"
    );
    return (rows[0] as any).n as number;
  },
  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserRecord> {
    const [result]: any = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    const id = result.insertId as number;
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] as any;
  },
  async updatePasswordByEmail(email: string, password: string) {
    await pool.query("UPDATE users SET password = ? WHERE email = ?", [
      password,
      email,
    ]);
  },
};
