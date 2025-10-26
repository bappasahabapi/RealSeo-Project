"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../lib/store";
import {
  fetchClients,
  setPage,
  setPageSize,
  setSort,
  deleteClient,
} from "../state/clientsSlice";
import { Button, Paper, Stack } from "@mui/material";
import Link from "next/link";
import {
  BORDER,
  NAV,
  HEADER_BG,
  STRIPE_BG,
  HOVER_BG,
} from "../constants/colorValues";

const Arrows = () => (
  <span style={{ marginLeft: 8, fontSize: 14, lineHeight: 1, opacity: 0.95 }}>
    ⇅
  </span>
);

const withArrows = (label: string) => () =>
  (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {label}
      <Arrows />
    </span>
  );

export default function ClientsTable() {
  const dispatch = useDispatch<any>();
  const { rows, total, q, status } = useSelector((s: RootState) => s.clients);
  const apiRef = useGridApiRef();

  React.useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch, q.page, q.pageSize, q.sortField, q.sortDir, q.search]);

  const handleDownloadCsv = () => {
    apiRef.current.exportDataAsCsv({
      fileName: `clients_${new Date().toISOString().slice(0, 10)}.csv`,
      utf8WithBom: true,
      allColumns: false,
    });
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Client Name",
      flex: 1,
      renderHeader: withArrows("Client Name"),
      valueGetter: (_v, row) =>
        `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim(),
      sortable: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.2,
      renderHeader: withArrows("Address"),
      sortable: true,
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 160,
      renderHeader: withArrows("Date"),
      valueGetter: (v) => (v ? String(v).slice(0, 10) : ""),
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderHeader: withArrows("Email"),
      sortable: true,
    },
    {
      field: "cell",
      headerName: "Cell",
      width: 160,
      renderHeader: withArrows("Cell"),
      sortable: true,
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1.6,
      renderHeader: withArrows("Comments"),
      sortable: true,
    },
    {
      field: "actions",
      headerName: "",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Stack direction="row" spacing={1}>
          <Link href={`/clients/${p.row.id}/edit`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button
            size="small"
            color="error"
            onClick={() => dispatch(deleteClient(p.row.id))}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const pageSizeOptions = [5, 10, 25, 50];

  return (
    <Paper className="card" sx={{ p: 0,borderRadius: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 12px 0 12px",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleDownloadCsv}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            borderColor: BORDER,
            color: "#111",
            backgroundColor: "#fff",
            "&:hover": { borderColor: NAV },
          }}
        >
         
          Download CSV {" "}
           <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 8 }}
          >
            <path
              d="M12 3v10m0 0l4-4m-4 4l-4-4M5 21h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        <Link href="/clients/new">
          <Button variant="contained">Add New Client</Button>
        </Link>
      </div>

      <div style={{ width: "100%", marginTop: 20, borderRadius: "0px" }}>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          getRowId={(r) => r.id}
          columns={columns}
          autoHeight
          loading={status === "loading"}
          rowCount={total}
          paginationModel={{ page: q.page, pageSize: q.pageSize }}
          pageSizeOptions={pageSizeOptions}
          paginationMode="server"
          sortingMode="server"
          sortingOrder={["asc", "desc"]}
          getEstimatedRowHeight={() => 188}
          getRowHeight={() => 70}
          onPaginationModelChange={(m) => {
            if (m.page !== q.page) dispatch(setPage(m.page));
            if (m.pageSize !== q.pageSize) dispatch(setPageSize(m.pageSize));
          }}
          onSortModelChange={(m) => {
            const s = m[0];
            if (s)
              dispatch(
                setSort({
                  field: s.field === "name" ? "last_name" : s.field,
                  dir: (s.sort || "asc") as "asc" | "desc",
                })
              );
            else dispatch(setSort({ field: "created_at", dir: "desc" }));
          }}
          initialState={{
            sorting: { sortModel: [{ field: "created_at", sort: "desc" }] },
          }}
          disableColumnMenu={false}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 1 ? "odd" : "even"
          }
           sx={{
          borderRadius: 0,
          borderColor: BORDER,

          /* header */
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `${HEADER_BG} !important`,
            borderRadius: 0, 
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: `${HEADER_BG} !important`,
            color: "#131010",
            fontWeight: 700,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: 14,
            display: "flex",
            alignItems: "center",
          },

          "& .MuiDataGrid-sortIcon": { display: "none" },
          "& .MuiDataGrid-iconButtonContainer": { display: "none" },

          /* vertical borders */
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
            borderRight: `1px solid ${BORDER}`,
          },
          "& .MuiDataGrid-columnHeader:last-of-type, & .MuiDataGrid-cell:last-of-type":
            { borderRight: "none" },

          /* stripe + hover */
          "& .MuiDataGrid-row.odd": { backgroundColor: STRIPE_BG },
          "& .MuiDataGrid-row:hover, & .MuiDataGrid-row.Mui-hovered": {
            backgroundColor: `${HOVER_BG} !important`,
          },

          /* clean focus */
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },

          /* square rows and any internal wrappers */
          "& .MuiDataGrid-row": { borderRadius: 0 },
          "& .MuiDataGrid-withBorderColor": { borderRadius: 0 },
          "& .MuiDataGrid-topContainer": { borderRadius: 0 },
          "& .MuiDataGrid-main": { borderRadius: 0 },
        }}
        />
      </div>
    </Paper>
  );
}
