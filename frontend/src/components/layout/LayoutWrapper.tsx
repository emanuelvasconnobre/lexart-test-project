import { FC, PropsWithChildren } from "react"
import { Header } from "./Header"

export const GlobalLayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <>
        <Header />
        {children}
    </>
}