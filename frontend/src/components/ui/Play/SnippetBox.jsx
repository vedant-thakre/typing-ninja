import React from 'react'
import Temp from '../../ui/Temp';
import { GoDotFill } from 'react-icons/go';
import TypingInput from '../../TypingInput';
import useTyping from "../../../hooks/useTyping"

const SnippetBox = ({ difficulty }) => {
  const wordsList =
    "The expedition had been planned meticulously, yet nothing could prepare them for the reality of the harsh Arctic winds. Each step forward felt like a battle against nature itself.".split(
      " "
    );
   const {
     gameRef,
     cursorRef,
     typedLetters,
     currentWord,
     correctWordIndex,
     currentWordIndex,
   } = useTyping(wordsList); 
  return (
    <div className="flex flex-col flex-[6] gap-5">
      <div className="bg-secondary  flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Snippet
          </h5>
        </div>
        <div className="flex w-full flex-col gap-4 pb-2 pt-1 px-4">
          <div className="flex w-full py-4 px-5 border-2 border-bprimary rounded-2xl">
            <Temp
              gameRef={gameRef}
              cursorRef={cursorRef}
              typedLetters={typedLetters}
              wordsList={wordsList}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <h4 className="text-white font-route text-[24px] items-center font-bold">
                The Time Machine
              </h4>
              <span
                className={`text-white px-2 py-[1px] mt-[-4px] h-max ${
                  difficulty === "Hard"
                    ? "bg-danger"
                    : difficulty === "Easy"
                    ? "bg-success"
                    : "bg-orange"
                } rounded-md tracking-wide font-bold text-[12px]`}
              >
                {difficulty}
              </span>
            </div>
            <p className="font-route text-textsecond flex gap-2 mt-[-10px] items-center text-[19px]">
              <GoDotFill size={13} /> Added 4 years ago
            </p>
          </div>
        </div>
      </div>
      {/* Input */}
      <TypingInput
        correctWordIndex={correctWordIndex}
        typedLetters={typedLetters}
        currentWord={currentWord}
      />
    </div>
  );
};

export default SnippetBox
