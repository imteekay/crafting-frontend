import { useEffect, useState } from 'react';

export const Home = () => {
  const [pokemon, setPokemon] = useState({ abilities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        setHasError(true);
      }

      setIsLoading(false);
    };

    fetchPokemon();
  }, []);

  if (isLoading) return <p>loading...</p>;
  if (hasError) return <p>error</p>;

  return (
    <>
      <h1>Welcome to the `fetch`!</h1>
      <p>name: {pokemon.name}</p>
      <p>id: {pokemon.id}</p>
      <p>ability:</p>
      <ul>
        {pokemon.abilities.map(({ ability }, id) => (
          <li key={id}>{ability.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
