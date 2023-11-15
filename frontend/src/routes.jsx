import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExchangeProfilePage from './pages/ExchangeProfilePage';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/profile/:exchangeName',
    element: <ExchangeProfilePage />,
  },
]);

export default Router;
