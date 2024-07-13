import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppBrowserRouter = () => {
  const user = {
    username: "dump",
    email: "teste"
  }

  return (
    <BrowserRouter>
      <Routes>
        {user &&
          <Route
            path="/app/*"
            element={<PrivateRoutes />}
          />}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
