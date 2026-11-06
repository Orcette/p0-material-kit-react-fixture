import { Label } from 'src/components/label';

import type { InvoiceStatus } from '../shared/invoices';

const statusColor = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
  Draft: 'default',
} as const;

export function InvoiceStatusLabel({ status }: { status: InvoiceStatus }) {
  return <Label color={statusColor[status]}>{status}</Label>;
}
