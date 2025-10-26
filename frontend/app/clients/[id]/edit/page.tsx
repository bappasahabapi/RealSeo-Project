'use client';
import AppShell from '../../../../components/AppShell';
import ClientForm from '../../../../components/ClientForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../../../lib/api';

export default function EditClient() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const c = await api(`/api/clients/${id}`);
        if (alive) setClient(c);
      } catch (e: any) {
        setError(e?.message || 'Failed to load client');
      }
    })();
    return () => { alive = false; };
  }, [id]);

  return (
    <AppShell title="Edit Client" crumb="Clients">
      {!client && !error && <div style={{padding:16}}>Loading…</div>}
      {error && <div style={{color:'crimson', padding:16}}>{error}</div>}
      {client && <ClientForm key={client.id} defaultValues={client} />}
    </AppShell>
  );
}
