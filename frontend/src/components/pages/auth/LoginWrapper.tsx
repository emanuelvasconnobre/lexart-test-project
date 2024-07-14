import { useNavigate } from "react-router-dom"
import { useToast } from "../../../hooks/use-toast"
import { AuthService } from "../../../services"
import { useDispatch } from "react-redux"
import { login } from "../../../store/slices"
import { useEffect } from "react"

const authService = new AuthService()

export const LoginWrapper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkAccessHandler = async () => {
        const { message, level, ...response } = await authService.login({
            email: "test@test.com",
            password: "test"
        })

        if (response.success && response.data) {
            dispatch(login({
                id: response.data.id,
                email: response.data.email,
                name: response.data.name,
                username: response.data.username,
            }))
            navigate("/wellcome")
        }
    }

    const loginHandler = async () => {
        const { message, level, ...response } = await authService.login({
            email: "test@test.com",
            password: "test"
        })

        useToast(message, {
            level
        })

        if (response.success && response.data) {
            dispatch(login({
                id: response.data.id,
                email: response.data.email,
                name: response.data.name,
                username: response.data.username,
            }))
            navigate("/wellcome")
        }
    }

    useEffect(() => {
        checkAccessHandler()
    }, [])

    return <>
        Login Page Content
        <button onClick={loginHandler}>Login</button>
    </>
}