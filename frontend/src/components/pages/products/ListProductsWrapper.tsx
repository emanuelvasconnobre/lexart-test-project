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

    const fetchData = async () => {
        const { success, ...response } = await productService.getMany({
            page,
            countPerPage
        })
        setIsLoading(false)

        if (success && response.data) {
            setProducts(response.data.items)
            setCountPage(response.data.countPage)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, countPerPage])

    return <div className="px-5 py-6">
        <div className="py-3">
            <Link to={"/product/add"}>
                <AppButton>
                    Adicionar
                </AppButton>
            </Link>
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
                    func: () => { },
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
}