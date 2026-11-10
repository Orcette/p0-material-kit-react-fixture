import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export const orders = [
  { id: '#ORD-1048', customer: 'Olivia Martin', initials: 'OM', date: 'Nov 8, 2026', items: 3, total: '$248.00', status: 'Paid' },
  { id: '#ORD-1047', customer: 'Jackson Lee', initials: 'JL', date: 'Nov 8, 2026', items: 1, total: '$89.00', status: 'Processing' },
  { id: '#ORD-1046', customer: 'Sophia Brown', initials: 'SB', date: 'Nov 7, 2026', items: 4, total: '$462.50', status: 'Shipped' },
  { id: '#ORD-1045', customer: 'Noah Williams', initials: 'NW', date: 'Nov 7, 2026', items: 2, total: '$132.00', status: 'Refunded' },
  { id: '#ORD-1044', customer: 'Emma Davis', initials: 'ED', date: 'Nov 6, 2026', items: 2, total: '$176.80', status: 'Paid' },
];

export function StatusLabel({ status }: { status: string }) {
  const color = status === 'Paid' || status === 'Shipped' ? 'success' : status === 'Refunded' ? 'error' : 'warning';
  return <Label color={color}>{status}</Label>;
}

export function Customer({ name, initials }: { name: string; initials: string }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Avatar sx={{ width: 36, height: 36, typography: 'caption', bgcolor: 'primary.lighter', color: 'primary.dark' }}>{initials}</Avatar>
      <Typography variant="subtitle2">{name}</Typography>
    </Stack>
  );
}

export function OrdersHeader() {
  return (
    <Box sx={{ mb: 5, display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Orders</Typography>
        <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>Manage and track customer orders.</Typography>
      </Box>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>New order</Button>
    </Box>
  );
}

export function EmptyOrders() {
  return (
    <Stack alignItems="center" sx={{ py: 10, px: 3, textAlign: 'center' }}>
      <Box sx={{ width: 88, height: 88, mb: 3, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'background.neutral', color: 'text.secondary' }}>
        <Iconify icon="solar:cart-3-bold" width={42} />
      </Box>
      <Typography variant="h6">No orders yet</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 3, maxWidth: 360, color: 'text.secondary' }}>When a customer places an order, it will appear here.</Typography>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>Create first order</Button>
    </Stack>
  );
}
