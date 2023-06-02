import { useEffect, useState } from "react";
import { GetAllByFilter } from "../Api";
import { ProductItem } from "../components/product-item";
import { ProductModel } from "../models/product";
import { Link, useSearchParams } from "react-router-dom";
import { BaseResultModel } from "../models/baseResult";
import { Pagination } from "../components/pagination";
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';
import { ReactComponent as SadFaceIcon } from '../assets/sadFace.svg';

interface Props {

}

export function Home(props: Props) {
    const PRODUCT_LIMIT_FOR_PAGE = 8;

    const [categoriesMenuState, setCategoriesMenuState] = useState(false);
    const [orderMenuState, setOrderMenuState] = useState(false);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [totalCount, setTotalCount] = useState(1);
    const [searchParams] = useSearchParams();
    const nameParam = searchParams.get("name");
    const categoryParam = searchParams.get("category");
    const pageParam = searchParams.get("page");

    useEffect(() => {
        filter().catch(console.error);

    }, [nameParam, categoryParam, pageParam]);

    async function filter() {
        const response: BaseResultModel = await GetAllByFilter(categoryParam, nameParam, Number(pageParam ?? "1"), PRODUCT_LIMIT_FOR_PAGE);
        if (!response.success) {
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
                    <div className="categories-mobile">
                        <button type="button" onClick={() => setCategoriesMenuState(!categoriesMenuState)}>
                            CATEGORIAS
                            <ArrowIcon />
                        </button>
                        <div className={`dropdown ${categoriesMenuState ? "active" : ""}`}>
                            <div className="block-touch" onClick={() => setCategoriesMenuState(false)}></div>
                            <ul >
                                <li>
                                    <Link className={`category-item ${!categoryParam ? "active" : ""}`} to="/" onClick={() => setCategoriesMenuState(false)}>
                                        TODOS OS PRODUTOS
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`category-item ${categoryParam === "t-shirts" ? "active" : ""}`} to="/?category=t-shirts" onClick={() => setCategoriesMenuState(false)}>
                                        CAMISETAS
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`category-item ${categoryParam === "mugs" ? "active" : ""}`} to="/?category=mugs" onClick={() => setCategoriesMenuState(false)}>
                                        CANECAS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="orderby">
                        <button type="button" onClick={() => setOrderMenuState(!orderMenuState)}>
                            Organizar por
                            <ArrowIcon />
                        </button>
                        <div className={`dropdown ${orderMenuState ? "active" : ""}`}>
                            <div className="block-touch" onClick={() => setOrderMenuState(!orderMenuState)}></div>
                            <ul>
                                <li><a href="#">Novidades</a></li>
                                <li><a href="#">Preço: Menor - maior</a></li>
                                <li><a href="#">Preço: Maior - menor</a></li>
                                <li><a href="#">Mais vendidos</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {products && products.length > 0 ?
                    <>
                        <Pagination pageParam={pageParam} totalCount={totalCount} />
                        <div className="product-list">
                            {products.map((item: ProductModel) =>
                                <ProductItem product={item} key={item.id}></ProductItem>
                            )}
                        </div>
                        <Pagination pageParam={pageParam} totalCount={totalCount} />
                    </>
                    :
                    <div className="empty-list">
                        <div className="empty-list-icon">
                            <SadFaceIcon />
                        </div>
                        <div className="empty-list-message">
                            <p>{`Nenhum produto encontrado para "${searchParams}"`}</p>
                        </div>
                        <div className="empty-list-button">
                            <Link to="/">Remover filtro</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
}