export type Client = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  dob: string;
  cell?: string | null;
  company?: string | null;
  price?: string | null;
  comments?: string | null;
  created_at?: string;
  updated_at?: string;
};


export type Query = {
  page: number;
  pageSize: number;
  sortField: string;
  sortDir: "asc" | "desc";
  search: string;
};

export type ClientsState = {
  rows: Client[];
  total: number;
  q: Query;
  status: "idle" | "loading" | "error";
};