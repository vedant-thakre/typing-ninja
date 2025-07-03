import { useCallback, useEffect, useRef, useState } from "react";

const useTyping = (snippetData, gameStarted) => {
  const [typedLetters, setTypedLetters] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWordIndex, setCorrectWordIndex] = useState(-1);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [typedCharactersCount, setTypedCharactersCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSnippetComplete, setIsSnippetComplete] = useState(false);
  const cursorRef = useRef(null);
  const progressRef = useRef(0);
  const gameRef = useRef(null);
  const gameStartedRef = useRef(gameStarted);

  const wordsList = snippetData?.content;
  const lastWord = wordsList[wordsList.length - 1];
  const lastLetterOfLastWord = lastWord[lastWord?.length - 1];

  const normalizeChar = (char) => {
    if (!char) return char;
    return char.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
  };


  useEffect(() => {
    gameStartedRef.current = gameStarted;
  }, [gameStarted]);

  const keydownHandler = useCallback(
    (event) => {
      if (!gameStartedRef.current) return;
      if (document.activeElement.tagName === "INPUT") return;
      if (isSnippetComplete) {
        return;
      }

      const { key } = event;

      const expectedLetter =
        wordsList[currentWordIndex]?.[currentLetterIndex] || " ";

      const normalizedKey = normalizeChar(key);
      const normalizedExpected = normalizeChar(expectedLetter);

      // if(normalizedKey !== normalizedExpected) {
      //   console.log("error", normalizedKey, normalizedExpected);
      //   setErrorCount((prev) => prev + 1);
      // }

      if (normalizedKey !== normalizedExpected) {
        const isExpectedCapital = /^[A-Z]$/.test(normalizedExpected); // true if expected is a capital letter
        const isUserHoldingShift = event.shiftKey;

        const isShiftMistake =
          (!isExpectedCapital && isUserHoldingShift) || // shift used when not needed
          (isExpectedCapital && !isUserHoldingShift); // shift not used when needed

        if (isShiftMistake) {
          setErrorCount((prev) => prev + 1);
        } else if (
          !isExpectedCapital &&
          normalizedKey !== normalizedExpected &&
          key !== "Backspace"
        ) {
          setErrorCount((prev) => prev + 1);
        }
      }

      if (normalizedKey === " " && normalizedExpected !== " ") {
        return;
      }

      // Handle Backspace: Remove the last typed letter and move cursor back
      if (key === "Backspace") {
        console.log("Backspace Triggered", isSnippetComplete);
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
        }
        // else if (currentWordIndex > 0) {
        //   // Move back to previous word
        //   setCurrentWordIndex((prev) => prev - 1);
        //   setCorrectWordIndex((prev) => prev - 1);
        //   setCurrentLetterIndex(wordsList[currentWordIndex - 1].length);
        // }
        return;
      }

      if (normalizedKey === normalizedExpected && key !== " ") {
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
        if (expectedLetter !== " ") {
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
        }
        // If this enabled the cursor will keep moving even if you get the word wrong.
        // if (expectedLetter === " ") {
        //   setCurrentWordIndex((prev) => prev + 1);
        //   setCurrentLetterIndex(0);
        // }
      }

      // Move to next word when space is pressed, but place cursor before first letter

      // if (
      //   key === " " &&
      //   currentLetterIndex === wordsList[currentWordIndex].length
      // ) {
      //   setCurrentWordIndex((prev) => prev + 1);
      //   setCorrectWordIndex((prev) => prev + 1);
      //   setCurrentLetterIndex(0);
      // }

      if (
        key === " " &&
        currentLetterIndex === wordsList[currentWordIndex].length
      ) {
        const typedWord =
          typedLetters[currentWordIndex]?.map((t) => t.letter).join("") || "";
        const actualWord = wordsList[currentWordIndex];

        const normalizedTypedWord = normalizeChar(typedWord);
        const normalizedActualWord = normalizeChar(actualWord);

        // ✅ Only move to next word if word is correctly typed
        if (normalizedTypedWord.trim() === normalizedActualWord) {
          setCurrentWordIndex((prev) => prev + 1);
          setCorrectWordIndex((prev) => prev + 1);
          setCurrentLetterIndex(0);

          const progressPercentage = Math.round(
            ((currentWordIndex + 1) / wordsList.length) * 100
          );

          const correctTypedLetters = typedLetters
            .flat()
            .filter((t) => t?.correct).length;

          setTypedCharactersCount(correctTypedLetters + typedLetters.length - 1);

          if (progressPercentage !== progressRef.current) {
            progressRef.current = progressPercentage;
            setProgress(progressPercentage);
          }
        } else {
          // Optionally: Add a visual cue like shake or red border here
        } // wpm-51 charcount-64 accuracy-100 errors-0 wpm-51 charcount-64 accuracy-94 errors-3

        return; // you however state feel keep turn at they seem because nation way
      }

      if (
        currentWordIndex === wordsList.length - 1 &&
        currentLetterIndex === lastWord.length - 1 &&
        key === lastLetterOfLastWord
      ) {
        // setTimeout(() => {
          const typedLastWord =
            typedLetters[currentWordIndex]?.map((t) => t.letter).join("") || "";

          if (typedLastWord === lastWord) {
            console.log("Done typing");
            setIsSnippetComplete(true);
            const correctTypedLetters = typedLetters
              .flat()
              .filter((t) => t?.correct).length;

            setTypedCharactersCount(
              correctTypedLetters + typedLetters.length - 1
            );
            setProgress(100);
          }
        // }, 0);
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

        // let currentLetterElement =
        //   currentLetterIndex === 0
        //     ? wordElements[currentWordIndex] // Position before the first letter
        //     : letterElements[currentLetterIndex - 1]; // Position after the last letter typed

        let currentLetterElement =
          currentLetterIndex === 0
            ? letterElements[0] // Align with the first letter instead of the word span
            : letterElements[currentLetterIndex - 1];

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
          cursorRef.current.style.left = `${newLeft - 2}px`;
        }
      }
    }
  }, [currentLetterIndex, currentWordIndex]);

  // ✅ Progress calculation
  // const totalLetters = wordsList.reduce((sum, word) => sum + word.length, 0);
  // const correctTypedLetters = typedLetters
  //   .flat()
  //   .filter((t) => t?.correct).length;
  // const progress = isSnippetComplete
  //   ? 100
  //   : Math.min(99, Math.floor((correctTypedLetters / totalLetters) * 100));

  return {
    gameRef,
    cursorRef,
    typedLetters,
    currentWord: wordsList?.length > 0 ? wordsList[currentWordIndex] : "",
    correctWordIndex,
    currentWordIndex,
    isSnippetComplete,
    errorCount,
    progress,
    typedCharactersCount,
  };
};

export default useTyping;
