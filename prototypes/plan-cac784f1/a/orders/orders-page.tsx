import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';

import { orders, formatCurrency } from '../../shared/orders';

import type { OrderStatus } from '../../shared/orders';

const STATUS_COLORS: Record<OrderStatus, 'success' | 'warning' | 'info' | 'error'> = {
  Paid: 'success',
  Processing: 'warning',
  Shipped: 'info',
  Refunded: 'error',
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export function OrdersPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return orders;

    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(normalizedQuery) ||
        order.customer.toLowerCase().includes(normalizedQuery) ||
        order.status.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const visibleOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4">Orders</Typography>
      </Box>

      <Card>
        <Toolbar sx={{ height: 96, p: (theme) => theme.spacing(0, 3) }}>
          <OutlinedInput
            fullWidth
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder="Search orders..."
            inputProps={{ 'aria-label': 'Search orders' }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: 320 }}
          />
        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleOrders.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2">{order.id}</Typography>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell align="right">{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Label color={STATUS_COLORS[order.status]}>{order.status}</Label>
                    </TableCell>
                  </TableRow>
                ))}
                {!visibleOrders.length && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography variant="body2" color="text.secondary">
                        No orders found for “{query}”
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
        />
      </Card>
    </DashboardContent>
  );
}
