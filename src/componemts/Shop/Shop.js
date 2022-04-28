import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoreData } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    // const [products, setProducts] = useProducts()
    const [cart, setCart] = useCart()
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/product?page=${page}&size=${size}`)
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [page, size])
    useEffect(() => {
        fetch('http://localhost:5000/productcount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10)
                setPageCount(pages)
            })
    }, [])

    // useEffect(() => {
    //     const storedCart = getStoreData()
    //     const savedCart = [];
    //     for (const id in storedCart) {
    //         const addedProduct = products.find(product => product._id === id)
    //         if (addedProduct) {
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCart.push(addedProduct)
    //         }
    //     }
    //     setCart(savedCart)
    // }, [products])

    const handleAddToCard = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.quantity = 1
            newCart = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }
        setCart(newCart)
        addToDb(selectedProduct._id)
    }
    return (
        <div className='shop'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCard={handleAddToCard}>
                    </Product>)
                }
                <div className='pagination'>
                    {
                        [...Array(pageCount).keys()].map(number => <button
                            className={page === number ? "selected" : ""}
                            onClick={() => setPage(number)}>
                            {number}
                        </button>)
                    }
                    <select onChange={e => setSize(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/orders'>
                        <button>Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;