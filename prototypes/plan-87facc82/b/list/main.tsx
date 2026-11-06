import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
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

import { invoices, type Invoice, type InvoiceStatus } from '../../shared/invoices';

import '../../../../src/global.css';

const detailHref = '/prototypes/plan-87facc82/b/detail/';

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
  maximumFractionDigits: 0,
});

function MetricCard({
  label,
  value,
  note,
  icon,
  color,
}: {
  label: string;
  value: string;
  note: string;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'error';
}) {
  return (
    <Card sx={{ p: 2.5 }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.75 }}>
            {label}
          </Typography>
          <Typography variant="h4">{value}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {note}
          </Typography>
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            width: 40,
            height: 40,
            color: `${color}.dark`,
            bgcolor: `${color}.lighter`,
          }}
        >
          <Iconify icon={icon} width={22} />
        </Avatar>
      </Stack>
    </Card>
  );
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const canOpen = invoice.number === 'INV-2026-0184';

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {canOpen ? (
          <Link
            component={RouterLink}
            to={detailHref}
            color="inherit"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            {invoice.number}
          </Link>
        ) : (
          <Typography variant="subtitle2">{invoice.number}</Typography>
        )}
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: 14,
              bgcolor: 'background.neutral',
              color: 'text.primary',
            }}
          >
            {invoice.customer
              .split(' ')
              .map((word) => word[0])
              .slice(0, 2)
              .join('')}
          </Avatar>
          <Box>
            <Typography variant="subtitle2">{invoice.customer}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {invoice.customerEmail}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={{ color: 'text.secondary' }}>{invoice.date}</TableCell>
      <TableCell>
        <Label color={statusColor[invoice.status]}>{invoice.status}</Label>
      </TableCell>
      <TableCell align="right">
        <Typography variant="subtitle2">{currency.format(invoice.total)}</Typography>
      </TableCell>
      <TableCell align="right">
        {canOpen && (
          <Button
            component={RouterLink}
            to={detailHref}
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            Open
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

function InvoiceListPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return invoices;

    return invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(normalizedQuery) ||
        invoice.customer.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const outstanding = invoices
    .filter((invoice) => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const paid = invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const overdue = invoices
    .filter((invoice) => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.total, 0);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 4,
          gap: 2,
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Invoices</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
            Track billing, due dates, and payment status.
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

      <Box
        sx={{
          gap: 2,
          mb: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        <MetricCard
          label="Outstanding"
          value={currency.format(outstanding)}
          note="2 invoices awaiting payment"
          icon="solar:wallet-money-bold-duotone"
          color="primary"
        />
        <MetricCard
          label="Paid this month"
          value={currency.format(paid)}
          note="2 invoices settled"
          icon="solar:check-circle-bold-duotone"
          color="success"
        />
        <MetricCard
          label="Overdue"
          value={currency.format(overdue)}
          note="1 invoice needs attention"
          icon="solar:danger-triangle-bold-duotone"
          color="error"
        />
        <MetricCard
          label="Average invoice"
          value={currency.format(
            Math.round(invoices.reduce((sum, invoice) => sum + invoice.total, 0) / invoices.length)
          )}
          note="Across 5 recent invoices"
          icon="solar:chart-2-bold-duotone"
          color="warning"
        />
      </Box>

      <Card>
        <Box
          sx={{
            p: 2.5,
            gap: 2,
            minHeight: 88,
            display: 'flex',
            alignItems: { xs: 'stretch', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Recent invoices</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {filteredInvoices.length} invoices
            </Typography>
          </Box>
          <OutlinedInput
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder="Search invoice or customer"
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ width: { xs: 1, sm: 280 } }}
          />
        </Box>

        <Divider />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 820 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((invoice) => (
                    <InvoiceRow key={invoice.id} invoice={invoice} />
                  ))}
                {!filteredInvoices.length && (
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
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10]}
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <DashboardLayout>
          <InvoiceListPage />
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
