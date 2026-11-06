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
import TableContainer from '@mui/material/TableContainer';

import '../../../../src/global.css';
import { ThemeProvider } from '../../../../src/theme/theme-provider';
import { DashboardLayout, DashboardContent } from '../../../../src/layouts/dashboard';
import { Label } from '../../../../src/components/label';
import { Iconify } from '../../../../src/components/iconify';
import {
  selectedInvoice,
  formatCurrency,
  formatInvoiceDate,
} from '../../shared/invoices';

function AmountRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: number;
  emphasized?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
      <Typography
        variant={emphasized ? 'subtitle1' : 'body2'}
        sx={{ color: emphasized ? 'text.primary' : 'text.secondary' }}
      >
        {label}
      </Typography>
      <Typography variant={emphasized ? 'h6' : 'body2'} sx={{ fontWeight: 700 }}>
        {formatCurrency(value)}
      </Typography>
    </Box>
  );
}

function InvoicePage() {
  const invoice = selectedInvoice;
  const subtotal = invoice.total - invoice.tax;

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            href="../invoices/"
            color="text.secondary"
            underline="hover"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 1 }}
          >
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              width={18}
              sx={{ transform: 'rotate(180deg)' }}
            />
            Back to invoices
          </Link>
          <Typography variant="h4">{invoice.id}</Typography>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
        >
          Print
        </Button>
      </Box>

      <Card sx={{ width: 1, minWidth: 0, maxWidth: 960, mx: 'auto', p: { xs: 3, md: 6 } }}>
        <Box
          sx={{
            mb: 6,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Invoice
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.5 }}>
              {invoice.id}
            </Typography>
          </Box>
          <Label color="warning" variant="filled">
            {invoice.status}
          </Label>
        </Box>

        <Divider />

        <Box
          sx={{
            py: 5,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.4fr 1fr 1fr' },
            gap: 4,
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
              {invoice.customerEmail}
            </Typography>
            {invoice.billingAddress.map((line) => (
              <Typography key={line} variant="body2" sx={{ color: 'text.secondary' }}>
                {line}
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Issue date
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              {formatInvoiceDate(invoice.issuedAt)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Due date
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              {formatInvoiceDate(invoice.dueAt)}
            </Typography>
          </Box>
        </Box>

        <TableContainer sx={{ maxWidth: 1, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 620 }}>
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
                <TableRow key={line.description}>
                  <TableCell>
                    <Typography variant="subtitle2">{line.description}</Typography>
                  </TableCell>
                  <TableCell align="right">{line.quantity}</TableCell>
                  <TableCell align="right">{formatCurrency(line.unitPrice)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    {formatCurrency(line.quantity * line.unitPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 320px' },
            gap: 6,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Notes
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, maxWidth: 420, color: 'text.secondary' }}>
              {invoice.notes}
            </Typography>
          </Box>

          <Stack spacing={2}>
            <AmountRow label="Subtotal" value={subtotal} />
            <AmountRow label="Tax" value={invoice.tax} />
            <Divider />
            <AmountRow label="Total" value={invoice.total} emphasized />
          </Stack>
        </Box>
      </Card>
    </DashboardContent>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <DashboardLayout>
          <InvoicePage />
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
