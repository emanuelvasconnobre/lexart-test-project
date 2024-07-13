import { Route, Routes, Navigate } from "react-router-dom";
import { getRoutesWithoutRoles } from "./data/CommonRoutes";

export const PrivateRoutes = () => {
  let routes = getRoutesWithoutRoles();

  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.key ?? route.path} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};