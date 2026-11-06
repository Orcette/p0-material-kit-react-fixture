import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import '../../../../src/global.css';
import { ThemeProvider } from '../../../../src/theme/theme-provider';
import { DashboardLayout, DashboardContent } from '../../../../src/layouts/dashboard';
import { Iconify } from '../../../../src/components/iconify';
import { selectedInvoice, formatCurrency, formatInvoiceDate } from '../../shared/invoices.ts';

import { InvoiceStatusLabel } from '../components';

function InvoicePage() {
  const invoice = selectedInvoice;
  const subtotal = invoice.total - invoice.tax;

  return (
    <DashboardContent maxWidth="xl">
      <Link
        href="../invoices/"
        color="inherit"
        underline="hover"
        sx={{
          mb: 3,
          gap: 0.75,
          display: 'inline-flex',
          alignItems: 'center',
          typography: 'subtitle2',
          color: 'text.secondary',
        }}
      >
        <Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ rotate: '180deg' }} />
        Back to invoices
      </Link>

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
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="h4">{invoice.id}</Typography>
            <InvoiceStatusLabel status={invoice.status} />
          </Stack>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            Issued {formatInvoiceDate(invoice.issuedAt)} · Due {formatInvoiceDate(invoice.dueAt)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:eye-bold" />}
          >
            Print
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:share-bold" />}
          >
            Send reminder
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: { xs: 3, md: 5 } }}>
            <Box
              sx={{
                mb: 5,
                gap: 4,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Box>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Invoice to
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, mb: 0.5 }}>
                  {invoice.customer}
                </Typography>
                {invoice.billingAddress.map((line) => (
                  <Typography key={line} variant="body2" sx={{ color: 'text.secondary' }}>
                    {line}
                  </Typography>
                ))}
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                  {invoice.customerEmail}
                </Typography>
              </Box>
              <Stack spacing={2.5} sx={{ minWidth: 190 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Invoice number
                  </Typography>
                  <Typography variant="subtitle2">{invoice.id}</Typography>
                </Box>
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Issue date
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatInvoiceDate(invoice.issuedAt)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Due date
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatInvoiceDate(invoice.dueAt)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Rate</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.lines.map((line) => (
                    <TableRow key={line.description} sx={{ height: 72 }}>
                      <TableCell>
                        <Typography variant="subtitle2">{line.description}</Typography>
                      </TableCell>
                      <TableCell align="right">{line.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(line.unitPrice)}</TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2">
                          {formatCurrency(line.quantity * line.unitPrice)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 4, ml: 'auto', maxWidth: 320 }}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Subtotal
                  </Typography>
                  <Typography variant="subtitle2">{formatCurrency(subtotal)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tax
                  </Typography>
                  <Typography variant="subtitle2">{formatCurrency(invoice.tax)}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="h4">{formatCurrency(invoice.total)}</Typography>
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ mt: 5, pt: 3, borderTop: (theme) => `1px dashed ${theme.palette.divider}` }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Notes
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {invoice.notes}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  mb: 2.5,
                  display: 'flex',
                  borderRadius: 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'warning.darker',
                  bgcolor: 'warning.lighter',
                }}
              >
                <Iconify icon="solar:cart-3-bold" width={26} />
              </Box>
              <Typography variant="h6">Payment due</Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                {formatCurrency(invoice.total)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Due by {formatInvoiceDate(invoice.dueAt)}
              </Typography>
              <Button
                fullWidth
                size="large"
                variant="contained"
                startIcon={<Iconify icon="solar:check-circle-bold" />}
                sx={{ mt: 3 }}
              >
                Record payment
              </Button>
              <Button fullWidth color="inherit" sx={{ mt: 1 }}>
                Copy payment link
              </Button>
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2.5 }}>
                Payment details
              </Typography>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.5}>
                  <Iconify
                    icon="solar:home-angle-bold-duotone"
                    width={22}
                    sx={{ color: 'text.secondary', mt: 0.25 }}
                  />
                  <Box>
                    <Typography variant="subtitle2">Bank transfer</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Use {invoice.id} as the payment reference.
                    </Typography>
                  </Box>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1.5}>
                  <Iconify
                    icon="solar:shield-keyhole-bold-duotone"
                    width={22}
                    sx={{ color: 'text.secondary', mt: 0.25 }}
                  />
                  <Box>
                    <Typography variant="subtitle2">Secure card payment</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Customer can pay online using the payment link.
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <DashboardLayout>
        <InvoicePage />
      </DashboardLayout>
    </BrowserRouter>
  </ThemeProvider>
);
