import { Routes, Route, Navigate } from "react-router-dom";

import { Global } from "@emotion/react";
import { lazy, Suspense } from "react";
import GlobalStyles from "./globalStyles";
// import HomePage from "./modules/Home/pages/HomePage";
// import MovieComming from "./modules/Movies/pages/MovieComming";
// import MovieShowing from "./modules/Movies/pages/MovieShowing";
// import MovieDetails from "./modules/Movies/pages/MovieDetails";
import NotFound from "./components/NotFound";
import ErrorBoundary from "components/ErrorBoundary";

const HomePage = lazy(() => import("./modules/Home/pages/HomePage")); // Mới đầu vào chạy homePage thì chỉ có mỗi file js của homepage là chạy thôi
const LoginPage = lazy(() => import("./modules/Auth/pages/Login"));// Các cái page thì thường sẽ sử dụng kĩ thuật lazy load để tối ưu tốc độ tải trang
const RegisterPage = lazy(() => import("./modules/Auth/pages/Register"))
const MovieShowing = lazy(() => import("./modules/Movies/pages/MovieShowing"));
const MovieComming = lazy(() => import("./modules/Movies/pages/MovieComming"));
const MovieDetails = lazy(() => import("./modules/Movies/pages/MovieDetails"));
const DemoUseCallback = lazy(() => import("./_playground/Hook/DemoUseCallback"))
const DemoUseMemos = lazy(() => import("./_playground/Hook/DemoUseMemo"))
const DemoUseReducer = lazy(() => import("./_playground/Hook/DemoUseReducer"))

function App() {
  return (
    // ErrorBoundary mình sẽ bộc nó ngoài cùng luôn
    <ErrorBoundary>
      {/* fallback UI này sẽ thay thế cho cái màn hình trắng tinh mà cái UI đang được load */}
      <Suspense fallback={<div>Loading Route....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 

          <Route path="/movies">
            <Route path="now-showing" element={<MovieShowing />} />
            <Route path="coming-soon" element={<MovieComming />} />
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />

          <Route path="/use-callback" element={<DemoUseCallback />}/>
          <Route path="/use-memo" element={<DemoUseMemos />}/>
          <Route path="/use-reducer" element={<DemoUseReducer />}/>
        </Routes>
      </Suspense>

      <Global styles={GlobalStyles} />
      {/* // cả cục này là children của nó */}
    </ErrorBoundary>
  );
}

export default App;
