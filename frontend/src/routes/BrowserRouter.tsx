import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const AppBrowserRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated &&
          <Route
            path="/app/*"
            element={<PrivateRoutes />}
          />}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
