import React, { useState } from 'react'
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';
import { fetchProductList } from '../services/productService';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {addToCart} = useCart();

    useEffect(() => {
        (async () => {
            try{
                const items = await fetchProductList();
                setProducts(items);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        })();
    }, []);

    if(loading) return <div>Loading Products...</div>;
    if(products.length === 0) return <div>No products found</div>;



  return (
    <div className='product-grid__container w-full bg-white px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-0.5 gap-y-1 '>
        {products.map((p) => (
            <div key={p._id} className="product-card bg-white w-[320px] h-[390px] lg:max-w-[calc(100%-5px)]  p-2.5 rounded-[8px] hover:shadow-xl transition-all duration-300 ease-in-out">
                <Link to={`/products/${p._id}`}>
                    <img src={p.images?.[0] || "/placeholder.jpg"} 
                    alt={p.name}
                    className='w-full h-[250px] object-cover'
                    />
                </Link>
                
                <div className='w-full bg-white'>
                    <Link to={`/products/${p._id}`}>
                        <p>{p.name}</p>
                    </Link>
                    <h4>{p.price.toLocaleString("en-NG", {
                        currency: "NGN",
                        style: "currency"    
                    })}
                
                    </h4>
                    <button onClick={() => addToCart(p._id)} className='add-to-cart'>
                        <MdOutlineAddShoppingCart /> 
                    </button>
                </div>
                
               
                
            </div>
            
        ))}
    </div>
  )
}

export default ProductGrid