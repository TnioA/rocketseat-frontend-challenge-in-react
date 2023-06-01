import { useEffect, useState } from "react";
import { GetAllByFilter } from "../Api";
import { ProductItem } from "../components/product-item";
import { ProductModel } from "../models/product";
import { Link, useSearchParams } from "react-router-dom";
import { BaseResultModel } from "../models/baseResult";
import { Pagination } from "../components/pagination";
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

interface Props {
    setLoading(value: boolean): void
}

export function Home(props: Props) {
    const PRODUCT_LIMIT_FOR_PAGE = 8;
    
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [totalCount, setTotalCount] = useState(1);
    const [searchParams] = useSearchParams();
    const nameParam = searchParams.get("name");
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");
    const orderParam = searchParams.get("order");

    useEffect(() => {
        console.log("mudou");
        filter().catch(console.error);

    }, [nameParam, categoryParam, pageParam]);

    async function filter() {
        const response: BaseResultModel = await GetAllByFilter(categoryParam, nameParam, Number(pageParam ?? "1"), PRODUCT_LIMIT_FOR_PAGE);
        if(!response.success) {
            setProducts([]);
            return;
        }

        setProducts(response.data.products as ProductModel[]);
        setTotalCount(response.data.totalCount);
    }

    return <div className="container">
        <div className="content">
            <div className="product-list-content">
                <div className="filters">
                    <ul className="categories">
                        <li>
                            <Link className={`category-item ${!categoryParam ? "active" : ""}`} to="/">
                                TODOS OS PRODUTOS
                            </Link>
                        </li>
                        <li>
                            <Link className={`category-item ${categoryParam === "t-shirts" ? "active" : ""}`} to="/?category=t-shirts">
                                CAMISETAS
                            </Link>
                        </li>
                        <li>
                            <Link className={`category-item ${categoryParam === "mugs" ? "active" : ""}`} to="/?category=mugs">
                                CANECAS
                            </Link>
                        </li>
                    </ul>
                    <div className="orderby">
                        <button type="button">
                            Organizar por
                            {/* <i className="material-symbols-outlined">expand_more</i> */}
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
                <Pagination pageParam={pageParam} totalCount={totalCount} />
                <div className="product-list">
                    {products && products.length > 0 && products.map((item: ProductModel) => (
                        <ProductItem product={item} key={item.id}></ProductItem>
                    ))}
                </div>
                <Pagination pageParam={pageParam} totalCount={totalCount} />
            </div>
        </div>
    </div>
}