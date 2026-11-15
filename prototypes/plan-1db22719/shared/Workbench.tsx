import { createRoot } from 'react-dom/client';

const invoices = [
  { number: 'INV-1001', customer: 'Acme Studio', amount: '$1,200', status: 'Paid' },
  { number: 'INV-1002', customer: 'Northwind Labs', amount: '$860', status: 'Pending' },
  { number: 'INV-1003', customer: 'Cedar Works', amount: '$2,450', status: 'Overdue' },
  { number: 'INV-1004', customer: 'Brightline Co.', amount: '$725', status: 'Paid' },
];

export function mount(el: HTMLElement, variant: string) {
  createRoot(el).render(
    <main>
      <h1>Invoices</h1>
      <table
        ref={(node) => {
          if (node) node.style.backgroundColor = variant === 'b' ? '#e5e7eb' : '';
        }}
      >
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.number}>
              <td>{invoice.number}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
