'use client';
import { Paper, TextField, Button, Stack, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../state/authSlice';
import { useRouter } from 'next/navigation';
import type { RootState } from '../../lib/store';
import { useState } from 'react';

export default function LoginPage(){
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const status = useSelector((s:RootState)=>s.auth.status);
  const err = useSelector((s:RootState)=>s.auth.error);
  const [localErr, setLocalErr] = useState<string|undefined>(undefined);

  async function onSubmit(e: any){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email')); const password = String(form.get('password'));
    try {
      const res = await dispatch(loginThunk({ email, password })).unwrap();
      localStorage.setItem('token', res);
      router.push('/clients');
    } catch (e:any) {
      setLocalErr(e.message || 'Login failed');
    }
  }
  return (
    <div style={{display:'grid',placeItems:'center',height:'100vh',padding:16}}>
      <Paper sx={{p:4, width:380}}>
        <Typography variant="h6" gutterBottom>Sign in</Typography>
        {(err || localErr) && <Alert severity="error" sx={{mb:2}}>{localErr || err}</Alert>}
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField name="email" label="Email" type="email" fullWidth defaultValue="admin@realseo.test" />
            <TextField name="password" label="Password" type="password" fullWidth defaultValue="123456" />
            <Button type="submit" variant="contained" disabled={status==='loading'}>Login</Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
