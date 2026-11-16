import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { formatCurrency, orders } from '../../shared/orders';
import type { OrderStatus } from '../../shared/orders';

const statusColor: Record<OrderStatus, 'success' | 'warning' | 'info' | 'error'> = {
  Paid: 'success',
  Processing: 'warning',
  Shipped: 'info',
  Refunded: 'error',
};

export function OrdersPage() {
  const [searchText, setSearchText] = useState('');

  const filteredOrders = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) =>
      [order.id, order.customer, order.status].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [searchText]);

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4" component="h1">
              Orders
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Review customer orders and their current status.
            </Typography>
          </Box>

          <Card>
            <Box sx={{ p: 3 }}>
              <TextField
                fullWidth
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by order, customer, or status"
                inputProps={{ 'aria-label': 'Search orders' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">⌕</InputAdornment>,
                }}
              />
            </Box>

            <TableContainer>
              <Table aria-label="Orders table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order number</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow hover key={order.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell align="right">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          variant="soft"
                          color={statusColor[order.status]}
                          label={order.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                        <Typography variant="subtitle1">No orders found</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Try a different search term.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
