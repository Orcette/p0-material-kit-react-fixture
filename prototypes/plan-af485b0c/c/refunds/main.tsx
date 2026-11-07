import '../../../../src/global.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useMemo, useState, StrictMode } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

import { Iconify } from '../../../../src/components/iconify';
import { Scrollbar } from '../../../../src/components/scrollbar';
import { ThemeProvider } from '../../../../src/theme/theme-provider';
import { refunds, type Refund, formatAmount } from '../../shared/refunds';
import { DashboardLayout, DashboardContent } from '../../../../src/layouts/dashboard';

type SortKey = 'number' | 'customer' | 'amount' | 'status' | 'requestedAt';
type SortOrder = 'asc' | 'desc';

const statusColor = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'error',
} as const;

function RefundsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [order, setOrder] = useState<SortOrder>('desc');
  const [orderBy, setOrderBy] = useState<SortKey>('requestedAt');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [activeRefund, setActiveRefund] = useState<Refund | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return refunds
      .filter((refund) => status === 'All' || refund.status === status)
      .filter((refund) =>
        [refund.number, refund.customer, refund.email, refund.reason].some((value) =>
          value.toLowerCase().includes(needle)
        )
      )
      .sort((a, b) => {
        const left = a[orderBy];
        const right = b[orderBy];
        const result = typeof left === 'number' ? left - Number(right) : String(left).localeCompare(String(right));
        return order === 'asc' ? result : -result;
      });
  }, [order, orderBy, query, status]);

  const visible = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const allVisibleSelected = visible.length > 0 && visible.every((row) => selected.includes(row.id));

  const sort = (key: SortKey) => {
    setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const openDetail = (refund: Refund) => {
    setActiveRefund(refund);
    setDetailOpen(true);
  };

  const headerCell = (key: SortKey, label: string, sx = {}) => (
    <TableCell sortDirection={orderBy === key ? order : false} sx={sx}>
      <TableSortLabel active={orderBy === key} direction={orderBy === key ? order : 'asc'} onClick={() => sort(key)}>
        {label}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <DashboardContent>
      <Box sx={{ mb: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>Refunds</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
          New refund
        </Button>
      </Box>

      <Card>
        <Toolbar
          sx={{
            minHeight: { xs: 128, sm: 96 },
            py: { xs: 2, sm: 0 },
            px: { xs: 2, sm: 3 },
            gap: 1.5,
            alignItems: { xs: 'stretch', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            ...(selected.length > 0 && { color: 'primary.main', bgcolor: 'primary.lighter' }),
          }}
        >
          {selected.length ? (
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>{selected.length} selected</Typography>
          ) : (
            <>
              <OutlinedInput
                fullWidth
                value={query}
                onChange={(event) => { setQuery(event.target.value); setPage(0); }}
                placeholder="Search refunds..."
                inputProps={{ 'aria-label': 'Search refunds' }}
                startAdornment={<InputAdornment position="start"><Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} /></InputAdornment>}
                sx={{ maxWidth: { sm: 360 } }}
              />
              <Select
                value={status}
                onChange={(event) => { setStatus(event.target.value); setPage(0); }}
                inputProps={{ 'aria-label': 'Filter by status' }}
                sx={{ minWidth: { sm: 150 } }}
              >
                {['All', 'Completed', 'Pending', 'Failed'].map((option) => <MenuItem key={option} value={option}>{option === 'All' ? 'All statuses' : option}</MenuItem>)}
              </Select>
            </>
          )}
          {selected.length > 0 && <Tooltip title="Clear selection"><IconButton onClick={() => setSelected([])}><Iconify icon="mingcute:close-line" /></IconButton></Tooltip>}
        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 680 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={allVisibleSelected}
                      indeterminate={visible.some((row) => selected.includes(row.id)) && !allVisibleSelected}
                      onChange={(event) => setSelected(event.target.checked ? [...new Set([...selected, ...visible.map((row) => row.id)])] : selected.filter((id) => !visible.some((row) => row.id === id)))}
                      inputProps={{ 'aria-label': 'Select all visible refunds' }}
                    />
                  </TableCell>
                  {headerCell('number', 'Refund')}
                  {headerCell('customer', 'Customer')}
                  {headerCell('amount', 'Amount', { textAlign: 'right' })}
                  {headerCell('status', 'Status', { display: { xs: 'none', sm: 'table-cell' } })}
                  {headerCell('requestedAt', 'Requested', { display: { xs: 'none', md: 'table-cell' } })}
                  <TableCell padding="checkbox" />
                </TableRow>
              </TableHead>
              <TableBody>
                {visible.map((refund) => (
                  <TableRow
                    hover
                    key={refund.id}
                    selected={selected.includes(refund.id)}
                    onClick={() => openDetail(refund)}
                    sx={{ cursor: 'pointer', '& td': { py: 2.25 } }}
                  >
                    <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                      <Checkbox checked={selected.includes(refund.id)} onChange={() => setSelected(selected.includes(refund.id) ? selected.filter((id) => id !== refund.id) : [...selected, refund.id])} inputProps={{ 'aria-label': `Select ${refund.number}` }} />
                    </TableCell>
                    <TableCell><Typography variant="subtitle2">{refund.number}</Typography><Typography variant="caption" sx={{ color: 'text.secondary', display: { sm: 'none' } }}>{refund.status}</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">{refund.customer}</Typography><Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>{refund.email}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{formatAmount(refund)}</Typography></TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}><Chip label={refund.status} color={statusColor[refund.status]} size="small" /></TableCell>
                    <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', display: { xs: 'none', md: 'table-cell' } }}>{refund.requestedAt}</TableCell>
                    <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                      <IconButton onClick={(event) => { setMenuAnchor(event.currentTarget); setActiveRefund(refund); }} aria-label={`Actions for ${refund.number}`}><Iconify icon="eva:more-vertical-fill" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!visible.length && (
                  <TableRow><TableCell colSpan={7}><Box sx={{ py: 10, textAlign: 'center' }}><Typography variant="h6" sx={{ mb: 1 }}>No refunds found</Typography><Typography variant="body2" sx={{ color: 'text.secondary' }}>Try changing your search or status filter.</Typography></Box></TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={page}
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          onRowsPerPageChange={(event) => { setRowsPerPage(Number(event.target.value)); setPage(0); }}
        />
      </Card>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { setMenuAnchor(null); if (activeRefund) openDetail(activeRefund); }}><Iconify icon="solar:eye-bold" sx={{ mr: 1.5 }} />View details</MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)}><Iconify icon="solar:share-bold" sx={{ mr: 1.5 }} />Share receipt</MenuItem>
      </Menu>

      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{activeRefund?.number}</DialogTitle>
        <DialogContent>
          {activeRefund && <Stack spacing={2.5} sx={{ pt: 1 }}><Box><Typography variant="caption" sx={{ color: 'text.secondary' }}>Customer</Typography><Typography variant="subtitle1">{activeRefund.customer}</Typography><Typography variant="body2" sx={{ color: 'text.secondary' }}>{activeRefund.email}</Typography></Box><Box><Typography variant="caption" sx={{ color: 'text.secondary' }}>Refund amount</Typography><Typography variant="h4">{formatAmount(activeRefund)}</Typography></Box><Stack direction="row" justifyContent="space-between"><Box><Typography variant="caption" sx={{ color: 'text.secondary' }}>Reason</Typography><Typography variant="body2">{activeRefund.reason}</Typography></Box><Chip label={activeRefund.status} color={statusColor[activeRefund.status]} size="small" /></Stack></Stack>}
        </DialogContent>
        <DialogActions><Button onClick={() => setDetailOpen(false)} color="inherit">Close</Button></DialogActions>
      </Dialog>
    </DashboardContent>
  );
}

function App() {
  return <ThemeProvider><DashboardLayout><RefundsPage /></DashboardLayout></ThemeProvider>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
