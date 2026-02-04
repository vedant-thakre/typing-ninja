import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { searchUser } from "../store/slices/userSlice";
import { getRelativeTime } from "../utils/helper";
import Pagination from "../components/ui/Other/Pagination";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchResult = useSelector((state) => state.user.search);
  const apiLoading = useSelector((state) => state.user.apiLoading);
  const total = useSelector((state) => state.user.searchResultCount);

  useEffect(() => {
    if (username) {
      dispatch(searchUser({ user: username, page }));
    }
  }, [username, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center">
      <div className="flex flex-col gap-4 w-[700px] mt-[110px]">
        <div className="bg-bgprimary mb-[50px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
          <div className="w-full flex justify-between px-4 bg-primary py-2 rounded-t-2xl">
            <h5 className="text-white font-route text-title font-bold">
              Search Results - {username}
            </h5>
          </div>
          <div className="w-full flex flex-col gap-1 pb-2">
            <div className="flex flex-col lg:h-[53rem] mx-5 my-2 gap-2 pt-4 pb-2 px-4 border-2 border-bprimary rounded-2xl">
              {searchResult.length > 0 ? (
                searchResult.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/profile/${user.username}`)}
                    className={`group flex flex-row px-2 py-1 hover:bg-bprimary cursor-pointer justify-between rounded-lg pb-2 ${
                      index !== searchResult.length - 1 && "border-b-2"
                    }  border-bprimary items-center`}
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="flex w-full items-center gap-2">
                        <img
                          src={user?.avatar}
                          alt="profile"
                          className="w-[50px] h-[50px] border-2 border-bprimary group-hover:border-textsecond rounded-full"
                          crossOrigin="anonymous"
                        />
                        <div className="flex flex-col leading-7">
                          <p className="text-textcolor  cursor-pointer hover:underline font-route text-title3 tracking-wide">
                            {user?.username}
                          </p>
                          <p className="text-textsecond font-route text-subtitle tracking-wide">
                            Joined {getRelativeTime(user?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-textsecond font-route tracking-wide text-xl font-bold">
                    No User Found
                  </p>
                </div>
              )}
            </div>
            <Pagination
              pageNo={page}
              setpageNo={handlePageChange}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

// https://buser-photos-gallery.s3.amazonaws.com/655e08b7dafba104ba889741/Passport%20Photo-1710794485308.jpg

// https://buser-photos-gallery.s3.amazonaws.com/65ec09110a6daf4c84590926/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head-1746014388925.jpg
