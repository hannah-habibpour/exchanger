import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          website,
          phone,
          email,
          address,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
        alert('Register successful');
      } else {
        throw new Error(data.data || 'Error');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        placeholder="http://www.example.com"
      />
      <input
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="+11111111111"
      />
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
