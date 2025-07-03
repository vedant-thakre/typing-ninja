import React, { useEffect } from 'react'
import AnimatedButton from '../components/ui/Other/AnimatedButton';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiChat3Line } from 'react-icons/ri';
import { TbWorld } from 'react-icons/tb';
import PendingSnippets from '../components/ui/Feedback/PendingSnippets';
import RequestSnippet from '../components/ui/Feedback/RequestSnippet';

const SnippetsList = () => {
   const [tabValue, setTabValue] = useState("Submit Snippet");
   const user = useSelector((state) => state.user.userData);

   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center">
      <div className="flex flex-col gap-4 w-[800px] mt-[30px]">
        {user?.isAdmin && (
          <div className="grid grid-cols-2 gap-3">
            <AnimatedButton
              title="Submit Snippet"
              onClick={() => {
                setTabValue("Submit Snippet");
              }}
              className="font-route shadow-hard text-white hover:underline font-bold text-2xl rounded-xl py-2 px-24"
            />
            <AnimatedButton
              title="Pending Snippets"
              onClick={() => {
                setTabValue("Pending Snippets");
              }}
              className="font-route shadow-hard text-white hover:underline font-bold text-2xl rounded-xl py-2 px-24"
            />
          </div>
        )}
        {tabValue === "Submit Snippet" ? (
          <RequestSnippet tabValue={tabValue} />
        ) : (
          <PendingSnippets tabValue={tabValue} />
        )}
      </div>
    </div>
  );
}

export default SnippetsList
