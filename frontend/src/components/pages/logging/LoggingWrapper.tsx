import { format } from "date-fns"
import { LoggingService } from "../../../services/logging"
import { formatToMoney } from "../../../utils/formatToMoney"
import { ProductDeletedModel } from "../../../services/protocols/model"
import { useEffect, useState } from "react"
import { useToast } from "../../../hooks/use-toast"
import DataTable from "../../toolkit/datatable/DataTable"
import Paginator from "../../toolkit/datatable/pagination/Paginator"
import RowsCounterPaginator from "../../toolkit/datatable/pagination/RowsCounterPaginator"

const transformDataCallback = (data: ProductDeletedModel) => {
    return {
        ...data,
        price: formatToMoney(data.price),
        createdAt: format(data.createdAt, 'dd/MM/yyyy'),
        updatedAt: format(data.updatedAt, 'dd/MM/yyyy'),
        deletedAt: format(data.updatedAt, 'dd/MM/yyyy')
    }
}

const productService = new LoggingService()

export const LoggingWrapper = () => {
    const [products, setProducts] = useState<ProductDeletedModel[]>([])
    const [page, setPage] = useState(1)
    const [countPerPage, setCountPerPage] = useState(5)
    const [countPage, setCountPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

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
        <div className="px-5 py-6">
            <p className="text-xl font-bold text-secondary-light mb-3">
                Logging Page
            </p>
            <hr className="my-3" />
            <DataTable<ProductDeletedModel>
                columns={[
                    {
                        keyName: "id",
                        node: <>ID</>,
                    },
                    {
                        keyName: "productId",
                        node: <>Product ID</>,
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
                        keyName: "createdAt",
                        node: <>Created at</>,
                    },
                    {
                        keyName: "updatedAt",
                        node: <>Updated at</>,
                    },
                    {
                        keyName: "deletedAt",
                        node: <>Deleted at</>,
                    },
                ]}
                data={products}
                dataTransform={transformDataCallback}
                actions={[]}
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