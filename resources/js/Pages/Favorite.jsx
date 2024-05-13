import { useState } from "react";
import { GoHeartFill } from "react-icons/go";

function Favorite() {
    const [focus, setFocus] = useState({state : false , target : -1});

    const onEnter = (index) => {
        setFocus({state : true, target : index});
    };
    const onLeave = (index) => {
        setFocus({state : false, target : -1});
    };
    const itemsLength = 7;

    const Img = "https://assets.adidas.com/images/w_600,f_auto,q_auto/e6cfc08723f14d5aa821572ebbf15722_9366/Messi_Inter_Miami_CF_Tee_Black_JJ2296_01_laydown.jpg";

    return (
        <div className=" ">
            <div className="sm:p-12 p-4 space-y-4  ">
                <div className="">
                    <h1 className="font-bold text-3xl">MY WISHLIST</h1>
                    <div className="text-gray-900 ">{itemsLength} Items</div>
                </div>
                <div className='m-auto mt-[3rem] gap-6 grid  grid-cols-5  max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1' style={{ placeItems: 'center' }}>
                    {Array.from({ length: itemsLength }, (_, index) => (
                        <div
                            onMouseEnter={() => onEnter(index)}
                            onMouseLeave={() => onLeave(index)}
                            // onClick={() => onEnter(index)}
                            key={index}
                            className="relative"
                            >
                            <div className=" absolute w-full z-30  end-0 justify-end flex  m-[.71rem] ">
                                <GoHeartFill className="stroke-2 fill-black stroke-black"/>
                            </div>
                            <div className={`  border border-gray-600 ${(focus.state)?((focus.target === index)?` z-405 bg-white scale-105 ring `:` -z-50`):``} duration-300   `}>

                                <img className="min-size-48 size-60 max-md:w-full min-w-[12rem]" src={Img} alt="Item" />
                                <div className="m-2 h-fit">
                                    <h1>Messi Inter Miami CF Tee</h1>
                                    <h2>Classic</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favorite;
