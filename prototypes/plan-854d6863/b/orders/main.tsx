import 'src/global.css';

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { orders, formatCurrency, type OrderStatus } from '../../shared/orders';

const statusColor: Record<OrderStatus, 'success' | 'warning' | 'info' | 'error'> = { Paid: 'success', Processing: 'warning', Shipped: 'info', Refunded: 'error' };
const metrics = [
  { label: 'Orders today', value: '18', note: '+12% from yesterday', icon: 'solar:bag-4-bold', color: 'primary.main' },
  { label: 'Revenue today', value: '$2,840', note: '82% of daily goal', icon: 'solar:dollar-minimalistic-bold', color: 'success.main' },
  { label: 'Needs attention', value: '4', note: '2 awaiting payment', icon: 'solar:danger-triangle-bold', color: 'warning.main' },
];

function OrdersPage() {
  const [tab, setTab] = useState('All');
  const [showEmpty, setShowEmpty] = useState(false);
  const filtered = showEmpty ? [] : orders.filter((order) => tab === 'All' || order.status === tab);
  return <DashboardContent>
    <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' } }}><Box sx={{ flexGrow: 1 }}><Typography variant="h4">Order operations</Typography><Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>Keep today’s orders moving</Typography></Box><Button variant="outlined" color="inherit" onClick={() => setShowEmpty((value) => !value)}>{showEmpty ? 'Restore orders' : 'Preview empty state'}</Button><Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>New order</Button></Box>
    <Grid container spacing={3} sx={{ mb: 3 }}>{metrics.map((metric) => <Grid key={metric.label} size={{ xs: 12, md: 4 }}><Card sx={{ p: 3 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}><Box sx={{ width: 52, height: 52, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'background.neutral', color: metric.color }}><Iconify icon={metric.icon} width={28} /></Box><Box><Typography variant="body2" sx={{ color: 'text.secondary' }}>{metric.label}</Typography><Typography variant="h4">{metric.value}</Typography></Box></Box><Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2 }}>{metric.note}</Typography>{metric.label === 'Revenue today' && <LinearProgress variant="determinate" value={82} color="success" sx={{ mt: 1, height: 6, borderRadius: 1 }} />}</Card></Grid>)}</Grid>
    <Card><Box sx={{ px: 3, pt: 2 }}><Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons={false}>{['All', 'Processing', 'Paid', 'Shipped', 'Refunded'].map((item) => <Tab key={item} value={item} label={item} />)}</Tabs></Box><Divider />
      {filtered.length ? <Stack divider={<Divider flexItem />}>
        {filtered.map((order) => <Box key={order.id} sx={{ p: 3, display: 'grid', gap: 2, alignItems: 'center', gridTemplateColumns: { xs: '1fr auto', sm: 'minmax(220px, 1.4fr) minmax(130px, .7fr) minmax(120px, .6fr) auto' } }}><Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}><Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.dark' }}>{order.customer.charAt(0)}</Avatar><Box><Typography variant="subtitle2">{order.customer}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>{order.id} · {order.items} items</Typography></Box></Box><Box sx={{ display: { xs: 'none', sm: 'block' } }}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Placed</Typography><Typography variant="body2">{order.date}</Typography></Box><Box sx={{ display: { xs: 'none', sm: 'block' } }}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Total</Typography><Typography variant="subtitle2">{formatCurrency(order.total)}</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Label color={statusColor[order.status]}>{order.status}</Label><Button size="small" color="inherit" sx={{ minWidth: 0 }}><Iconify icon="eva:more-vertical-fill" /></Button></Box></Box>)}
      </Stack> : <Box sx={{ py: 9, px: 3, textAlign: 'center' }}><Iconify icon="solar:clipboard-remove-bold" width={56} sx={{ color: 'text.disabled', mb: 2 }} /><Typography variant="h6">Your order queue is clear</Typography><Typography variant="body2" sx={{ mt: 1, mx: 'auto', maxWidth: 380, color: 'text.secondary' }}>There are no orders in this view. New orders will land here automatically.</Typography><Button variant="outlined" sx={{ mt: 3 }} onClick={() => { setShowEmpty(false); setTab('All'); }}>View all orders</Button></Box>}
    </Card>
  </DashboardContent>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><ThemeProvider><DashboardLayout><OrdersPage /></DashboardLayout></ThemeProvider></BrowserRouter></StrictMode>);
