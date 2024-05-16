import { Delete } from '@mui/icons-material';
import React from 'react'
import { useState } from 'react';

const CategCards = () => {

   const dd = [
        {id:1,title:'categ01'},
        {id:2,title:'categ02'},
        {id:3,title:'categ03'},
        {id:4,title:'categ04'},
        {id:5,title:'categ05'},
        {id:6,title:'categ06'},
        {id:7,title:'categ07'},
        {id:8,title:'categ08'},
        {id:9,title:'categ09'},
        {id:10,title:'categ10'},
    ]

    const [isEnter,setisEnter] = useState(false)
  return (
    <div>
    <div>CategCards</div>
    <div className=' grid grid-cols-3 gap-4'>
       {
        dd.map(e=>(
            <div
            onMouseEnter={()=>{setisEnter(true)}}
            onMouseLeave={()=>{setisEnter(false)}}
                key={e.id}
                className='flex cursor-pointer hover:scale-105 hover:border-gray-600  duration-200 ease-in-out relative w-full overflow-hidden items-start h-[7rem] justify-between border rounded-md p-4'
            >
                <span className=' font-serif  text-xl uppercase'>{e.title}</span>
                <span className=' font-bold opacity-10 rotate-6 top-0 right-0 -translate-y-16 absolute text-[11rem]'>{e.id}</span>
                <Delete className={`opacity-0 ${isEnter &&`opacity-100`}  `}/>
            </div>
        ))
    }
    </div>

  </div>

  )
}

export default CategCards;
