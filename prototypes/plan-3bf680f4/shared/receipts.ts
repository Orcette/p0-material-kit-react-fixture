export type Receipt = {
  id: string;
  number: string;
  customer: string;
  amount: number;
};

export const receipts: Receipt[] = [
  { id: 'receipt-1', number: 'RCT-2048', customer: 'Acme Inc.', amount: 1240 },
  { id: 'receipt-2', number: 'RCT-2047', customer: 'Globex Corporation', amount: 875.5 },
  { id: 'receipt-3', number: 'RCT-2046', customer: 'Stark Industries', amount: 2650 },
  { id: 'receipt-4', number: 'RCT-2045', customer: 'Wayne Enterprises', amount: 420.75 },
  { id: 'receipt-5', number: 'RCT-2044', customer: 'Umbrella Group', amount: 1980 },
  { id: 'receipt-6', number: 'RCT-2043', customer: 'Wonka Industries', amount: 315.25 },
  { id: 'receipt-7', number: 'RCT-2042', customer: 'Hooli', amount: 760 },
  { id: 'receipt-8', number: 'RCT-2041', customer: 'Soylent Corp.', amount: 1105.9 },
];
