import { useState } from "react";
import { GetAll } from "../Api";
import { ProductItem } from "../components/product-item";

interface Props {
    setLoading(value: boolean): void
}

export function Home(props: Props) {
    const [products, setProducts] = useState([]);

    useState(async () => {
        const response = await GetAll();
        setProducts(response);
    });

    return <div className="container">
        <div className="content">
            <div className="product-list-content">
                <div className="filters">
                    <ul className="categories">
                        <li>
                            <a className="category-item active" href="#">
                                TODOS OS PRODUTOS
                            </a>
                        </li>
                        <li>
                            <a className="category-item" href="#">
                                CAMISETAS
                            </a>
                        </li>
                        <li>
                            <a className="category-item" href="#">
                                CANECAS
                            </a>
                        </li>
                    </ul>
                    <div className="orderby">
                        <button type="button">
                            Organizar por
                            <i className="material-symbols-outlined">expand_more</i>
                        </button>
                    </div>
                </div>
                <ul className="pagination">
                    <li>
                        <a className="pagination-item active" href="#">1</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">2</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">3</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">4</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">5</a>
                    </li>
                    <li>
                        <a className="pagination-item previous" href="#">
                            <i className="material-symbols-outlined">arrow_back_ios</i>
                        </a>
                    </li>
                    <li>
                        <a className="pagination-item next" href="#">
                            <i className="material-symbols-outlined">arrow_forward_ios</i>
                        </a>
                    </li>
                </ul>
                <div className="product-list">
                    {products && products.length > 0 && products.map((item: any) => (
                        <ProductItem product={item}></ProductItem>
                    ))}
                </div>
                <ul className="pagination">
                    <li>
                        <a className="pagination-item active" href="#">1</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">2</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">3</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">4</a>
                    </li>
                    <li>
                        <a className="pagination-item" href="#">5</a>
                    </li>
                    <li>
                        <a className="pagination-item previous" href="#">
                            <i className="material-symbols-outlined">arrow_back_ios</i>
                        </a>
                    </li>
                    <li>
                        <a className="pagination-item next" href="#">
                            <i className="material-symbols-outlined">arrow_forward_ios</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}