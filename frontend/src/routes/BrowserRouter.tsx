import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { RoutesList } from "./data/CommonRoutes";

export const AppBrowserRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log(isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated &&
          RoutesList["private"].routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.key ?? route.path} />
          ))}
        {RoutesList["public"].routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.key ?? route.path} />
        ))}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
