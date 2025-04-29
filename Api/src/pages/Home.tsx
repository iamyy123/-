import { useTrainerStore } from '../store/store';

const Home = () => {
  const { name, collectedPokemon } = useTrainerStore();

  return (
    <div className="space-y-6">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">训练师信息</h2>
          <p className="text-xl">欢迎回来，{name}！</p>
          <p>已收集的宝可梦: {collectedPokemon.length} 只</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">最近收集的宝可梦</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collectedPokemon.slice(-4).map((pokemon) => (
              <div key={pokemon.id} className="card bg-base-100 shadow-sm">
                <figure className="px-4 pt-4">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="rounded-xl w-24 h-24"
                  />
                </figure>
                <div className="card-body items-center text-center p-4">
                  <h3 className="card-title text-sm capitalize">{pokemon.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;