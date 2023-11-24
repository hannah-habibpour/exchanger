import { useState, useEffect } from 'react';
import AvgCurrencyPrices from '../components/AvgCurrencyPrices';
import SelectedCurrencyPrice from '../components/SelectedCurrencyPrice';
export default function HomePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);

  const widthMode = windowWidth => {
    return windowWidth > 600 ? 'default' : 'sm';
  };

  return (
    <div className="container" style={style.container[widthMode(windowWidth)]}>
      <div
        className="logoContainer"
        style={style.logoContainer[widthMode(windowWidth)]}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: '100px', height: '100%' }}
        />
        <h1>Xchanger</h1>
      </div>
      <AvgCurrencyPrices />
      <SelectedCurrencyPrice />
    </div>
  );
}

const style = {
  container: {
    default: { width: '60%', maxWidth: '800px', margin: '0 auto' },
    sm: { width: '90%', margin: '0 auto' },
  },
  logoContainer: {
    default: { textAlign: 'center' },
    sm: { textAlign: 'center' },
  },
};
