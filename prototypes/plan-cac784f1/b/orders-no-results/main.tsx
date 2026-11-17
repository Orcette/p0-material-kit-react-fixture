import { mountPage } from '../../shared/mount';

import { OrdersView } from '../orders/orders-view';

// ----------------------------------------------------------------------

function Page() {
  return <OrdersView initialFilter="Zoe Carter" />;
}

mountPage(Page, { path: '/orders' });
