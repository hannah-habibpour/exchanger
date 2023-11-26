import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExchangeProfilePage from './pages/ExchangeProfilePage';
import App from './App';
import PageNotFound from './components/PageNotFound';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'profile/:exchangeName',
        element: <ExchangeProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default Router;
