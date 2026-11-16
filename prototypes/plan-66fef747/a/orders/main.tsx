import 'src/global.css';

import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardLayout } from 'src/layouts/dashboard';
import { DashboardContent } from 'src/layouts/dashboard/content';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { orders, formatCurrency } from '../../shared/orders';

import type { OrderStatus } from '../../shared/orders';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const STATUS_COLORS: Record<OrderStatus, 'success' | 'warning' | 'info' | 'error'> = {
  Paid: 'success',
  Processing: 'warning',
  Shipped: 'info',
  Refunded: 'error',
};

function OrdersPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return orders;

    return orders.filter((order) =>
      [order.id, order.customer, order.email, order.status].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [query]);

  const visibleOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardLayout>
      <DashboardContent>
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Orders
          </Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New order
          </Button>
        </Box>

        <Card>
          <Toolbar
            sx={{
              height: 96,
              display: 'flex',
              justifyContent: 'space-between',
              p: (theme) => theme.spacing(0, 1, 0, 3),
            }}
          >
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
                  <Iconify
                    width={20}
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled' }}
                  />
                </InputAdornment>
              }
              sx={{ maxWidth: 320 }}
            />
          </Toolbar>

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 760 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Items</TableCell>
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
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2">{order.customer}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {order.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell align="center">{order.items}</TableCell>
                      <TableCell align="right">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <Label color={STATUS_COLORS[order.status]}>{order.status}</Label>
                      </TableCell>
                    </TableRow>
                  ))}

                  {visibleOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ py: 8, textAlign: 'center' }}>
                        <Typography variant="h6">No orders found</Typography>
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                          Try a different search term.
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
            onPageChange={(_event, nextPage) => setPage(nextPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(0);
            }}
          />
        </Card>
      </DashboardContent>
    </DashboardLayout>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <OrdersPage />
    </ThemeProvider>
  </BrowserRouter>
);
