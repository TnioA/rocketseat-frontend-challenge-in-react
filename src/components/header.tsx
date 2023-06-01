interface Props {
    setLoading(value: boolean): void
}

export function Header(props: Props) {
    return <header className="header">
        <div className="content">
            <div className="logo">
                <a href="#">capputeeno</a>
            </div>
            <div className="header-buttons">
                <div className="input-icon">
                    <input className="search-input" type="text" placeholder="Procurando por algo específico?" />
                    {/* <i className="material-symbols-outlined">search</i> */}
                    <button type="button">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12.059" cy="12.0586" r="7.06194" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21.0034 21.0033L17.0518 17.0517" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="btn-cart">
                    <button type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 7V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 7H4C3.44772 7 3 7.44772 3 8V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8C21 7.44772 20.5523 7 20 7Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="cart-badge">2</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
}