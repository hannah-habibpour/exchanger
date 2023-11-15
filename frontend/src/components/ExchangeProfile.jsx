export default function ExchangeProfile({ profile }) {
  return (
    <div>
      <div>
        <p>{profile.name}</p>
        <img src="" alt="" />
      </div>
      <div>
        <p>Address: {profile.address}</p>
        <p>Number: {profile.phone}</p>
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
}
