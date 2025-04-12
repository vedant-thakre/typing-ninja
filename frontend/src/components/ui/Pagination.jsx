import React from 'react'
import AnimatedButton from '../AnimatedButton';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

const Pagination = ({pageNo, setpageNo}) => {
  return (
    <div className="flex justify-center gap-2 py-2">
      <AnimatedButton
        title={"1"}
        animated={false}
        className={"px-3 py-[2px] border-bdshadow rounded-lg border-2"}
      />
      <AnimatedButton
        icon={<FaLessThan />}
        onClick={() => {
          if (pageNo > 1) setpageNo(pageNo - 1);
        }}
        animated={false}
        className={"px-2 py-[2px] border-bdshadow rounded-lg border-2"}
      />

      <AnimatedButton
        title={pageNo}
        animated={false}
        className={"w-[26px]  py-[2px] bg-transparent  shadow-none rounded-lg"}
      />
      <AnimatedButton
        icon={<FaGreaterThan />}
        onClick={() => setpageNo(pageNo + 1)}
        animated={false}
        className={"px-2 py-[2px] border-bdshadow rounded-lg border-2"}
      />
    </div>
  );
}

export default Pagination
