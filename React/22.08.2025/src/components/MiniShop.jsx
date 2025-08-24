import './miniShop.css'

const { useReducer, useEffect } = require("react");


const initialState = {cart:[], total:0, discount:0, delivery:0}
const products = [
    {id:1, name:'Product 1', price:111},
    {id:2, name:'Product 2', price:222},
    {id:3, name:'Product 3', price:333},
]


function calcTotal(cart, discount=0, delivery=0) {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total - (total*discount/100) + delivery;
}

function reducer(state, action)
{
    switch (action.type) {
        case 'add_item':
            {
                const item = action.payload;
                const exists = state.cart.find(i=>i.id===item.id);
                let newCart;
                if (exists) {
                    newCart=state.cart.map(i=>(i.id===item.id ? {...i, quantity:i.quantity+1} : i))
                }
                else
                {
                    newCart=[...state.cart, {...item, quantity:1}]
                }
                return {...state, cart:newCart, total:calcTotal(newCart, state.discount, state.delivery)}
            }
        case 'remove_item':
            {
                const newCart = state.cart.filter(i=>i.id!==action.payload)
                return {...state, cart:newCart, total:calcTotal(newCart, state.discount, state.delivery)}
            }
        case 'increment':
            {
                const newCart = state.cart.map(i=>i.id===action.payload ? {...i, quantity:i.quantity+1} : i);
                return {...state, cart:newCart, total:calcTotal(newCart, state.discount, state.delivery)}
            }
        case 'decrement':
            {
                const newCart = state.cart.map(i=>i.id===action.payload && i.quantity > 1 ? {...i, quantity:i.quantity-1} : i)
                .filter(i=>i.quantity>0)
                return {...state, cart:newCart, total:calcTotal(newCart, state.discount, state.delivery)}
            }
        case 'clear_cart':
            {
                return initialState;
            }  
        case 'add_discount':
            {
                const newDiscount = state.discount + action.payload;
                return {...state, discount: newDiscount, total:calcTotal(state.cart, newDiscount, state.delivery)}
            }
        case 'remove_discount':
            {
                const newDiscount = state.discount - action.payload;
                return {...state, discount: newDiscount, total:calcTotal(state.cart, newDiscount, state.delivery)}
            }
        case 'add_delivery':
            {
                const newDelivery = state.delivery + action.payload;
                return {...state, delivery: newDelivery, total:calcTotal(state.cart, state.discount, newDelivery)}
            }
        case 'remove_delivery':
            {
                const newDelivery = state.delivery - action.payload;
                return {...state, delivery: newDelivery, total:calcTotal(state.cart, state.discount, newDelivery)}
            }

        default:
            break;
    }
}

function init()
{
    const data = localStorage.getItem('cartState');
    return data ? JSON.parse(data) : initialState;
}

export function Cart() {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    useEffect(()=>
    {
        localStorage.setItem('cartState', JSON.stringify(state))
    }, [state])

    return(<div>
        <h2>Items</h2>
        {products.map(p=><div key={p.id} className='item'>{p.name} - {p.price}
            <button onClick={()=>dispatch({type:'add_item',payload:p})}>Add</button></div>)}
        <h2>Cart</h2>
        {state.cart.length === 0 && <p>Cart is empty</p>}
        {state.cart.map(i=>
            (
                <div key={i.id} className='item'>
                    {i.name} - {i.price}
                    <button onClick={()=>dispatch({type:'increment', payload:i.id})}>+</button>
                    <button onClick={()=>dispatch({type:'decrement', payload:i.id})} 
                    disabled={state.cart.find(item=>item.id === i.id).quantity === 1}>-</button>
                    <button onClick={()=>dispatch({type:'remove_item', payload:i.id})}>Remove</button>
                </div>
            )
        )}
        <h3>Total: {state.total}</h3>
        <button onClick={()=>dispatch({type:'clear_cart'})}>Clear Cart</button>
        <div>
            <span>Discount {state.discount}% || <button onClick={()=>dispatch({type:'add_discount', payload: 5})}>+5%</button><button onClick={()=>dispatch({type:'remove_discount', payload: 5})}>-5%</button></span>
            <span>Delivery {state.delivery} || <button onClick={()=>dispatch({type:'add_delivery', payload: 50})}>+50</button><button onClick={()=>dispatch({type:'remove_delivery', payload: 50})}>-50</button></span>
        </div>
    </div>)
}

