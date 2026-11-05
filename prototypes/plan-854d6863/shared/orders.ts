export type OrderStatus = 'Paid' | 'Processing' | 'Shipped' | 'Refunded';

export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
};

export const orders: Order[] = [
  { id: '#ORD-1048', customer: 'Olivia Martin', email: 'olivia@example.com', date: 'Nov 5, 2026', items: 3, total: 149.9, status: 'Paid' },
  { id: '#ORD-1047', customer: 'Jackson Lee', email: 'jackson@example.com', date: 'Nov 5, 2026', items: 1, total: 79.99, status: 'Processing' },
  { id: '#ORD-1046', customer: 'Sophia Brown', email: 'sophia@example.com', date: 'Nov 4, 2026', items: 4, total: 312.5, status: 'Shipped' },
  { id: '#ORD-1045', customer: 'Noah Williams', email: 'noah@example.com', date: 'Nov 4, 2026', items: 2, total: 124, status: 'Paid' },
  { id: '#ORD-1044', customer: 'Emma Davis', email: 'emma@example.com', date: 'Nov 3, 2026', items: 1, total: 48.75, status: 'Refunded' },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
