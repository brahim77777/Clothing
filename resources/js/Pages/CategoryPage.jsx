import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BreadcrumbsWithIcon } from "@/Components/Breadcrumbs";
import NavLink from "@/Components/NavLink";
import AdvancedFilter from "../Components/sidebar_filters";
import Tooltip from "@/Components/Tooltip";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import { Link, router } from "@inertiajs/react";

export default function CategoryPage({category}) {
    const products = useSelector(state=>state.products.value)
    console.log("here is products ::", products)
    const [productsData, setProductsData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = (page = 1) => {
        axios.get(`/products/category?page=${page}`)
            .then((res) => {
                console.log("commands: ",res.data.commands.data)
                setProductsData(res.data.commands.data);
                setPageCount(res.data.commands.last_page); // Assuming 'last_page' is correct
                setCurrentPage(res.data.commands.current_page); // Set the current page
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    };



    const handlePageClick = (data) => {
        console.log("data->"    ,data)
        setCurrentPage(data.selected + 1);
    };

    return (
        <div className="p-2">
            <div className="flex flex-col items-center">
                <div className="py-2 border-b w-[90vw] lg:w-[84.5vw]">
                    <div className="w-full mb-1">
                        <div className="border bg-gray-50 w-fit rounded-lg border-gray-400">
                            <BreadcrumbsWithIcon/>
                        </div>
                    </div>
                    <h1 className="text-3xl italic">{}</h1>
                    <div className="mt-4 flex justify-between items-center">

                        <div className="flex justify-center items-center gap-2">
                            <Tooltip children={"Filter & Sort"} position={"left"} className={""} />
                            <AdvancedFilter />
                        </div>
                    </div>
                </div>
                <div className='m-auto mt-[3rem] gap-6 grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1' style={{ placeItems: 'center' }}>
                    {productsData?.map((e, index) => (
                        <Card
                            product={e}
                            index={index}
                            key={index}
                        />
                    ))}
                </div>
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={currentPage - 1}
                    containerClassName="flex items-center justify-start space-x-2 mt-4"
                    pageClassName="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                    activeClassName="bg-blue-500 text-white hover:text-black hover:bg-blue-200"
                    previousClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                    nextClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                    breakClassName="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                />
            </div>
        </div>
    );
}
