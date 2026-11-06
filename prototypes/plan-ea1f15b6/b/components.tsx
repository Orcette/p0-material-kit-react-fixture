import type { InvoiceStatus } from '../shared/invoices';
import type { ComponentProps } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Label } from '../../../src/components/label';
import { Iconify } from '../../../src/components/iconify';

export const statusColor: Record<
  InvoiceStatus,
  'success' | 'warning' | 'error' | 'default'
> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
  Draft: 'default',
};

export function InvoiceStatusLabel({ status }: { status: InvoiceStatus }) {
  return (
    <Label color={statusColor[status]} variant="soft">
      {status}
    </Label>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: ComponentProps<typeof Iconify>['icon'];
};

export function SummaryCard({ label, value, detail, icon }: SummaryCardProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        height: 1,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          display: 'flex',
          flexShrink: 0,
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }}
      >
        <Iconify icon={icon} width={24} />
      </Box>
      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="h5">{value}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {detail}
        </Typography>
      </Box>
    </Stack>
  );
}
