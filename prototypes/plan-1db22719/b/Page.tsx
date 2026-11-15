import React from "react";
import { createRoot } from "react-dom/client";

const invoices = [
  { invoice: "INV-1001", customer: "Acme Studio", amount: "$1,200", status: "Paid" },
  { invoice: "INV-1002", customer: "Northwind Labs", amount: "$860", status: "Pending" },
  { invoice: "INV-1003", customer: "Cedar Works", amount: "$2,450", status: "Overdue" },
  { invoice: "INV-1004", customer: "Brightline Co.", amount: "$725", status: "Paid" },
];

export function mount(el: HTMLElement) {
  createRoot(el).render(
    <main>
      <h1>Invoices</h1>
      <table>
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
            <tr key={invoice.invoice}>
              <td>{invoice.invoice}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>,
  );
}
