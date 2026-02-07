import React, { useRef, useEffect, useState } from "react";
import Snippet from "./Snippet";
import { GoDotFill } from "react-icons/go";
import TypingInput from "./TypingInput";
import useTyping from "../../../hooks/useTyping";
import { getRelativeTime } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { useTimerContext } from "../../../context/TimerContext";
import { updateDailyStats } from "../../../store/slices/userSlice";

const SnippetBox = ({
  snippetData,
  setSnippetData,
  gameStarted,
  setHasGameEnded,
  setMyMatchStats,
  mode,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { defaultPreTimer, stopTimer, pauseTimer } = useTimerContext();
  const user = useSelector((state) => state.user.userData);
  const [matchTime, setMatchTime] = useState(0);
  const {
    gameRef,
    cursorRef,
    typedLetters,
    currentWord,
    correctWordIndex,
    isSnippetComplete,
    currentWordIndex,
    errorCount,
    progress,
    typedCharactersCount,
  } = useTyping(snippetData, gameStarted);

  const hasEmittedRef = useRef(false);

  // Realtime stats updating
  useEffect(() => {
    if (gameStarted) {
      const wpm = (
        typedCharactersCount /
        5 /
        (Math.floor(matchTime / 1000) / 60)
      ).toFixed(2);

      if (mode === "duel") {
        socket.emit("playerProgress", {
          userId: user?._id,
          roomId: snippetData?.roomId,
          wpm: matchTime >= 2000 ? wpm : 0,
          errorCount,
          progress,
        });
      }
      setMyMatchStats((prevStats) => ({
        ...prevStats,
        userId: user?._id,
        wpm: matchTime >= 2000 ? wpm : 0,
        errorCount,
        progress,
      }));
    }
  }, [progress, typedCharactersCount, matchTime]);

  useEffect(() => {
    if (isSnippetComplete && !hasEmittedRef.current) {
      const matchTimeRef = pauseTimer();
      setMatchTime(matchTimeRef);
      setHasGameEnded(true);
      if (matchTime > 0) {
        console.log("matchTime", matchTimeRef);
        const totalCharacters = snippetData?.characters;
        // Calculate WPM: (characters including spaces / 5) / (time in minutes)
        const wpm = (
          totalCharacters /
          5 /
          (Math.floor(matchTime / 1000) / 60)
        ).toFixed(2);

        // Calculate Accuracy: (correct / (correct + errors)) * 100
        const correctKeystrokes = totalCharacters - errorCount;
        const accuracy = Math.round(
          (correctKeystrokes / totalCharacters) * 100,
        );

        setMyMatchStats({
          userId: user?._id,
          time: matchTime,
          wpm,
          accuracy,
          errorCount,
          progress: 100,
        });

        const matchData = {
          snippetId: snippetData?._id,
          userId: user?._id,
          username: user?.username,
          accuracy,
          wpm,
          mode: snippetData?.mode,
          errorCount,
          snippet: snippetData?.title,
          difficulty: snippetData?.difficulty,
          time: matchTime,
        };

        if (mode === "solo") {
          if (user && user._id) {
            socket.emit("matchComplete", {
              matchData,
              roomId: snippetData?.roomId,
              isGuestUser: false,
            });
            const date = new Date();
            const updatedHighscores = [
              ...snippetData?.highScores,
              {
                username: user?.username,
                wpm,
                createdAt: date.toISOString(),
              },
            ];
            updatedHighscores.sort((a, b) => b.wpm - a.wpm);
            setSnippetData({ ...snippetData, highScores: updatedHighscores });
            dispatch(updateDailyStats());
          } else {
            const guestId = localStorage.getItem("guestId");
            const guestUsername = localStorage.getItem("guestUsername");
            socket.emit("matchComplete", {
              matchData: {
                ...matchData,
                userId: guestId,
                username: guestUsername,
              },
              roomId: snippetData?.roomId,
              isGuestUser: true,
            });
          }
        }

        hasEmittedRef.current = true;
      }
    }
  }, [isSnippetComplete, matchTime]);

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-bgprmiary min-h-[400px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[21px] font-bold">
            Snippet
          </h5>
        </div>
        <div className="flex w-full flex-col gap-4 pb-2 pt-1 px-4">
          <div className="flex w-full py-4 h-[285px] px-5 border-2 border-bprimary rounded-2xl">
            <Snippet
              gameRef={gameRef}
              cursorRef={cursorRef}
              typedLetters={typedLetters}
              wordsList={snippetData.content}
              currentWordIndex={currentWordIndex}
            />
          </div>
          <div className="flex h-[55px] flex-col">
            {snippetData?.author?.length > 0 && (
              <>
                <div className="flex gap-3 items-center">
                  <h4 className="text-textcolor font-route text-[18px] items-center font-bold">
                    {snippetData?.title}
                  </h4>
                  <span
                    className={`text-white px-2 py-[1px] mt-[-4px] h-max ${
                      snippetData?.difficulty === "hard"
                        ? "bg-danger"
                        : snippetData?.difficulty === "easy"
                          ? "bg-success"
                          : "bg-orange"
                    } rounded-md tracking-wide font-bold text-[12px]`}
                  >
                    {snippetData?.difficulty?.charAt(0).toUpperCase() +
                      snippetData?.difficulty?.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="font-route text-textsecond flex gap-2 mt-[-5px] items-center text-[16px]">
                    <GoDotFill size={13} /> Added{" "}
                    {getRelativeTime(snippetData?.createdAt)}
                  </p>
                  <p className="font-route text-textsecond flex gap-2 mt-[-10px] items-center text-[17px]">
                    Posted by{" "}
                    <span
                      onClick={() =>
                        navigate(`/profile/${snippetData?.author}`)
                      }
                      className="hover:underline cursor-pointer hover:text-textcolor"
                    >
                      {snippetData?.author}
                    </span>
                  </p>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Input */}

      <TypingInput
        correctWordIndex={correctWordIndex}
        typedLetters={typedLetters}
        currentWord={currentWord}
        isSnippetComplete={isSnippetComplete}
        dummy={false}
      />
    </div>
  );
};

export default SnippetBox;
