import { Routes, Route } from "react-router-dom";

import HomePage from "./modules/Home/pages/HomePage";
import { Global } from "@emotion/react";
import GlobalStyles from "./globalStyles";
import MovieComming from "./modules/Movies/pages/MovieComming";
import MovieShowing from "./modules/Movies/pages/MovieShowing";
import MovieDetails from "./modules/Movies/pages/MovieDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Movies">
          <Route path="now-showing" element={<MovieShowing />} />
          <Route path="coming-soon" element={<MovieComming />} />
          <Route path=":movieId" element={<MovieDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Global styles={GlobalStyles} />
    </>
  );
}

export default App;
