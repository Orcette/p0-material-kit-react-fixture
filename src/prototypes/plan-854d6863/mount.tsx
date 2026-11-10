import { useParams } from 'react-router-dom';

import OrdersListVariant from './b';
import OrdersTableVariant from './a';

export default function OrdersPrototypePage() {
  const { variant } = useParams();
  return variant === 'b' ? <OrdersListVariant /> : <OrdersTableVariant />;
}
