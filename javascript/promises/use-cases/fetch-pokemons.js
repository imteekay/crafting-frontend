const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonsUrls = [
  `${baseUrl}pikachu`,
  `${baseUrl}mew`,
  `${baseUrl}charmander`,
];

const getPokemon = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => ({ id: pokemon.order, name: pokemon.name }));

const fetchPokemons = pokemonsUrls.map(getPokemon);

Promise.all(fetchPokemons).then((pokemons) => {
  console.log('pokemons', pokemons);
});
