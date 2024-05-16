
import withLayout from '../withLayout';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ShoppingCart } from 'phosphor-react';
// import LineChart from "@/Components/LineChart"
import { useSelector,useDispatch } from 'react-redux';
import AddProduct from '@/Components/AddProduct';
import { CategoryOutlined, Shop2 } from '@mui/icons-material';
import { TbBrandProducthunt, TbCategory2 } from 'react-icons/tb';
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { useEffect } from 'react';
import {Link} from '@inertiajs/react';
// import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
// import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
// import FilterButton from '../Components/DropdownFilter';
// import Datepicker from '../Components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
// import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import { Add, EditTwoTone } from '@mui/icons-material';
import { openProducts } from '@/redux/openProductsSlice';
import { MdAdd, MdDelete } from 'react-icons/md';
// import Banner from '../partials/Banner';
import { openStat } from '@/redux/openStatSlice';
import {usePage,router} from '@inertiajs/react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from 'react-icons/tb';
import { FcAddRow, FcSalesPerformance } from 'react-icons/fc';
import axios from 'axios';

import Logo from "../../../public/Logo.svg"


import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { GiPriceTag } from 'react-icons/gi';
import { Pagination } from '@mui/material';
import ReactPaginate from 'react-paginate';
import { setPage } from '@/redux/pageSlice';
import CategCards from '@/Components/CategCards';
import CategTable from '@/Components/CategTable';
import UserTable from '@/Components/UserTable';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = ({ auth ,pageCount ,products}) => {
    // const { products } = usePage().props;

    // const [page, setPage] = useState(0);

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



    console.log("From dashboard: ",products)
    console.log(products.data)
    const [productsList,setProductsList] = useState(products.data)
    const openStatState = useSelector((state) => state.openStatState.value)
    const openProductsState = useSelector((state) => state.openProductsState.value)
    console.log(openStatState)
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
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const[isInAddProduct,setAddProduct] = useState(!openProductsState)
    useEffect(() => {
      const checkScreenWidth = () => {
        setIsMediumScreen(window.innerWidth <= 768); // Assuming medium screen width is 768px or less
      };

      checkScreenWidth(); // Check on component mount

      const handleResize = () => {
        checkScreenWidth();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // //////////////////////////////////

    const [isInCategTable,setisInCategTable] = useState(false)
    const [isInUsersTable,setisInUsersTable] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, current: openProductsState, func: ()=>{
      dispatch(openProducts(true))
      dispatch(openStat(false))
      setAddProduct(false)
      setisInCategTable(false)
      setisInUsersTable(false)
      }},
    { name: 'Categories', icon: TbCategory2, current: isInCategTable , func:()=>{
      setisInCategTable(true)
      dispatch(openStat(false));
      dispatch(openProducts(false));
      setAddProduct(false)
      setisInUsersTable(false)
    } },
    { name: 'Users', icon: UsersIcon, current: isInUsersTable ,func:()=>{
      setisInUsersTable(true)
      setisInCategTable(false)
      dispatch(openStat(false));
      dispatch(openProducts(false));
      setAddProduct(false)
    } },
    { name: 'Sales', icon: GiPriceTag, current: false },
    { name: 'Statistiques', icon: ChartBarIcon, current: openStatState, func :()=>{
      dispatch(openStat(true));
      dispatch(openProducts(false));
      setAddProduct(false)
      setisInCategTable(false)
      setisInUsersTable(false)

      }}
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '/' },
    { name: 'Settings', href: '/' },
    { name: 'Sign out', href: '/' },
  ]

  const [dataToUpdate,setdataToUpdate] = useState({})
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className=''>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <Link href='/' className="flex w-full  bg-gray-900 px-4 top-0 absolute text-white font-serif font-thin text-2xl h-16 flex-shrink-0 items-center ">
                    <h1>BAZGUI</h1>
                    </Link>
                  <div className="mt-[5rem] h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          onClick={item.func}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex cursor-pointer items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <Link href='/' className="flex text-white font-serif font-thin text-2xl h-16 flex-shrink-0 items-center bg-gray-900 px-4">
             <h1>BAZGUI</h1>
            </Link>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4 ">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    onClick={item.func}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center cursor-pointer px-2 py-2 text-base font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 ">
            <div className="py-6 bg-white">
              {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div> */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white ">
              <AuthenticatedLayout
            user={auth.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
            <Head  title="Dashboard" />
            <div className='flex flex-col bg-white'>
                    <div className=' '>
                        <WelcomeBanner />
                    </div>
            {(openStatState)&&
                    <main className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-white'} h-full p-4 ml-auto `}>
                    {/* <div className=''>
                        <WelcomeBanner />
                    </div> */}
                    <div className='cards grid grid-cols-12 min-w-[13rem]  gap-6 mt-[2rem]  '>

                        <DashboardCard01 />
                        <DashboardCard02 />
                        <DashboardCard03 />
                        <DashboardCard04 />
                         <DashboardCard05 />
                        <DashboardCard06 />
                        <DashboardCard07 />
                        <DashboardCard08 />
                        <DashboardCard09 />
                        <DashboardCard11 />
                        <DashboardCard12 />
                        <DashboardCard13 />
                    </div>
                </main>
        }

{((openProductsState))&&<div className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300  ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-white text-gray-900'} h-full  p-4  ml-auto `}>


                        <div className=' w-full flex justify-end'>

                            <button onClick={()=>{
                                setdataToUpdate({})
                                setAddProduct(true)
                                dispatch(openProducts(false))
                                }} className="flex bg-white bg-opacity-75 items-center py-1 rounded-md pl-2 pr-[4px] justify-between border border-gray-500">Add<MdAdd/></button>
                        </div>
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
                                    <th scope="col" class="px-6 py-4">Quantity</th>
                                    <th scope="col" class="px-6 py-4">Last Update</th>
                                    <th scope="col" class="px-6 py-4">Created at</th>
                                    <th scope="col" class="px-6 py-4">Price</th>
                                    <th scope="col" class="px-6 py-4">More Details</th>
                                    <th scope="col" class="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {productsList.map((e,index)=>(
                                            <tr
                                            class="border-b relative border-neutral-200  transition duration-300 ease-in-out hover:bg-neutral-100  ">
                                            {/* <td class="whitespace-nowrap px-6 py-4 font-medium  max-w-[100px] duration-300 m-auto flex items-center jus absolute  hover:max-w-full bg-white h-full line-clamp-1">{e.slug}</td> */}
                                            <td class="whitespace-nowrap px-6 py-4 ">{index+1}</td>
                                            <td class=" whitespace-nowrap px-6 py-4">{e.title}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.quantity}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.updated_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.created_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.price}</td>
                                            <td class="whitespace-nowrap px-6 py-4"><Link href={'/products/'+e.slug} className='px-2 bg-gray-50 hover:bg-neutral-100 py-1 border-gray-500  rounded border'>Click here</Link></td>
                                            <td class="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                                <button onClick={()=>{
                                                    setdataToUpdate(e)
                                                    setAddProduct(true);
                                                    dispatch(openStat(false));
                                                    dispatch(openProducts(false));
                                                    }} className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-200 hover:text-green-600'><TbEdit className=''/>Edit</button>
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
                    </div>}

                    {
                        ((isInAddProduct)&&<AddProduct dataToUpdate={dataToUpdate} setAddProduct={setAddProduct} isInAddProduct={isInAddProduct}/>)
                    }

                    {
                      (isInCategTable)&&<CategTable/>
                    }
                    {
                      (isInUsersTable)&&<UserTable/>
                    }
        </div>
        </AuthenticatedLayout>
                {/* <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                </div> */}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
export default withLayout(Dashboard);
