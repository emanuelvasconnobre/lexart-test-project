export type SideMenuData = {
  link: string;
  title: string;
  children?: SideMenuData[];
};

export const sideMenuList = [
  {
    link: "/wellcome",
    title: "Home",
  },
  {
    link: "/product",
    title: "Products",
    children: [
      {
        link: "/product",
        title: "List products",
      },
      {
        link: "/product/add",
        title: "Add product",
      },
    ],
  },
  {
    link: "/logging",
    title: "Logging",
  },
];
