import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';

const ROWS = [
  ['Sign-in', '2025-05-01'],
  ['Role change', '2025-05-03'],
];

export function AuditView() {
  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Audit
      </Typography>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow><TableCell>Event</TableCell><TableCell>When</TableCell></TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row[0]}>
                  {row.map((cell) => (
                    <TableCell key={cell}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Button variant="contained" color="inherit" sx={{ mt: 3 }}>
        Export
      </Button>
    </DashboardContent>
  );
}
