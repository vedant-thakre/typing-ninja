import { useCallback, useState } from "react";
import { snippets } from "../utils/data";

const generateWords = () => {
  const diffNum = Math.floor(Math.random() * 3); // Ensures 0, 1, or 2
  const diffNum2 = Math.floor(Math.random() * 50); // Ensures 0 to 49
  const snippet = snippets[diffNum][diffNum2]; // Access valid index

  const difficulty = diffNum === 0 ? "Easy" : diffNum === 1 ? "Medium" : "Hard";

  return { snippet, difficulty };
};

const useWords = () => {
  const initialData = generateWords();
  const [words, setWords] = useState(initialData.snippet); // Store only snippet text
  const [difficulty, setDifficulty] = useState(initialData.difficulty); // Store difficulty in state

  const updateWords = useCallback(() => {
    const { snippet, difficulty } = generateWords();
    setWords(snippet); // Update words
    setDifficulty(difficulty); // Update difficulty
  }, []);

  return { words, updateWords, difficulty };
};

export default useWords;
