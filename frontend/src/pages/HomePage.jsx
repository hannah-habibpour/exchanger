import AvgCurrencyPrices from '../components/AvgCurrencyPrices';
import SelectedCurrencyPrice from '../components/SelectedCurrencyPrice';
import useStyleContext from '../context/useStyleContext';
export default function HomePage() {
  const { widthMode } = useStyleContext();

  return (
    <div className="container" style={style.container[widthMode]}>
      <div className="logoContainer" style={style.logoContainer[widthMode]}>
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: '100px', height: '100%' }}
        />
        <h1 data-testid="mainpage-title">Xchanger</h1>
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
