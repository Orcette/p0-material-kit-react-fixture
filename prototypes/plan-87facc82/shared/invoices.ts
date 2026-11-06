export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export type InvoiceLine = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  id: string;
  number: string;
  customer: string;
  customerEmail: string;
  customerAddress: string[];
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  total: number;
  lines: InvoiceLine[];
};

export const invoices: Invoice[] = [
  {
    id: 'inv-2026-0184',
    number: 'INV-2026-0184',
    customer: 'Acme Studio',
    customerEmail: 'billing@acmestudio.co',
    customerAddress: ['120 Market Street', 'San Francisco, CA 94105'],
    date: 'Oct 28, 2026',
    dueDate: 'Nov 27, 2026',
    status: 'pending',
    total: 8420,
    lines: [
      { description: 'Product design sprint', quantity: 1, unitPrice: 6200 },
      { description: 'Prototype development', quantity: 20, unitPrice: 85 },
      { description: 'Research synthesis', quantity: 4, unitPrice: 130 },
    ],
  },
  {
    id: 'inv-2026-0183',
    number: 'INV-2026-0183',
    customer: 'Northstar Labs',
    customerEmail: 'accounts@northstarlabs.io',
    customerAddress: ['85 Battery Road', 'Austin, TX 78701'],
    date: 'Oct 24, 2026',
    dueDate: 'Nov 23, 2026',
    status: 'paid',
    total: 12380,
    lines: [{ description: 'Platform engineering retainer', quantity: 1, unitPrice: 12380 }],
  },
  {
    id: 'inv-2026-0182',
    number: 'INV-2026-0182',
    customer: 'Sage & Co.',
    customerEmail: 'finance@sageandco.com',
    customerAddress: ['42 West 18th Street', 'New York, NY 10011'],
    date: 'Oct 19, 2026',
    dueDate: 'Nov 18, 2026',
    status: 'overdue',
    total: 3290,
    lines: [{ description: 'Brand system maintenance', quantity: 1, unitPrice: 3290 }],
  },
  {
    id: 'inv-2026-0181',
    number: 'INV-2026-0181',
    customer: 'Cedar Works',
    customerEmail: 'hello@cedarworks.design',
    customerAddress: ['710 Pine Avenue', 'Portland, OR 97205'],
    date: 'Oct 15, 2026',
    dueDate: 'Nov 14, 2026',
    status: 'draft',
    total: 7140,
    lines: [{ description: 'Commerce experience refresh', quantity: 1, unitPrice: 7140 }],
  },
  {
    id: 'inv-2026-0180',
    number: 'INV-2026-0180',
    customer: 'Orbit Health',
    customerEmail: 'ap@orbithealth.com',
    customerAddress: ['300 Mission Plaza', 'San Diego, CA 92101'],
    date: 'Oct 10, 2026',
    dueDate: 'Nov 9, 2026',
    status: 'paid',
    total: 9650,
    lines: [{ description: 'Patient portal discovery', quantity: 1, unitPrice: 9650 }],
  },
];

export const selectedInvoice = invoices[0];
