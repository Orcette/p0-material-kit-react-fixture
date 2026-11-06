import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';

import { selectedInvoice } from '../../shared/invoices';

import '../../../../src/global.css';

const listHref = '/prototypes/plan-87facc82/b/list/';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function SummaryLine({
  label,
  value,
  emphasized,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        variant={emphasized ? 'subtitle1' : 'body2'}
        sx={{ color: emphasized ? 'text.primary' : 'text.secondary' }}
      >
        {label}
      </Typography>
      <Typography variant={emphasized ? 'h6' : 'subtitle2'}>{value}</Typography>
    </Stack>
  );
}

function InvoiceDocument() {
  return (
    <Card sx={{ minWidth: 0 }}>
      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: 'grid',
                  borderRadius: 1.25,
                  placeItems: 'center',
                  color: 'common.white',
                  bgcolor: 'text.primary',
                }}
              >
                <Iconify icon="solar:bill-list-bold" width={21} />
              </Box>
              <Typography variant="h6">Nexa Finance</Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              260 California Street
              <br />
              San Francisco, CA 94111
              <br />
              finance@nexa.co
            </Typography>
          </Box>

          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Invoice
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              {selectedInvoice.number}
            </Typography>
            <Label color="warning" sx={{ mt: 1.5 }}>
              {selectedInvoice.status}
            </Label>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            gap: 4,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Bill to
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {selectedInvoice.customer}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {selectedInvoice.customerAddress.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              {selectedInvoice.customerEmail}
            </Typography>
          </Box>

          <Stack spacing={2} sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Box sx={{ minWidth: { sm: 190 } }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Issue date
              </Typography>
              <Typography variant="subtitle2">{selectedInvoice.date}</Typography>
            </Box>
            <Box sx={{ minWidth: { sm: 190 } }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Due date
              </Typography>
              <Typography variant="subtitle2">{selectedInvoice.dueDate}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Scrollbar>
        <TableContainer>
          <Table sx={{ minWidth: 620 }}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedInvoice.lines.map((line) => (
                <TableRow key={line.description}>
                  <TableCell>
                    <Typography variant="subtitle2">{line.description}</Typography>
                  </TableCell>
                  <TableCell align="center">{line.quantity}</TableCell>
                  <TableCell align="right">{currency.format(line.unitPrice)}</TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">
                      {currency.format(line.quantity * line.unitPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        <Stack spacing={1.5} sx={{ ml: 'auto', maxWidth: 280 }}>
          <SummaryLine label="Subtotal" value={currency.format(selectedInvoice.total)} />
          <SummaryLine label="Tax" value={currency.format(0)} />
          <Divider />
          <SummaryLine
            emphasized
            label="Total due"
            value={currency.format(selectedInvoice.total)}
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Payment terms
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
          Payment is due within 30 days. Please include the invoice number with your bank
          transfer. Thank you for your business.
        </Typography>
      </Box>
    </Card>
  );
}

function PaymentSummary() {
  return (
    <Stack spacing={3}>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Payment summary</Typography>
          <Label color="warning">Due in 21 days</Label>
        </Stack>

        <Box sx={{ py: 3.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.75 }}>
            Amount due
          </Typography>
          <Typography variant="h3">{currency.format(selectedInvoice.total)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
            Due {selectedInvoice.dueDate}
          </Typography>
        </Box>

        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<Iconify icon="solar:card-2-bold" />}
        >
          Record payment
        </Button>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={2}>
          <SummaryLine label="Invoice total" value={currency.format(selectedInvoice.total)} />
          <SummaryLine label="Paid to date" value={currency.format(0)} />
          <SummaryLine label="Balance due" value={currency.format(selectedInvoice.total)} />
        </Stack>
      </Card>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2.5 }}>
          Activity
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: 34,
              height: 34,
              flexShrink: 0,
              display: 'grid',
              borderRadius: '50%',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            }}
          >
            <Iconify icon="solar:letter-bold" width={18} />
          </Box>
          <Box>
            <Typography variant="subtitle2">Invoice sent</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              Emailed to {selectedInvoice.customerEmail}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Oct 28, 2026 at 10:42 AM
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
}

function InvoiceDetailPage() {
  return (
    <DashboardContent>
      <Link
        component={RouterLink}
        to={listHref}
        color="inherit"
        underline="hover"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mb: 2 }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" />
        Back to invoices
      </Link>

      <Box
        sx={{
          mb: 4,
          gap: 2,
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="h4">{selectedInvoice.number}</Typography>
            <Label color="warning">{selectedInvoice.status}</Label>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
            Issued {selectedInvoice.date} to {selectedInvoice.customer}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ width: { xs: 1, sm: 'auto' } }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Download
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:letter-bold" />}
            sx={{ flex: { xs: 1, sm: 'none' } }}
          >
            Send
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          gap: 3,
          minWidth: 0,
          display: 'grid',
          alignItems: 'start',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 340px' },
        }}
      >
        <InvoiceDocument />
        <PaymentSummary />
      </Box>
    </DashboardContent>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <DashboardLayout>
          <InvoiceDetailPage />
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
