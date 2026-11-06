import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import 'src/global.css';

import { ThemeProvider } from 'src/theme/theme-provider';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';

import { selectedInvoice } from '../../shared/invoices';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function InvoiceDetailPage() {
  const invoice = selectedInvoice;
  const subtotal = invoice.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);

  return (
    <DashboardContent>
      <Box sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to="/prototypes/plan-87facc82/c/list/"
          underline="hover"
          color="text.secondary"
          sx={{ gap: 0.75, display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem' }}
        >
          <Iconify icon="eva:arrow-back-fill" width={18} />
          Back to invoices
        </Link>
      </Box>

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
          <Box sx={{ gap: 1.5, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="h4">{invoice.number}</Typography>
            <Label color="warning">Pending</Label>
          </Box>
          <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
            Issued {invoice.date} · Due {invoice.dueDate}
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: 1, sm: 'auto' } }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
            sx={{ width: { xs: 1, sm: 'auto' } }}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:plain-2-bold" />}
            sx={{ width: { xs: 1, sm: 'auto' } }}
          >
            Send reminder
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 320px' },
        }}
      >
        <Stack spacing={3} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              display: 'grid',
              gap: { xs: 3, sm: 4 },
              gridTemplateColumns: { xs: '1fr', sm: '1.2fr 0.8fr' },
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Payment status
              </Typography>
              <Box sx={{ mt: 1.5, gap: 2, display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'grid',
                    borderRadius: '50%',
                    placeItems: 'center',
                    color: 'warning.dark',
                    bgcolor: 'warning.lighter',
                  }}
                >
                  <Iconify icon="solar:clock-circle-bold" width={26} />
                </Box>
                <Box>
                  <Typography variant="h5">Awaiting payment</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    Due in 21 days
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                pl: { xs: 0, sm: 4 },
                pt: { xs: 3, sm: 0 },
                borderTop: { xs: 1, sm: 0 },
                borderLeft: { xs: 0, sm: 1 },
                borderColor: 'divider',
              }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Amount due
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                {currency.format(invoice.total)}
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
                USD · Net 30
              </Typography>
            </Box>
          </Card>

          <Card sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6">Customer</Typography>
            <Box
              sx={{
                mt: 3,
                gap: 3,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              }}
            >
              <Box>
                <Typography variant="subtitle1">{invoice.customer}</Typography>
                <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                  {invoice.customerEmail}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Billing address
                </Typography>
                {invoice.customerAddress.map((line) => (
                  <Typography key={line} variant="body2" sx={{ mt: 0.5 }}>
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Card>

          <Card>
            <Box sx={{ px: { xs: 3, sm: 4 }, pt: 3.5, pb: 2.5 }}>
              <Typography variant="h6">Line items</Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                Services included in this invoice.
              </Typography>
            </Box>

            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 640 }}>
                  <TableBody>
                    <TableRow
                      sx={{
                        '& th': {
                          color: 'text.secondary',
                          bgcolor: 'background.neutral',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        },
                      }}
                    >
                      <TableCell component="th">Description</TableCell>
                      <TableCell component="th" align="right">
                        Qty
                      </TableCell>
                      <TableCell component="th" align="right">
                        Rate
                      </TableCell>
                      <TableCell component="th" align="right">
                        Amount
                      </TableCell>
                    </TableRow>
                    {invoice.lines.map((line) => (
                      <TableRow key={line.description} sx={{ '& td': { py: 2.25 } }}>
                        <TableCell sx={{ fontWeight: 600 }}>{line.description}</TableCell>
                        <TableCell align="right" sx={{ color: 'text.secondary' }}>
                          {line.quantity}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'text.secondary' }}>
                          {currency.format(line.unitPrice)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          {currency.format(line.quantity * line.unitPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ p: { xs: 3, sm: 4 }, pt: { xs: 2, sm: 2 } }}>
              <Box sx={{ ml: 'auto', width: { xs: 1, sm: 300 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Subtotal
                  </Typography>
                  <Typography variant="subtitle2">{currency.format(subtotal)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="h5">{currency.format(invoice.total)}</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Stack>

        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Invoice details</Typography>
            <Stack spacing={2.25} sx={{ mt: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Invoice number
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                  {invoice.number}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Issue date
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                  {invoice.date}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Due date
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                  {invoice.dueDate}
                </Typography>
              </Box>
            </Stack>
          </Card>

          <Card sx={{ p: 3, bgcolor: 'background.neutral', boxShadow: 'none' }}>
            <Box
              sx={{
                mb: 2,
                width: 40,
                height: 40,
                display: 'grid',
                borderRadius: 1.25,
                placeItems: 'center',
                color: 'primary.main',
                bgcolor: 'primary.lighter',
              }}
            >
              <Iconify icon="solar:chat-round-dots-bold" width={22} />
            </Box>
            <Typography variant="subtitle1">Payment note</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Please include {invoice.number} in the payment reference.
            </Typography>
          </Card>
        </Stack>
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
