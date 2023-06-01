import { Link } from "react-router-dom";
import { ProductModel } from "../models/product";
import { convertPrice } from "../utils/convertPrice";

interface Props {
    product: ProductModel;
}

export function ProductItem(props: Props) {
    return <div className="product-item">
        <Link to={`/product/${props.product.id}`}>
            <div className="product-image">
                <img src={props.product.image_url} alt="" />
            </div>
            <div className="product-info">
                <span>{props.product.name}</span>
                <hr />
                <span className="price">{convertPrice(props.product.price)}</span>
            </div>
        </Link>
    </div>
}