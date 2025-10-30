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
//   async list(params: ListParams = {}) {
//     const {
//       search = "",
//       sort = "created_at",
//       order = "desc",
//       page = 1,
//       pageSize = 10,
//     } = params;
//     const sortCol = SORT_COLUMNS.has(sort!) ? sort : "created_at";
//     const sortDir = order?.toLowerCase() === "asc" ? "ASC" : "DESC";
//     const offset = (page - 1) * pageSize;
//     // const values: any[] = [];
    
// let where = "";
// const vals: any[] = [];
// if (search) {
//   const like = `%${search}%`;
//   where = `WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1 OR company ILIKE $1 OR price ILIKE $1 OR comments ILIKE $1 OR address ILIKE $1 OR cell ILIKE $1)`;
//   vals.push(like);
// }
// const values = vals.slice();
// values.push(pageSize, offset);
//     const { rows } = await pool.query(sql, values);
//     const countRes: any = await pool.query(
//       "SELECT FOUND_ROWS() AS total"
//     );
//     return {
//       data: rows as any[],
//       total: (count[0] as any).total as number,
//       page,
//       pageSize,
//     };
//   },
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

  // --- Build WHERE clause
  let where = "";
  const values: any[] = [];

  if (search) {
    const like = `%${search}%`;
    where = `WHERE (
      first_name ILIKE $1 OR
      last_name ILIKE $1 OR
      email ILIKE $1 OR
      company ILIKE $1 OR
      price ILIKE $1 OR
      comments ILIKE $1 OR
      address ILIKE $1 OR
      cell ILIKE $1
    )`;
    values.push(like);
  }

  // --- Pagination parameters
  const limitIndex = values.length + 1;
  const offsetIndex = values.length + 2;
  values.push(pageSize, offset);

  // --- Main query using COUNT(*) OVER()
  const sql = `
    SELECT *,
           COUNT(*) OVER() AS total
    FROM clients
    ${where}
    ORDER BY ${sortCol} ${sortDir}
    LIMIT $${limitIndex} OFFSET $${offsetIndex};
  `;

  const { rows } = await pool.query(sql, values);

  const total = rows.length ? Number(rows[0].total) : 0;

  return {
    data: rows as any[],
    total,
    page,
    pageSize,
  };
},

  async findById(id: number) {
    const { rows } = await pool.query(
      "SELECT * FROM clients WHERE id = $1",
      [id]
    );
    return (rows[0] as any) || null;
  },
  async count(): Promise<number> {
    const { rows } = await pool.query(
      "SELECT COUNT(*) as n FROM clients"
    );
    return (rows[0] as any).n as number;
  },
  async create(data: Omit<ClientRecord, "id" | "created_at" | "updated_at">) {
    const [res] = await pool.query(
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
    await pool.query(
      `UPDATE clients SET ${sets} WHERE id = ?`,
      values
    );
    return this.findById(id);
  },
  async remove(id: number) {
    await pool.query("DELETE FROM clients WHERE id = $1", [id]);
    return { id };
  },
};
