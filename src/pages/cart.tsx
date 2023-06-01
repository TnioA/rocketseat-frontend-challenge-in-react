import { BackButton } from "../components/back-button"

interface Props {
    setLoading(value: boolean): void
}

export function Cart(props: Props) {
    return <div className="container">
        <div className="content">
            <div className="cart">
                <BackButton />

                <div className="cart-content">
                    
                </div>

            </div>
        </div>
    </div>
}