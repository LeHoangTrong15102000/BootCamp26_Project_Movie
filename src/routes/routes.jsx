import { lazy } from "react";

// tạo ra một cái array để quản lí các cái routes của dự án
// const lazzy = dir => lazy(() => import(dir))
import NotFound from "components/NotFound";
import UserProtect from "./UserProtect";
import AdminProtect from "./AdminProtect";
import AdminLayout from "components/AdminLayout";

import movie from "_playground/ReduxToolkit/slices/movie";
const HomePage = lazy(() => import("modules/Home/pages/HomePage")); // Mới đầu vào chạy homePage thì chỉ có mỗi file js của homepage là chạy thôi
const LoginPage = lazy(() => import("modules/Auth/pages/Login")); // Các cái page thì thường sẽ sử dụng kĩ thuật lazy load để tối ưu tốc độ tải trang
const RegisterPage = lazy(() => import("modules/Auth/pages/Register"));
const MovieShowing = lazy(() => import("modules/Movies/pages/MovieShowing"));
const MovieComming = lazy(() => import("modules/Movies/pages/MovieComming"));
const MovieDetails = lazy(() => import("modules/Movies/pages/MovieDetails"));
const CheckoutPage = lazy(() => import("modules/Checkout/pages/Booking"));
const DemoUseCallback = lazy(() => import("_playground/Hook/DemoUseCallback"));
const DemoUseMemos = lazy(() => import("_playground/Hook/DemoUseMemo"));
const DemoUseReducer = lazy(() => import("_playground/Hook/DemoUseReducer"));

// Admin Managemnet
const MovieList = lazy(() => import("modules/MovieManagement/pages/MovieList"));
const AddMovie = lazy(() => import("modules/MovieManagement/pages/AddMovie"));
const UpdateMovie = lazy(() =>
  import("modules/MovieManagement/pages/UpdateMovie")
);
const UserList = lazy(() => import("modules/MovieManagement/pages/UserList"));
const AddUser = lazy(() => import("modules/MovieManagement/pages/AddUser"));
const UpdateUser = lazy(() =>
  import("modules/MovieManagement/pages/UpdateUser")
);

const routes = [
  // User route
  {
    path: "/",
    // nó bắt cái type của element phải là JSX nên import trực tiếp vào thì nó không cho
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "booking/:ticketId",
    element: (
      <UserProtect>
        {/* children */}
        <CheckoutPage />
      </UserProtect>
    ),
  },
  {
    path: "/movies",
    children: [
      {
        path: "now-showing",
        element: <MovieShowing />,
      },
      {
        path: "coming-soon",
        element: <MovieComming />,
      },
      {
        path: ":movieId",
        element: <MovieDetails />,
      },
    ],
  },

  // Admin routes
  {
    path: "/admin",
    element: <AdminLayout />, // Layout
    children: [
      // Movies
      {
        path: "movies",
        element: (
          <AdminProtect>
            <MovieList />
          </AdminProtect>
        ),
      },
      {
        path: "movies/add",
        element: (
          <AdminProtect>
            <AddMovie />
          </AdminProtect>
        ),
      },
      {
        path: "movies/update/:movieId",
        element: (
          <AdminProtect>
            <UpdateMovie />
          </AdminProtect>
        ),
      },

      // Users  
      {
        path: "users",
        element: (
          <AdminProtect>
            <UserList />
          </AdminProtect>
        ),
      },
      { 
        path: "users/add",
        element: (
          <AdminProtect>
            <AddUser />
          </AdminProtect>
        ),
      },
      {
        path: "users/update/:userId",
        element: (
          <AdminProtect>
            <UpdateUser />
          </AdminProtect>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
