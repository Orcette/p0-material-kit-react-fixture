import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { orders, Customer, EmptyOrders, StatusLabel, OrdersHeader } from '../shared/orders';

export default function OrdersTableVariant() {
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('All');
  const visible = orders.filter((order) => (status === 'All' || order.status === status) && `${order.id} ${order.customer}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardContent>
      <OrdersHeader />
      <Card>
        {searchParams.get('state') === 'empty' ? <EmptyOrders /> : <>
        <Box sx={{ p: 2.5, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField fullWidth placeholder="Search order or customer..." value={query} onChange={(event) => setQuery(event.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
          <Select value={status} onChange={(event) => setStatus(event.target.value)} sx={{ minWidth: 150 }}>
            {['All', 'Paid', 'Processing', 'Shipped', 'Refunded'].map((value) => <MenuItem key={value} value={value}>{value === 'All' ? 'All statuses' : value}</MenuItem>)}
          </Select>
        </Box>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 760 }}>
            <Table>
              <TableHead><TableRow><TableCell>Order</TableCell><TableCell>Customer</TableCell><TableCell>Date</TableCell><TableCell>Items</TableCell><TableCell>Status</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
              <TableBody>{visible.map((order) => <TableRow hover key={order.id}><TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell><TableCell><Customer name={order.customer} initials={order.initials} /></TableCell><TableCell sx={{ color: 'text.secondary' }}>{order.date}</TableCell><TableCell>{order.items}</TableCell><TableCell><StatusLabel status={order.status} /></TableCell><TableCell align="right" sx={{ fontWeight: 600 }}>{order.total}</TableCell></TableRow>)}</TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination component="div" count={visible.length} page={0} rowsPerPage={5} rowsPerPageOptions={[5, 10, 25]} onPageChange={() => {}} onRowsPerPageChange={() => {}} />
        </>}
      </Card>
    </DashboardContent>
  );
}
