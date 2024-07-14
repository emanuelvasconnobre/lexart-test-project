import { Link } from "react-router-dom";

export type MenuItemProps = {
    title: string;
    link: string;
    active: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, link, active }) => {
    return (
        <div className={`w-full p-3 text-white border-b border-white ${active && "bg-secondary-light"}`}>
            <Link to={link}>{title}</Link>
        </div>
    );
};