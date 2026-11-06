import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

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
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

import 'src/global.css';
import { ThemeProvider } from 'src/theme/theme-provider';
import { DashboardLayout, DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

import { InvoiceStatusLabel } from '../status-label';
import { selectedInvoice, formatCurrency, formatInvoiceDate } from '../../shared/invoices';

const subtotal = selectedInvoice.lines.reduce(
  (sum, line) => sum + line.quantity * line.unitPrice,
  0
);

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
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography
        variant={emphasized ? 'subtitle1' : 'body2'}
        sx={{ color: emphasized ? 'text.primary' : 'text.secondary' }}
      >
        {label}
      </Typography>
      <Typography variant={emphasized ? 'h6' : 'subtitle2'}>{value}</Typography>
    </Box>
  );
}

function InvoicePage() {
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
          <Link
            href="../invoices/"
            color="inherit"
            underline="hover"
            sx={{ mb: 1.5, gap: 0.75, display: 'inline-flex', alignItems: 'center' }}
          >
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              width={18}
              sx={{ transform: 'rotate(180deg)' }}
            />
            Back to invoices
          </Link>
          <Box sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">{selectedInvoice.id}</Typography>
            <InvoiceStatusLabel status={selectedInvoice.status} />
          </Box>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:eye-bold" />}
          >
            Preview
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

      <Box
        sx={{
          gap: 3,
          display: 'grid',
          alignItems: 'start',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 320px' },
        }}
      >
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
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
                <Typography variant="h5">Acme Studio</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  500 Howard Street
                  <br />
                  San Francisco, CA 94105
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Invoice
                </Typography>
                <Typography variant="h5">{selectedInvoice.id}</Typography>
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Issued {formatInvoiceDate(selectedInvoice.issuedAt)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Due {formatInvoiceDate(selectedInvoice.dueAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Bill to
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {selectedInvoice.customer}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                {selectedInvoice.billingAddress.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                {selectedInvoice.customerEmail}
              </Typography>
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
                  {selectedInvoice.lines.map((line) => (
                    <TableRow key={line.description}>
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

            <Box sx={{ mt: 4, ml: 'auto', width: { xs: 1, sm: 320 } }}>
              <Stack spacing={2}>
                <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
                <SummaryLine label="Tax" value={formatCurrency(selectedInvoice.tax)} />
                <Divider />
                <SummaryLine
                  emphasized
                  label="Total"
                  value={formatCurrency(selectedInvoice.total)}
                />
              </Stack>
            </Box>

            <Box sx={{ mt: 6, p: 2.5, borderRadius: 1.5, bgcolor: 'background.neutral' }}>
              <Typography variant="subtitle2">Notes</Typography>
              <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                {selectedInvoice.notes}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Customer
              </Typography>
              <Box sx={{ mt: 2, gap: 1.5, display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'grid',
                    borderRadius: '50%',
                    placeItems: 'center',
                    color: 'primary.dark',
                    bgcolor: 'primary.lighter',
                    typography: 'subtitle2',
                  }}
                >
                  NL
                </Box>
                <Box>
                  <Typography variant="subtitle1">{selectedInvoice.customer}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {selectedInvoice.customerEmail}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2.5 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selectedInvoice.billingAddress[0]}
                <br />
                {selectedInvoice.billingAddress[1]}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Payment
                </Typography>
                <InvoiceStatusLabel status={selectedInvoice.status} />
              </Box>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {formatCurrency(selectedInvoice.total)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                Due {formatInvoiceDate(selectedInvoice.dueAt)}
              </Typography>
              <Divider sx={{ my: 2.5 }} />
              <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:clock-circle-outline" sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="subtitle2">Bank transfer</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Reference {selectedInvoice.id}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
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
