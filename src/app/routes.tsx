import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './Root';
import { LoginPage } from './pages/LoginPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: LoginPage
      },
      {
        path: 'catalog',
        Component: CatalogPage
      },
      {
        path: 'product/:id',
        Component: ProductDetailPage
      },
      {
        path: 'cart',
        Component: CartPage
      },
      {
        path: 'checkout',
        Component: CheckoutPage
      },
      {
        path: 'confirmation/:orderId',
        Component: ConfirmationPage
      },
      {
        path: 'orders',
        Component: OrdersPage
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
