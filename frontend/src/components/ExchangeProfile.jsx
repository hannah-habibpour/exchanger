import { useEffect, useState } from 'react';

export default function ExchangeProfile({ profile }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);

  return (
    <div style={style.profileContainer[widthMode(windowWidth)]}>
      <div
        className="logoContainer"
        style={style.logoContainer[widthMode(windowWidth)]}
      >
        <img
          src={profile.logo}
          alt="logo"
          className="logoImg"
          style={style.logoImg[widthMode(windowWidth)]}
        />
      </div>
      <div>
        <h1 style={style.exchangeName[widthMode(windowWidth)]}>
          {profile.name}
        </h1>
        <p>Address: {profile.address}</p>
        <p>Number: {profile.phone}</p>
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
}

const widthMode = windowWidth => {
  return windowWidth > 600 ? 'default' : 'sm';
};

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
