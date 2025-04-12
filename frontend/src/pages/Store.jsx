import React from 'react'
import coin from "../assets/icons/coin.png";

const Store = () => {
   
  const data = [
    {
      name:"Store Item 1",
      price:"200",
    },
    {
      name:"Store Item 2",
      price:"200",
    },
    {
      name:"Store Item 3",
      price:"200",
    },
    {
      name:"Store Item 4",
      price:"200",
    },
    {
      name:"Store Item 5",
      price:"200",
    },
    {
      name:"Store Item 6",
      price:"200",
    },
  ]  
  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[120px] mb-[50px]">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-secondary flex flex-col items-center gap-3 rounded-2xl shadow-hard"
          >
            <div className="w-full">
              <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                {item.name}
              </h5>
            </div>
            <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
              <div className="grid grid-cols-7 gap-x-6 w-full">
                {/* Labels Column */}
                <div className="flex col-span-3 flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <label className="font-route text-[21px] text-white font-normal flex items-center h-[42px]">
                      Price
                    </label>
                    <img src={coin} alt="coin" className="w-[42px] h-[42px]" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="font-route text-[21px] text-white font-normal flex items-center h-[42px]">
                      Quantity
                    </label>
                    <img src={coin} alt="coin" className="w-[42px] h-[42px]" />
                  </div>
                </div>
                {/* Values Column */}
                <div className="flex col-span-4 flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <p className="font-route text-[21px] text-white font-normal flex items-center h-[42px]">
                      {item.price}
                    </p>
                    <img src={coin} alt="coin" className="w-[42px] h-[42px]" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-route text-[21px] text-white font-normal flex items-center h-[42px]">
                      100
                    </p>
                    <img src={coin} alt="coin" className="w-[42px] h-[42px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Store
