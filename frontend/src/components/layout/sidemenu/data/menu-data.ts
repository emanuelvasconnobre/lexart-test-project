export type SideMenuData = {
  link: string;
  title: string;
  children?: SideMenuData[];
};

export const sideMenuList = [
  {
    key: "home",
    link: "/wellcome",
    title: "Home",
  },
  {
    key: "products",
    link: "/product",
    title: "Products",
    children: [
      {
        key: "list-products",
        link: "/product",
        title: "List products",
      },
      {
        key: "add-products",
        link: "/product/add",
        title: "Add product",
      },
    ],
  },
  {
    key: "logging",
    link: "/logging",
    title: "Logging",
  },
];
