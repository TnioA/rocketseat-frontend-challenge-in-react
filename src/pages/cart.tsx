import { useContext, useState } from "react"
import { BackButton } from "../components/back-button"
import { ProductModel } from "../models/product";
import { convertPrice } from "../utils/convertPrice";
import { AppContext } from "../context/appContext";
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { ReactComponent as EmpyCartIcon } from '../assets/empyCart.svg';
import { Link } from "react-router-dom";

interface Props {

}

export function Cart(props: Props) {
    const context: any = useContext(AppContext);

    return <div className="container">
        <div className="content">
            <div className="cart">
                <BackButton />
                {context.cartProducts.length > 0 ?
                    <div className="cart-content">
                        <div className="cart-products">
                            <div className="cart-products-top">
                                <h3>SEU CARRINHO</h3>
                                <p>{`Total (${context.getTotalInfoCart()[0]} produtos) `}<strong>{convertPrice(context.getTotalInfoCart()[1])}</strong></p>
                            </div>
                            <div className="cart-product-list">
                                {context.cartProducts.map((product: ProductModel) => (
                                    <div className="cart-product" key={product.id}>
                                        <div className="cart-product-image">
                                            <img src={product.image_url} alt="" />
                                        </div>
                                        <div className="cart-product-info">
                                            <div className="cart-product-header">
                                                <h3>{product.name}</h3>
                                                <button type="button" onClick={() => context.removeProduct(product.id)}><TrashIcon /></button>
                                            </div>
                                            <p className="cart-product-description">{product.description}</p>
                                            <div className="cart-product-bottom">
                                                <select
                                                    name="cart-product-count"
                                                    id="cart-product-count"
                                                    value={product.count}
                                                    onChange={(e) => context.changeProductCount(product.id, Number(e.target.value))}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                                <p>{convertPrice(product.price * product.count)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="cart-resume">
                            <div className="cart-resume-info">
                                <div className="resume-top-info">
                                    <h3>RESUMO DO PEDIDO</h3>
                                    <div className="resume-values">
                                        <div className="resume-line">
                                            <p>Subtotal de produtos</p>
                                            <p>{convertPrice(context.getTotalInfoCart()[1])}</p>
                                        </div>
                                        <div className="resume-line">
                                            <p>Entrega</p>
                                            <p>{convertPrice(40)}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="total-value">
                                        <p>Total</p>
                                        <p>{convertPrice(context.getTotalInfoCart()[1] + 40)}</p>
                                    </div>
                                    <button type="button">FINALIZAR COMPRA</button>
                                </div>
                                <div className="resume-bottom-info">
                                    <ul className="helpers">
                                        <li><a href="#">AJUDA</a></li>
                                        <li><a href="#">REEMBOLSOS</a></li>
                                        <li><a href="#">ENTREGAS E FRETE</a></li>
                                        <li><a href="#">TROCAS E DEVOLUÇÕES</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="empty-list">
                        <div className="empty-list-icon">
                            <EmpyCartIcon />
                        </div>
                        <div className="empty-list-message">
                            <p>Seu carrinho está vazio</p>
                        </div>
                        <div className="empty-list-button">
                            <Link to="/">Voltar para o início</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
}