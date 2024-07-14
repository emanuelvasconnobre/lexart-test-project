import { Controller, useForm } from "react-hook-form";
import { AuthService, RegisterDto } from "../../../services"
import SubmitButton from "./SubmitButton";
import TextFormControl from "../../toolkit/forms/TextFormControl";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/use-toast";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type RegisterForm = RegisterDto

const authService = new AuthService()

const schema = object().shape({
    name: string().required('Name is required'),
    username: string().required('Username is required'),
    email: string().email('Invalid email address').required('Email is required'),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters')
});

export const RegisterWrapper = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate()

    const onSubmit = async (data: RegisterForm) => {
        const { level, message, ...response } = await authService.register(data)
        useToast(message, { level })

        if (response.success) {
            navigate("/login")
        }
    };

    return <div className="w-full flex justify-center items-center text-white">
        <div className="w-96 bg-primary rounded-xl p-4 mt-16">
            <p className="font-semibold text-lg">Register Form</p>
            <hr className="my-4" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextFormControl {...field} type="text" errorMessage={errors.name?.message} placeholder="Name" label="Name" />
                    )}
                />

                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextFormControl {...field} type="text" errorMessage={errors.username?.message} placeholder="Username" label="Username" />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextFormControl {...field} type="text" errorMessage={errors.email?.message} placeholder="Email" label="Email" />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextFormControl {...field} type="text" errorMessage={errors.password?.message} placeholder="Password" label="Password" />
                    )}
                />

                <SubmitButton className="float-end mt-12" label="Sign up" />
            </form>
        </div>

    </div>
}