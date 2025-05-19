import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="product-list">
      {products.map(p => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Home;