import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExchangeProfile from '../components/ExchangeProfile';
import AllCurrencyPrices from '../components/AllCurrencyPrices';
import ExchangeNotFound from '../components/ExchangeNotFound';
import LoadingPage from '../components/ui/LoadingPage';

export default function ExchangeProfilePage() {
  const { exchangeName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeProfile, setExchangeProfile] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch(`/exchanges/${exchangeName}/profile`)
      .then(res => res.json())
      .then(data => setExchangeProfile(data.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [exchangeName]);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);

  return (
    <div style={style.container[widthMode(windowWidth)]}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {exchangeProfile ? (
            <div>
              <ExchangeProfile profile={exchangeProfile} />
              <AllCurrencyPrices exchangeName={exchangeProfile.name} />
            </div>
          ) : (
            <ExchangeNotFound />
          )}
        </div>
      )}
    </div>
  );
}

const widthMode = windowWidth => {
  return windowWidth > 600 ? 'default' : 'sm';
};

const style = {
  container: {
    default: { width: '60%', maxWidth: '800px', margin: '0 auto' },
    sm: { width: '90%', margin: '0 auto' },
  },
};
