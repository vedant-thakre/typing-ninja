import React from "react";
import TypingIndicator from "./Play/TypingIndicator";

const Temp = ({ gameRef, cursorRef, typedLetters, wordsList }) => {
  // console.log(gameRef, cursorRef, typedLetters, wordsList);
  return (
    <div className="w-full text-sm rounded-lg">
      <div className="text-gray-400 text-2xl font-route relative" ref={gameRef}>
        {wordsList.map((word, wordIndex) => (
          <span
            className="inline-block mx-1 tracking-wider word"
            key={wordIndex}
          >
            {word.split("").map((char, charIndex) => {
              const letterState = typedLetters[wordIndex]?.[charIndex];
              const isCorrect = letterState?.correct;
              const isTyped = letterState !== undefined;
              return (
                <span
                  key={charIndex}
                  className={`letter text-gray-400 ${
                    isTyped
                      ? isCorrect
                        ? "text-white"
                        : "text-red-600"
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

export default Temp;
