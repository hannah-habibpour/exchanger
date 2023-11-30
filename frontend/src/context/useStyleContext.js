import { useContext } from 'react';
import { StyleContext } from './StyleContext';
export default function useStyleContext() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error(
      'useStyleContext must be used within a StyleContextProvider'
    );
  }
  return context;
}
