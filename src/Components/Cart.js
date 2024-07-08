import React, { useEffect, useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import './cart.css';
import { removeItem } from '../features/cartSlice';
import axios from 'axios';
import { addItem } from '../features/cartSlice';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [quantities, setQuantities] = useState(new Array(cartItems.length).fill(1));
  const [products, setProducts] = useState([])
  const [recommendedProducts, setRecomendedProducts] = useState([])

  const dispatch = useDispatch();

  const minParaLength = 150;

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

console.log(cartItems)
useEffect(() => {
    const storeTag = () => {
        const tags = cartItems.map((item) => item.tags);
        console.log({ cartItems });
        const tagsArray = [...new Set(tags.flat())];

        if (products && Array.isArray(products)) {
            const recomendedProductsList = products.filter((product) =>
                product.tags && 
                Array.isArray(product.tags) && 
                tagsArray.some((tag) =>
                    product.tags.includes(tag)
                )
            );
            console.log(recomendedProductsList);
            setRecomendedProducts(recomendedProductsList);
        } else {
            console.error('Products data is not valid:', products);
        }
    };

    storeTag();
}, [cartItems, products]);


console.log(recommendedProducts[0])


  const handleAddQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities]; 
      newQuantities[index] = newQuantities[index] + 1;
      console.log(newQuantities[index])
      
      return newQuantities;
    });
  };
  
  const handleReduceQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      } else {
        dispatch(removeItem(index));
      }
      return newQuantities;
    });
  };

  const handleAddItem = (item) =>{
    dispatch(addItem(item));
    console.log(item)
}

  return (
    <div className='cart-toast'>
      <div className='cart-toast-wrapper'>
        <div className='cart-toast-header'>Cart</div>
        <div className="cart-itmes">
          {cartItems.map((item, i) => (
            <div key={i} className="item-card d-flex">
              <div className="area-left d-flex">
                <div className="item-image">
                  <img className='img-fluid' src={item?.images?.edges[0]?.node?.src} alt="" />
                </div>
                <div className="item-details">
                  <p className="item-name">{item?.title}</p>
                  <div className='add-buttons'>
                    <button onClick={() => handleReduceQuantity(i)}>-</button>
                    <p>{quantities[i]}</p>
                    <button onClick={() => handleAddQuantity(i)}>+</button>
                  </div>
                </div>
              </div>
              <div className="area-right">
                <p>{item?.price?.amount * quantities[i]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* recommendded product */}
        <div className="product-cards">
        { 
            recommendedProducts.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Cart;