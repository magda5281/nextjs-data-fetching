import Link from 'next/link';
import { cookies } from 'next/headers';
type Product = {
 id: number;
 title: string;
 price: number;
 description: string;
};

export default async function ProductPage() {
 const response = await fetch('http://localhost:3001/products');
 const products = await response.json();

 const cookieStore = cookies();
 const theme = (await cookieStore).get('theme');
 //next.js will not cache request after dynamic functions were invoked
 const detailsResponse = await fetch('http://localhost:3001/products/1');
 const productDetail = await detailsResponse.json();

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
     <p>{productDetail.price}</p>
    </li>
   ))}
  </ul>
 );
}
