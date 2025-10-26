import AppShell from "../../components/AppShell";
import ClientsTable from "../../components/ClientsTable";
export default function ClientsPage() {
  return (
    <AppShell title="Clients" crumb="Clients">
      <ClientsTable />
    </AppShell>
  );
}
