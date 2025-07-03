import React, { useEffect, useState } from "react";
import { recordList } from "../utils/data";
import { getRelativeTime } from "../utils/helper";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import UserTypings from "../components/ui/Play/UserTypings";
import usePlay from "../hooks/usePlay";
import SnippetBox from "../components/ui/Play/SnippetBox";
import { useSelector } from "react-redux";
import PlayerCard from "../components/ui/Play/PlayerCard";
import { socket } from "../utils/socket";
import GameChat from "../components/ui/Play/GameChat";
import Timer from "../components/ui/Play/Timer";
import useMatch from "../hooks/useMatch";
import TypingInput from "../components/ui/Play/TypingInput";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import ListSkeletton from "../components/skeletons/ListSkeletton";
import DualPlayerCardBox from "../components/ui/Play/DualPlayerCardBox";
import SnippetBoxSkeleton from "../components/skeletons/SnippetBoxSkeleton";
import SnippetHighscores from "../components/ui/Play/SnippetHighscores";
import useRandomColor from "../hooks/useRandomColor";
import { useTimerContext } from "../context/TimerContext";

const Play = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.userData);
  const { resetTimer } = useTimerContext();
  const [gameStarted, setGameStarted] = useState(false);
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [hasGameReset, setHasGameReset] = useState(false);
  const color = useRandomColor(1);
  const [myMatchStats, setMyMatchStats] = useState({
    userId: user?._id,
    time: "",
    wpm: "",
    accuracy: "",
    errorCount: "",
    progress: 0,
  });
  const mode = location.pathname?.includes("duel")
    ? "duel"
    : location.pathname?.includes("solo") ? "solo" : "multiplayer"; 
  const { snippetData, roomUsers, loading, fetchNewSnippet } =
    useMatch(mode, gameStarted);
  window.onkeydown = function (e) {
    return !(e.keyCode == 32 && e.target == document.body);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        fetchNewSnippet(snippetData?.roomId);
        resetTimer();
        setMyMatchStats({
          userId: user?._id,
          time: "",
          wpm: "",
          accuracy: "",
          errorCount: "",
          progress: 0,
        });
        setHasGameReset(true);
        setGameStarted(false);
        setHasGameEnded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fetchNewSnippet]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="min-h-screen lg:w-[85rem] flex flex-col gap-2 justify-center items-center">
        <div
          className={`flex justify-center gap-6 items-center w-full pt-2 pb-1`}
        >
          {mode === "multiplayer" && (
            <>
              {roomUsers?.length > 0 &&
                roomUsers?.map((user, index) => {
                  return <PlayerCard key={index} user={user} />;
                })}
            </>
          )}
          {mode === "duel" && (
            <DualPlayerCardBox
              participants={roomUsers}
              stats={myMatchStats}
              loading={loading}
            />
          )}
        </div>
        <div
          className={`flex w-full gap-x-6 pb-5 px-7 ${
            (mode === "solo" || mode === "multiplayer") && "mt-[119px]"
          }`}
        >
          {/* timer & chat */}
          <div className="flex flex-col flex-[2.5]  gap-3">
            <div className="flex flex-col gap-2">
              {hasGameEnded && (
                <AnimatedButton
                  title={"NEW GAME (CLTR + ENTER)"}
                  className={
                    "font-route py-[2px] text-[18px] font-bold rounded-lg text-white bg-[#4e6edd] border-bdshadow border-4 w-full"
                  }
                />
              )}
              <Timer
                mode={mode}
                loading={loading}
                roomUsers={roomUsers}
                key={snippetData?._id}
                roomId={snippetData?.roomId}
                gameStarted={gameStarted}
                hasGameEnded={hasGameEnded}
                hasGameReset={hasGameReset}
                setHasGameEnded={setHasGameEnded}
                setHasGameReset={setHasGameReset}
                setGameStarted={setGameStarted}
              />
            </div>
            {mode !== "solo" && <GameChat />}
            {mode === "solo" && (
              <>
                {roomUsers?.length > 0 &&
                  roomUsers?.map((user, index) => {
                    return (
                      <PlayerCard
                        mode={mode}
                        stats={myMatchStats}
                        key={index}
                        user={user}
                        color={color[0]}
                      />
                    );
                  })}
              </>
            )}
          </div>
          {/* Snippet */}
          <div className="flex-[5]">
            {snippetData?.content?.length > 0 ? (
              <SnippetBox
                hasGameEnded={hasGameEnded}
                mode={mode}
                key={snippetData?._id}
                snippetData={snippetData}
                gameStarted={gameStarted}
                hasGameReset={hasGameReset}
                setHasGameEnded={setHasGameEnded}
                setMyMatchStats={setMyMatchStats}
              />
            ) : (
              <SnippetBoxSkeleton />
            )}
          </div>
          {/* Snippet Highscore */}
          <SnippetHighscores snippetData={snippetData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Play;
