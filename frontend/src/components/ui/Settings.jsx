import React from 'react'
import AnimatedButton from '../AnimatedButton';

const Settings = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-secondary mb-[50px]  mt-[120px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Account Settings
          </h5>
        </div>
        <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
          <div className="grid grid-cols-7 gap-x-6 w-full">
            {/* Labels Column */}
            <div className="flex col-span-3 flex-col gap-4">
              {[
                "Username:",
                "Daily Goal:",
                "Email:",
                "Country:",
                "Age:",
                "Gender:",
                "Bio:",
              ].map((label, index) => (
                <>
                  {label === "Email:" ? (
                    <div className="flex gap-2 items-center">
                      <label
                        key={index}
                        className="font-route text-[21px] text-white font-normal flex items-center h-[42px]"
                      >
                        {label}
                      </label>
                      <AnimatedButton
                        title={"VALIDATE EMAIL"}
                        className="bg-[#4865cd] font-bold rounded-md w-[105px] h-[26px] py-[3px] font-route text-md "
                      />
                    </div>
                  ) : (
                    <label
                      key={index}
                      className="font-route text-[21px] text-white font-normal flex items-center h-[42px]"
                    >
                      {label}
                    </label>
                  )}
                </>
              ))}
            </div>

            {/* Input Fields Column */}
            <div className="flex col-span-4 flex-col gap-4">
              {/* Username (Non-Editable) */}
              <div className="flex items-center h-[42px]  pr-3 rounded-md text-white font-main text-sm ">
                Vedant
              </div>

              {/* Editable Fields */}
              <input
                type="number"
                className="border-2 border-bprimary w-[260px] rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-dark text-white h-[42px] flex items-center"
              />
              <input
                type="email"
                className="border-2 border-bprimary w-full rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-dark text-white h-[42px] flex items-center"
              />
              <input
                type="text"
                className="border-2 border-bprimary w-full rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-dark text-white h-[42px] flex items-center"
              />
              <input
                type="number"
                className="border-2 border-bprimary w-full rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-dark text-white h-[42px] flex items-center"
              />
              <input
                type="text"
                className="border-2 border-bprimary w-full rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-dark text-white h-[42px] flex items-center"
              />
              <textarea
                rows={5}
                className="border-2 border-bprimary w-full rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-dark text-white h-[100px] flex items-center"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <AnimatedButton
              title={"SAVE"}
              className="bg-primary font-bold rounded-lg px-4 py-[2px] font-route text-lg border-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings
