import { useContext, useState } from "react";
import { GetById } from "../Api";
import { useNavigate, useParams } from "react-router-dom";
import { ProductModel } from "../models/product";
import { convertPrice } from "../utils/convertPrice";
import { ReactComponent as ShoppingBagIcon } from '../assets/shopping-bag.svg';
import { BackButton } from "../components/back-button";
import { convertCategory } from "../utils/convertCategory";
import { AppContext } from "../context/appContext";

interface Props {
    productId: number;
    setLoading(value: boolean): void
}

export function Product(props: Props) {
    const navigate = useNavigate();
    const context: any = useContext(AppContext);
    const { id } = useParams();
    const [product, setProduct] = useState<ProductModel | null>(null);

    useState(async () => {
        const response = await GetById(Number(id));
        setProduct(response.data);
    });

    function handleAddProduct() {
        context.addProduct(product);
        navigate("/cart");
    }

    return <div className="container">
        <div className="content">
            <div className="product-details">
                <BackButton />
                {product !== null &&
                    <div className="details-content">
                        <div className="product-details-image">
                            <img src={product.image_url} alt="" />
                        </div>
                        <div className="product-details-info">
                            <div className="details-top-info">
                                <p className="product-category">{convertCategory(product.category)}</p>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{convertPrice(product.price)}</p>
                                <p className="shipping-message">*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</p>
                                <div className="product-description">
                                    <p className="product-description-title">DESCRIÇÃO</p>
                                    <p className="product-description-content">{product.description}</p>
                                </div>
                            </div>
                            <div className="details-bottom-info">
                                <button type="button" onClick={()=> handleAddProduct()}>
                                    <ShoppingBagIcon />
                                    ADICIONAR NO CARRINHO
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
}