import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import 'src/global.css';

import { ThemeProvider } from 'src/theme/theme-provider';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';

import { invoices } from '../../shared/invoices';

import type { InvoiceStatus } from '../../shared/invoices';

type StatusFilter = 'all' | InvoiceStatus;

const statusColor = {
  paid: 'success',
  pending: 'warning',
  overdue: 'error',
  draft: 'default',
} as const;

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'draft', label: 'Draft' },
];

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function InvoiceListPage() {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesStatus = status === 'all' || invoice.status === status;
      const matchesQuery =
        !normalizedQuery ||
        invoice.number.toLowerCase().includes(normalizedQuery) ||
        invoice.customer.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  const handleStatusChange = (_event: React.MouseEvent<HTMLElement>, value: StatusFilter | null) => {
    if (value) {
      setStatus(value);
      setPage(0);
    }
  };

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          gap: 2,
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Invoices</Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
            Track payments and review customer billing at a glance.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ width: { xs: 1, sm: 'auto' } }}
        >
          New invoice
        </Button>
      </Box>

      <Card>
        <Box
          sx={{
            minHeight: 96,
            px: { xs: 2, sm: 3 },
            py: 2,
            gap: 2,
            display: 'flex',
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <ToggleButtonGroup
            exclusive
            size="small"
            value={status}
            onChange={handleStatusChange}
            aria-label="Filter invoices by status"
            sx={{
              p: 0.5,
              width: { xs: 1, sm: 'fit-content' },
              bgcolor: 'background.neutral',
              borderRadius: 1.25,
              '& .MuiToggleButtonGroup-grouped': {
                px: { xs: 1.25, sm: 2 },
                flex: { xs: 1, sm: 'initial' },
                border: 0,
                borderRadius: 1,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'text.primary',
                  bgcolor: 'background.paper',
                  boxShadow: (theme) => theme.customShadows.z1,
                },
              },
            }}
          >
            {statusOptions.map((option) => (
              <ToggleButton key={option.value} value={option.value}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

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
            sx={{ width: { xs: 1, md: 300 } }}
          />
        </Box>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 840 }}>
              <TableBody>
                <TableRow
                  sx={{
                    '& th': {
                      py: 1.5,
                      color: 'text.secondary',
                      bgcolor: 'background.neutral',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    },
                  }}
                >
                  <TableCell component="th">Invoice</TableCell>
                  <TableCell component="th">Customer</TableCell>
                  <TableCell component="th">Issue date</TableCell>
                  <TableCell component="th">Status</TableCell>
                  <TableCell component="th" align="right">
                    Total
                  </TableCell>
                  <TableCell component="th" align="right" sx={{ width: 64 }} />
                </TableRow>

                {filteredInvoices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((invoice) => (
                    <TableRow
                      hover
                      key={invoice.id}
                      sx={{
                        '& td': { py: 2.25 },
                        '&:last-of-type td': { borderBottom: 0 },
                      }}
                    >
                      <TableCell>
                        <Link
                          component={RouterLink}
                          to={
                            invoice.id === 'inv-2026-0184'
                              ? '/prototypes/plan-87facc82/c/detail/'
                              : '#'
                          }
                          color="inherit"
                          underline="none"
                          sx={{ fontWeight: 700 }}
                        >
                          {invoice.number}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              width: 38,
                              height: 38,
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: 'primary.dark',
                              bgcolor: 'primary.lighter',
                            }}
                          >
                            {invoice.customer
                              .split(' ')
                              .map((word) => word[0])
                              .join('')
                              .slice(0, 2)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{invoice.customer}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {invoice.customerEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ color: 'text.secondary' }}>{invoice.date}</TableCell>
                      <TableCell>
                        <Label color={statusColor[invoice.status]}>{invoice.status}</Label>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        {currency.format(invoice.total)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={RouterLink}
                          to={
                            invoice.id === 'inv-2026-0184'
                              ? '/prototypes/plan-87facc82/c/detail/'
                              : '#'
                          }
                          aria-label={`Open ${invoice.number}`}
                        >
                          <Iconify icon="eva:arrow-ios-forward-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {!filteredInvoices.length && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ py: 10, textAlign: 'center' }}>
                      <Typography variant="subtitle1">No invoices found</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                        Try another status or search term.
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
          onPageChange={(_event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
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
