import { Outlet } from 'react-router-dom';
import StyleContextProvider from './context/StyleContext';

export default function App() {
  return (
    <StyleContextProvider>
      <Outlet />
    </StyleContextProvider>
  );
}
