import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

const ViewSnippetModal = ({ open, setOpen, snippet }) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative  z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/35 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative  transform overflow-hidden rounded-lg bg-dark text-left shadow-hard transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full md:max-w-2xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-bgsecondary relative ">
              <IoMdClose
                className="absolute right-2 text-textcolor top-2 text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <div className="sm:flex  sm:items-start">
                <div className="w-full">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold bg-primary w-full py-2 text-center tracking-wide font-route text-textcolor"
                  >
                    Snippet
                  </DialogTitle>
                  <div className="flex w-full flex-col mx-1 gap-2 pb-5 px-5 rounded-2xl">
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col col-span-2 ">
                          <p className="font-route text-[21px] text-textcolor font-normal">
                            Title
                          </p>
                          <input
                            placeholder="Enter title..."
                            value={snippet.title}
                            type="text"
                            className="border-2 border-bprimary  ml-2 mt-[-5px] lg:ml-0 rounded-md  placeholder-textsecond outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
                          />
                        </div>
                        <div className="flex flex-col col-span-1 ">
                          <p className="font-route text-[21px] text-textcolor font-normal">
                            Difficulty
                          </p>
                          <select
                            name=""
                            value={snippet.difficulty}
                            className="border-2 border-bprimary cursor-pointer  ml-2 mt-[-5px] lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px]  bg-transparent text-textcolor"
                            id=""
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className="font-route text-[21px] text-textcolor font-normal">
                            Content
                          </p>
                        </div>
                        <textarea
                          rows={12}
                          value={snippet.content}
                          placeholder="The content of your snippet..."
                          className="border-2 border-bprimary w-full font-route text-[20px] leading-6 tracking-wide  mt-[-5px] placeholder:font-route rounded-md placeholder:text-[20px]  placeholder-textsecond outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor flex items-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewSnippetModal;
