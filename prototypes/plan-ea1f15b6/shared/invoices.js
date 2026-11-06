"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInvoiceDate = exports.formatCurrency = exports.selectedInvoice = exports.invoices = void 0;
exports.invoices = [
    {
        id: 'INV-2026-0048',
        customer: 'Northstar Labs',
        customerEmail: 'billing@northstarlabs.co',
        billingAddress: ['145 Market Street', 'San Francisco, CA 94105'],
        issuedAt: '2026-11-02',
        dueAt: '2026-11-16',
        status: 'Pending',
        total: 12480,
        tax: 800,
        notes: 'Payment is due within 14 days. Thank you for your business.',
        lines: [
            { description: 'Product design sprint', quantity: 1, unitPrice: 6800 },
            { description: 'Interface implementation', quantity: 40, unitPrice: 122 },
        ],
    },
    {
        id: 'INV-2026-0047',
        customer: 'Cedar & Co.',
        customerEmail: 'finance@cedarandco.com',
        billingAddress: ['88 Willow Avenue', 'Portland, OR 97205'],
        issuedAt: '2026-10-28',
        dueAt: '2026-11-11',
        status: 'Paid',
        total: 8240,
        tax: 540,
        notes: 'Paid by bank transfer.',
        lines: [
            { description: 'Brand system refresh', quantity: 1, unitPrice: 5200 },
            { description: 'Component library support', quantity: 20, unitPrice: 125 },
        ],
    },
    {
        id: 'INV-2026-0046',
        customer: 'Atlas Freight',
        customerEmail: 'ap@atlasfreight.com',
        billingAddress: ['2100 Harbor Way', 'Seattle, WA 98134'],
        issuedAt: '2026-10-21',
        dueAt: '2026-11-04',
        status: 'Overdue',
        total: 14650,
        tax: 950,
        notes: 'Please reference the invoice number with payment.',
        lines: [
            { description: 'Operations dashboard', quantity: 1, unitPrice: 9600 },
            { description: 'Data integration', quantity: 25, unitPrice: 164 },
        ],
    },
    {
        id: 'INV-2026-0045',
        customer: 'Lumon Health',
        customerEmail: 'accounts@lumonhealth.org',
        billingAddress: ['42 Wellness Plaza', 'Austin, TX 78701'],
        issuedAt: '2026-10-18',
        dueAt: '2026-11-01',
        status: 'Paid',
        total: 5975,
        tax: 375,
        notes: 'Paid by card.',
        lines: [{ description: 'Patient portal research', quantity: 40, unitPrice: 140 }],
    },
    {
        id: 'INV-2026-0044',
        customer: 'Morrow Studio',
        customerEmail: 'hello@morrowstudio.design',
        billingAddress: ['17 Gallery Lane', 'Brooklyn, NY 11201'],
        issuedAt: '2026-10-10',
        dueAt: '2026-10-24',
        status: 'Draft',
        total: 3200,
        tax: 200,
        notes: 'Draft invoice pending final scope confirmation.',
        lines: [{ description: 'Creative direction workshop', quantity: 2, unitPrice: 1500 }],
    },
    {
        id: 'INV-2026-0043',
        customer: 'Verde Foods',
        customerEmail: 'payables@verdefoods.com',
        billingAddress: ['760 Orchard Road', 'Sacramento, CA 95814'],
        issuedAt: '2026-10-04',
        dueAt: '2026-10-18',
        status: 'Paid',
        total: 10890,
        tax: 690,
        notes: 'Paid by ACH.',
        lines: [
            { description: 'Commerce UX audit', quantity: 1, unitPrice: 4200 },
            { description: 'Checkout redesign', quantity: 1, unitPrice: 6000 },
        ],
    },
];
exports.selectedInvoice = exports.invoices[0];
var formatCurrency = function (value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
exports.formatCurrency = formatCurrency;
var formatInvoiceDate = function (value) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date("".concat(value, "T12:00:00")));
};
exports.formatInvoiceDate = formatInvoiceDate;
