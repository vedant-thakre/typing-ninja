import React from 'react'
import { getRelativeTime } from '../../../utils/helper';
import ListSkeletton from '../../skeletons/ListSkeletton';

const SnippetHighscores = ({ snippetData, loading }) => {
  return (
    <div className="flex flex-col flex-[3] gap-5">
      <div className="bg-bgsecondary flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider py-2 px-5 bg-primary rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Snippet Highscore
          </h5>
        </div>
        <div className="w-full pt-2 pb-4 px-4">
          <div
            className="flex flex-col gap-2 h-[600px] scrollbar-custom scroll-m-0 overflow-y-scroll 
                                    py-4 w-full px-3 border-2 border-bprimary rounded-2xl"
          >
            {loading ? (
              <>
                <ListSkeletton />
              </>
            ) : (
              <>
                {snippetData?.highScores?.length > 0 &&
                  snippetData?.highScores?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`grid grid-cols-12 items-center px-3 py-1 w-full hover:bg-bprimary ${
                          index === snippetData?.highScores?.length - 1
                            ? ""
                            : "border-b-2 border-bprimary"
                        }`}
                      >
                        <p className="col-span-1 font-route text-[20px] text-textsecond">
                          {index + 1}
                        </p>
                        <div className="col-span-8 flex flex-col pr-2">
                          <p className="col-span-8 font-route pr-2 font-bold text-[20px] text-textcolor">
                            {item?.username}
                          </p>
                          <div className="flex mt-[-5px] items-center">
                            <p className="font-main text-[14px] text-textsecond">
                              {getRelativeTime(item?.createdAt)}
                            </p>
                          </div>
                        </div>
                        <p className="col-span-3 w-[100px] font-route text-[18px] text-textsecond text-start">
                          {item?.wpm} WPM
                        </p>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnippetHighscores
