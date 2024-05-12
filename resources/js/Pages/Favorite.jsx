import { useState } from "react";

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
                <div className="md:flex grid max-sm:grid-cols-2  max-md:grid-cols-3 gap-2 flex-wrap justify-start ">
                    {Array.from({ length: itemsLength }, (_, index) => (
                        <div
                            onMouseEnter={() => onEnter(index)}
                            onMouseLeave={() => onLeave(index)}
                            className={` border border-gray-600 ${(focus.state)?((focus.target === index)?` z-50 bg-white   scale-110 `:` -z-50`):``} duration-300 p-2  `}
                            key={index}
                        >
                            <img className="min-size-48 size-52" src={Img} alt="Item" />
                            <div>
                                <h1>Messi Inter Miami CF Tee</h1>
                                <h2>Classic</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className={`size-[100rem] -z-10 ${focus.state&&`bg-black opacity-60`} duration-300   absolute top-0 `}></div> */}
        </div>
    );
}

export default Favorite;
