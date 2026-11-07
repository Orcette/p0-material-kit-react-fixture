import 'src/global.css';

import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import Toolbar from '@mui/material/Toolbar';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardLayout } from 'src/layouts/dashboard';
import { DashboardContent } from 'src/layouts/dashboard/content';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';

import { invoices } from '../../shared/invoices';

type StatusFilter = 'All' | 'Paid' | 'Pending' | 'Overdue';

function InvoicesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesQuery =
        !normalizedQuery ||
        invoice.number.toLowerCase().includes(normalizedQuery) ||
        invoice.customer.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === 'All' || invoice.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const resetPage = () => setPage(0);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Invoices
        </Typography>
      </Box>

      <Card>
        <Toolbar
          sx={{
            minHeight: { xs: 120, sm: 96 },
            display: 'flex',
            alignItems: { xs: 'stretch', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 2,
            p: (theme) => theme.spacing(2, 3),
          }}
        >
          <OutlinedInput
            fullWidth
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            placeholder="Search invoices..."
            inputProps={{ 'aria-label': 'Search invoices' }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: { sm: 360 } }}
          />

          <Select
            value={status}
            aria-label="Filter by status"
            onChange={(event) => {
              setStatus(event.target.value as StatusFilter);
              resetPage();
            }}
            sx={{ minWidth: { sm: 160 } }}
          >
            <MenuItem value="All">All statuses</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </Select>
        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((invoice) => (
                    <TableRow hover key={invoice.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{invoice.number}</Typography>
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        <Label
                          color={
                            invoice.status === 'Paid'
                              ? 'success'
                              : invoice.status === 'Overdue'
                                ? 'error'
                                : 'warning'
                          }
                        >
                          {invoice.status}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}

                {!filteredInvoices.length && (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ py: 8, textAlign: 'center' }}>
                      <Typography variant="h6">No invoices found</Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        Try a different search or status.
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
          onPageChange={(_, nextPage) => setPage(nextPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            resetPage();
          }}
        />
      </Card>
    </DashboardContent>
  );
}

function Prototype() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <InvoicesPage />
      </DashboardLayout>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Prototype />
    </BrowserRouter>
  </StrictMode>
);
