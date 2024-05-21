
import withLayout from '../withLayout';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ShoppingCart } from 'phosphor-react';
// import LineChart from "@/Components/LineChart"
import { useSelector,useDispatch } from 'react-redux';
import AddProduct from '@/Components/AddProduct';
import { CalculateOutlined, CategoryOutlined, Shop2 } from '@mui/icons-material';
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
import CategTable from '@/Components/CategTable';
import UserTable from '@/Components/UserTable';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard =  ({ children , auth}) => {
    // const { products } = usePage().props;

    // const [page, setPage] = useState(0);

    console.log("this is auth:",auth)




    const [sidebarOpen, setSidebarOpen] = useState(false)


    const toggleDarkMode = useSelector((state)=>state.changeTheme.value)
    const dispatch = useDispatch()
    const sideOpen = useSelector((state)=>state.sideBar.value)




  const navigation = [
    { name: 'Products', icon: HomeIcon, current: true, href: "/dashboard/products"},
    { name: 'Categories', icon: TbCategory2, current: false , href:"/dashboard/categories"},
    { name: 'Users', icon: UsersIcon, current: false ,href:"/dashboard/users"},
    { name: 'Sales', icon: GiPriceTag, current: false },
    { name: 'Calculations Space',href:"/calculs", icon: CalculateOutlined, current: false },
    { name: 'Statistiques', icon: ChartBarIcon, current: false, href :""}
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '/' },
    { name: 'Settings', href: '/' },
    { name: 'Sign out', href: '/' },
  ]


  return (
    <>

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
                 <Link
                 key={item.name}
                 href={item.href}
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
              {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div> */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white ">
              <AuthenticatedLayout
            user={auth?.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
            <Head  title="Dashboard" />
            <div className='flex flex-col bg-white'>
                    <div className=' '>
                        <WelcomeBanner />
                    </div>

            { children }
            </div>
            </AuthenticatedLayout>
            </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
export default withLayout(Dashboard);

// Dashboard.jsx
// import React from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

// import data from "../utils/data.json"

// const datas = {
//   Demands: [
//     {
//       user_id: 1,
//       cart: [
//         { product_id: 1, quantity: 4 },
//         { product_id: 2, quantity: 1 }
//       ],
//       status: 'pending',
//       payStatus: 'paid'
//     },
//     {
//       user_id: 2,
//       cart: [
//         { product_id: 3, quantity: 2 }
//       ],
//       status: 'completed',
//       payStatus: 'paid'
//     },
//     {
//       user_id: 3,
//       cart: [
//         { product_id: 1, quantity: 1 },
//         { product_id: 2, quantity: 2 },
//         { product_id: 4, quantity: 1 }
//       ],
//       status: 'pending',
//       payStatus: 'unpaid'
//     }
//   ],
//   Favorites: [
//     { user_id: 1, product_id: 1 },
//     { user_id: 2, product_id: 2 },
//     { user_id: 1, product_id: 3 },
//     { user_id: 3, product_id: 1 }
//   ],
//   Reviews: [
//     { user_id: 1, product_id: 1, rating: 5 },
//     { user_id: 2, product_id: 2, rating: 4 },
//     { user_id: 1, product_id: 3, rating: 3 },
//     { user_id: 3, product_id: 1, rating: 2 }
//   ]
// };

// const Dashboard = ({products}) => {
//   console.log("hshshhhsh:",products)
//   // Prepare data for each chart

//   // Bar chart data for product quantities
//   const productQuantities = {};
//   data.Demands.forEach(demand => {
//     demand.cart.forEach(item => {
//       if (productQuantities[item.product_id]) {
//         productQuantities[item.product_id] += item.quantity;
//       } else {
//         productQuantities[item.product_id] = item.quantity;
//       }
//     });
//   });

//   const barData = {
//     labels: Object.keys(productQuantities).map(id => `Product ${id}`),
//     datasets: [
//       {
//         label: 'Quantity',
//         data: Object.values(productQuantities),
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Pie chart data for payment status
//   const paymentStatus = { paid: 0, unpaid: 0 };
//   data.Demands.forEach(demand => {
//     if (demand.payStatus === 'paid') {
//       paymentStatus.paid++;
//     } else {
//       paymentStatus.unpaid++;
//     }
//   });

//   const pieData = {
//     labels: ['Paid', 'Unpaid'],
//     datasets: [
//       {
//         data: [paymentStatus.paid, paymentStatus.unpaid],
//         backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//         borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Line chart data for product ratings
//   const productRatings = {};
//   data.Reviews.forEach(review => {
//     if (productRatings[review.product_id]) {
//       productRatings[review.product_id].push(review.rating);
//     } else {
//       productRatings[review.product_id] = [review.rating];
//     }
//   });

//   const lineData = {
//     labels: Object.keys(productRatings).map(id => `Product ${id}`),
//     datasets: Object.keys(productRatings).map(productId => ({
//       label: `Product ${productId}`,
//       data: productRatings[productId],
//       fill: false,
//       borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
//       tension: 0.1,
//     })),
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Product Quantities</h2>
//         <Bar data={barData} />
//       </div>
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Payment Status</h2>
//         <Pie data={pieData} />
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Product Ratings</h2>
//         <Line data={lineData} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
