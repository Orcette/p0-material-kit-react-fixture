import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'src/app';
import { DashboardLayout } from 'src/layouts/dashboard';

import { OrdersPage } from './orders-page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <DashboardLayout>
          <OrdersPage />
        </DashboardLayout>
      </App>
    </BrowserRouter>
  </StrictMode>
);
