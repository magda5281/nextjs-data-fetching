'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Product = {
 id: number;
 title: string;
 price: number;
 description: string;
};

const ProductPage: React.FC = () => {
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchProducts = async () => {
   try {
    const response = await fetch('http://localhost:3001/products');
    if (!response.ok) {
     throw new Error('Netword rersponse failed');
    }
    const data = await response.json();
    setProducts(data);
   } catch (err) {
    if (err instanceof Error) {
     setError(err.message);
    } else {
     setError('An unknown error occurred');
    }
   } finally {
    setLoading(false);
   }
  };
  fetchProducts();
 }, []);
 return (
  <ul className='space-y-4 p-4'>
   {products.map((product: Product) => (
    <li
     key={product.id}
     className='p-4 bg-white shadow-md rounded-lg text-gray-700'
    >
     <h2 className='text-xl font-semibold'>
      <Link href={`/products-db/${product.id}`}>{product.title}</Link>
     </h2>
     <p>{product.description}</p>
     <p className='text-lg font-medium'>${product.price}</p>
     {/* <p>{productDetail.price}</p> */}
    </li>
   ))}
  </ul>
 );
};
