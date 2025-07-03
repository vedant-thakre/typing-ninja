import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoWarningOutline } from "react-icons/io5";
import AnimatedButton from "./AnimatedButton";
import { deleteMessage } from "../../../store/slices/chatSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Modal({ open, setOpen, title, subTitle, handleClick, buttonText, errorButton=true }) {
  
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/35 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-dark text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-dark px-3 pt-4 sm:px-2">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold  tracking-wide font-route text-white"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-[20px] tracking-wide mt-[-10px] font-route  text-white">
                      {subTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark px-4 py-3 gap-4 sm:flex sm:flex-row-reverse sm:px-6">
              <AnimatedButton
                title={buttonText}
                // disabled={loading ? true : false}
                onClick={handleClick}
                className={`px-4 font-bold flex-1 rounded-lg py-[2px] text-white bg-${
                  errorButton ? "danger" : "success"
                } border-${
                  errorButton ? "bdanger" : "bsuccess"
                } font-route text-lg border-2`}
              />
              <AnimatedButton
                title={"CANCEL"}
                onClick={() => setOpen(false)}
                className="bg-transparent flex-1 border-bprimary border-[3px] text-white px-4 font-bold rounded-lg py-[2px] font-route text-lg"
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
