import { useRef, useState } from 'react';
import './dreamShopStyles.css'

const products = 
[
    { id: 1, name: 'Ноутбук', price: 25000, inStock: true },
    { id: 2, name: 'Смартфон', price: 15000, inStock: false },
    { id: 3, name: 'Навушники', price: 2000, inStock: true },
    { id: 4, name: 'Смартфон', price: 15000, inStock: false },
    { id: 5, name: 'Навушники', price: 2000, inStock: true }
];

function ShopItem({props}) {
    const data = props;

    return(<li className='shopItem'>
        <img alt={data.name} />
        <div className="item-details">
            <h3>{data.name}</h3>
            <h4 data-is-available={data.inStock}>{data.inStock ? data.price : 'Not Available'}</h4>
        </div>
    </li>)
}


export function DreamShop() {
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
    const [sortAsc, setSortAsc] = useState(true);

    const productItems = [...products];
    const onlyAvailbaleProducts = productItems.filter(i => i.inStock);
    const availableProductsCount = onlyAvailbaleProducts.length;

    let list = showOnlyAvailable ? onlyAvailbaleProducts : productItems;

    list = [...list].sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

    return (
        <div>
            <div className="products">
                {list.length === 0 ? <h1>No Goods</h1> :
                    <ul>
                        {list.map(i => <ShopItem key={i.id} props={i} />)}
                    </ul>}
            </div>
            <strong style={{ color: availableProductsCount === 0 ? 'red' : 'black' }}>
                {availableProductsCount !== 0 ? `Available: ${availableProductsCount}` : `Empty storage`}
            </strong>
            <br />
            <button onClick={() => setShowOnlyAvailable(p => !p)}>
                Show Only Available
            </button>
            <button onClick={() => setSortAsc(p => !p)}>
                Sort by Price ({sortAsc ? "Ascending" : "Descending"})
            </button>
        </div>
    )
}