import 'src/global.css';

import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { orders, formatCurrency, type OrderStatus } from '../../shared/orders';

const statusColor: Record<OrderStatus, 'success' | 'warning' | 'info' | 'error'> = {
  Paid: 'success', Processing: 'warning', Shipped: 'info', Refunded: 'error',
};

function OrdersPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [showEmpty, setShowEmpty] = useState(false);
  const visible = useMemo(() => showEmpty ? [] : orders.filter((order) => {
    const matchesSearch = `${order.id} ${order.customer}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (status === 'All' || order.status === status);
  }), [search, status, showEmpty]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ flexGrow: 1 }}><Typography variant="h4">Orders</Typography><Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>Track and manage customer orders</Typography></Box>
        <Button variant="outlined" color="inherit" onClick={() => setShowEmpty((value) => !value)} startIcon={<Iconify icon={showEmpty ? 'solar:list-bold' : 'solar:box-minimalistic-bold'} />}>
          {showEmpty ? 'Show orders' : 'Preview empty state'}
        </Button>
      </Box>

      <Card>
        <Box sx={{ p: 2.5, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField fullWidth value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by order or customer..." InputProps={{ startAdornment: <InputAdornment position="start"><Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
          <TextField select value={status} onChange={(event) => setStatus(event.target.value)} sx={{ minWidth: { sm: 180 } }}><MenuItem value="All">All statuses</MenuItem>{Object.keys(statusColor).map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</TextField>
        </Box>
        {visible.length ? (
          <Scrollbar><TableContainer sx={{ minWidth: 760 }}><Table><TableHead><TableRow><TableCell>Order</TableCell><TableCell>Customer</TableCell><TableCell>Date</TableCell><TableCell>Items</TableCell><TableCell>Status</TableCell><TableCell align="right">Total</TableCell><TableCell /></TableRow></TableHead><TableBody>
            {visible.map((order) => <TableRow hover key={order.id}><TableCell><Typography variant="subtitle2">{order.id}</Typography></TableCell><TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.dark' }}>{order.customer.charAt(0)}</Avatar><Box><Typography variant="subtitle2">{order.customer}</Typography><Typography variant="body2" sx={{ color: 'text.secondary' }}>{order.email}</Typography></Box></Box></TableCell><TableCell>{order.date}</TableCell><TableCell>{order.items}</TableCell><TableCell><Label color={statusColor[order.status]}>{order.status}</Label></TableCell><TableCell align="right"><Typography variant="subtitle2">{formatCurrency(order.total)}</Typography></TableCell><TableCell align="right"><Button size="small" color="inherit">View</Button></TableCell></TableRow>)}
          </TableBody></Table></TableContainer></Scrollbar>
        ) : (
          <Box sx={{ py: 10, px: 3, textAlign: 'center' }}><Box sx={{ mx: 'auto', mb: 3, width: 96, height: 96, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'background.neutral' }}><Iconify icon="solar:box-minimalistic-bold" width={44} sx={{ color: 'text.disabled' }} /></Box><Typography variant="h6">No orders yet</Typography><Typography variant="body2" sx={{ mt: 1, mx: 'auto', maxWidth: 360, color: 'text.secondary' }}>New customer orders will appear here as soon as they are placed.</Typography><Button variant="contained" sx={{ mt: 3 }} startIcon={<Iconify icon="mingcute:add-line" />}>Create order</Button></Box>
        )}
      </Card>
    </DashboardContent>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><ThemeProvider><DashboardLayout><OrdersPage /></DashboardLayout></ThemeProvider></BrowserRouter></StrictMode>);
