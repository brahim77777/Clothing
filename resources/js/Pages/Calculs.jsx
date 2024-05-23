import Simplex_form from "@/Components/Simplex_form";
import axios from "axios";
import { useState,useEffect } from "react";
export default function Calculs ({products}){

    const [datap,setData] = useState(0)
    const [datap2,setData2] = useState(0)
    const data = {
        'X1': [1, 2, 3, 4, 5],
        'X2': [2, 3, 4, 5, 6],
        'Y': [3, 5, 7, 9, 11]
        }


    console.log("data look: ",data)
    console.log("products look: ",products.data)

    console.log("products : ",products)

        const [commands , setCommands] = useState([])

        useEffect(()=>{
         axios.get("/commands").then(res=>{
             setCommands(res.data.commands)
           })
        },[])


    axios.post(`http://127.0.0.2:8000/api/`,{
        data:commands
    }).then(res=>{
        setData(res.data.r_squared_adj)
        // datap = res.data
        console.log("Python data: ",res.data)
    })
    axios.post(`http://127.0.0.2:8000/predict/`,{
        data:commands
    }).then(res=>{
        setData2(res.data.r_squared_adj)
        // datap = res.data
        console.log("Python data: ",res.data)
    })




    return (
        <div class="min-h-screen mx-4 flex flex-col justify-center py-12 sm:px-6 lg:px-8">


        <div>R square adj: {datap }</div>
    {/* <Simplex_form products={products}/> */}


      </div>
    );
}
