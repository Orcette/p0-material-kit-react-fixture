export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

export type Invoice = {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: InvoiceStatus;
};

export const invoices: Invoice[] = [
  { id: 'inv-001', number: 'INV-2026-0142', customer: 'Northstar Labs', amount: 6840, status: 'Paid' },
  { id: 'inv-002', number: 'INV-2026-0141', customer: 'Atlas & Co.', amount: 3120, status: 'Pending' },
  { id: 'inv-003', number: 'INV-2026-0140', customer: 'Willow Health', amount: 9580, status: 'Overdue' },
  { id: 'inv-004', number: 'INV-2026-0139', customer: 'Brightline Studio', amount: 2240, status: 'Paid' },
  { id: 'inv-005', number: 'INV-2026-0138', customer: 'Cedar Works', amount: 4750, status: 'Pending' },
  { id: 'inv-006', number: 'INV-2026-0137', customer: 'Harbor Logistics', amount: 12800, status: 'Paid' },
];
