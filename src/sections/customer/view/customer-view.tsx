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
  ['Fixture Co', 'Springfield'],
  ['Sample Ltd', 'Riverton'],
];

export function CustomerView() {
  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Customers
      </Typography>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow><TableCell>Name</TableCell><TableCell>City</TableCell></TableRow>
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
      <Button sx={{ mt: 3 }}>Export</Button>
    </DashboardContent>
  );
}
