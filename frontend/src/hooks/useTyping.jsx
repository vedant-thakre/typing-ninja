import { useCallback, useEffect, useRef, useState } from "react";

const useTyping = (wordsList) => {
  const [typedLetters, setTypedLetters] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWordIndex, setCorrectWordIndex] = useState(-1);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const cursorRef = useRef(null);
  const gameRef = useRef(null);

  // console.log("currentWordIndex", currentWordIndex);

  const keydownHandler = useCallback(
    (event) => {
      if (document.activeElement.tagName === "INPUT") return; // Ignore input field key events

      const { key } = event;
      const expectedLetter =
        wordsList[currentWordIndex]?.[currentLetterIndex] || " ";

      // Handle Backspace: Remove the last typed letter and move cursor back
      if (key === "Backspace") {
        if (currentLetterIndex > 0) {
          setTypedLetters((prev) => {
            const newTypedLetters = [...prev];

            // Ensure the current word entry exists
            if (!newTypedLetters[currentWordIndex]) {
              newTypedLetters[currentWordIndex] = [];
            }

            // Remove the last typed letter
            newTypedLetters[currentWordIndex] = newTypedLetters[
              currentWordIndex
            ].slice(0, currentLetterIndex - 1);

            return newTypedLetters;
          });


          setCurrentLetterIndex((prev) => prev - 1);
        } else if (currentWordIndex > 0) {
          // Move back to previous word
          setCurrentWordIndex((prev) => prev - 1);
          setCorrectWordIndex((prev) => prev - 1);
          setCurrentLetterIndex(wordsList[currentWordIndex - 1].length);
        }
        return;
      }

      if (key === expectedLetter) {
        setTypedLetters((prev) => {
          const newTypedLetters = [...prev];
          newTypedLetters[currentWordIndex] =
            newTypedLetters[currentWordIndex] || [];
          newTypedLetters[currentWordIndex][currentLetterIndex] = {
            letter: key, // Store the actual typed letter
            correctLetter: expectedLetter,
            correct: true, // Mark correctness
          };

          return newTypedLetters;
        });

        setCurrentLetterIndex((prev) => prev + 1);
      } else if (key !== "Shift" && key.length === 1) {
        setTypedLetters((prev) => {
          const newTypedLetters = [...prev];
          newTypedLetters[currentWordIndex] =
            newTypedLetters[currentWordIndex] || [];
          newTypedLetters[currentWordIndex][currentLetterIndex] = {
            letter: key, // Store the actual typed letter
            correctLetter: expectedLetter,
            correct: false, // Mark incorrect
          };
          return newTypedLetters;
        });
        if (currentLetterIndex <= wordsList[currentWordIndex].length - 1) {
          setCurrentLetterIndex((prev) => prev + 1);
        }

        // If this enabled the cursor will keep moving even if you get the word wrong.
        // if (expectedLetter === " ") {
        //   setCurrentWordIndex((prev) => prev + 1);
        //   setCurrentLetterIndex(0);
        // }
      }

      // Move to next word when space is pressed, but place cursor before first letter
      if (
        key === " " &&
        currentLetterIndex === wordsList[currentWordIndex].length
      ) {
        setCurrentWordIndex((prev) => prev + 1);
        setCorrectWordIndex((prev) => prev + 1);
        setCurrentLetterIndex(0);
      }
    },
    [currentWordIndex, currentLetterIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  useEffect(() => {
    if (cursorRef.current && gameRef.current) {
      const wordElements = gameRef.current.querySelectorAll(".word");

      if (wordElements[currentWordIndex]) {
        const letterElements =
          wordElements[currentWordIndex].querySelectorAll(".letter");

        let currentLetterElement =
          currentLetterIndex === 0
            ? wordElements[currentWordIndex] // Position before the first letter
            : letterElements[currentLetterIndex - 1]; // Position after the last letter typed

        if (currentLetterElement) {
          const newTop = currentLetterElement.offsetTop + 1;
          const newLeft =
            currentLetterIndex === 0
              ? currentLetterElement.offsetLeft // Before first letter
              : currentLetterElement.offsetLeft +
                currentLetterElement.offsetWidth; // After typed letter

          // Animate cursor position smoothly
          cursorRef.current.style.transition =
            "top 0.1s ease-out, left 0.1s ease-out";
          cursorRef.current.style.top = `${newTop}px`;
          cursorRef.current.style.left = `${newLeft}px`;
        }
      }
    }
  }, [currentLetterIndex, currentWordIndex]);

  return {
    gameRef,
    cursorRef,
    typedLetters,
    currentWord: wordsList[currentWordIndex],
    correctWordIndex,
    currentWordIndex,
  };
};

export default useTyping;
