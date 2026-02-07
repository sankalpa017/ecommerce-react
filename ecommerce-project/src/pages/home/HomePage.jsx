import './HomePage.css';
import axios from 'axios';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
// import { products } from '../../starting-code/data/products';


export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('search');

  useEffect(() => {
    const getProducts = async () => {
      const response = 
      keyword ? await axios.get(`/api/products?search=${keyword}`) 
      : await axios.get('/api/products');
      setProducts(response.data);
    }

    getProducts();
  }, [keyword]);


  
  return (
  <>
    <title>Ecommerce Project</title>
    <link rel="icon" href="images/home-favicon.png" />
    <Header cart={cart} />

    <div className="home-page">
      <ProductsGrid products={products} loadCart={loadCart} />
    </div>
  </>
  )
}