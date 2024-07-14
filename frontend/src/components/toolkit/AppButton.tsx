import { ButtonHTMLAttributes, ReactNode } from "react";

type VariantOptions = {
    primary: string;
    secondary: string;
    borded: string;
};

type Props = ButtonHTMLAttributes<HTMLElement> & {
    children: ReactNode | string;
    className?: string;
    variant?: keyof VariantOptions;
};

export function AppButton({ variant = "secondary", className = "", children, ...props }: Props) {
    const primaryClassName =
        "text-white border border-primary-light active:border-white bg-secondary px-3 py-2 hover:bg-secondary-light active:bg-secondary-dark";
    const secondaryClassName =
        "text-white border border-primary-light active:border-white bg-secondary px-3 py-2 hover:bg-secondary-light active:bg-secondary-dark";
    const bordedClassName =
        "text-primary hover:text-white active:text-white border border-primary active:bg-primary px-3 py-2 hover:bg-secondary-light active:bg-secondary-dark";

    const variantOptions: VariantOptions = {
        primary: primaryClassName,
        secondary: secondaryClassName,
        borded: bordedClassName,
    };

    return (
        <button
            className={`${variantOptions[variant]} rounded-lg ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
