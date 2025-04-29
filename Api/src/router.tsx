import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import TrainingDiary from './pages/TrainingDiary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pokedex',
        element: <Pokedex />,
      },
      {
        path: '/diary',
        element: <TrainingDiary />,
      },
    ],
  },
]);