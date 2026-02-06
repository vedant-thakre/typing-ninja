import { useEffect, useState } from "react";
import { matchHistoryList, recordList, userData } from "../../utils/data";
import { getRelativeTime, handleTabTitle } from "../../utils/helper";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkFriend, getSearchedUser } from "../../store/slices/userSlice";
import ProfileModal from "./Other/ProfileModal";
import ProfileBox from "./Profile/ProfileBox";
import Overview from "./Profile/Overview";
import Matches from "./Profile/Matches";
import Posts from "./Profile/Posts";
import Records from "./Profile/Records";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const user = useSelector((state) => state.user.userData);
  const [searchedUser, setSearchedUser] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const myUserName = user?.username || localStorage.getItem("username");
  const isMyProfile = myUserName === username;
  console.log("isMyProfile", isMyProfile, myUserName, username);

  useEffect(() => {
    if (!isMyProfile) {
      async function fetchUser() {
        const response = await dispatch(getSearchedUser(username));
        if (response?.payload?.status === 200) {
          setSearchedUser(response?.payload?.data);
          if (user) {
            dispatch(checkFriend(response?.payload?.data?._id));
          }
          handleTabTitle(`${username}`);
        } else {
          toast.error("User not found");
          handleTabTitle(`Profile - Not Found`);
        }
      }
      fetchUser();
    } else {
      handleTabTitle(`Profile - ${myUserName}`);
    }
  }, [username]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col lg:flex-row max-w-[90rem] gap-x-6 gap-y-4 md:gap-y-0  py-5 px-4 md:px-5 lg:px-7 mt-[-5px] md:mt-2 lg:mt-[140px]">
        <ProfileBox
          isMyProfile={isMyProfile}
          searchedUser={searchedUser}
          setOpenProfileModal={setOpenProfileModal}
        />
        <div className="flex flex-col flex-[5] gap-5">
          {/* Overview */}
          <Overview userData={userData} />
          {/* Matches */}
          <Matches />
        </div>
        <div className="flex flex-col flex-[3.5] gap-5">
          {/* Posts */}
          <Posts
            userData={userData}
            isMyProfile={isMyProfile}
            searchedUser={searchedUser}
          />
          {/* Records */}
          <Records />
        </div>
      </div>
      <ProfileModal open={openProfileModal} setOpen={setOpenProfileModal} />
    </div>
  );
};

export default Profile;
