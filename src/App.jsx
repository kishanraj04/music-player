import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../public/Components/Home';
import Player from '../public/Components/Player';
import Favorites from '../public/Components/Favorites';
import Feed from '../public/Components/feed';
import Liberary from '../public/Components/Liberary';
import Trending from '../public/Components/Trending';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [ // Use lowercase 'children'
        { path: 'player', element: <Player /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'feed', element: <Feed /> },
        { path: 'liberary', element: <Liberary /> },
        { path: 'trending', element: <Trending /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
