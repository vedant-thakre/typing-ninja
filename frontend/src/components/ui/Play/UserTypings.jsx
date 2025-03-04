import cn from "classnames";
import TypingIndicator from "./TypingIndicator";

const UserTypings = ({ userInput, words, className = "" }) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
        />
      ))}
      <TypingIndicator />
    </div>
  );
};

const Character = ({ actual, expected }) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
        className={cn({
          "text-red-500": !isCorrect && !isWhiteSpace,
          "text-primary-400": isCorrect && !isWhiteSpace,
          "bg-red-500/50": !isCorrect && isWhiteSpace,
        })}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
