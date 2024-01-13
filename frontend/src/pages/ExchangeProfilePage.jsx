import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExchangeProfile from '../components/ExchangeProfile';
import AllCurrencyPrices from '../components/AllCurrencyPrices';
import ExchangeNotFound from '../components/ExchangeNotFound';
import LoadingPage from '../components/ui/LoadingPage';
import useStyleContext from '../context/useStyleContext';

export default function ExchangeProfilePage() {
  const { exchangeName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeProfile, setExchangeProfile] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const { widthMode } = useStyleContext();

  useEffect(() => {
    fetch(`/exchanges/${exchangeName}/profile`)
      .then(res => res.json())
      .then(data => {
        setExchangeProfile(data.data.exchange);
        setIsAdmin(data.data.isAdmin);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [exchangeName]);

  return (
    <div style={style.container[widthMode]}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {exchangeProfile ? (
            <div>
              <ExchangeProfile profile={exchangeProfile} isAdmin={isAdmin} />
              <AllCurrencyPrices
                exchangeName={exchangeProfile.name}
                isAdmin={isAdmin}
              />
            </div>
          ) : (
            <ExchangeNotFound />
          )}
        </div>
      )}
    </div>
  );
}

const style = {
  container: {
    default: { width: '60%', maxWidth: '800px', margin: '0 auto' },
    sm: { width: '90%', margin: '0 auto' },
  },
};
