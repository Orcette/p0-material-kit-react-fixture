"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var Box_1 = require("@mui/material/Box");
var Card_1 = require("@mui/material/Card");
var Link_1 = require("@mui/material/Link");
var Stack_1 = require("@mui/material/Stack");
var Table_1 = require("@mui/material/Table");
var Button_1 = require("@mui/material/Button");
var Divider_1 = require("@mui/material/Divider");
var TableRow_1 = require("@mui/material/TableRow");
var TableBody_1 = require("@mui/material/TableBody");
var TableCell_1 = require("@mui/material/TableCell");
var TableHead_1 = require("@mui/material/TableHead");
var Typography_1 = require("@mui/material/Typography");
var CardContent_1 = require("@mui/material/CardContent");
var TableContainer_1 = require("@mui/material/TableContainer");
require("src/global.css");
var theme_provider_1 = require("src/theme/theme-provider");
var dashboard_1 = require("src/layouts/dashboard");
var iconify_1 = require("src/components/iconify");
var status_label_1 = require("../status-label");
var invoices_1 = require("../../shared/invoices");
var subtotal = invoices_1.selectedInvoice.lines.reduce(function (sum, line) { return sum + line.quantity * line.unitPrice; }, 0);
function SummaryLine(_a) {
    var label = _a.label, value = _a.value, emphasized = _a.emphasized;
    return (<Box_1.default sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography_1.default variant={emphasized ? 'subtitle1' : 'body2'} sx={{ color: emphasized ? 'text.primary' : 'text.secondary' }}>
        {label}
      </Typography_1.default>
      <Typography_1.default variant={emphasized ? 'h6' : 'subtitle2'}>{value}</Typography_1.default>
    </Box_1.default>);
}
function InvoicePage() {
    return (<dashboard_1.DashboardContent>
      <Box_1.default sx={{
            mb: 5,
            gap: 2,
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
        }}>
        <Box_1.default sx={{ flexGrow: 1 }}>
          <Link_1.default href="../invoices/" color="inherit" underline="hover" sx={{ mb: 1.5, gap: 0.75, display: 'inline-flex', alignItems: 'center' }}>
            <iconify_1.Iconify icon="eva:arrow-back-fill" width={18}/>
            Back to invoices
          </Link_1.default>
          <Box_1.default sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
            <Typography_1.default variant="h4">{invoices_1.selectedInvoice.id}</Typography_1.default>
            <status_label_1.InvoiceStatusLabel status={invoices_1.selectedInvoice.status}/>
          </Box_1.default>
        </Box_1.default>
        <Stack_1.default direction="row" spacing={1.5}>
          <Button_1.default variant="outlined" color="inherit" startIcon={<iconify_1.Iconify icon="solar:download-minimalistic-bold"/>}>
            Download
          </Button_1.default>
          <Button_1.default variant="contained" color="inherit" startIcon={<iconify_1.Iconify icon="solar:plain-bold"/>}>
            Send reminder
          </Button_1.default>
        </Stack_1.default>
      </Box_1.default>

      <Box_1.default sx={{
            gap: 3,
            display: 'grid',
            alignItems: 'start',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 320px' },
        }}>
        <Card_1.default>
          <CardContent_1.default sx={{ p: { xs: 3, sm: 5 } }}>
            <Box_1.default sx={{
            mb: 5,
            gap: 4,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
        }}>
              <Box_1.default>
                <Typography_1.default variant="h5">Acme Studio</Typography_1.default>
                <Typography_1.default variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  500 Howard Street
                  <br />
                  San Francisco, CA 94105
                </Typography_1.default>
              </Box_1.default>
              <Box_1.default sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Typography_1.default variant="overline" sx={{ color: 'text.secondary' }}>
                  Invoice
                </Typography_1.default>
                <Typography_1.default variant="h5">{invoices_1.selectedInvoice.id}</Typography_1.default>
                <Box_1.default sx={{ mt: 1.5 }}>
                  <Typography_1.default variant="body2" sx={{ color: 'text.secondary' }}>
                    Issued {(0, invoices_1.formatInvoiceDate)(invoices_1.selectedInvoice.issuedAt)}
                  </Typography_1.default>
                  <Typography_1.default variant="body2" sx={{ color: 'text.secondary' }}>
                    Due {(0, invoices_1.formatInvoiceDate)(invoices_1.selectedInvoice.dueAt)}
                  </Typography_1.default>
                </Box_1.default>
              </Box_1.default>
            </Box_1.default>

            <Divider_1.default sx={{ mb: 4 }}/>

            <Box_1.default sx={{ mb: 4 }}>
              <Typography_1.default variant="overline" sx={{ color: 'text.secondary' }}>
                Bill to
              </Typography_1.default>
              <Typography_1.default variant="subtitle1" sx={{ mt: 1 }}>
                {invoices_1.selectedInvoice.customer}
              </Typography_1.default>
              <Typography_1.default variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                {invoices_1.selectedInvoice.billingAddress.map(function (line) { return (<span key={line}>
                    {line}
                    <br />
                  </span>); })}
                {invoices_1.selectedInvoice.customerEmail}
              </Typography_1.default>
            </Box_1.default>

            <TableContainer_1.default>
              <Table_1.default>
                <TableHead_1.default>
                  <TableRow_1.default>
                    <TableCell_1.default>Description</TableCell_1.default>
                    <TableCell_1.default align="right">Qty</TableCell_1.default>
                    <TableCell_1.default align="right">Rate</TableCell_1.default>
                    <TableCell_1.default align="right">Amount</TableCell_1.default>
                  </TableRow_1.default>
                </TableHead_1.default>
                <TableBody_1.default>
                  {invoices_1.selectedInvoice.lines.map(function (line) { return (<TableRow_1.default key={line.description}>
                      <TableCell_1.default>
                        <Typography_1.default variant="subtitle2">{line.description}</Typography_1.default>
                      </TableCell_1.default>
                      <TableCell_1.default align="right">{line.quantity}</TableCell_1.default>
                      <TableCell_1.default align="right">{(0, invoices_1.formatCurrency)(line.unitPrice)}</TableCell_1.default>
                      <TableCell_1.default align="right">
                        <Typography_1.default variant="subtitle2">
                          {(0, invoices_1.formatCurrency)(line.quantity * line.unitPrice)}
                        </Typography_1.default>
                      </TableCell_1.default>
                    </TableRow_1.default>); })}
                </TableBody_1.default>
              </Table_1.default>
            </TableContainer_1.default>

            <Box_1.default sx={{ mt: 4, ml: 'auto', width: { xs: 1, sm: 320 } }}>
              <Stack_1.default spacing={2}>
                <SummaryLine label="Subtotal" value={(0, invoices_1.formatCurrency)(subtotal)}/>
                <SummaryLine label="Tax" value={(0, invoices_1.formatCurrency)(invoices_1.selectedInvoice.tax)}/>
                <Divider_1.default />
                <SummaryLine emphasized label="Total" value={(0, invoices_1.formatCurrency)(invoices_1.selectedInvoice.total)}/>
              </Stack_1.default>
            </Box_1.default>

            <Box_1.default sx={{ mt: 6, p: 2.5, borderRadius: 1.5, bgcolor: 'background.neutral' }}>
              <Typography_1.default variant="subtitle2">Notes</Typography_1.default>
              <Typography_1.default variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                {invoices_1.selectedInvoice.notes}
              </Typography_1.default>
            </Box_1.default>
          </CardContent_1.default>
        </Card_1.default>

        <Stack_1.default spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
          <Card_1.default>
            <CardContent_1.default sx={{ p: 3 }}>
              <Typography_1.default variant="overline" sx={{ color: 'text.secondary' }}>
                Customer
              </Typography_1.default>
              <Box_1.default sx={{ mt: 2, gap: 1.5, display: 'flex', alignItems: 'center' }}>
                <Box_1.default sx={{
            width: 48,
            height: 48,
            display: 'grid',
            borderRadius: '50%',
            placeItems: 'center',
            color: 'primary.dark',
            bgcolor: 'primary.lighter',
            typography: 'subtitle2',
        }}>
                  NL
                </Box_1.default>
                <Box_1.default>
                  <Typography_1.default variant="subtitle1">{invoices_1.selectedInvoice.customer}</Typography_1.default>
                  <Typography_1.default variant="body2" sx={{ color: 'text.secondary' }}>
                    {invoices_1.selectedInvoice.customerEmail}
                  </Typography_1.default>
                </Box_1.default>
              </Box_1.default>
              <Divider_1.default sx={{ my: 2.5 }}/>
              <Typography_1.default variant="body2" sx={{ color: 'text.secondary' }}>
                {invoices_1.selectedInvoice.billingAddress[0]}
                <br />
                {invoices_1.selectedInvoice.billingAddress[1]}
              </Typography_1.default>
            </CardContent_1.default>
          </Card_1.default>

          <Card_1.default>
            <CardContent_1.default sx={{ p: 3 }}>
              <Box_1.default sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography_1.default variant="overline" sx={{ color: 'text.secondary' }}>
                  Payment
                </Typography_1.default>
                <status_label_1.InvoiceStatusLabel status={invoices_1.selectedInvoice.status}/>
              </Box_1.default>
              <Typography_1.default variant="h4" sx={{ mt: 2 }}>
                {(0, invoices_1.formatCurrency)(invoices_1.selectedInvoice.total)}
              </Typography_1.default>
              <Typography_1.default variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                Due {(0, invoices_1.formatInvoiceDate)(invoices_1.selectedInvoice.dueAt)}
              </Typography_1.default>
              <Divider_1.default sx={{ my: 2.5 }}/>
              <Box_1.default sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                <iconify_1.Iconify icon="solar:card-2-bold-duotone" sx={{ color: 'text.secondary' }}/>
                <Box_1.default>
                  <Typography_1.default variant="subtitle2">Bank transfer</Typography_1.default>
                  <Typography_1.default variant="caption" sx={{ color: 'text.secondary' }}>
                    Reference {invoices_1.selectedInvoice.id}
                  </Typography_1.default>
                </Box_1.default>
              </Box_1.default>
            </CardContent_1.default>
          </Card_1.default>
        </Stack_1.default>
      </Box_1.default>
    </dashboard_1.DashboardContent>);
}
(0, client_1.createRoot)(document.getElementById('root')).render(<theme_provider_1.ThemeProvider>
    <dashboard_1.DashboardLayout>
      <InvoicePage />
    </dashboard_1.DashboardLayout>
  </theme_provider_1.ThemeProvider>);
