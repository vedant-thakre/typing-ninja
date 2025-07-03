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
import { getAvatars, updateAvatar } from "../../../store/slices/userSlice";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { RotatingTriangles } from "react-loader-spinner";

export default function ProfileModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const avatars = useSelector((state) => state.user.avatars);
  const apiLoading = useSelector((state) => state.user.apiLoading);

  useEffect(() => {
    if (open) {
      dispatch(getAvatars("ninja"));
    }
  }, [open, dispatch]);
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
            <div className="bg-bgsecondary relative px-3 pt-2 ">
              <IoMdClose
                className="absolute right-2 text-textcolor top-2 text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <div className="sm:flex px-3 sm:items-start">
                <div className="w-full">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold w-full text-center tracking-wide font-route text-textcolor"
                  >
                    Avatars
                  </DialogTitle>
                  {apiLoading ? (
                    <div className="w-full h-[290px] items-center flex justify-center">
                      <RotatingTriangles
                        visible={true}
                        height="70"
                        width="70"
                        strokeColor="white"
                        color={["#ffffff", "#ffffff", "#d3d3d3"]}
                        ariaLabel="rotating-triangles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <div className="py-4 h-[290px] flex flex-wrap gap-4 justify-center">
                      {avatars?.length > 0 &&
                        avatars.map((avatar, index) => {
                          return (
                            <div key={index} onClick={() => {
                              dispatch(updateAvatar(avatar?.url));
                            }}  className="w-[70px] h-[70px]">
                              <img
                                src={avatar?.url}
                                alt="avatar"
                                crossOrigin="anonymous"
                                className="w-full h-full border-[3px] border-transparent  cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:border-primary rounded-full"
                              />
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
