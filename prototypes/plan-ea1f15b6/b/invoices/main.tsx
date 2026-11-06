import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';

import '../../../../src/global.css';
import { ThemeProvider } from '../../../../src/theme/theme-provider';
import { DashboardLayout, DashboardContent } from '../../../../src/layouts/dashboard';
import { Iconify } from '../../../../src/components/iconify';
import {
  invoices,
  formatCurrency,
  formatInvoiceDate,
  type InvoiceStatus,
} from '../../shared/invoices';

import { SummaryCard, InvoiceStatusLabel } from '../components';

type StatusFilter = 'All' | InvoiceStatus;

const filters: StatusFilter[] = ['All', 'Paid', 'Pending', 'Overdue', 'Draft'];

function InvoicesPage() {
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [search, setSearch] = useState('');

  const visibleInvoices = useMemo(
    () =>
      invoices.filter((invoice) => {
        const matchesStatus = filter === 'All' || invoice.status === filter;
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          invoice.id.toLowerCase().includes(query) ||
          invoice.customer.toLowerCase().includes(query);
        return matchesStatus && matchesSearch;
      }),
    [filter, search]
  );

  const totalOutstanding = invoices
    .filter((invoice) => invoice.status === 'Pending' || invoice.status === 'Overdue')
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const paidTotal = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Invoices</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Track billing activity and keep payments moving.
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Total billed"
            value={formatCurrency(invoices.reduce((sum, invoice) => sum + invoice.total, 0))}
            detail={`${invoices.length} invoices`}
            icon="solar:cart-3-bold"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Outstanding"
            value={formatCurrency(totalOutstanding)}
            detail="2 invoices need attention"
            icon="solar:clock-circle-outline"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Paid"
            value={formatCurrency(paidTotal)}
            detail="3 settled invoices"
            icon="solar:check-circle-bold"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard
            label="Overdue"
            value={formatCurrency(
              invoices
                .filter((invoice) => invoice.status === 'Overdue')
                .reduce((sum, invoice) => sum + invoice.total, 0)
            )}
            detail="1 payment past due"
            icon="eva:trending-down-fill"
          />
        </Grid>
      </Grid>

      <Card>
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          {filters.map((item) => {
            const count =
              item === 'All'
                ? invoices.length
                : invoices.filter((invoice) => invoice.status === item).length;
            const selected = filter === item;
            return (
              <ButtonBase
                key={item}
                onClick={() => setFilter(item)}
                sx={{
                  px: 1.5,
                  pb: 2,
                  gap: 1,
                  typography: 'subtitle2',
                  color: selected ? 'text.primary' : 'text.secondary',
                  borderBottom: '2px solid',
                  borderColor: selected ? 'primary.main' : 'transparent',
                }}
              >
                {item}
                <Box
                  component="span"
                  sx={{
                    px: 0.75,
                    minWidth: 24,
                    borderRadius: 1,
                    typography: 'caption',
                    color: selected ? 'primary.darker' : 'text.secondary',
                    bgcolor: selected ? 'primary.lighter' : 'background.neutral',
                  }}
                >
                  {count}
                </Box>
              </ButtonBase>
            );
          })}
        </Box>

        <Toolbar sx={{ height: 88, px: { xs: 2, sm: 3 }, justifyContent: 'space-between' }}>
          <OutlinedInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search invoice or customer..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ width: { xs: 1, sm: 340 } }}
          />
          <Button
            color="inherit"
            startIcon={<Iconify icon="ic:round-filter-list" />}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            More filters
          </Button>
        </Toolbar>

        <TableContainer>
          <Table sx={{ minWidth: 860 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell width={64} />
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover sx={{ height: 76 }}>
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
                    <Typography variant="subtitle2">{invoice.customer}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {invoice.customerEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatInvoiceDate(invoice.issuedAt)}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Due {formatInvoiceDate(invoice.dueAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <InvoiceStatusLabel status={invoice.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">{formatCurrency(invoice.total)}</Typography>
                  </TableCell>
                  <TableCell>
                    <ButtonBase
                      component="a"
                      href="../invoice/"
                      aria-label={`Open ${invoice.id}`}
                      sx={{ width: 36, height: 36, borderRadius: 1 }}
                    >
                      <Iconify icon="eva:arrow-ios-forward-fill" />
                    </ButtonBase>
                  </TableCell>
                </TableRow>
              ))}
              {visibleInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography variant="subtitle1">No invoices found</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Try a different status or search term.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={0}
          count={visibleInvoices.length}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 25]}
          onPageChange={() => undefined}
          onRowsPerPageChange={() => undefined}
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
