import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { orders, Customer, EmptyOrders, StatusLabel, OrdersHeader } from '../shared/orders';

export default function OrdersListVariant() {
  const [status, setStatus] = useState('All');
  const [searchParams] = useSearchParams();
  const visible = orders.filter((order) => status === 'All' || order.status === status);

  return (
    <DashboardContent>
      <OrdersHeader />
      <Card>
        {searchParams.get('state') === 'empty' ? <EmptyOrders /> : <>
        <Box sx={{ p: 2.5 }}>
          <TextField fullWidth placeholder="Search orders..." InputProps={{ startAdornment: <InputAdornment position="start"><Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
          <Box sx={{ mt: 2, overflowX: 'auto' }}>
            <ToggleButtonGroup exclusive size="small" value={status} onChange={(_, value) => value && setStatus(value)}>
              {['All', 'Paid', 'Processing', 'Shipped', 'Refunded'].map((value) => <ToggleButton key={value} value={value} sx={{ px: 2, whiteSpace: 'nowrap' }}>{value}</ToggleButton>)}
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Divider />
        <Stack divider={<Divider flexItem />}>
          {visible.map((order) => (
            <Box key={order.id} sx={{ p: 2.5, display: 'grid', gap: 2, alignItems: 'center', gridTemplateColumns: { xs: '1fr auto', md: 'minmax(220px, 1.6fr) 1fr 0.7fr 0.8fr auto' } }}>
              <Box><Customer name={order.customer} initials={order.initials} /><Typography variant="caption" sx={{ ml: 6.5, color: 'text.secondary' }}>{order.id}</Typography></Box>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Placed</Typography><Typography variant="body2">{order.date}</Typography></Box>
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>{order.items} {order.items === 1 ? 'item' : 'items'}</Typography>
              <Stack alignItems={{ xs: 'flex-end', md: 'flex-start' }} spacing={0.75}><Typography variant="subtitle2">{order.total}</Typography><StatusLabel status={order.status} /></Stack>
              <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>View</Button>
            </Box>
          ))}
        </Stack>
        </>}
      </Card>
    </DashboardContent>
  );
}
