import React, { createContext, useState, useEffect } from 'react';

export const StyleContext = createContext(null);

export default function StyleContextProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);

  const widthMode = windowWidth > 600 ? 'default' : 'sm';

  return (
    <StyleContext.Provider
      value={{
        widthMode,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
}
