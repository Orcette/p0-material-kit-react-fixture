import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import 'src/global.css';
import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardLayout, DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

import { InvoiceStatusLabel } from '../status-label';
import {
  invoices,
  formatCurrency,
  formatInvoiceDate,
  type InvoiceStatus,
} from '../../shared/invoices';

const statusOptions: Array<'All' | InvoiceStatus> = [
  'All',
  'Paid',
  'Pending',
  'Overdue',
  'Draft',
];

function customerInitials(customer: string) {
  return customer
    .split(/\s|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

function InvoicesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof statusOptions)[number]>('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredInvoices = useMemo(
    () =>
      invoices.filter((invoice) => {
        const matchesQuery = `${invoice.id} ${invoice.customer}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (status === 'All' || invoice.status === status);
      }),
    [query, status]
  );

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
            Track customer billing and payment due dates.
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
            gap: 2,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 3),
          }}
        >
          <OutlinedInput
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder="Search invoice or customer..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ width: 1, maxWidth: 360 }}
          />
          <FormControl sx={{ minWidth: 140 }}>
            <Select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as (typeof statusOptions)[number]);
                setPage(0);
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Filter by status' }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option === 'All' ? 'All statuses' : option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>

        <TableContainer>
          <Table sx={{ minWidth: 880 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover sx={{ height: 88 }}>
                  <TableCell component="th" scope="row">
                    {invoice.id === 'INV-2026-0048' ? (
                      <Link
                        href="../invoice/"
                        color="inherit"
                        underline="hover"
                        sx={{ fontWeight: 700 }}
                      >
                        {invoice.id}
                      </Link>
                    ) : (
                      <Typography variant="subtitle2">{invoice.id}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'primary.dark',
                          bgcolor: 'primary.lighter',
                        }}
                      >
                        {customerInitials(invoice.customer)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{invoice.customer}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {invoice.customerEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatInvoiceDate(invoice.issuedAt)}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: invoice.status === 'Overdue' ? 'error.main' : 'text.secondary',
                      }}
                    >
                      Due {formatInvoiceDate(invoice.dueAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <InvoiceStatusLabel status={invoice.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">{formatCurrency(invoice.total)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              {visibleInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="subtitle1">No invoices found</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                      Try a different customer, invoice number, or status.
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
  <ThemeProvider>
    <DashboardLayout>
      <InvoicesPage />
    </DashboardLayout>
  </ThemeProvider>
);
