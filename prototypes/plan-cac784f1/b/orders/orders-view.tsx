import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from 'src/sections/user/table-no-data';
import { UserTableHead } from 'src/sections/user/user-table-head';
import { TableEmptyRows } from 'src/sections/user/table-empty-rows';
import { emptyRows, getComparator } from 'src/sections/user/utils';

import { orders } from '../../shared/orders';
import { OrderTableRow } from './order-table-row';
import { OrderTableToolbar } from './order-table-toolbar';

import type { Order } from '../../shared/orders';

// ----------------------------------------------------------------------
// Structure copied from src/sections/user/view/user-view.tsx: page header
// (title + primary action), then one Card holding toolbar, table, pagination.
// No summary strip between header and list (accepted page rule).

const HEAD_LABEL = [
  { id: 'id', label: 'Order' },
  { id: 'customer', label: 'Customer' },
  { id: 'total', label: 'Total', align: 'right' },
  { id: 'status', label: 'Status' },
  { id: '' },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

function applyFilter(inputData: Order[], comparator: (a: any, b: any) => number, filterName: string) {
  const sorted = inputData
    .map((el, index) => [el, index] as const)
    .sort((a, b) => comparator(a[0], b[0]) || a[1] - b[1])
    .map((el) => el[0]);

  const query = filterName.trim().toLowerCase();
  if (!query) return sorted;

  return sorted.filter(
    (order) =>
      order.id.toLowerCase().includes(query) || order.customer.toLowerCase().includes(query)
  );
}

type OrdersViewProps = {
  initialFilter?: string;
};

export function OrdersView({ initialFilter = '' }: OrdersViewProps) {
  const table = useTable();

  const [filterName, setFilterName] = useState(initialFilter);

  const dataFiltered = applyFilter(orders, getComparator(table.order, table.orderBy), filterName);

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Orders
        </Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="mingcute:add-line" />}>
          New order
        </Button>
      </Box>

      <Card>
        <OrderTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={orders.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    orders.map((order) => order.id)
                  )
                }
                headLabel={HEAD_LABEL}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <OrderTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, orders.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
// Copy of useTable from src/sections/user/view/user-view.tsx (the real page
// module is not imported).

function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    setSelected(checked ? newSelecteds : []);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      setSelected((prev) =>
        prev.includes(inputValue) ? prev.filter((value) => value !== inputValue) : [...prev, inputValue]
      );
    },
    []
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
