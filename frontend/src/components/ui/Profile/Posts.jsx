import React from 'react'

const Posts = ({ userData, searchedUser, isMyProfile }) => {
  return (
    <div className="bg-bgprimary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
                <div className="w-full">
                  <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
                    Posts
                  </h5>
                </div>
                {!userData?.length ? (
                  <div className="flex flex-col min-h-[400px] gap-2 px-5">
                    <p className="text-textcolor font-route text-[23px]">
                      {isMyProfile ? "You have" : `${searchedUser?.username} has`}{" "}
                      not created any posts.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl"></div>
                )}
              </div>
  )
}

export default Posts
