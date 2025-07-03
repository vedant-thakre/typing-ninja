import React, { useCallback, useEffect, useState } from "react";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import Pagination from "../components/ui/Other/Pagination";
import {
  acceptRequest,
  getFriendsAndRequestsList,
  rejectRequest,
  removeFriend,
} from "../store/slices/userSlice";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getRelativeTime } from "../utils/helper";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../components/ui/Other/Modal";

const Friends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState("FRIENDS");
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const [modalHandleClick, setModalHandleClick] = useState(() => () => {});
  const [pageNo, setPageNo] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const user = useSelector((state) => state.user.userData);

  const fetchList = useCallback(
    async (searchVal, page, tab) => {
      const res = await dispatch(
        getFriendsAndRequestsList({
          isFriend: tab === "FRIENDS",
          search: searchVal,
          pageNo: page,
          limit: 10,
        })
      );
      if (res?.payload?.status === 200) {
        setUserList(res.payload.data || []);
      }
    },
    [dispatch]
  );

  const debouncedFetchList = useCallback(
    debounce((searchVal, page, tab) => {
      fetchList(searchVal, page, tab);
    }, 500),
    [fetchList]
  );

  useEffect(() => {
    debouncedFetchList(searchValue, pageNo, tabValue);
    return () => debouncedFetchList.cancel();
  }, [searchValue, pageNo, tabValue, debouncedFetchList]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setPageNo(1);
  };

  const handleRequest = async (accept, id) => {
    setLoadingId(id);
    try {
      const res = accept
        ? await dispatch(acceptRequest(id))
        : await dispatch(rejectRequest(id));
      if (res?.payload?.status === 200) {
        toast.success(res.payload.message);
        fetchList(searchValue, pageNo, tabValue);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRemoveFriend = async (id) => {
    setLoadingId(id);
    try {
      const res = await dispatch(removeFriend(id));
      if (res?.payload?.status === 200) {
        toast.success(res.payload.message);
        fetchList(searchValue, pageNo, tabValue);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
      setOpen(false);
    }
  };

  const handleTabChange = (tab) => {
    setTabValue(tab);
    setSearchValue("");
    setPageNo(1);
  };

  return (
    <div className="min-h-screen flex flex-col mt-[80px] gap-5 items-center">
      <div className="w-[700px] flex flex-col gap-3 justify-center">
        <div className="grid grid-cols-2 gap-3">
          <AnimatedButton
            title="FRIENDS"
            icon={<FaUserFriends size={25} />}
            both
            onClick={() => handleTabChange("FRIENDS")}
            className="font-route shadow-hard text-white hover:underline font-bold text-xl rounded-xl py-3 px-24"
          />
          <AnimatedButton
            title="REQUESTS"
            icon={<FaUserPlus size={23} />}
            both
            onClick={() => handleTabChange("REQUESTS")}
            className="font-route shadow-hard text-white hover:underline font-bold text-xl rounded-xl py-3 px-24"
          />
        </div>

        <div className="bg-bgprimary flex-1 w-full mb-20 flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="pt-4 w-full px-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              className="border-bprimary w-full font-main text-sm rounded-xl placeholder-textsecond outline-none focus:ring-0 py-2 px-4 bg-bgsecondary
               text-textcolor h-[42px]"
            />
          </div>

          <div className="px-5 pb-5 w-full">
            <div className="flex flex-col lg:h-[89vh] gap-3 pt-4 pb-3 px-3 border-2 border-bprimary rounded-2xl">
              {userList.length > 0 ? (
                userList.map((friend, index) => (
                  <div
                    key={index}
                    className="flex flex-row px-2 py-1 justify-between items-center"
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={friend.avatar}
                          alt="profile"
                          className="w-[50px] h-[50px] border-2 border-bprimary rounded-full"
                          crossOrigin="anonymous"
                        />
                        <div className="flex flex-col leading-6">
                          <p onClick={() => navigate(`/profile/${friend.username}`)} className="text-textcolor cursor-pointer hover:underline font-route text-[21px] tracking-wide">
                            {friend.username}
                          </p>
                          <p className="text-textsecond font-route text-[20px] tracking-wide">
                            Joined {getRelativeTime(friend.createdAt)}
                          </p>
                        </div>
                      </div>

                      {tabValue === "REQUESTS" ? (
                        <div className="flex gap-2">
                          <AnimatedButton
                            title="Accept"
                            onClick={() => handleRequest(true, friend._id)}
                            isLoading={loadingId === friend._id}
                            className="px-2 font-bold rounded-lg text-white py-[2px] bg-success border-bsuccess font-route text-xl border-4"
                          />
                          <AnimatedButton
                            title="Reject"
                            onClick={() => handleRequest(false, friend._id)}
                            isLoading={loadingId === friend._id}
                            className="px-2 font-bold rounded-lg text-white py-[2px] bg-danger border-bdanger font-route text-xl border-4"
                          />
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <AnimatedButton
                            title="Message"
                            onClick={() =>
                              navigate(
                                `/chats/${friend.username}/${friend._id}`
                              )
                            }
                            className="px-2 font-bold rounded-lg text-white py-[2px] border-bdshadow font-route text-xl border-4"
                          />
                          <AnimatedButton
                            title="Challenge"
                            className="px-2 font-bold rounded-lg text-white py-[2px] bg-success border-bsuccess font-route text-xl border-4"
                          />
                          <AnimatedButton
                            title="Remove"
                            onClick={() => {
                              setModalTitle("Remove Friend");
                              setModalSubTitle(
                                `Are you sure you want to remove ${friend.username} ? from your friends list?`
                              );
                              setModalButtonText("Remove");
                              setModalHandleClick(
                                () => () => handleRemoveFriend(friend._id)
                              );
                              setOpen(true);
                            }}
                            className="px-2 font-bold rounded-lg text-white py-[2px] bg-danger border-bdanger font-route text-xl border-4"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-textsecond font-route tracking-wide text-xl font-bold">
                    {tabValue === "REQUESTS"
                      ? "No Requests Found"
                      : "No Friends Found"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-2 mt-[-18px]">
            <Pagination pageNo={pageNo} setpageNo={setPageNo} />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        setOpen={(val) => {
          setOpen(val);
          if (!val) {
            setModalHandleClick(() => () => {});
          }
        }}
        title={modalTitle}
        subTitle={modalSubTitle}
        handleClick={modalHandleClick}
        buttonText={modalButtonText}
      />
    </div>
  );
};

export default Friends;
