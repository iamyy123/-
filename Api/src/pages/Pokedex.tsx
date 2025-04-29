import { useEffect, useState } from 'react';
import { Pokemon, getPokemonList, getPokemon } from '../services/api';
import { useTrainerStore } from '../store/store';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const { collectedPokemon, addPokemon, removePokemon } = useTrainerStore();


  const fetchPokemon = async () => {
    try {
      const data = await getPokemonList(12);
      const detailedPokemon = await Promise.all(
        data.results.map((p: { name: string; url: string }) =>
          getPokemon(Number(p.url.split('/').slice(-2, -1)[0]))
        )
      );
      setPokemonList(detailedPokemon);
    } catch (error) {
      console.error('Failed to fetch pokemon:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPokemon();
  }, []);

  const isPokemonCollected = (pokemonId: number) =>
    collectedPokemon.some((p) => p.id === pokemonId);

  const handleCollectToggle = (pokemon: Pokemon) => {
    if (isPokemonCollected(pokemon.id)) {
      removePokemon(pokemon.id);
    } else {
      addPokemon(pokemon);
    }
  };

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">宝可梦图鉴</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="card bg-base-200 shadow-xl">
            <figure className="px-4 pt-4">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize">{pokemon.name}</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="badge badge-primary"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="card-actions justify-end">
                <button
                  className={`btn ${isPokemonCollected(pokemon.id) ? 'btn-error' : 'btn-primary'}`}
                  onClick={() => handleCollectToggle(pokemon)}
                >
                  {isPokemonCollected(pokemon.id) ? '放生' : '收服'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;