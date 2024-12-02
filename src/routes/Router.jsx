import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PlaybacksPage from "../pages/PlaybacksPage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ErrorPage from "../pages/ErrorPage";
import RouterErrorBoundary from "./RouterErrorBoundary";
import VerifyEmail from "../components/SignUp/VeryfyEmail";
import ProfilePage from '../pages/ProfilePage';
import LoginSuccess from "../components/loginsuccess";

const routes = [
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/playbacks",
    element: <PlaybacksPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail/>,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: '/Profile',
    element: <ProfilePage />,
  },
  {
    path: '/login-success',
    element: <LoginSuccess />,
  },
];

const router = createBrowserRouter([
  {
    element: <RouterErrorBoundary />,
    children: routes,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
