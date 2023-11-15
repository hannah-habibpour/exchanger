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

  useEffect(() => {
    fetch(`/exchanges/${exchangeName}/profile`)
      .then(res => res.json())
      .then(data => setExchangeProfile(data.data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [exchangeName]);

  return (
    <div>
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
