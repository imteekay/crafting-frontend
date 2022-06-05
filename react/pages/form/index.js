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

  const [counter, setCounter] = useState(0);

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log('submit all data', name, phone, country);
  };

  const handleName = (e) => setName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const handleKeyDown = (e) => console.log(e.key);

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => setCounter(counter - 1);

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

      <input onKeyDown={handleKeyDown}></input>

      <div>
        {counter}
        <button onClick={incrementCounter}>+</button>
        <button onClick={decrementCounter}>-</button>
      </div>
    </>
  );
};

export default Home;
