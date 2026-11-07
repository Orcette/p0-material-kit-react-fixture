import 'src/global.css';

import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
import { Scrollbar } from 'src/components/scrollbar';

import { receipts } from '../../shared/receipts';

function ReceiptsPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredReceipts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return receipts;

    return receipts.filter(
      (receipt) =>
        receipt.number.toLowerCase().includes(normalizedQuery) ||
        receipt.customer.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const resetPage = () => setPage(0);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Receipts
        </Typography>
      </Box>

      <Card>
        <Toolbar
          sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 1, 0, 3),
          }}
        >
          <OutlinedInput
            fullWidth
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            placeholder="Search receipts..."
            inputProps={{ 'aria-label': 'Search receipts' }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            sx={{ maxWidth: 320 }}
          />
        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Receipt number</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReceipts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((receipt) => (
                    <TableRow hover key={receipt.id}>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle2">{receipt.number}</Typography>
                      </TableCell>
                      <TableCell>{receipt.customer}</TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(receipt.amount)}
                      </TableCell>
                    </TableRow>
                  ))}

                {!filteredReceipts.length && (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ py: 8, textAlign: 'center' }}>
                      <Typography variant="h6">No receipts found</Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        Try a different receipt number or customer.
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
          count={filteredReceipts.length}
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
        <ReceiptsPage />
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
