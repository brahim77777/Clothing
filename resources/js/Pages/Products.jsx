import React from 'react'



import { useSelector,useDispatch } from 'react-redux';


import { useEffect } from 'react';
import {Link} from '@inertiajs/react';

import { MdAdd, MdDelete } from 'react-icons/md';
import { BsSortNumericDown } from "react-icons/bs";
import { BsSortNumericUp } from "react-icons/bs";

import {router} from '@inertiajs/react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from 'react-icons/tb';
import axios from 'axios';
import { setDataToUpdate } from '@/redux/updateProductSlice';
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";


import {  useState } from 'react'

import ReactPaginate from 'react-paginate';
import { setPage } from '@/redux/pageSlice';
import Dashboard from './Dashboard';
import { ArrowUp } from 'phosphor-react';

export default  function  Products({pageCount ,products, total,auth})  {

    console.log("auth products:",auth)
    console.log("P products:",products)
    const page = useSelector(state=>state.page.value)

    const [mainUrl, setmainUrl] = useState('');
    const url = window.location.pathname;

    useEffect(()=>{
        setmainUrl(url)
    },[])


    const handlePageChange = (selectedPage) => {

        let nextPageUrl = ``
        nextPageUrl = `${mainUrl}?page=${selectedPage.selected + 1}`;
        dispatch(setPage(selectedPage.selected));
        router.visit(nextPageUrl);
        selectedPage.preventDefault();

    }
    const [productsList,setProductsList] = useState(products?.data)


    const [sort ,setSort] = useState({"order":"asc","target":"title"})


    const toggleDarkMode = useSelector((state)=>state.changeTheme.value)
    const dispatch = useDispatch()
    const sideOpen = useSelector((state)=>state.sideBar.value)

    function deleteProduct(slug){
        alert(slug)
        axios.delete('/products/'+slug).then((res)=>{
            alert(res.data)
            console.log("deleted check!",res.data)

            // Assuming 'myArray' is the state variable storing the array and 'setMyArray' is the setter function

            // Remove an element from the array based on some condition

            // Assuming 'myArray' is the state variable storing the array and 'setMyArray' is the setter function

            // Remove an element from the array based on some condition

            setProductsList(res.data.products)
        })
    }



    const dataToUpdate = useSelector(state=>state.dataToUpdate.value)

    useEffect(()=>{
        console.log("send dataToUpdate:",dataToUpdate)
    },[dataToUpdate])


console.log(sort)
  return (
<Dashboard>

<div className={`w-full duration-300  ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-white text-gray-900'} h-full  mt-2 ml-auto `}>


                        <div className=' w-full flex justify-between '>
                            <div className='p-2 rounded-md border  w-fit shadow bg-green-600 text-white font-medium text-lg flex justify-between gap-2'>Products total<span className='text-xl '>{total}</span></div>

                        <Link
                            href='/dashboard/add_product'
                            className="flex bg-white bg-opacity-75 items-center py-1   w-[4rem] rounded-md pl-2 pr-[4px] justify-between border border-gray-500">Add<MdAdd/>
                        </Link>
                        </div>
                        <div class="overflow-x-auto w-full mx-auto   ">
                            <div class="inline-block min-w-full py-2  rounded-md  ">
                            <div class="overflow-hidden  ">
                                <table
                                class="min-w-full relative bg-white rounded-md  text-left text-sm font-light text-surface  ">
                                <thead
                                    class={`border-b sticky   border-neutral-200 font-medium text-nowrap `}>
                                    <tr>
                                    <th scope="col" class="px-6 py-4 pr-10">ID</th>
                                    <th scope="col" class="px-6 py-4 gap-4 flex justify-between items-center">Title
                                        <BsSortAlphaUp onClick={()=>setSort({"order":"asc","target":"title"})} className={` ${ sort.order == "asc" && `hidden`} size-8  rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        <BsSortAlphaDown onClick={()=>setSort({"order":"desc","target":"title"})} className={`${ sort.order == "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                    </th>
                                    <th scope="col" class="px-6 py-4 ">
                                        <div className='flex gap-4 justify-between items-center'>
                                        Quantity
                                        <BsSortNumericUp onClick={()=>setSort({"order":"asc","target":"quantity"})} className={` ${ sort.order == "asc" && `hidden`} size-8  rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        <BsSortNumericDown onClick={()=>setSort({"order":"desc","target":"quantity"})} className={`${ sort.order == "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-4">Last Update</th>
                                    <th scope="col" class="px-6 py-4">Created at</th>
                                    <th scope="col" class="px-6 py-4">Price</th>
                                    <th scope="col" class="px-6 py-4">More Details</th>
                                    <th scope="col" class="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {productsList?.map((e,index)=>(
                                            <tr
                                            class="border-b relative border-neutral-200  transition duration-300 ease-in-out hover:bg-neutral-100  ">
                                            {/* <td class="whitespace-nowrap px-6 py-4 font-medium  max-w-[100px] duration-300 m-auto flex items-center jus absolute  hover:max-w-full bg-white h-full line-clamp-1">{e.slug}</td> */}
                                            <td class="whitespace-nowrap px-6 py-4 ">{e.id}</td>
                                            <td class=" whitespace-nowrap px-6 py-4">{e.title}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.quantity}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.updated_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.created_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.price}</td>
                                            <td class="whitespace-nowrap px-6 py-4"><Link href={'/products/'+e.slug} className='px-2 bg-gray-50 hover:bg-neutral-100 py-1 border-gray-500  rounded border'>Click here</Link></td>
                                            <td class="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                            <button
                                                onClick={()=>{
                                                    dispatch(setDataToUpdate(e))
                                                    router.visit("/dashboard/update_product")
                                                }
                                                }
                                                     className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-200 hover:text-green-600'><TbEdit className=''/>Edit
                                            </button>
                                                <button onClick={()=>deleteProduct(e.slug)} className='flex  justify-between items-center gap-1 p-1 rounded bg-red-50 border border-red-500 text-red-500 hover:bg-red-200 hover:text-red-600'>Delete<RiDeleteBin6Line/></button>
                                            </td>
                                            </tr>
                                        ))

                                        }
                                </tbody>
                                </table>
                                {/* { Object.entries(products.links).map((e)=>{return <h1>{e[0]}</h1>})} */}
                                {/* <Pagination links={Object.entries(products.links)}/> */}
                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                    forcePage={page}
                                    containerClassName="flex items-center justify-start space-x-2 mt-4"
                                    pageClassName=" border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                                    activeClassName=" bg-blue-500 text-white  hover:text-black hover:bg-blue-200"
                                    previousClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                                    nextClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                                    breakClassName="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                                />

                            </div>
                            </div>
                        </div>
                    </div>
                    </Dashboard>

  )
}
