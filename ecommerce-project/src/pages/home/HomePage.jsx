import './HomePage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
// import { products } from '../../starting-code/data/products';


export function HomePage({cart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }

    getProducts();
  }, []);
  
  return (
  <>
    <title>Ecommerce Project</title>
    <link rel="icon" href="images/home-favicon.png" />
    <Header cart={cart} />

    <div className="home-page">
      <ProductsGrid products={products} />
    </div>
  </>
  )
}