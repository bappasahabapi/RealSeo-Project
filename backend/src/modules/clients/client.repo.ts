import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../../database/pool";

export type ClientRecord = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  dob: string;
  cell: string | null;
  company: string | null;
  price: string | null;
  comments: string | null;
  created_at: Date;
  updated_at: Date;
};

type ListParams = {
  search?: string;
  sort?:
    | "id"
    | "first_name"
    | "last_name"
    | "email"
    | "address"
    | "dob"
    | "cell"
    | "company"
    | "price"
    | "comments"
    | "created_at"
    | "updated_at";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

const SORT_COLUMNS = new Set([
  "id",
  "first_name",
  "last_name",
  "email",
  "address",
  "dob",
  "cell",
  "company",
  "price",
  "comments",
  "created_at",
  "updated_at",
]);

export const ClientRepo = {
  async list(params: ListParams = {}) {
    const {
      search = "",
      sort = "created_at",
      order = "desc",
      page = 1,
      pageSize = 10,
    } = params;
    const sortCol = SORT_COLUMNS.has(sort!) ? sort : "created_at";
    const sortDir = order?.toLowerCase() === "asc" ? "ASC" : "DESC";
    const offset = (page - 1) * pageSize;
    const values: any[] = [];
    let where = "";
    if (search) {
      const like = `%${search}%`;
      where = `WHERE (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR address LIKE ? OR cell LIKE ? OR company LIKE ? OR price LIKE ? OR comments LIKE ?)`;
      values.push(like, like, like, like, like, like, like, like);
    }
    const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM clients ${where} ORDER BY ${sortCol} ${sortDir} LIMIT ? OFFSET ?`;
    values.push(pageSize, offset);
    const [rows] = await pool.query<RowDataPacket[]>(sql, values);
    const [count] = await pool.query<RowDataPacket[]>(
      "SELECT FOUND_ROWS() AS total"
    );
    return {
      data: rows as any[],
      total: (count[0] as any).total as number,
      page,
      pageSize,
    };
  },
  async findById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM clients WHERE id = ?",
      [id]
    );
    return (rows[0] as any) || null;
  },
  async count(): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as n FROM clients"
    );
    return (rows[0] as any).n as number;
  },
  async create(data: Omit<ClientRecord, "id" | "created_at" | "updated_at">) {
    const [res] = await pool.query<ResultSetHeader>(
      `INSERT INTO clients (first_name,last_name,email,address,dob,cell,company,price,comments) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.address,
        data.dob,
        data.cell,
        data.company,
        data.price,
        data.comments,
      ]
    );
    return this.findById((res as any).insertId);
  },
  async bulkInsert(
    rows: Omit<ClientRecord, "id" | "created_at" | "updated_at">[]
  ) {
    if (!rows.length) return;
    const vals = rows.map((r) => [
      r.first_name,
      r.last_name,
      r.email,
      r.address,
      r.dob,
      r.cell,
      r.company,
      r.price,
      r.comments,
    ]);
    await pool.query(
      `INSERT INTO clients (first_name,last_name,email,address,dob,cell,company,price,comments) VALUES ?`,
      [vals]
    );
  },
  async update(
    id: number,
    data: Partial<Omit<ClientRecord, "id" | "created_at" | "updated_at">>
  ) {
    const allowed = [
      "first_name",
      "last_name",
      "email",
      "address",
      "dob",
      "cell",
      "company",
      "price",
      "comments",
    ];
    const keys = Object.keys(data).filter((k) => allowed.includes(k));
    if (!keys.length) return this.findById(id);
    const sets = keys.map((k) => `${k} = ?`).join(", ");
    const values = keys.map((k) => (data as any)[k]);
    values.push(id);
    await pool.query<ResultSetHeader>(
      `UPDATE clients SET ${sets} WHERE id = ?`,
      values
    );
    return this.findById(id);
  },
  async remove(id: number) {
    await pool.query<ResultSetHeader>("DELETE FROM clients WHERE id = ?", [id]);
    return { id };
  },
};
