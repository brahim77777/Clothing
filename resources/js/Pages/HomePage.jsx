import '../../css/app.css';
import React, { useEffect, useState } from "react";
import { Link, Head } from '@inertiajs/react';
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Hero from "../Components/Hero"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch,useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Table from "../Components/Table"
// import Drag from "../Components/Drag"
import Carousel1 from '@/Components/Carousel2';
import { More, MoreHoriz } from '@mui/icons-material';
import { Disclosure } from '@headlessui/react'
import { CiCircleMore } from "react-icons/ci";
import { setRefresh } from '@/redux/refreshSlice';

function App({categories, products}) {

  const toggleDarkMode = useSelector((state) => state.changeTheme.value)
  const refresh = useSelector(state=>state.refresh.value)
  const dispatch = useDispatch()
  const darkTheme = createTheme({
      palette: {
      mode:toggleDarkMode?'dark':"light",
      },
  });

    if(refresh){
        window.location.reload()
        dispatch(setRefresh(false))
    }


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
      setIsExpanded(!isExpanded);
  };
  function HomePage(){
    return(
      <div className=''>
        <Hero/>

        <Disclosure as="nav" className={`sticky-filter-bar sm:text-lg text-sm bg-black sticky top-[60px] flex items-baseline transition-all duration-300   backdrop-filter bg-opacity-85 ${isExpanded ?`h-full`:`max-sm:h-[2.6rem] h-12`}   overflow-hidden  backdrop-blur-lg  z-30  text-white flex  justify-between underline gap-4 px-6 py-2  w-full border-b-[3px] border-y-white  `}>
          <div className=' flex flex-nowrap gap-6 under justify-between w-full'>
            <div className='sm:gap-1 gap-2 grid grid-cols-9 max-lg:grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-3 max-w-[80%] '>

                {categories.map((category) => (
                    <Link className="flex items-center gap-1 font-semibold min-w-fit" key={category.id} href={"/products/category/"+category.title}>{category.title} <ArrowRightIcon className=" size-5 "/></Link>
                ))
                }
            </div>
            <button className='self-baseline' onClick={toggleExpand}><MoreHoriz className='border rounded-full'/></button>
            <div className='w-fit'>
                <Link className="flex items-center gap-1 font-semibold text-nowrap " href="/products">VIEW ALL <ArrowRightIcon className=" size-5 "/></Link>
            </div>
            </div>

        </Disclosure>
        <div>
        {/* <div className='m-auto mx-[3rem] mt-[3rem] gap-6 grid xl:grid-cols-4 2xl:grid-cols-5 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1' style={{ placeItems: 'center' }}> */}
                  <Carousel1 isHome={true} Data={products}/>
        </div>
      </div>
    )
  }


  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  const[sy,setSy] = useState(window.screenY)
  useEffect(()=>{
    setSy(window.screenY)
  },[window.screenY])


  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className={`HomePage`}>
      <div className='flex items-center  '>
      <div className='w-full h-screen absolute'>
      </div>
      </div>
        <HomePage/>
    </div>
    <button onClick={()=>ScrollToTop()}
      className={`bg-[#c9a98a]  text-[#543214] p-3 border border-[#543214]  mr-4 mb-4 bottom-4 fixed ${sy > 300 ?`flex`:`hidden`}  right-0 z-50 rounded-full`}>
      <ArrowUpIcon className=' size-5'/>
      {window.scrollY}
    </button>

    </ThemeProvider>
  );
}

export default App;









