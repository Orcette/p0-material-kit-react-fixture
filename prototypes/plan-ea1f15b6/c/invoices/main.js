"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var Box_1 = require("@mui/material/Box");
var Card_1 = require("@mui/material/Card");
var Link_1 = require("@mui/material/Link");
var Table_1 = require("@mui/material/Table");
var Avatar_1 = require("@mui/material/Avatar");
var Button_1 = require("@mui/material/Button");
var Select_1 = require("@mui/material/Select");
var Toolbar_1 = require("@mui/material/Toolbar");
var MenuItem_1 = require("@mui/material/MenuItem");
var TableRow_1 = require("@mui/material/TableRow");
var TableBody_1 = require("@mui/material/TableBody");
var TableCell_1 = require("@mui/material/TableCell");
var TableHead_1 = require("@mui/material/TableHead");
var Typography_1 = require("@mui/material/Typography");
var FormControl_1 = require("@mui/material/FormControl");
var OutlinedInput_1 = require("@mui/material/OutlinedInput");
var InputAdornment_1 = require("@mui/material/InputAdornment");
var TableContainer_1 = require("@mui/material/TableContainer");
var TablePagination_1 = require("@mui/material/TablePagination");
require("src/global.css");
var theme_provider_1 = require("src/theme/theme-provider");
var dashboard_1 = require("src/layouts/dashboard");
var iconify_1 = require("src/components/iconify");
var status_label_1 = require("../status-label");
var invoices_1 = require("../../shared/invoices");
var statusOptions = [
    'All',
    'Paid',
    'Pending',
    'Overdue',
    'Draft',
];
function customerInitials(customer) {
    return customer
        .split(/\s|&/)
        .filter(Boolean)
        .slice(0, 2)
        .map(function (word) { return word[0]; })
        .join('');
}
function InvoicesPage() {
    var _a = (0, react_1.useState)(''), query = _a[0], setQuery = _a[1];
    var _b = (0, react_1.useState)('All'), status = _b[0], setStatus = _b[1];
    var _c = (0, react_1.useState)(0), page = _c[0], setPage = _c[1];
    var _d = (0, react_1.useState)(5), rowsPerPage = _d[0], setRowsPerPage = _d[1];
    var filteredInvoices = (0, react_1.useMemo)(function () {
        return invoices_1.invoices.filter(function (invoice) {
            var matchesQuery = "".concat(invoice.id, " ").concat(invoice.customer)
                .toLowerCase()
                .includes(query.toLowerCase());
            return matchesQuery && (status === 'All' || invoice.status === status);
        });
    }, [query, status]);
    var visibleInvoices = filteredInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (<dashboard_1.DashboardContent>
      <Box_1.default sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Box_1.default sx={{ flexGrow: 1 }}>
          <Typography_1.default variant="h4">Invoices</Typography_1.default>
          <Typography_1.default variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
            Track customer billing and payment due dates.
          </Typography_1.default>
        </Box_1.default>
        <Button_1.default variant="contained" color="inherit" startIcon={<iconify_1.Iconify icon="mingcute:add-line"/>}>
          New invoice
        </Button_1.default>
      </Box_1.default>

      <Card_1.default>
        <Toolbar_1.default sx={{
            height: 96,
            gap: 2,
            display: 'flex',
            justifyContent: 'space-between',
            p: function (theme) { return theme.spacing(0, 3); },
        }}>
          <OutlinedInput_1.default value={query} onChange={function (event) {
            setQuery(event.target.value);
            setPage(0);
        }} placeholder="Search invoice or customer..." startAdornment={<InputAdornment_1.default position="start">
                <iconify_1.Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }}/>
              </InputAdornment_1.default>} sx={{ width: 1, maxWidth: 360 }}/>
          <FormControl_1.default sx={{ minWidth: 140 }}>
            <Select_1.default value={status} onChange={function (event) {
            setStatus(event.target.value);
            setPage(0);
        }} displayEmpty inputProps={{ 'aria-label': 'Filter by status' }}>
              {statusOptions.map(function (option) { return (<MenuItem_1.default key={option} value={option}>
                  {option === 'All' ? 'All statuses' : option}
                </MenuItem_1.default>); })}
            </Select_1.default>
          </FormControl_1.default>
        </Toolbar_1.default>

        <TableContainer_1.default>
          <Table_1.default sx={{ minWidth: 880 }}>
            <TableHead_1.default>
              <TableRow_1.default>
                <TableCell_1.default>Invoice</TableCell_1.default>
                <TableCell_1.default>Customer</TableCell_1.default>
                <TableCell_1.default>Date</TableCell_1.default>
                <TableCell_1.default>Status</TableCell_1.default>
                <TableCell_1.default align="right">Total</TableCell_1.default>
              </TableRow_1.default>
            </TableHead_1.default>
            <TableBody_1.default>
              {visibleInvoices.map(function (invoice) { return (<TableRow_1.default key={invoice.id} hover sx={{ height: 88 }}>
                  <TableCell_1.default component="th" scope="row">
                    {invoice.id === 'INV-2026-0048' ? (<Link_1.default href="../invoice/" color="inherit" underline="hover" sx={{ fontWeight: 700 }}>
                        {invoice.id}
                      </Link_1.default>) : (<Typography_1.default variant="subtitle2">{invoice.id}</Typography_1.default>)}
                  </TableCell_1.default>
                  <TableCell_1.default>
                    <Box_1.default sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar_1.default sx={{
                width: 44,
                height: 44,
                fontSize: 14,
                fontWeight: 700,
                color: 'primary.dark',
                bgcolor: 'primary.lighter',
            }}>
                        {customerInitials(invoice.customer)}
                      </Avatar_1.default>
                      <Box_1.default>
                        <Typography_1.default variant="subtitle2">{invoice.customer}</Typography_1.default>
                        <Typography_1.default variant="body2" sx={{ color: 'text.secondary' }}>
                          {invoice.customerEmail}
                        </Typography_1.default>
                      </Box_1.default>
                    </Box_1.default>
                  </TableCell_1.default>
                  <TableCell_1.default>
                    <Typography_1.default variant="body2">{(0, invoices_1.formatInvoiceDate)(invoice.issuedAt)}</Typography_1.default>
                    <Typography_1.default variant="caption" sx={{
                color: invoice.status === 'Overdue' ? 'error.main' : 'text.secondary',
            }}>
                      Due {(0, invoices_1.formatInvoiceDate)(invoice.dueAt)}
                    </Typography_1.default>
                  </TableCell_1.default>
                  <TableCell_1.default>
                    <status_label_1.InvoiceStatusLabel status={invoice.status}/>
                  </TableCell_1.default>
                  <TableCell_1.default align="right">
                    <Typography_1.default variant="subtitle2">{(0, invoices_1.formatCurrency)(invoice.total)}</Typography_1.default>
                  </TableCell_1.default>
                </TableRow_1.default>); })}
              {visibleInvoices.length === 0 && (<TableRow_1.default>
                  <TableCell_1.default colSpan={5} sx={{ py: 8, textAlign: 'center' }}>
                    <Typography_1.default variant="subtitle1">No invoices found</Typography_1.default>
                    <Typography_1.default variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                      Try a different customer, invoice number, or status.
                    </Typography_1.default>
                  </TableCell_1.default>
                </TableRow_1.default>)}
            </TableBody_1.default>
          </Table_1.default>
        </TableContainer_1.default>

        <TablePagination_1.default component="div" page={page} count={filteredInvoices.length} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10]} onPageChange={function (_, newPage) { return setPage(newPage); }} onRowsPerPageChange={function (event) {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
        }}/>
      </Card_1.default>
    </dashboard_1.DashboardContent>);
}
(0, client_1.createRoot)(document.getElementById('root')).render(<theme_provider_1.ThemeProvider>
    <dashboard_1.DashboardLayout>
      <InvoicesPage />
    </dashboard_1.DashboardLayout>
  </theme_provider_1.ThemeProvider>);
