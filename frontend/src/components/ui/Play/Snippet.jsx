import React, { use } from "react";
import TypingIndicator from "./TypingIndicator";
import { useSelector } from "react-redux";

const Snippet = ({
  gameRef,
  cursorRef,
  typedLetters,
  wordsList,
}) => {
  const theme = useSelector((state) => state.user.theme);
  return (
    <div className="w-full text-sm  rounded-lg">
      <div
        className={`${
          theme === "dark" ? "text-gray-400" : "text-textcolor"
        }  text-[22px] font-route relative leading-6`}
        ref={gameRef}
      >
        {wordsList?.length > 0 &&
          wordsList?.map((word, wordIndex) => (
            <span
              className="inline-block mx-1 tracking-wider word"
              key={wordIndex}
            >
              {word.split("").map((char, charIndex) => {
                const letterState = typedLetters[wordIndex]?.[charIndex];
                const isCorrect = letterState?.correct;
                const isTyped = letterState !== undefined;
                // console.log("data", letterState, isTyped, isCorrect);
                return (
                  <span
                    key={charIndex}
                    className={`letter text-gray-400 ${
                      isTyped
                        ? isCorrect
                          ? `text-textcolor`
                          : "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        <TypingIndicator ref={cursorRef} />
      </div>
    </div>
  );
};

export default Snippet;
