import { Menu, Transition } from '@headlessui/react';
import React, { useState, Fragment } from 'react';
import { useEffect } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setSelectedCategories } from '@/redux/selectCategoriesSlice';



export default function DropDown({Items}) {
    const [selectedItem, setSelectedItem] = useState([]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setSelectedCategories(selectedItem))
        console.log("selectedItem: ",selectedItem)
    },[selectedItem])

    return(
        <Menu as="div" className="relative align-middle items-center   ">
        <div className=' '>
        <Menu.Button className={"flex items-center justify-between px-2 border   rounded w-full  border-zinc-300 p-1  space-x-8 h-10  "} >
        <div className="[word-spacing:5px] line-clamp-1 text-left">

            {selectedItem.map(e => (
                <span key={e} className="bg-neutral-200 p-1 text-neutral-600 rounded-lg mx-1">{e}</span>
            ))}
        </div>

            <div>
                <MdKeyboardArrowDown size={20} />
            </div>
            </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute  z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {console.log("selectedItem: ", Items)}{console.log(Items)}
                  {Items?.map((item,index)=>(
                    <Menu.Item key={index}>
                      {({ active }) => (
                               <button
                               onClick={(e) => {
                                e.preventDefault()
                                selectedItem.includes(item.title)
                                    ? setSelectedItem(selectedItem.filter(selectedItem => selectedItem !== item.title))
                                    : setSelectedItem([...selectedItem, item.title]);
                            }}
                               className={classNames(active ? 'bg-gray-100' : '', ' relative  px-4 py-2 text-sm text-gray-700 w-full text-start flex space-x-3 items-center')}
                             >
                              <input id={item.id} type="checkbox" checked={selectedItem.includes(item.title)} />
                              <label className='z-0' htmlFor={item.id}>{item.title}</label>
                              <div className='bg-transparant w-full h-full absolute '></div>
                             </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
        </Transition>
        </Menu>
    )}
