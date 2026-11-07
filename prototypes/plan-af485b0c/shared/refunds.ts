export type Refund = {
  id: string;
  number: string;
  customer: string;
  email: string;
  amount: number;
  currency: 'USD';
  status: 'Completed' | 'Pending' | 'Failed';
  requestedAt: string;
  reason: string;
};

export const refunds: Refund[] = [
  { id: 'rf_1008', number: 'RF-1048', customer: 'Olivia Martin', email: 'olivia.martin@example.com', amount: 124.5, currency: 'USD', status: 'Completed', requestedAt: 'Nov 7, 2026', reason: 'Returned item' },
  { id: 'rf_1007', number: 'RF-1047', customer: 'Jackson Lee', email: 'jackson.lee@example.com', amount: 89, currency: 'USD', status: 'Pending', requestedAt: 'Nov 6, 2026', reason: 'Duplicate charge' },
  { id: 'rf_1006', number: 'RF-1046', customer: 'Sophia Brown', email: 'sophia.brown@example.com', amount: 212.75, currency: 'USD', status: 'Completed', requestedAt: 'Nov 5, 2026', reason: 'Order canceled' },
  { id: 'rf_1005', number: 'RF-1045', customer: 'Noah Williams', email: 'noah.williams@example.com', amount: 48.25, currency: 'USD', status: 'Failed', requestedAt: 'Nov 4, 2026', reason: 'Payment issue' },
  { id: 'rf_1004', number: 'RF-1044', customer: 'Emma Davis', email: 'emma.davis@example.com', amount: 156, currency: 'USD', status: 'Completed', requestedAt: 'Nov 3, 2026', reason: 'Returned item' },
  { id: 'rf_1003', number: 'RF-1043', customer: 'Liam Wilson', email: 'liam.wilson@example.com', amount: 72.4, currency: 'USD', status: 'Pending', requestedAt: 'Nov 2, 2026', reason: 'Order canceled' },
  { id: 'rf_1002', number: 'RF-1042', customer: 'Ava Anderson', email: 'ava.anderson@example.com', amount: 315.2, currency: 'USD', status: 'Completed', requestedAt: 'Nov 1, 2026', reason: 'Returned item' },
  { id: 'rf_1001', number: 'RF-1041', customer: 'Ethan Thomas', email: 'ethan.thomas@example.com', amount: 64, currency: 'USD', status: 'Completed', requestedAt: 'Oct 31, 2026', reason: 'Duplicate charge' },
];

export const formatAmount = (refund: Refund) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: refund.currency }).format(refund.amount);
