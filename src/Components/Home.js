import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import {useDispatch} from  'react-redux';
import { addItem } from '../features/cartSlice';
import Cart from './Cart';



const Home = () => {

    const [showCart, setShowCart] = useState(false)

    const [products, setProducts] = useState([]);
    const minParaLength = 150;

    const dispatch = useDispatch()

    useEffect(()=>{
        const productDetails = () =>{
            const productsData = axios.get('https://boppotech-admin.github.io/react-task-json.github.io/reactjob.json');
            productsData.then((response) => {
                console.log(response.data);
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        }
        productDetails();
    }, [])

    const handleAddItem = (item) =>{
        dispatch(addItem(item));
        console.log(item)
    }

    const handleShowCart = () =>{
        setShowCart(!showCart)
    }
  return (
    <div className="home-section">
{/* cart visible on click of go to cart button and  */}
        <button className='showCart' onClick={handleShowCart}> {!showCart ? 'Show Cart' : 'Hide Cart' } </button>
        <div className="product-cards">
        { 
            products.map((item, index) => (
                <div className="card" key={index}>
                    <img src={item?.images?.edges[0].node?.src && item?.images?.edges[0]?.node?.src} alt='product' className='card-img' />

                    <p className='product-title'>{item?.title && item?.title.toUpperCase()}</p>
                    <p className='description'>{ item.description && item?.description.length > minParaLength ? item?.description.substring(0, minParaLength) + '...' : item?.description}</p>

                    <div className="card-footer">
                        <p className='price'>{item?.price?.currencyCode && item?.price?.currencyCode === 'INR'  ? '₹' : '$' }{item?.price?.amount && item?.price?.amount}</p>

                        <button onClick={()=> handleAddItem(item)}>ADD TO CART</button>
                    </div>
                </div>
            ))
        }
        </div>

        {/* cart component */}
       {showCart && <Cart />}
    </div>
  )
}

export default Home