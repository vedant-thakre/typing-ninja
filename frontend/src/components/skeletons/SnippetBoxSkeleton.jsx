import React from 'react'
import TypingInput from '../ui/Play/TypingInput';

const SnippetBoxSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-bgsecondary min-h-[400px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Snippet
          </h5>
        </div>
        <div className="flex w-full flex-col gap-4 pb-2 pt-1 px-4">
          <div className="flex flex-col gap-2 w-full py-4 h-[285px] px-5 border-2 border-bprimary rounded-2xl">
            <div className="w-full animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-full animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-full animate-pulse  rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-full animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-full animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-full animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-full animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="w-1/2  animate-pulserounded-sm h-5 bg-bgprimary"></div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="w-3/5 animate-pulse rounded-sm h-5 bg-bgprimary"></div>
            <div className="flex justify-between w-full">
              <div className="w-2/5 animate-pulse rounded-sm h-4 bg-bgprimary"></div>
              <div className="w-1/5 animate-pulse rounded-sm h-4 bg-bgprimary"></div>
            </div>
          </div>
        </div>
      </div>
      <TypingInput
        correctWordIndex={0}
        typedLetters={[]}
        currentWord={""}
        isSnippetComplete={false}
        dummy={true}
      />
    </div>
  );
}

export default SnippetBoxSkeleton
