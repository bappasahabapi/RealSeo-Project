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
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    return (rows[0] as any) || null;
  },
  async count(): Promise<number> {
    const { rows } = await pool.query(
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
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, password]
    );
    const id = result.rows[0].id as number;
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return rows[0] as any;
  },
  async updatePasswordByEmail(email: string, password: string) {
    await pool.query("UPDATE users SET password = $1, updated_at = NOW() WHERE email = $2", [
      password,
      email,
    ]);
  },
};
