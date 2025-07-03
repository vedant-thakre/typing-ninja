import React from 'react'
import { BiImageAdd } from 'react-icons/bi';
import AnimatedButton from '../Other/AnimatedButton';
import { getRelativeTime } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from '../../../store/slices/userSlice';
import toast from 'react-hot-toast';

const ProfileBox = ({ isMyProfile , searchedUser, setOpenProfileModal}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiLoading = useSelector((state) => state.user.apiLoading);
    const isFriend = useSelector((state) => state.user.isFriend);
    const user = useSelector((state) => state.user.userData);

    console.log("user", user);
    
    
  return (
    <div className="bg-bgprimary flex-[3.5] h-full flex-col items-center gap-3 rounded-2xl shadow-hard">
      <div className="w-full">
        <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
          Profile
        </h5>
      </div>
      {/* Profile */}
      <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
        <div className="flex items-center flex-col gap-6">
          <div className="flex w-full flex-col items-center gap-2">
            <div className="relative group cursor-pointer w-[100px] h-[100px]">
              <img
                src={isMyProfile ? user?.avatar : searchedUser?.avatar}
                alt="Profile"
                loading="lazy"
                crossOrigin="anonymous"
                className="w-full h-full border-2 bg-bgsecondary p-1 border-bprimary rounded-full object-cover"
              />
              {isMyProfile && (
                <div
                  onClick={() => setOpenProfileModal(true)}
                  className="absolute inset-0 bg-dark bg-opacity-60 rounded-full hidden group-hover:flex items-center justify-center"
                >
                  <BiImageAdd className="text-white" size={30} />
                </div>
              )}
            </div>

            <p className="font-route min-h-[36px] text-[24px] text-textcolor">
              {isMyProfile ? user?.username : searchedUser?.username}
            </p>

            <p className="font-route text-[21px] mt-[-17px] text-textsecond">
              Joined{" "}
              {getRelativeTime(
                isMyProfile ? user?.createdAt : searchedUser?.createdAt
              )}
            </p>


            <div className="flex w-full flex-col gap-1">
              <p className="font-main w-full text-[15px] text-textcolor border-b-2 border-bprimary">
                ABOUT
              </p>
              <div className="flex items-center py-8 justify-center">
                <p className="font-route px-4 text-center leading-[23px] text-[21px] text-textcolor">
                  {isMyProfile
                    ? user?.bio
                      ? user?.bio
                      : " We don't know much about you yet."
                    : searchedUser?.bio
                    ? searchedUser?.bio
                    : " We don't know much about this person yet."}
                </p>
              </div>
            </div>
            {user?._id ? (
              <>
                {isMyProfile ? (
                  <AnimatedButton
                    title={"EDIT PROFILE"}
                    className={
                      "border-4 border-bdshadow text-white py-1 w-full font-bold rounded-lg font-route text-[20px]"
                    }
                    onClick={() => {
                      navigate("/settings");
                      getRelativeTime("Settings");
                    }}
                  />
                ) : (
                  <>
                    {apiLoading ? (
                      <AnimatedButton
                        icon={
                          <RotatingLines
                            visible={true}
                            height="32"
                            width="32"
                            color="white"
                            strokeWidth="5"
                            strokeColor="white"
                            animationDuration="2"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        }
                        className={
                          "border-4 border-bdshadow w-full text-white flex justify-center py-1 font-bold rounded-lg font-route text-[20px]"
                        }
                        onClick={() => {
                          navigate("/settings");
                          getRelativeTime("Settings");
                        }}
                      />
                    ) : (
                      <AnimatedButton
                        title={
                          isFriend?.isFriend
                            ? "MESSAGE"
                            : isFriend?.requested
                            ? "REQUESTED"
                            : "ADD FRIEND"
                        }
                        className={
                          "border-4 border-bdshadow text-white w-full py-1 font-bold rounded-lg font-route text-[20px]"
                        }
                        onClick={() => {
                          if (isFriend?.isFriend) {
                            navigate(
                              `/chats/${searchedUser?.username}/${searchedUser?._id}`
                            );
                          } else if (isFriend?.requested) {
                            toast.error("Request already sent");
                          } else {
                            dispatch(sendRequest(searchedUser?._id));
                          }
                        }}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="my-3"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox
