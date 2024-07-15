import { Link, useNavigate } from "react-router-dom";
import { ProductModel } from "../../../services/protocols/model";
import { AppButton } from "../../toolkit/AppButton";
import DataTable from "../../toolkit/datatable/DataTable";
import { format } from "date-fns";
import { formatToMoney } from "../../../utils/formatToMoney";
import { useEffect, useState } from "react";
import { ProductService } from "../../../services/product";
import Paginator from "../../toolkit/datatable/pagination/Paginator";
import RowsCounterPaginator from "../../toolkit/datatable/pagination/RowsCounterPaginator";
import { useToast } from "../../../hooks/use-toast";
import { ProgressBar } from "../../toolkit/ProgressBar";
import { Api } from "../../../services/api";
import { EventSourceService } from "../../../utils/EventSourceService";
import { ToastLevel } from "../../../utils/typing/toast-level";

const transformDataCallback = (data: ProductModel) => {
    return {
        ...data,
        price: formatToMoney(data.price),
        createdAt: format(data.createdAt, 'dd/MM/yyyy'),
        updatedAt: format(data.updatedAt, 'dd/MM/yyyy'),
    }
}

const productService = new ProductService()

export const ListProductsWrapper = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState<ProductModel[]>([])
    const [page, setPage] = useState(1)
    const [countPerPage, setCountPerPage] = useState(5)
    const [countPage, setCountPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState<number>(100);

    const deleteAllProducts = async () => {
        const eventSourceService = new EventSourceService(
            `${Api.defaults.baseURL}/destroy`
        );
        setProgress(0)

        const handler = (event: MessageEvent) => {
            const body = JSON.parse(event.data) as {
                message: string
                progress: number
            }

            setProgress(body.progress)
            if (body.progress === 100) {
                useToast(body.message, { level: ToastLevel.SUCCESS })
            }
        }

        const onErrorHandler = (_: Event) => {
            setProgress(100)
        }

        eventSourceService.connect(handler, onErrorHandler, () => { setProgress(100) });
    }

    const uploadTestProductsHandler = async () => {
        const eventSourceService = new EventSourceService(
            `${Api.defaults.baseURL}/upstream`
        );
        setProgress(0)

        const handler = (event: MessageEvent) => {
            const body = JSON.parse(event.data) as {
                message: string
                progress: number
            }

            setProgress(body.progress)
            if (body.progress === 100) {
                useToast(body.message, { level: ToastLevel.SUCCESS })
            }
        }

        const onErrorHandler = (_: Event) => {
            setProgress(100)
        }

        eventSourceService.connect(handler, onErrorHandler);
    }

    const deleteHandler = async (id: string) => {
        const { success, message, level } = await productService.delete(id)
        useToast(message, { level })

        if (success) {
            if (products.length > 1) {
                setProducts(products => products.filter((product) => product.id !== id))
            } else {
                setPage((page) => page - 1)
            }
        }
    }

    const fetchData = async () => {
        const { success, ...response } = await productService.getMany({
            page,
            countPerPage
        })
        setIsLoading(false)

        if (success && response.data) {
            setProducts(response.data.items)
            setCountPage(response.data.countPage)
        } else {
            useToast(response.message, { level: response.level })
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, countPerPage])

    return <>
        {progress < 100 && <ProgressBar progress={progress} />}
        <div className="px-5 py-6">
            <div className="py-3 flex gap-4">
                <Link to={"/product/add"}>
                    <AppButton>
                        Adicionar
                    </AppButton>
                </Link>
                <AppButton onClick={uploadTestProductsHandler}>
                    Add Test Product
                </AppButton>
                <AppButton onClick={deleteAllProducts}>
                    Delete All Products
                </AppButton>
            </div>
            <DataTable<ProductModel>
                columns={[
                    {
                        keyName: "id",
                        node: <>ID</>,
                    },
                    {
                        keyName: "name",
                        node: <>Name</>,
                    },
                    {
                        keyName: "price",
                        node: <>Price</>,
                    },
                    {
                        keyName: "brand",
                        node: <>Brand</>,
                    },
                    {
                        keyName: "model",
                        node: <>Model</>,
                    },
                    {
                        keyName: "description",
                        node: <>Description</>,
                        cell: {
                            formatter: (data) => <p className="line-clamp-3">{data}</p>,
                            className: "w-80",
                        },
                    },
                    {
                        keyName: "createdAt",
                        node: <>Created at</>,
                    },
                    {
                        keyName: "updatedAt",
                        node: <>Updated at</>,
                    },
                ]}
                data={products}
                dataTransform={transformDataCallback}
                actions={[
                    {
                        func: async (value) => { await deleteHandler(value.id) },
                        title: "Delete",
                    },
                    {
                        func: (value) => {
                            navigate(`/product/edit/${value.id}`)
                        },
                        title: "Edit",
                    },
                ]}
                indexColumn="id"
                isLoading={isLoading}
            />

            <div className="flex py-3 gap-1">
                <Paginator
                    pagination={{
                        paginator: {
                            page,
                            countPerPage,
                        },
                        countPage,
                    }}
                    onPageChange={(page) => setPage(page)}
                />
                <RowsCounterPaginator
                    options={[5, 10, 50]}
                    selectedValue={5}
                    onSelectHandler={(value) => setCountPerPage(value)}
                />
            </div>
        </div>
    </>
}