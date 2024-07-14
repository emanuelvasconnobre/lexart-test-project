import { useState } from "react";
import chevronIcon from '../../../assets/chevron.svg'

export type SubMenuProps = {
    title: string;
    children: React.ReactNode;
}

export const SubMenu: React.FC<SubMenuProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full text-white border border-b-1 border-white-light">
            <div className={"flex items-center p-3"} onClick={toggle}>
                <div className="w-full">
                    {title}
                </div>
                <img className={`w-4 h-auto ${isOpen && "transform scale-y-[-1]"}`} src={chevronIcon} alt="" width={64} height={64} />
            </div>
            {isOpen && <div className="bg-primary-dark">{children}</div>}
        </div>
    );
};
