'use client';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
export async function api(path: string, opts: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = new Headers(opts.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    let msg = 'API error';
    try { const data = await res.json(); msg = data.message || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
