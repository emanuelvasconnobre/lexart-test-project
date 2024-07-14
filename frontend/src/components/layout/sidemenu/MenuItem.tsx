import { Link } from "react-router-dom";

export type MenuItemProps = {
    title: string;
    link: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, link }) => {
    return (
        <div className="w-full p-3 text-white border border-b-1 border-white-light">
            <Link  to={link}>{title}</Link>
        </div>
    );
};