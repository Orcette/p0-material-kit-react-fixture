import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';

import '../../../../src/global.css';
import { ThemeProvider } from '../../../../src/theme/theme-provider';
import { DashboardLayout, DashboardContent } from '../../../../src/layouts/dashboard';
import { Label } from '../../../../src/components/label';
import { Iconify } from '../../../../src/components/iconify';
import {
  invoices,
  formatCurrency,
  formatInvoiceDate,
  type InvoiceStatus,
} from '../../shared/invoices';

const statusColor: Record<
  InvoiceStatus,
  'success' | 'warning' | 'error' | 'default'
> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
  Draft: 'default',
};

function InvoicesPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return invoices;
    }

    return invoices.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(normalizedQuery) ||
        invoice.customer.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const visibleInvoices = filteredInvoices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Invoices</Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
            Track issued invoices and payment status.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New invoice
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
            placeholder="Search invoice or customer..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={20} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: 360 }}
          />

          <IconButton aria-label="Filter invoices">
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Toolbar>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 760 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Issued</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right" sx={{ width: 64 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover>
                  <TableCell>
                    <Link
                      href="../invoice/"
                      color="inherit"
                      underline="hover"
                      sx={{ fontWeight: 700 }}
                    >
                      {invoice.id}
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
                  <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                    {formatInvoiceDate(invoice.issuedAt)}
                  </TableCell>
                  <TableCell>
                    <Label color={statusColor[invoice.status]}>{invoice.status}</Label>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {formatCurrency(invoice.total)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component="a"
                      href="../invoice/"
                      aria-label={`Open ${invoice.id}`}
                      size="small"
                    >
                      <Iconify icon="eva:arrow-ios-forward-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {visibleInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="subtitle1">No invoices found</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Try a different invoice number or customer.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={page}
          count={filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
        />
      </Card>
    </DashboardContent>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <InvoicesPage />
      </DashboardLayout>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
