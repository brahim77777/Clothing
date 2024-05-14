import React, { useState , useEffect} from 'react';
import { Disclosure } from '@headlessui/react'
import { Badge, Button } from "@material-tailwind/react";
import Cart from './Cart';
import UserDropDown from "./Dropdown2"
import { useDispatch, useSelector } from 'react-redux';
import SwitchTheme from './SwitchTheme';
import { TbSearch } from 'react-icons/tb';
import { setOpenSide } from '@/redux/sideBarSlice';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LangMenu from './LangMenu';
import { useAnimation } from 'framer-motion';
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from '@inertiajs/react';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { search } from '@/redux/searchSlice';
// import {useSelector, useDispatch} from 'react-redux';
import Logo from "../../../public/Logo.svg"
<Link href="/">Home</Link>

function Nav() {
  const count = useSelector((state)=>state.addToCart.value)

  const auth = useSelector((state)=>state.auth.value)
  console.log("thisis Nav")
  console.log(auth)
  const toggleDarkMode = useSelector((state) => state.changeTheme.value)

  const [currentPath,setCurrentPath] = useState(window.location.pathname);
  useEffect(()=>{
    setCurrentPath(window.location.pathname)
  },[window.location])
console.log("Current Path: ",currentPath)

  const menu = [
    { name: 'Home', url: '/', className: "inline-flex items-center border-b-2 border-transparent px pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 px-0 " },
    { name: 'Trending', url: '/trending', className: "inline-flex items-center border-b-2 border-transparent px pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700  px-0 " },
    { name: 'About us', url: '/about_us', className: "inline-flex items-center border-b-2 border-transparent px pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700  px-0 " },
    { name: 'Contact us', url: auth ? auth?.email+'/contact_usTURE': auth?.email+'/contact_usFALSE', className: " inline-flex items-center border-b-2 border-transparent px pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700  px-0 " },
  ];
  if(auth?.user?.role === "admin"){
    menu.push(    { name: 'dashboard', url: '/dashboard', className: "inline-flex items-center border-b-2 border-transparent px pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700  px-0 " })
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [isOpen, setOpen] = useState(false)
  const [inputValue,setInputValue] = useState("")
 // Brahim's modifications


  const [isInputOpen , setInputOpen] = useState(false)
  const color = "[#AC8C6F]"
  const sideOpen = useSelector((state)=>state.sideBar.value)

  const dispatch = useDispatch()
  useEffect(()=>{
    (inputValue==="")&&dispatch(search(null))
    if(inputValue)
        axios.get(`/api/search/${inputValue}`).then((res)=>{
            dispatch(search(res.data))
            console.log("this is axios", inputValue)
            console.log(res.data)
        })
  },[inputValue])

  return (


    <Disclosure as="nav" >
      {({ open }) => (
        <>
        <Cart  isOpen={isOpen} setOpen={setOpen} />
        <div className={`${toggleDarkMode ? `bg-[#121212]`:`bg-white`} fixed w-full top-0  border-b border-b-black z-50 backdrop-filter bg-opacity-75  backdrop-blur-lg `}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10  ">
          <div className="flex h-16 justify-between  ">
            <div className="flex justify-between items-center h-full w-full px-6 ">
            <button onClick={()=>{dispatch(setOpenSide(!sideOpen))}} className={`${sideOpen?` opacity-0 hidden`:` opacity-100 `} duration-500 z-50 fixed flex left-0 mx-2 p-2 hover:bg-gray-200 mt-[3.4px]  rounded cursor-pointer`}>
                <FaBarsStaggered/>
            </button >
              <Link href="/" as="button" className={`flex font-roboto text-${color}  font-bold text-3xl flex-shrink-0 items-center `}>
                <img  className='w-[8rem] object-cover h-12' src={Logo}/>
              </Link>
              <div className={`flex justify-end w-full sm:space-x-4  h-[60%] `}>
                <div className='hidden  lg:flex mr-12 space-x-6  justify-center'>
                {menu.map((e, index) => (
                  <Link as="button" href={e.url} key={index} className={classNames((currentPath === e.url) && " w-fit  border-b-2 border-zinc-400", e.className,` sm:${(isInputOpen)&&`hidden`}`)} >
                    {e.name}
                  </Link>
                ))}
                </div>
                {/* <div className=" h-2 min-h-[1em] w-0.5 m-auto bg-neutral-200 dark:bg-white/10  max-md:hidden">

                </div> */}
                {/* inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 max-md:hidden  */}
                <div className='flex justify-end items-center ml-8  '>
                  <input onChange={(e)=>{
                    (e.target.value ==="")&&dispatch(search(null))
                    setInputValue(e.target.value)

                  } }
                  disabled={!isInputOpen} placeholder={`${(isInputOpen )?`search...`:``}`} type='text' className={` border border-zinc-300 ${(isInputOpen || inputValue !== "")?`w-[30vw]`:`w-[2.4rem] absolute bg-[#AC8C6F]k`} outline-none focus:ring-1 ring-[#AE8D70] px-3 py-[.66rem] rounded-full transition-width duration-300 ease-in-out bg-transparent h-[2.4rem] ${toggleDarkMode&&`bg-black `}`}/>
               {(currentPath !== '/products')? <Link href='/products' onClick={(e)=>{(inputValue === "")&&setInputOpen(!isInputOpen)}} className={`  ${(!isInputOpen)&&` bg-[#AC8C6F]k text-whitek `} duration-200 outline-none  absolute   mr-[.29rem] border-zinc-300  p-1  font-light text- rounded-full`}>
                    <MagnifyingGlassIcon className=" size-5 " />
                  </Link>:
                  <button onClick={(e)=>{(inputValue === "")&&setInputOpen(!isInputOpen)}} className={`  ${(!isInputOpen)&&` bg-[#AC8C6F]k text-whitek `} duration-200 outline-none  absolute   mr-[.29rem] border-zinc-300  p-1  font-light text- rounded-full`}>
                    <MagnifyingGlassIcon className=" size-5 " />
                  </button>}
                </div>

              </div>
            <div className="hidden lg:ml-6 lg:flex lg:items-center space-x-3  h-fit  ">
              <Link href='/Favorite' as='button' className=" bg-[#0095FB]f border border-zinc-300  p-2 font-light text- rounded-full">
                <HeartIcon className=" size-5" />
              </Link>
                {/* <UserIcon className=" size-5" /> */}
                {console.log("auth",useSelector((state)=>state.auth.value))}
                <UserDropDown toggleDarkMode={toggleDarkMode}  />
                {/* {toggleDarkMode?"true":"false"} */}

              <Badge content={count} className={`${(count === 0)? `hidden`:`flex`} bg-red-500 items-center justify-center min-w-4 max-h-4 ml-7 -translate-y-1`}>
              <Button
                onClick={()=>setOpen(!isOpen)}
                className=" bg-[#0095FB]f border border-zinc-300  p-2 font-light text- rounded-full ">
                <ShoppingCartIcon className=" size-5" />
              </Button>
              </Badge>

            </div>
            </div>
            <div className=' flex items-center space-x-5 justify-center my-auto max-lg:hidden'>
            <SwitchTheme/>
            </div>
            <div className='my-auto lg:size-0'>
              <div className="-mr- flex justify-center w-full  items-center lg:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>

            </div>
          </div>
        </div>
        </div>
        <div className={`${(open)?`top-[3.59rem]`:`top-[-15rem]`} transition-all z-50 duration-500 ease-in-out w-full lg:hidden fixed  bg-white border-b border-black`}>
          <div className="space-y-1 pt-2 pb-3 ">
            {menu?.map((e,index)=>(
            <Link as="button"
              key={index}
              href={e.url}
              className={`${(currentPath === e.url) ? `bg-[#be8e5f2f] hover:bg-[#ae7b482f]`:`hover:bg-gray-50`}  block border-l-4 border-[#AC8C6F]  py-2 pl-3 pr-4 text-base font-medium text-${color} `}
            >
              {e.name}
            </Link>))}

          </div>
        </div>
      </>
      )}
      </Disclosure>
  );
}

export default Nav;
