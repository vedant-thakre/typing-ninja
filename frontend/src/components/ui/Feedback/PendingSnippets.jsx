import React, { useEffect, useState } from "react";
import { getRelativeTime } from "../../../utils/helper";
import { matchHistoryList } from "../../../utils/data";
import AnimatedButton from "../Other/AnimatedButton";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptSnippet,
  getPendingSnippetsList,
  rejectSnippet,
  setViewSnippet,
} from "../../../store/slices/gameSlice";
import { useNavigate } from "react-router-dom";
import ViewSnippetModal from "./ViewSnippetModal";

const PendingSnippets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openViewModal, setOpenViewModal] = useState(false);
  const snippets = useSelector((state) => state.game.pendingSnippets);
  const snippet = useSelector((state) => state.game.snippet);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  const acceptLoading = useSelector((state) => state.game.acceptLoading);
  const rejectLoading = useSelector((state) => state.game.rejectLoading);

  useEffect(() => {
    dispatch(getPendingSnippetsList({ page, limit }));
  }, [page]);

  const accept = async (id) => {
    try {
      const res = await dispatch(acceptSnippet({id}));
      if (res?.payload?.status === 200) {
        setSelectedSnippet("");
      }
    } catch (error) {}
  };
  const reject = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(rejectSnippet({id}));
      if (res?.payload?.status === 200) {
        setSelectedSnippet("");
      }
    } catch (error) {}
  };

  return (
    <>
      <div
        className={`bg-bgsecondary flex flex-col items-center gap-3 rounded-2xl  shadow-hard`}
      >
        <div className="w-full flex justify-between px-5 bg-primary py-2 rounded-t-2xl">
          <h5 className="text-white font-route text-[24px] font-bold">
            Pending Snippets List
          </h5>
        </div>
        <div className="w-full flex flex-col px-4 pb-4  gap-2">
          <div
            className="flex flex-col gap-2 h-[500px] scroll-m-0 overflow-y-scroll 
                              py-4 w-full px-3 border-2 scrollbar-custom border-bprimary rounded-2xl"
          >
            {snippets?.length > 0 &&
              snippets?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-12 items-center px-3 py-1 w-full ${
                      index === snippets?.length - 1
                        ? ""
                        : "border-b-2 border-bprimary"
                    }`}
                  >
                    <p className="col-span-1 font-route text-[20px] text-textsecond">
                      {index + 1}
                    </p>
                    <div className="col-span-7 flex flex-col pr-2">
                      <p className="col-span-8 font-route pr-2 font-bold text-[20px] text-textcolor">
                        {item?.title}
                      </p>
                      <div className="flex mt-[-4px] items-center">
                        <p
                          className={`font-main text-sm ${
                            item?.difficulty === "hard"
                              ? "text-danger"
                              : item?.difficulty === "easy"
                              ? "text-success"
                              : "text-orange"
                          }`}
                        >
                          {item?.difficulty}
                        </p>
                        <p className="font-main text-sm text-textsecond">
                          , Posted by{" "}
                          <span
                            onClick={() => navigate(`/profile/${item?.author}`)}
                            className="hover:underline cursor-pointer hover:text-textcolor"
                          >
                            {item?.author}
                          </span>{" "}
                          {getRelativeTime(item?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 col-span-3">
                      <AnimatedButton
                        title="View"
                        onClick={() => {
                          dispatch(setViewSnippet(item));
                          setOpenViewModal(true);
                        }}
                        // isLoading={loadingId === friend._id}
                        className="px-2 font-bold rounded-lg text-white py-[2px] bg-primary border-bdshadow font-route text-xl border-4"
                      />
                      <AnimatedButton
                        title="Accept"
                        onClick={() => {
                          accept(item?._id);
                          setSelectedSnippet(item?._id);
                        }}
                        isLoading={acceptLoading && selectedSnippet === item?._id}
                        className="px-2 font-bold rounded-lg text-white py-[2px] bg-success border-bsuccess font-route text-xl border-4"
                      />
                      <AnimatedButton
                        title="Reject"
                        onClick={() => {
                          reject(item?._id);
                          setSelectedSnippet(item?._id);
                        }}
                        isLoading={rejectLoading && selectedSnippet === item?._id}
                        className="px-2 font-bold rounded-lg text-white py-[2px] bg-danger border-bdanger font-route text-xl border-4"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {openViewModal && (
        <ViewSnippetModal
          open={openViewModal}
          setOpen={setOpenViewModal}
          snippet={snippet}
        />
      )}
    </>
  );
};

export default PendingSnippets;
