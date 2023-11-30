import useStyleContext from '../context/useStyleContext';

export default function ExchangeProfile({ profile }) {
  const { widthMode } = useStyleContext();
  return (
    <div style={style.profileContainer[widthMode]}>
      <div className="logoContainer" style={style.logoContainer[widthMode]}>
        <img
          src={profile.logo}
          alt="logo"
          className="logoImg"
          style={style.logoImg[widthMode]}
        />
      </div>
      <div>
        <h1 style={style.exchangeName[widthMode]}>{profile.name}</h1>
        <p>Address: {profile.address}</p>
        <p>Number: {profile.phone}</p>
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
}

const style = {
  profileContainer: {
    default: { display: 'flex', gap: '40px' },
    sm: { display: 'flex', flexDirection: 'column' },
  },
  exchangeName: {
    default: {},
    sm: { textAlign: 'center' },
  },
  logoContainer: {
    default: { textAlign: 'center' },
    sm: { textAlign: 'center' },
  },
  logoImg: {
    default: { maxWidth: '150px', marginTop: '20px' },
    sm: { maxWidth: '150px', marginTop: '20px' },
  },
};
