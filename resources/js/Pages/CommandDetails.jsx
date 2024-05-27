import React from 'react';
import Dashboard from './Dashboard';
import { Tooltip, Button } from "@material-tailwind/react";


export default function CommandDetails({ command, products }) {
    console.log("stock : ",products)
  return (
    <Dashboard>
      <div className="container mx-auto py-6 bg-gray-0">
        <h1 className="text-2xl font-bold   mb-6">Command Details (ID: {command.id})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Command Details */}
          <div className="p-4 border border-indigo-900 shadow-lg rounded-lg space-y-4">
            <h2 className="text-xl font-semibold bg-indigo-800 text-white p-2 rounded-md mb-2">Customer Information</h2>
            <div className=" border-indigo-900 border  space-y-2  p-2 rounded-md px-2">
              <div className='flex justify-between'>Name: <span className="font-medium text-gray-700">{command.first_name} {command.last_name}</span></div>
              <div className='flex justify-between'>Email: <span className="font-medium text-gray-700">{command.email}</span></div>
              <div className='flex justify-between'>Phone: <span className="font-medium text-gray-700">{command.phone}</span></div>
              <div className='flex justify-between'>Address:
                <span className="font-medium text-gray-700 whitespace-pre- break-words">{command.address}</span>
              </div>
              <div className='flex justify-between'>Free Shipping: <span className="font-medium text-gray-700">{command.freeShipping === 1 ? 'Yes' : 'No'}</span></div>
              <div className='flex justify-between'>Status: <span className="font-medium text-gray-700">{command.status}</span></div>
              <div className='flex justify-between'>Total Price: <span className="font-medium text-gray-700">{command.total_price}</span></div>
            </div>
          </div>



          {/* Products in Order */}
          <div className="p-4 border border-indigo-900 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold bg-indigo-800 text-white p-2 rounded-md mb-2">Products</h2>
            {products.length > 0 ? (
              <ul className="list-disc  ">
                {products.map((product) => (
                  <li key={product.id} className="flex border-4 border-indigo-900 relative w-full bg-indigo-900 my-4 p-2 rounded-md text-white items-center mb-2">
                    <img
                      className="w-16 h-16 mr-4 rounded-lg object-cover"
                      src={`/storage/${product.main_image}`}
                      alt={product.title}
                    />
                    <div className="flex flex-col">
                      <span className="text-base font-medium">{product.title}</span>
                      <span className="text-gray-50 text-sm">Quantity: {product.quantity}</span>
                      <span className="text-gray-50 text-sm">Price: {product.price}</span>
                    </div>

                    <Tooltip content="Quantity in stock" placement="top-end">
                        <div className=' cursor-pointer  bg-white absolute bg-opacity-35 text-white font-bold text-xl right-0 h-full rounded  text-black flex items-center  px-2'>
                            {product.quantity_in_stock}
                        </div>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No products found in this command.</p>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
