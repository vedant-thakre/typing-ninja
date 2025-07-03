import React from 'react'

const ListSkeletton = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      <>
        {[0, 0, 0, 0, 0, 0, 0,0,0,0].map((_, index) => (
          <div
            key={index}
            className="w-full h-14 bg-bgprimary rounded-xl animate-pulse"
          />
        ))}
      </>
     </div>
  );
}

export default ListSkeletton
