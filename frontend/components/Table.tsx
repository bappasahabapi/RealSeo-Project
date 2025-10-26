// "use client";
// import * as React from "react";
// import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../lib/store";
// import {
//   fetchClients,
//   setPage,
//   setPageSize,
//   setSort,
//   deleteClient,
//   // setSearch,
// } from "../state/clientsSlice";
// import { Button, Paper, Stack, TextField } from "@mui/material";
// import Link from "next/link";


// export default function ClientsTable() {
//   const dispatch = useDispatch<any>();
//   const { rows, total, q, status } = useSelector((s: RootState) => s.clients);
//   React.useEffect(() => {
//     dispatch(fetchClients());
//   }, [dispatch, q.page, q.pageSize, q.sortField, q.sortDir, q.search]);

//   const columns: GridColDef[] = [
//     {
//       field: "name",
//       headerName: "Client Name ⇅",
//       flex: 1,
//       valueGetter: (_value, row) =>
//         `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim(),
//     },
//     { field: "address", headerName: "Address", flex: 1.2 },
//     {
//       field: "created_at",
//       headerName: "Date",
//       width: 160,
//       valueGetter: (value) => (value ? String(value).slice(0, 10) : ""),
//     },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "cell", headerName: "Cell", width: 160 },
//     { field: "comments", headerName: "Comments", flex: 1.6 },
//     {
//       field: "actions",
//       headerName: "",
//       width: 200,
//       sortable: false,
//       filterable: false,
//       renderCell: (p) => (
//         <Stack direction="row" spacing={1}>
//           <Link href={`/clients/${p.row.id}/edit`}>
//             <Button size="small" variant="outlined">
//               Edit
//             </Button>
//           </Link>
//           <Button
//             size="small"
//             color="error"
//             variant="outlined"
//             onClick={() => dispatch(deleteClient(p.row.id))}
//           >
//             Delete
//           </Button>
//         </Stack>
//       ),
//     },
//   ];

//   const pageSizeOptions = [5, 10, 25, 50];

//   return (
//     <Paper className="card" sx={{ p: 0 }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "right",
//           padding: "12px 12px 0 12px",
//         }}
//       >
//         {/* <TextField
//           placeholder="Quick filter..."
//           size="small"
//           onChange={(e) => dispatch(setSearch(e.target.value))}
//         /> */}

//         <Link href="/clients/new">
//           <Button variant="contained">Add New Client</Button>
//         </Link>
//       </div>
//       <div style={{ width: "100%", marginTop: "20px" }}>
//         <DataGrid
//           rows={rows}
//           getRowId={(r) => r.id}
//           columns={columns}
//           autoHeight
//           loading={status === "loading"}
//           rowCount={total}
//           paginationModel={{ page: q.page, pageSize: q.pageSize }}
//           pageSizeOptions={pageSizeOptions}
//           paginationMode="server"
//           sortingMode="server"
//           onPaginationModelChange={(m) => {
//             if (m.page !== q.page) dispatch(setPage(m.page));
//             if (m.pageSize !== q.pageSize) dispatch(setPageSize(m.pageSize));
//           }}
//           onSortModelChange={(m) => {
//             const s = m[0];
//             if (s)
//               dispatch(
//                 setSort({
//                   field: s.field === "name" ? "last_name" : s.field,
//                   dir: (s.sort || "asc") as "asc" | "desc",
//                 })
//               );
//             else dispatch(setSort({ field: "created_at", dir: "desc" }));
//           }}
//           initialState={{
//             sorting: { sortModel: [{ field: "created_at", sort: "desc" }] },
//           }}
//           slots={{ toolbar: GridToolbar }}
//           disableColumnMenu={false}
//           sx={{
//             // header bar color
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#87957fff",
//               color: "#131010ff",
//               fontWeight: 600,
//               borderRadius: "8px 8px 0 0",
//             },
           
//           }}
//         />
//       </div>
//     </Paper>
//   );
// }