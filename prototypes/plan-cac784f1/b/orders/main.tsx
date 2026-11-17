import { mountPage } from '../../shared/mount';

import { OrdersView } from './orders-view';

// ----------------------------------------------------------------------

function Page() {
  return <OrdersView />;
}

mountPage(Page, { path: '/orders' });
