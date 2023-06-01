import { convertPrice } from "../utils/convertPrice";

interface Props {
    product: any;
}

export function ProductItem(props: Props) {
    return <div className="product-item" key={props.product.id}>
        <a href="#">
            <div className="product-image">
                <img src={props.product.image_url} alt="" />
            </div>
            <div className="product-info">
                <span>{props.product.name}</span>
                <hr />
                <span className="price">{convertPrice(props.product.price)}</span>
            </div>
        </a>
    </div>
}