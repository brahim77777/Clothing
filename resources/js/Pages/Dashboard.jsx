/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import withLayout from '../withLayout';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ShoppingCart } from 'phosphor-react';
// import LineChart from "@/Components/LineChart"
import { useSelector,useDispatch } from 'react-redux';
import AddProduct from '@/Components/AddProduct';
import { Shop2 } from '@mui/icons-material';
import { TbBrandProducthunt } from 'react-icons/tb';
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

import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from 'react-icons/tb';
import { FcAddRow } from 'react-icons/fc';
import axios from 'axios';




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

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'Team', href: '/', icon: UsersIcon, current: false },
  { name: 'Projects', href: '/', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '/', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '/', icon: InboxIcon, current: false },
  { name: 'Reports', href: '/', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/' },
  { name: 'Settings', href: '/' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = ({ auth, products }) => {
    console.log("From dashboard: ",products)
    console.log(products.data)
    const [productsList,setProductsList] = useState(products.data)
    const openStat = useSelector((state) => state.openStatState.value)
    const openProductsState = useSelector((state) => state.openProductsState.value)
    console.log(openStat)
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


  const [sidebarOpen, setSidebarOpen] = useState(false)

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
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
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
                        </Link>
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
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
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
                  </Link>
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
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white ">
              <AuthenticatedLayout
            user={auth.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
            <Head  title="Dashboard" />
            <div className='flex bg-white'>

            {(openStat)&&
                    <main className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-white'} h-full p-4 ml-auto `}>
                    <div className=''>
                        <WelcomeBanner />
                    </div>
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
                        {/* {setAddProduct(!isInAddProduct)} */}
                        {/* <div className='card h-[10rem] bg-white p-6 relative '>
                            <EyeIcon className='size-[3rem] p-3 rounded-full mb-2 bg-indigo-50 text-indigo-700'/>
                            <div>
                                <div className=' font-bold text-xl'>3.458k</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total view</label>
                            </div>
                            <div className=' text-green-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>0.43%<ArrowUp/></div>
                        </div>


                        <div className='card h-[10rem] bg-white p-6 relative '>
                            <ShoppingCart className='size-[3rem] p-3 rounded-full mb-2 bg-indigo-50 text-indigo-700'/>
                            <div>
                                <div className=' font-bold text-xl'>$45.23k</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total profit</label>
                            </div>
                            <div className=' text-green-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>4.35%<ArrowUp/></div>
                        </div>


                        <div className='card h-[10rem] bg-white p-6 relative  '>
                            <div className='p-2 bg-indigo-50 size-12 rounded-full flex  items-center justify-center '>
                                <HiOutlineShoppingBag className='size-[1.6rem]  text-indigo-700'/>
                            </div>
                            <div>
                                <div className=' font-bold text-xl'>160</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total view</label>
                            </div>
                            <div className=' text-green-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>2.59%<ArrowUp/></div>
                        </div>


                        <div className='card h-[10rem] bg-white p-6 relative '>
                            <UsersIcon className='size-[3rem] p-3 rounded-full mb-2 bg-indigo-50 text-indigo-700'/>
                            <div>
                                <div className=' font-bold text-xl'>3.456</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total users</label>
                            </div>
                            <div className='text-blue-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>0.95%<ArrowDown/></div>
                        </div>*/}
                    </div>
                </main>
        }

{((openProductsState))&&<div className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300  ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-white text-gray-900'} h-full  p-4  ml-auto `}>
                                    {/* // temp */}
                                    {/* <div className='mt-64'></div> */}
                            {/* //temp */}

                        <div className=' w-full flex justify-end'>

                            <button onClick={()=>{
                                // dispatch(openStat(false))
                                setAddProduct(true)
                                dispatch(openProducts(false))
                                }} className="flex bg-white bg-opacity-75 items-center py-1 rounded-md pl-2 pr-[4px] justify-between border border-gray-500">Add<MdAdd/></button>
                        </div>
                        <div class="overflow-x-auto w-full mx-auto   ">

                            <div class="inline-block min-w-full py-2  rounded-md mt-4 ">
                            <div class="overflow-hidden  ">
                                <table
                                class="min-w-full bg-white rounded-md  text-left text-sm font-light text-surface  ">
                                <thead
                                    class={`border-b   border-neutral-200 font-medium text-nowrap `}>
                                    <tr>
                                    <th scope="col" class="px-6 py-4 pr-10">Slug</th>
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
                                            <td class="whitespace-nowrap px-6 py-4 font-medium  max-w-[100px] duration-300 m-auto flex items-center jus absolute  hover:max-w-full bg-white h-full line-clamp-1">{e.slug}</td>
                                            <td class=" whitespace-nowrap px-6 py-4">{e.title}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.quantity}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.updated_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.created_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.price}</td>
                                            <td class="whitespace-nowrap px-6 py-4"><Link href={'/products/'+e.slug} className='px-2 bg-gray-50 hover:bg-neutral-100 py-1 border-gray-500  rounded border'>Click here</Link></td>
                                            <td class="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                                <button className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-600 hover:text-black'><TbEdit className=''/>Edit</button>
                                                <button onClick={()=>deleteProduct(e.slug)} className='flex justify-between items-center gap-1 p-1 rounded bg-red-50 border border-red-500 text-red-500 hover:bg-red-600 hover:text-black'>Delete<RiDeleteBin6Line /></button>
                                            </td>
                                            </tr>
                                        ))

                                        }
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>}

                    {
                        ((isInAddProduct)&&<AddProduct setAddProduct={setAddProduct} isInAddProduct={isInAddProduct}/>)
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
