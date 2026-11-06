import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';

import { invoices } from '../../shared/invoices';
import type { InvoiceStatus } from '../../shared/invoices';

import '../../../../src/global.css';

const DETAIL_URL = '/prototypes/plan-87facc82/a/detail/';

const statusColor: Record<
  InvoiceStatus,
  'success' | 'warning' | 'error' | 'default'
> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'error',
  draft: 'default',
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function InvoiceListPage() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredInvoices = useMemo(() => {
    const query = filter.trim().toLowerCase();

    if (!query) {
      return invoices;
    }

    return invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(query) ||
        invoice.customer.toLowerCase().includes(query) ||
        invoice.status.includes(query)
    );
  }, [filter]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Invoices</Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
            Track billing activity and payment status.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ flexShrink: 0 }}
        >
          New invoice
        </Button>
      </Box>

      <Card>
        <Box
          sx={{
            height: 96,
            px: 3,
            gap: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <OutlinedInput
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
              setPage(0);
            }}
            placeholder="Search invoice or customer..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ width: { xs: 1, sm: 320 } }}
          />
        </Box>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 760 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right" sx={{ width: 64 }} />
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredInvoices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((invoice) => (
                    <TableRow hover key={invoice.id}>
                      <TableCell component="th" scope="row">
                        <Link
                          component={RouterLink}
                          to={invoice.id === 'inv-2026-0184' ? DETAIL_URL : '#'}
                          color="inherit"
                          underline="hover"
                          sx={{ fontWeight: 600 }}
                        >
                          {invoice.number}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {invoice.customer}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {invoice.customerEmail}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{invoice.date}</TableCell>
                      <TableCell>
                        <Label color={statusColor[invoice.status]}>{invoice.status}</Label>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        {currency.format(invoice.total)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          component={RouterLink}
                          to={invoice.id === 'inv-2026-0184' ? DETAIL_URL : '#'}
                          color="inherit"
                          size="small"
                          sx={{ minWidth: 32, px: 0.5 }}
                          aria-label={`Open ${invoice.number}`}
                        >
                          <Iconify icon="eva:arrow-ios-forward-fill" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                {!filteredInvoices.length && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ py: 10, textAlign: 'center' }}>
                      <Typography variant="h6">No invoices found</Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        Try a different invoice number, customer, or status.
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
          count={filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
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

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <DashboardLayout>
        <InvoiceListPage />
      </DashboardLayout>
    </BrowserRouter>
  </ThemeProvider>
);
