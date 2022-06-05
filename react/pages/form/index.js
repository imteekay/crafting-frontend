import { useState } from 'react';

const countriesToVisit = [
  {
    name: 'Japan',
    value: 'japan',
  },
  {
    name: 'Canada',
    value: 'canada',
  },
  {
    name: 'Korea',
    value: 'korea',
  },
  {
    name: 'Netherlands',
    value: 'netherlands',
  },
];

export const Home = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log('heey', name, phone, country);
  };

  const handleName = (e) => setName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  return (
    <>
      <h1>Welcome to the form playground!</h1>

      <form onSubmit={onSubmitForm}>
        <label>
          name
          <input value={name} onChange={handleName} required />
        </label>

        <label>
          phone
          <input type="tel" value={phone} onChange={handlePhone} />
        </label>

        <label>
          country to visit
          <select value={country} onChange={handleCountry}>
            {countriesToVisit.map(({ name, value }, index) => (
              <option value={value} key={`${name}-${value}-${index}`}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>

      <p>name: {name}</p>
      <p>phone: {phone}</p>
      <p>country: {country}</p>
    </>
  );
};

export default Home;
