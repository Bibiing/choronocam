import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PlaybacksPage from "../pages/PlaybacksPage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ErrorPage from "../pages/ErrorPage";
import RouterErrorBoundary from "./RouterErrorBoundary";

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
    path: "*",
    element: <ErrorPage />,
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