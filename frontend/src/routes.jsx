import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExchangeProfilePage from './pages/ExchangeProfilePage';
import App from './App';
import PageNotFound from './components/PageNotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default Router;
