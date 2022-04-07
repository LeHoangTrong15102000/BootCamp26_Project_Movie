import { Routes, Route } from 'react-router-dom';

import { Global } from '@emotion/react';
import { lazy, Suspense } from 'react';
import GlobalStyles from './globalStyles';
// import HomePage from "./modules/Home/pages/HomePage";
// import MovieComming from "./modules/Movies/pages/MovieComming";
// import MovieShowing from "./modules/Movies/pages/MovieShowing";
// import MovieDetails from "./modules/Movies/pages/MovieDetails";
import NotFound from './components/NotFound';
import ErrorBoundary from 'components/ErrorBoundary';

const HomePage = lazy(() => import('./modules/Home/pages/HomePage'));// Mới đầu vào chạy homePage thì chỉ có mỗi file js của homepage là chạy thôi
const MovieShowing = lazy(() => import('./modules/Movies/pages/MovieShowing'));
const MovieComming = lazy(() => import('./modules/Movies/pages/MovieComming'));
const MovieDetails = lazy(() => import('./modules/Movies/pages/MovieDetails'));

function App() {
  return (
    // ErrorBoundary mình sẽ bộc nó ngoài cùng luôn
    <ErrorBoundary>
      {/* fallback UI này sẽ thay thế cho cái màn hình trắng tinh mà cái UI đang được load */}
      <Suspense fallback={<div>Loading Route....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies">
            <Route path="now-showing" element={<MovieShowing />} />
            <Route path="coming-soon" element={<MovieComming />} />
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Global styles={GlobalStyles} />
    </ErrorBoundary>
  );
}

export default App;
