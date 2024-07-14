import { PropsWithChildren, useCallback } from "react";
import { MenuItem } from "./MenuItem";
import { SubMenu } from "./SubMenu";
import { SideMenuData, sideMenuList } from './data/menu-data'
import { useLocation } from "react-router-dom";


export const SideMenu: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    console.log(location.pathname)

    const sideMenuHandler = useCallback((menu: SideMenuData) => {
        const isActive = location.pathname.includes(menu.link)
        if (menu.children && menu.children?.length > 0) {
            return <SubMenu title={menu.title} active={isActive} key={menu.link}>
                {menu.children.map(sideMenuHandler)}
            </SubMenu>
        } else {
            return <MenuItem title={menu.title} link={menu.link} key={menu.link} active={isActive} />
        }
    }, [location])


    return (
        <div className="h-full flex">
            <div className="w-64 bg-primary border-r border-white">
                {sideMenuList.map(sideMenuHandler)}
            </div>
            <div className="w-full h-full overflow-auto">
                {children}
            </div>
        </div>
    );
};