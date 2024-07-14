import { Controller, useForm } from "react-hook-form";
import TextFormControl from "../../toolkit/forms/TextFormControl";
import TextareaFormControl from "../../toolkit/forms/TextareaFormControl";
import SubmitButton from "../auth/SubmitButton";
import { useToast } from "../../../hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { number, object, string } from "yup";
import { CreateProductDto, ProductService } from "../../../services/product";

type FormType = CreateProductDto;

const service = new ProductService();

const schema = object().shape({
    name: string().required('Name is required'),
    model: string().required('Model is required'),
    brand: string().required('Brand is required'),
    description: string().required('Description is required'),
    price: number().required('Number is required'),
});

export const AddProductWrapper = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormType) => {
        const { message, level, ...response } = await service.create(data);

        useToast(message, {
            level
        });

        if (response.success && response.data) {
            navigate("/product");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/4 p-4">
                <p className="text-xl font-bold text-secondary-light mb-3">
                    Add Product
                </p>
                <hr className="my-3" />

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-4">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextFormControl {...field} className="text-black text-sm" type="text" errorMessage={errors.name?.message} placeholder="Name" label="Name" />
                        )}
                    />

                    <Controller
                        name="model"
                        control={control}
                        render={({ field }) => (
                            <TextFormControl {...field} className="text-black text-sm" type="text" errorMessage={errors.model?.message} placeholder="Model" label="Model" />
                        )}
                    />

                    <Controller
                        name="brand"
                        control={control}
                        render={({ field }) => (
                            <TextFormControl {...field} className="text-black text-sm" type="text" errorMessage={errors.brand?.message} placeholder="Brand" label="Brand" />
                        )}
                    />

                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <TextFormControl {...field} className="text-black text-sm" type="money" errorMessage={errors.price?.message} placeholder="Price" label="Price" />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextareaFormControl {...field} className="col-span-2 text-black text-sm" inputClassName="h-24" errorMessage={errors.description?.message} countCols={4} placeholder="Description" label="Description" />
                        )}
                    />

                    <SubmitButton className="mt-12 col-span-2 w-min whitespace-nowrap" label="Save" />
                </form>
            </div>
        </div>
    );
};
