import { ReactNode } from "react";
import { HomePage, ListProductsPage, LoggingPage, LoginPage, RegisterPage } from "../../pages";
import { WellcomePage } from "../../pages/WellcomePage";

export type Route = {
  key?: string;
  path: string;
  element: ReactNode;
};

export const RoutesList: {
  public: {
    initialPath: string;
    routes: Route[];
  };
  private: {
    initialPath: string;
    routes: Route[];
  };
} = {
  public: {
    initialPath: "/login",
    routes: [
      {
        key: "home", // key of list
        element: <HomePage />,
        path: "/",
      },
      {
        key: "login", // key of list
        path: "/login",
        element: <LoginPage />,
      },
      {
        key: "register", // key of list
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  private: {
    initialPath: "/wellcome",
    routes: [
      {
        key: "wellcome", // key of list
        element: <WellcomePage />,
        path: "/wellcome",
      },
      {
        key: "list-products",
        element: <ListProductsPage />,
        path: "/folder",
      },
      {
        key: "logging",
        element: <LoggingPage />,
        path: "/logging",
      },
    ],
  },
};

export const getRoutesWithoutRoles = (type: "private" | "public" = "private") =>
  RoutesList[type].routes;

export const getAllRoutes = () => [
  ...RoutesList.private.routes,
  ...RoutesList.public.routes,
];

export const getRouteByPath = (
  path: string,
  type: "private" | "public" = "private"
) => {
  const routeFinded = getAllRoutes().find((item) => item.path === path);

  return (
    routeFinded ??
    getAllRoutes().find((item) => item.path === RoutesList[type].initialPath)!!
  );
};
