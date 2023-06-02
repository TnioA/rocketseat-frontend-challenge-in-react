import { useState, createContext } from "react";
import { ProductModel } from "../models/product";

export const AppContext = createContext({});

interface Props {
    children: any
}

export function AppContextProvider(props: Props) {
    const [cartProducts, setCartProducts] = useState<ProductModel[]>([]);

    useState(()=> {
        var cartProducts: ProductModel[] = JSON.parse(localStorage.getItem("cartProducts") ?? "[]");
        setCartProducts(cartProducts);
    });

    function getTotalInfoCart() {
        if(cartProducts.length < 1)
            return [0, 0];

        const count = cartProducts.map(item => item.count).reduce((prev, next) => prev + next);
        const value = cartProducts.map(item => item.price * item.count).reduce((prev, next) => prev + next);
        return [count, value ];
    }

    function removeProduct(id: number) {
        const newCartProducts = cartProducts.filter(x=> x.id !== id);
        updateCartProducts(newCartProducts);
    }

    function changeProductCount(id: number, count: number) {
        var newCartProducts = cartProducts.slice(); 
        newCartProducts.forEach(x=> {
            if(x.id === id)
                x.count = count;
        });

        updateCartProducts(newCartProducts);
    }

    function addProduct(product: ProductModel) {
        var cartProducts: ProductModel[] = JSON.parse(localStorage.getItem("cartProducts") ?? "[]");
        var cartProduct = product ?? {} as ProductModel;
        const cartHasProduct = cartProducts.filter(x=> x.id === cartProduct.id).length > 0;
        
        if(cartProducts.length > 0 && cartHasProduct) {
            cartProducts.forEach((x: ProductModel) => {
                if(x.id === cartProduct.id && x.count < 5)
                    x.count++;
            });

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            updateCartProducts(cartProducts);
            return;
        }
        
        cartProduct.count = 1;
        cartProducts.push(cartProduct);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        updateCartProducts(cartProducts);
    }

    function updateCartProducts(newCartProductsList: ProductModel[]) {
        localStorage.setItem("cartProducts", JSON.stringify(newCartProductsList));
        setCartProducts(newCartProductsList);
    }

    return <AppContext.Provider value={{
        cartProducts,
        getTotalInfoCart,
        addProduct,
        removeProduct,
        changeProductCount
    }}>
        {props.children}
    </AppContext.Provider>;
}