"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../lib/api";
import { Client, ClientsState } from "../types/clientType";

const initialState: ClientsState = {
  rows: [],
  total: 0,
  q: {
    page: 0,
    pageSize: 10,
    sortField: "created_at",
    sortDir: "desc",
    search: "",
  },
  status: "idle",
};

export const fetchClients = createAsyncThunk(
  "clients/fetch",
  async (_, { getState }) => {
    const s = getState() as any;
    const { page, pageSize, sortField, sortDir, search } = s.clients.q;
    const params = new URLSearchParams({
      page: String(page + 1),
      pageSize: String(pageSize),
      sort: sortField,
      order: sortDir,
    });
    if (search) params.set("search", search);
    const data = await api(`/api/clients?` + params.toString());
    return data as {
      data: Client[];
      total: number;
      page: number;
      pageSize: number;
    };
  }
);

export const createClient = createAsyncThunk(
  "clients/create",
  async (payload: Omit<Client, "id">, { dispatch }) => {
    await api("/api/clients", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    dispatch(fetchClients());
  }
);
export const updateClient = createAsyncThunk(
  "clients/update",
  async ({ id, data }: { id: number; data: Partial<Client> }, { dispatch }) => {
    await api(`/api/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    dispatch(fetchClients());
  }
);
export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (id: number, { dispatch }) => {
    await api(`/api/clients/${id}`, { method: "DELETE" });
    dispatch(fetchClients());
  }
);

const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.q.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.q.pageSize = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{ field: string; dir: "asc" | "desc" }>
    ) {
      state.q.sortField = action.payload.field;
      state.q.sortDir = action.payload.dir;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.q.search = action.payload;
      state.q.page = 0;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchClients.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchClients.fulfilled, (s, a) => {
        s.status = "idle";
        s.rows = a.payload.data;
        s.total = a.payload.total;
        s.q.page = a.payload.page - 1;
        s.q.pageSize = a.payload.pageSize;
      })
      .addCase(fetchClients.rejected, (s) => {
        s.status = "error";
      });
  },
});

export const { setPage, setPageSize, setSort, setSearch } = slice.actions;
export default slice.reducer;
