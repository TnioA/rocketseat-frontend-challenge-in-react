import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as ShoppingBagIcon } from '../assets/shopping-bag.svg';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';

interface Props {
    history: any;
}

export function Header(props: Props) {
    const [searchvalue, setSearchValue] = useState("");

    const navigate = useNavigate();
    const context: any = useContext(AppContext);
    const inputReference: any = useRef(null);

    function handleSearch() {
        if (searchvalue.length < 1) {
            inputReference.current.focus();
            return;
        }

        navigate(`/?name=${searchvalue}`);
    }

    return <header className="header">
        <div className="content">
            <div className="logo">
                <Link to="/">capputeeno</Link>
            </div>
            <div className="header-buttons">
                <div className="input-icon">
                    <input 
                        className="search-input" 
                        ref={inputReference} 
                        type="text" 
                        placeholder="Procurando por algo específico?" 
                        value={searchvalue}
                        onChange={(e)=> setSearchValue(e.target.value)}
                    />
                    <button type="button" onClick={() => handleSearch()}>
                        <SearchIcon />
                    </button>
                </div>
                <div className="btn-cart">
                    <Link to="/cart">
                        <ShoppingBagIcon />
                        <span className="cart-badge">{context.getTotalInfoCart()[0]}</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
}