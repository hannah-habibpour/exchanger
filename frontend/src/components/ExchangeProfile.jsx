export default function ExchangeProfile({ profile }) {
  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <img
        src={profile.logo}
        alt="logo"
        style={{ maxWidth: '150px', height: '100%' }}
      />
      <div style={{}}>
        <h1>{profile.name}</h1>
        <p>Address: {profile.address}</p>
        <p>Number: {profile.phone}</p>
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
}

const divStyle = {
  display: 'flex',
  gap: '40px',
};

const divStyleSM = {
  display: 'flex',
  flexDirection: 'column',
};
