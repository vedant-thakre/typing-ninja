import React, { useEffect, useRef } from 'react'
import { countries, genders } from "../../utils/helper";

const SelectList = ({ type, setOpen, setValue }) => {
  const data = type === "country" ? countries : genders;
  const wrapperRef = useRef();


   useEffect(() => {
     const handleClickOutside = (event) => {
       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
         setOpen(false);
       }
     };

     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [setOpen]);


  return (
    <div
      ref={wrapperRef}
      className="flex absolute left-10 min-w-[140px] z-10 top-12 flex-col gap-2 border-2 border-bprimary rounded-xl bg-secondary py-2 pl-2  max-h-[300px] shadow-lg"
    >
      <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-custom pr-4">
        {data.map((item, index) => (
          <span
            key={index}
            onClick={() => {
              setValue(item?.value);
              setOpen(false);
            }}
            className="text-white font-main text-sm bg-transparent border-2 border-transparent hover:bg-dark hover:rounded-md hover:border-2 hover:border-bprimary hover:cursor-pointer whitespace-nowrap py-1 px-2"
          >
            {item?.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectList


