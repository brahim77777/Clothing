import { BreadcrumbsWithIcon } from "@/Components/Breadcrumbs";
import NavLink from "@/Components/NavLink";
import { Navbar } from "@material-tailwind/react";
import AdvancedFilter from "../Components/sidebar_filters"
import TextInput from "@/Components/TextInput";
import Tooltip from "@/Components/Tooltip";
import Card from "../Components/Card"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

export default function ViewAll({products}){
    const data = useSelector(state=>state.products.value)

    const[productsData,setProductData] = useState(products.data)
    useEffect(() => {
        console.log("Redux products: ", data?.products);
        console.log("Not Redux products: ", products.data);

        if (data !== null) {
            console.log("Setting product data from Redux");
            setProductData(data?.products || []);
        } else {
            console.log("Setting product data from initial props");
            setProductData(products.data || []);
        }
    }, [data, products.data]);

    return(
        <div className="p-2">
            <div className="flex flex-col items-center ">
                <div className=" py-2 border-b  w-[90vw] lg:w-[84.5vw]">
                <div className="w-full mb-1">
                    <div className="border bg-gray-50 w-fit rounded-lg border-gray-400">
                        <BreadcrumbsWithIcon />
                    </div>
                </div>
                    <h1 className="text-3xl italic">NEW CLOTHES</h1>
                    <div className="mt-4 flex justify-between items-center ">
                        <div className="flex gap-2">
                        <NavLink className=""  >New Arrivals</NavLink>
                        <NavLink >Best Sellers</NavLink>
                        <NavLink >Newest</NavLink>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <Tooltip children={"Filter & Sort"} position={"left"} className={"  "}/>
                            <AdvancedFilter/>
                        </div>
                    </div>
                </div>
                <div className='m-auto mt-[3rem] gap-6 grid  grid-cols-5  max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1' style={{ placeItems: 'center' }}>
                {productsData?.map((e,index)=>(
                    <Card
                        slug={e.slug}
                        title={e.title}
                        price={e.price}
                        main_image={e.main_image}
                        index={index} key={index}/>
                  ))}

                </div>
            </div>

        </div>
    )
}
