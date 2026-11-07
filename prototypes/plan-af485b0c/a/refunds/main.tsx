import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import '../../../../src/global.css';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';
import { ThemeProvider } from 'src/theme/theme-provider';
import { formatAmount, refunds, type Refund } from '../../shared/refunds';

type Order = 'asc' | 'desc';
type SortKey = 'number' | 'customer' | 'amount' | 'status' | 'requestedAt';

const columns: { id: SortKey | 'reason' | 'actions'; label: string; align?: 'right' }[] = [
  { id: 'number', label: 'Refund' },
  { id: 'customer', label: 'Customer' },
  { id: 'amount', label: 'Amount', align: 'right' },
  { id: 'status', label: 'Status' },
  { id: 'requestedAt', label: 'Requested' },
  { id: 'reason', label: 'Reason' },
  { id: 'actions', label: '' },
];

function RefundsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<SortKey>('requestedAt');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return refunds
      .filter((refund) => status === 'All' || refund.status === status)
      .filter((refund) =>
        [refund.number, refund.customer, refund.email, refund.reason].some((value) =>
          value.toLowerCase().includes(normalized)
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

  const handleSort = (key: SortKey) => {
    setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const resetPage = () => setPage(0);

  return (
    <DashboardLayout>
      <DashboardContent>
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>Refunds</Typography>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
            New refund
          </Button>
        </Box>

        <Card>
          <Toolbar
            sx={{
              minHeight: { xs: 120, sm: 88 },
              gap: 2,
              px: { xs: 2, sm: 3 },
              py: 2,
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              ...(selected.length > 0 && { color: 'primary.main', bgcolor: 'primary.lighter' }),
            }}
          >
            {selected.length > 0 ? (
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>{selected.length} selected</Typography>
            ) : (
              <>
                <OutlinedInput
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); resetPage(); }}
                  placeholder="Search refunds..."
                  startAdornment={<InputAdornment position="start"><Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} /></InputAdornment>}
                  sx={{ width: { xs: '100%', sm: 320 } }}
                />
                <FormControl size="small" sx={{ width: { xs: '100%', sm: 160 }, ml: { sm: 'auto' } }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={status} label="Status" onChange={(event) => { setStatus(event.target.value); resetPage(); }}>
                    {['All', 'Completed', 'Pending', 'Failed'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              </>
            )}
            {selected.length > 0 && <IconButton aria-label="Delete selected"><Iconify icon="solar:trash-bin-trash-bold" /></IconButton>}
          </Toolbar>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={allVisibleSelected}
                      indeterminate={visible.some((row) => selected.includes(row.id)) && !allVisibleSelected}
                      onChange={(event) => {
                        const ids = visible.map((row) => row.id);
                        setSelected(event.target.checked ? Array.from(new Set([...selected, ...ids])) : selected.filter((id) => !ids.includes(id)));
                      }}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} sx={{ whiteSpace: 'nowrap' }}>
                      {column.id !== 'reason' && column.id !== 'actions' ? (
                        <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => handleSort(column.id as SortKey)}>
                          {column.label}
                        </TableSortLabel>
                      ) : column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visible.map((refund) => (
                  <RefundRow
                    key={refund.id}
                    refund={refund}
                    selected={selected.includes(refund.id)}
                    onSelect={() => setSelected(selected.includes(refund.id) ? selected.filter((id) => id !== refund.id) : [...selected, refund.id])}
                    onMenu={(event) => setMenuAnchor(event.currentTarget)}
                  />
                ))}
                {visible.length === 0 && (
                  <TableRow><TableCell colSpan={8} sx={{ py: 8, textAlign: 'center' }}><Typography variant="h6">No refunds found</Typography><Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>Try changing your search or status filter.</Typography></TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={(_, nextPage) => setPage(nextPage)}
            onRowsPerPageChange={(event) => { setRowsPerPage(Number(event.target.value)); resetPage(); }}
          />
        </Card>
      </DashboardContent>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => setMenuAnchor(null)}><Iconify icon="solar:eye-bold" sx={{ mr: 1.5 }} />View details</MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)}><Iconify icon="solar:document-text-bold" sx={{ mr: 1.5 }} />Download receipt</MenuItem>
      </Menu>
    </DashboardLayout>
  );
}

function RefundRow({ refund, selected, onSelect, onMenu }: { refund: Refund; selected: boolean; onSelect: () => void; onMenu: (event: React.MouseEvent<HTMLElement>) => void }) {
  const statusColor = refund.status === 'Completed' ? 'success' : refund.status === 'Pending' ? 'warning' : 'error';
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox"><Checkbox checked={selected} onChange={onSelect} /></TableCell>
      <TableCell><Typography variant="subtitle2">{refund.number}</Typography></TableCell>
      <TableCell>
        <Stack spacing={0.25}>
          <Typography variant="subtitle2">{refund.customer}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{refund.email}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="right"><Typography variant="subtitle2">{formatAmount(refund)}</Typography></TableCell>
      <TableCell><Label color={statusColor}>{refund.status}</Label></TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{refund.requestedAt}</TableCell>
      <TableCell>{refund.reason}</TableCell>
      <TableCell align="right"><IconButton aria-label={`Actions for ${refund.number}`} onClick={onMenu}><Iconify icon="eva:more-vertical-fill" /></IconButton></TableCell>
    </TableRow>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><ThemeProvider><RefundsPage /></ThemeProvider></StrictMode>
);
