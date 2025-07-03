import React, { use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../../store/slices/chatSlice";
import { formatSmartDate } from "../../../utils/helper";
import { MdDoNotDisturb } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";


const ChatsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const difficuties = ["GENERAL", "GROUP"];
  const [tabValue, setTabValue] = useState("GENERAL");
  const [searchValue, setSearchValue] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const friends = useSelector((state) => state.chat.chatFriends);

  console.log("chats", chats);

  useEffect(() => {
    dispatch(
      getChats({
        isGroupChat: tabValue === "GROUP",
        search: searchValue.trim(),
      })
    );
  }, [tabValue]);

  // Optional: handle Enter key for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        getChats({
          isGroupChat: tabValue === "GROUP",
          search: searchValue.trim(),
        })
      );
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((val) => {
        dispatch(getChats({ isGroupChat: tabValue === "GROUP", search: val }));
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue.trim());
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue]);


  return (
    <div className="w-[350px] flex flex-col h-full gap-5 justify-center">
      <div className="bg-bgprimary h-full w-full flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Chats
          </h5>
          <div className="grid grid-cols-2 pt-3 w-full">
            {difficuties.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setTabValue(item)}
                  className={` font-route text-[18px] pb-2 border-b-[3px]  ${
                    tabValue === item
                      ? "border-primary text-primary"
                      : "text-textsecond border-bprimary"
                  } hover:border-bdshadow hover:text-bdshadow font-bold text-center cursor-pointer`}
                >
                  {item === "GROUP" ? "GROUPS" : item}
                </div>
              );
            })}
          </div>
          <div className="px-4  pt-3">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchValue}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className=" border-bprimary w-full font-main text-sm rounded-2xl placeholder-textsecond outline-none focus:ring-0 py-2 px-4 bg-bgsecondary text-white h-[42px] flex items-center"
            />
          </div>
        </div>
        <div className="px-4 flex flex-col gap-2 pb-4 w-full">
          {chats.length > 0 &&
            chats.map((chat, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (chat?.isGroupChat) {
                      navigate(`/chats/${chat?.chatName}/${chat?._id}`);
                    } else {
                      navigate(
                        `/chats/${chat?.friend?.username}/${chat?.friend?._id}`
                      );
                    }
                  }}
                  className="flex w-full relative items-center gap-3 cursor-pointer border-2 query border-bprimary py-2 px-3 rounded-2xl"
                >
                  <img
                    src={
                      chat?.isGroupChat
                        ? chat?.chatAvatar
                        : chat?.friend?.avatar
                    }
                    alt=""
                    crossOrigin="anonymous"
                    className="w-[55px] h-[55px] rounded-full object-cover m-1 border-[3px] border-bprimary"
                  />
                  <div className="flex flex-col w-full ">
                    <p className="absolute top-[3px] right-[15px] font-route text-textsecond">
                      {formatSmartDate(
                        chat?.latestMessage
                          ? chat?.latestMessage?.updatedAt
                          : ""
                      )}
                    </p>
                    <span className="text-white font-route text-[22px]">
                      {chat?.isGroupChat
                        ? chat?.chatName
                        : chat?.friend?.name
                        ? chat?.friend?.name
                        : chat?.friend?.username}
                    </span>
                    <span
                      className={` flex gap-1  ${
                        chat?.latestMessage?.isDeleted
                          ? "italic text-textsecond"
                          : " text-gray-300"
                      } font-route text-[18px]`}
                    >
                      {chat?.latestMessage?.isDeleted && (
                        <MdDoNotDisturb
                          size={16}
                          className="inline-block mt-[3px]"
                        />
                      )}
                      {chat.latestMessage
                        ? chat.latestMessage?.content?.length > 30
                          ? chat.latestMessage?.content?.slice(0, 20) + "..."
                          : chat.latestMessage?.content
                        : ""}
                    </span>
                  </div>
                </div>
              );
            })}

          {searchValue &&
            friends.map((friend) => (
              <div
                key={`friend-${friend._id}`}
                onClick={() => navigate(`/chats/${friend.username}/${friend._id}`)}
                className="flex w-full items-center gap-3 cursor-pointer border-2 border-dashed border-textsecond py-2 px-3 rounded-2xl bg-bgsecondary/40"
              >
                <div className="w-[60px] h-[60px] rounded-full border-[3px] border-bprimary flex-shrink-0"></div>
                <div className="flex flex-col w-full">
                  <span className="text-white font-route text-[22px]">
                    {friend.name || friend.username}
                  </span>
                  <span className="text-textsecond font-main text-sm">
                    Start new chat
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatsList;
