import { Navigate, Route, Routes } from "react-router-dom";
import { getRoutesWithoutRoles } from "./data/CommonRoutes";

export const PublicRoutes = () => {
  let routes = getRoutesWithoutRoles("public");

  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.key ?? route.path} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
