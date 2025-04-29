
import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <header className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">宝可梦训练日记</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">主页</Link></li>
            <li><Link to="/pokedex">图鉴</Link></li>
            <li><Link to="/diary">日记</Link></li>
          </ul>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

