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
import TableHead from '@mui/material/TableHead';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';

import { selectedInvoice } from '../../shared/invoices';

import '../../../../src/global.css';

const LIST_URL = '/prototypes/plan-87facc82/a/list/';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

function InvoiceDetailPage() {
  const invoice = selectedInvoice;

  return (
    <DashboardContent>
      <Box sx={{ mb: 5 }}>
        <Link
          component={RouterLink}
          to={LIST_URL}
          color="inherit"
          underline="none"
          sx={{
            mb: 2,
            gap: 0.75,
            display: 'inline-flex',
            alignItems: 'center',
            typography: 'body2',
            fontWeight: 600,
          }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" />
          Invoices
        </Link>

        <Box
          sx={{
            gap: 2,
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">{invoice.number}</Typography>
              <Label color="warning">{invoice.status}</Label>
            </Box>
            <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
              Issued {invoice.date} · Due {invoice.dueDate}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
            >
              Download
            </Button>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="solar:letter-bold" />}
            >
              Send invoice
            </Button>
          </Stack>
        </Box>
      </Box>

      <Card sx={{ maxWidth: 960, mx: 'auto' }}>
        <CardContent sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
          <Box
            sx={{
              gap: 4,
              mb: 6,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                INVOICE
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {invoice.number}
              </Typography>
            </Box>

            <Box sx={{ minWidth: { sm: 240 }, textAlign: { sm: 'right' } }}>
              <Typography variant="h6">Minimal Studio</Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                488 Madison Avenue
                <br />
                New York, NY 10022
                <br />
                hello@minimalstudio.co
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              py: 5,
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
                {invoice.customer}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                {invoice.customerAddress.map((line) => (
                  <Box component="span" key={line} sx={{ display: 'block' }}>
                    {line}
                  </Box>
                ))}
                {invoice.customerEmail}
              </Typography>
            </Box>

            <Box
              sx={{
                gap: 2,
                display: 'grid',
                alignContent: 'start',
                gridTemplateColumns: 'auto 1fr',
                justifySelf: { sm: 'end' },
                minWidth: { sm: 250 },
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Invoice date
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 600 }}>
                {invoice.date}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Due date
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 600 }}>
                {invoice.dueDate}
              </Typography>
            </Box>
          </Box>

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 640 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Unit price</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.lines.map((line) => (
                    <TableRow key={line.description}>
                      <TableCell sx={{ fontWeight: 600 }}>{line.description}</TableCell>
                      <TableCell align="right">{line.quantity}</TableCell>
                      <TableCell align="right">{currency.format(line.unitPrice)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        {currency.format(line.quantity * line.unitPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ mt: 4, ml: 'auto', width: { xs: 1, sm: 320 } }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Subtotal
                </Typography>
                <Typography variant="body2">{currency.format(invoice.total)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Tax
                </Typography>
                <Typography variant="body2">{currency.format(0)}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Total due</Typography>
                <Typography variant="h4">{currency.format(invoice.total)}</Typography>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ my: 5 }} />

          <Box>
            <Typography variant="subtitle2">Payment details</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Please include {invoice.number} as the payment reference. Payment is due within 30
              days of the invoice date.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <DashboardLayout>
        <InvoiceDetailPage />
      </DashboardLayout>
    </BrowserRouter>
  </ThemeProvider>
);
