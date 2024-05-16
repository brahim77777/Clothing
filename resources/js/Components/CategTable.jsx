import { Delete } from '@mui/icons-material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
const CategTable = () => {

    const [categories,setCategories] = useState([])
    useEffect(()=>{
        axios.get("/categories").then((res)=>{
            console.log("Hello users: ",res.data.categories.data)
            setCategories(res.data.categories.data)
        })
    },[])

  return (
    <div>
    <div>CategCards</div>
    <div class="overflow-x-auto w-full mx-auto   ">

                            <div class="inline-block min-w-full py-2  rounded-md  ">
                            <div class="overflow-hidden  ">
                                <table
                                class="min-w-full bg-white rounded-md  text-left text-sm font-light text-surface  ">
                                <thead
                                    class={`border-b   border-neutral-200 font-medium text-nowrap `}>
                                    <tr>
                                        <th scope="col" class="px-6 py-4 pr-10"></th>
                                        <th scope="col" class="px-6 py-4">Title</th>
                                        <th scope="col" class="px-6 py-4">Created at</th>
                                        <th scope="col" class="px-6 py-4">Last update</th>
                                        <th scope="col" class="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {categories.map((e,index)=>(
                                            <tr key={index}
                                            class="border-b relative border-neutral-200  transition duration-300 ease-in-out hover:bg-neutral-100  ">
                                            {/* <td class="whitespace-nowrap px-6 py-4 font-medium  max-w-[100px] duration-300 m-auto flex items-center jus absolute  hover:max-w-full bg-white h-full line-clamp-1">{e.slug}</td> */}
                                            <td class="whitespace-nowrap px-6 py-4 ">{index+1}</td>
                                            <td class=" whitespace-nowrap px-6 py-4">{e.title}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.created_at}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.updated_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                                <button onClick={()=>{
                                                    // setdataToUpdate(e)
                                                    // setAddProduct(true);
                                                    // dispatch(openStat(false));
                                                    // dispatch(openProducts(false));
                                                    }} className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-200 hover:text-green-600'><TbEdit className=''/>Edit</button>
                                                <button onClick={()=>{}} className='flex  justify-between items-center gap-1 p-1 rounded bg-red-50 border border-red-500 text-red-500 hover:bg-red-200 hover:text-red-600'>Delete<RiDeleteBin6Line/></button>
                                            </td>
                                            </tr>
                                        ))

                                        }
                                </tbody>
                                </table>
                                {/* { Object.entries(products.links).map((e)=>{return <h1>{e[0]}</h1>})} */}
                                {/* <Pagination links={Object.entries(products.links)}/> */}
                                {/* <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                    forcePage={page}
                                    containerClassName="flex items-center justify-start space-x-2 mt-4"
                                    pageClassName=" border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                                    activeClassName=" bg-blue-500 text-white  hover:text-black hover:bg-blue-200"
                                    previousClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                                    nextClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                                    breakClassName="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                                /> */}

                            </div>
                            </div>
                        </div>

  </div>

  )
}

export default CategTable;
