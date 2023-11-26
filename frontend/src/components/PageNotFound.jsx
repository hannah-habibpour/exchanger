import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div style={style.container} className="container">
      <h1>Page Not found</h1>
      <Button
        onClick={() => navigate('/')}
        style={style.button.default}
        hoverStyle={style.button.hovered}
      >
        Back to home Page
      </Button>
    </div>
  );
}

const style = {
  container: { margin: 'auto', width: '50%', textAlign: 'center' },
  button: {
    default: { borderRadius: '12px', padding: '10px', cursor: 'pointer' },
    hovered: {
      borderRadius: '12px',
      padding: '10px',
      cursor: 'pointer',
      backgroundColor: '#4682B4',
      color: 'white',
      transition: '0.2s',
    },
  },
};
