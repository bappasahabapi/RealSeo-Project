import AppShell from "../../../components/AppShell";
import ClientForm from "../../../components/ClientForm";
export default function NewClient() {
  return (
    <AppShell title="Add New Client" crumb="Clients">
      <ClientForm />
    </AppShell>
  );
}
