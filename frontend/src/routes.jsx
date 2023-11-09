import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ExchangeProfile from './pages/ExchangeProfile';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <ExchangeProfile />,
  },
]);

export default Router;
