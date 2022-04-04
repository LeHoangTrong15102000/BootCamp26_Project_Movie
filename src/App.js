import { Routes, Route } from 'react-router-dom';

import { Global } from '@emotion/react';
import { lazy, Suspense } from 'react';
import GlobalStyles from './globalStyles';
// import HomePage from "./modules/Home/pages/HomePage";
// import MovieComming from "./modules/Movies/pages/MovieComming";
// import MovieShowing from "./modules/Movies/pages/MovieShowing";
// import MovieDetails from "./modules/Movies/pages/MovieDetails";
import NotFound from './components/NotFound';

const HomePage = lazy(() => import('./modules/Home/pages/HomePage'));
const MovieShowing = lazy(() => import('./modules/Movies/pages/MovieShowing'));
const MovieComming = lazy(() => import('./modules/Movies/pages/MovieComming'));
const MovieDetails = lazy(() => import('./modules/Movies/pages/MovieDetails'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading Route....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/Movies">
            <Route path="now-showing" element={<MovieShowing />} />
            <Route path="coming-soon" element={<MovieComming />} />
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Global styles={GlobalStyles} />
    </>
  );
}

export default App;
