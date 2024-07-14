import { PropsWithChildren } from "react";
import { MenuItem } from "./MenuItem";
import { SubMenu } from "./SubMenu";
import { SideMenuData, sideMenuList } from './data/menu-data'

const sideMenuHandler = (menu: SideMenuData) => {
    if (menu.children && menu.children?.length > 0) {
        return <SubMenu title={menu.title}>
            {menu.children.map(sideMenuHandler)}
        </SubMenu>
    } else {
        return <MenuItem title={menu.title} link={menu.link!} />
    }
}

export const SideMenu: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="h-full flex">
            <div className="w-64 bg-primary border-r-2 border-white">
                {sideMenuList.map(sideMenuHandler)}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};