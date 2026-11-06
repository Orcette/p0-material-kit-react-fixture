"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatusLabel = InvoiceStatusLabel;
var label_1 = require("src/components/label");
var statusColor = {
    Paid: 'success',
    Pending: 'warning',
    Overdue: 'error',
    Draft: 'default',
};
function InvoiceStatusLabel(_a) {
    var status = _a.status;
    return <label_1.Label color={statusColor[status]}>{status}</label_1.Label>;
}
