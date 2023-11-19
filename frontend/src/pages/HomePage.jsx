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

  const getContainerStyle = windowWidth => {
    return windowWidth > 600 ? containerStyle : containerStyleSM;
  };

  return (
    <div className="container" style={getContainerStyle(windowWidth)}>
      <AvgCurrencyPrices />
      <SelectedCurrencyPrice />
    </div>
  );
}

const containerStyle = {
  width: '60%',
  maxWidth: '800px',
  margin: '0 auto',
};

const containerStyleSM = {
  width: '90%',
  margin: '0 auto',
};
