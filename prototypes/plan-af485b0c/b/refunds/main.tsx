import 'src/global.css';

import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent, DashboardLayout } from 'src/layouts/dashboard';
import { ThemeProvider } from 'src/theme/theme-provider';

import { formatAmount, refunds, type Refund } from '../../shared/refunds';

type SortKey = 'number' | 'customer' | 'amount' | 'status' | 'requestedAt';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'All' | Refund['status'];

const statusColors = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'error',
} as const;

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');

function RefundRow({
  refund,
  selected,
  onSelect,
}: {
  refund: Refund;
  selected: boolean;
  onSelect: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <TableRow hover selected={selected} sx={{ '&:last-child td': { borderBottom: 0 } }}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={onSelect} inputProps={{ 'aria-label': `Select ${refund.number}` }} />
        </TableCell>
        <TableCell component="th" scope="row">
          <Stack spacing={0.25}>
            <Typography variant="subtitle2">{refund.number}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {refund.reason}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.lighter', color: 'primary.dark', fontSize: 14, fontWeight: 700 }}>
              {initials(refund.customer)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>{refund.customer}</Typography>
              <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>{refund.email}</Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">{formatAmount(refund)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{refund.currency}</Typography>
        </TableCell>
        <TableCell>
          <Chip label={refund.status} color={statusColors[refund.status]} size="small" variant="soft" />
        </TableCell>
        <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{refund.requestedAt}</TableCell>
        <TableCell align="right">
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} aria-label={`Actions for ${refund.number}`}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList sx={{ p: 0.75, minWidth: 176 }}>
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ borderRadius: 0.75, gap: 1.5 }}>
            <Iconify icon="solar:eye-bold" /> View details
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ borderRadius: 0.75, gap: 1.5 }}>
            <Iconify icon="solar:document-text-bold" /> Download receipt
          </MenuItem>
          {refund.status === 'Pending' && (
            <MenuItem onClick={() => setAnchorEl(null)} sx={{ borderRadius: 0.75, gap: 1.5, color: 'error.main' }}>
              <Iconify icon="solar:close-circle-bold" /> Cancel refund
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
}

function RefundsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');
  const [order, setOrder] = useState<SortOrder>('desc');
  const [orderBy, setOrderBy] = useState<SortKey>('requestedAt');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = refunds.filter((refund) => {
      const matchesStatus = status === 'All' || refund.status === status;
      const matchesQuery = !normalized || [refund.number, refund.customer, refund.email, refund.reason]
        .some((value) => value.toLowerCase().includes(normalized));
      return matchesStatus && matchesQuery;
    });

    return result.sort((a, b) => {
      const left = orderBy === 'amount' ? a.amount : a[orderBy].toLowerCase();
      const right = orderBy === 'amount' ? b.amount : b[orderBy].toLowerCase();
      const comparison = left < right ? -1 : left > right ? 1 : 0;
      return order === 'asc' ? comparison : -comparison;
    });
  }, [order, orderBy, query, status]);

  const visibleRows = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const visibleIds = visibleRows.map((refund) => refund.id);
  const visibleSelected = visibleIds.filter((id) => selected.includes(id)).length;

  const handleSort = (key: SortKey) => {
    setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const columns: { key: SortKey; label: string; minWidth?: number }[] = [
    { key: 'number', label: 'Refund', minWidth: 150 },
    { key: 'customer', label: 'Customer', minWidth: 250 },
    { key: 'amount', label: 'Amount', minWidth: 120 },
    { key: 'status', label: 'Status', minWidth: 120 },
    { key: 'requestedAt', label: 'Requested', minWidth: 130 },
  ];

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>Refunds</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="solar:export-bold" />}>
          Export
        </Button>
      </Box>

      <Card>
        <Toolbar
          sx={{ minHeight: { xs: 144, sm: 104 }, px: { xs: 2, sm: 3 }, py: 2, gap: 2, alignItems: { xs: 'stretch', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, ...(selected.length > 0 && { bgcolor: 'primary.lighter', color: 'primary.main' }) }}
        >
          {selected.length > 0 ? (
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>{selected.length} selected</Typography>
          ) : (
            <OutlinedInput
              value={query}
              onChange={(event) => { setQuery(event.target.value); setPage(0); }}
              placeholder="Search refunds or customers..."
              startAdornment={<InputAdornment position="start"><Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} /></InputAdornment>}
              sx={{ width: { xs: '100%', sm: 320 } }}
            />
          )}
          {selected.length > 0 ? (
            <Tooltip title="Delete selected"><IconButton color="inherit" onClick={() => setSelected([])}><Iconify icon="solar:trash-bin-trash-bold" /></IconButton></Tooltip>
          ) : (
            <ToggleButtonGroup
              exclusive
              size="small"
              value={status}
              onChange={(_, value: StatusFilter | null) => { if (value) { setStatus(value); setPage(0); } }}
              aria-label="Refund status"
              sx={{ ml: { sm: 'auto' }, alignSelf: { xs: 'flex-start', sm: 'auto' }, '& .MuiToggleButton-root': { px: { xs: 1.25, sm: 2 } } }}
            >
              {(['All', 'Completed', 'Pending', 'Failed'] as StatusFilter[]).map((item) => <ToggleButton key={item} value={item}>{item}</ToggleButton>)}
            </ToggleButtonGroup>
          )}
        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 880 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={visibleSelected > 0 && visibleSelected < visibleIds.length}
                      checked={visibleIds.length > 0 && visibleSelected === visibleIds.length}
                      onChange={(event) => setSelected(event.target.checked ? Array.from(new Set([...selected, ...visibleIds])) : selected.filter((id) => !visibleIds.includes(id)))}
                      inputProps={{ 'aria-label': 'Select visible refunds' }}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key} sortDirection={orderBy === column.key ? order : false} sx={{ minWidth: column.minWidth }}>
                      <TableSortLabel active={orderBy === column.key} direction={orderBy === column.key ? order : 'asc'} onClick={() => handleSort(column.key)}>
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((refund) => (
                  <RefundRow key={refund.id} refund={refund} selected={selected.includes(refund.id)} onSelect={() => setSelected((current) => current.includes(refund.id) ? current.filter((id) => id !== refund.id) : [...current, refund.id])} />
                ))}
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 10, textAlign: 'center' }}>
                      <Iconify icon="solar:inbox-line-bold" width={48} sx={{ mb: 2, color: 'text.disabled' }} />
                      <Typography variant="h6">No refunds found</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>Try a different search or status.</Typography>
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
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(event) => { setRowsPerPage(Number(event.target.value)); setPage(0); }}
        />
      </Card>
    </DashboardContent>
  );
}

function App() {
  return <ThemeProvider><DashboardLayout><RefundsPage /></DashboardLayout></ThemeProvider>;
}

createRoot(document.getElementById('root')!).render(<BrowserRouter><App /></BrowserRouter>);
