import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";

const RouterErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};
export default RouterErrorBoundary;
