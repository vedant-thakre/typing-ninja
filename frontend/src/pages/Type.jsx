import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

function Type() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog"
  );
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState({});
  const [userName, setUserName] = useState(localStorage.getItem("name") ?? "");
  const [hasEnteredName, setHasEnteredName] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(12); // Initial cursor position
  const cursorRef = useRef(null);
  const textContainerRef = useRef(null); // Ref for the text container

  const [mistakes, setMistakes] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const handleChange = (e) => {
    const typedValue = e.target.value;
    setInput(typedValue);

    // Calculate cursor position based on the actual text container
    if (textContainerRef.current) {
      const textContainer = textContainerRef.current;
      const textNode = document.createTextNode(typedValue);
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.whiteSpace = "pre";
      span.appendChild(textNode);
      textContainer.appendChild(span);
      const width = span.getBoundingClientRect().width;
      textContainer.removeChild(span);
      console.log("width", width);
      setCursorPosition(width + 16); // Add the initial offset
    }

    if (!startTime) {
      setStartTime(Date.now());
      setTimerRunning(true);
    }

    let newMistakes = mistakes;
    let typedChars = typedValue.length;

    if (typedChars > totalTyped) {
      const lastTypedChar = typedValue[typedChars - 1];
      const correctChar = text[typedChars - 1];
      if (lastTypedChar !== correctChar) {
        newMistakes++;
      }
    }

    setTotalTyped(typedChars);
    setMistakes(newMistakes);

    const accuracyValue =
      typedChars > 0 ? ((typedChars - newMistakes) / typedChars) * 100 : 100;
    setAccuracy(Math.max(accuracyValue, 0));

    const wordsTyped = typedValue.trim().split(/\s+/).length;
    const wordsPerMinute =
      elapsedTime > 0 ? Math.round(wordsTyped / (elapsedTime / 60)) : 0;
    setSpeed(wordsPerMinute);

    // ✅ Emit progress update with user identifier
    const progress = (typedChars / text.length) * 100;
    socket.emit("progress", { userName: userName || socket.id, progress });

    if (typedValue === text) {
      setTimerRunning(false);
    }
  };

  useEffect(() => {
    socket.on("text", (data) => setText(data));
    socket.on("updateProgress", (data) => {
      setProgress(data);
    });
  }, []);

  const getStyledText = () => {
    const words = text.split(" ");
    const typedChars = input.split("");
    let currentIndex = 0;
    let isCorrectSoFar = true;

    return words.map((word, index) => {
      let styledWord = word.split("").map((char, charIndex) => {
        if (currentIndex >= typedChars.length) {
          return (
            <span key={charIndex} className="text-white">
              {char}
            </span>
          );
        }

        let typedChar = typedChars[currentIndex];
        currentIndex++;

        if (typedChar === char && isCorrectSoFar) {
          return (
            <span key={charIndex} className="text-green-500">
              {char}
            </span>
          );
        } else {
          isCorrectSoFar = false;
          return (
            <span key={charIndex} className="text-red-500">
              {char}
            </span>
          );
        }
      });

      let space = " ";
      if (currentIndex < typedChars.length) {
        if (typedChars[currentIndex] === " ") {
          space = (
            <span key={`space-${index}`} className="text-green-500">
              {" "}
            </span>
          );
        } else {
          space = (
            <span key={`space-${index}`} className="text-red-500">
              {" "}
            </span>
          );
          isCorrectSoFar = false;
        }
        currentIndex++;
      }

      return (
        <span key={index} className="mr-1">
          {styledWord}
          {space}
        </span>
      );
    });
  };

  useEffect(() => {
    const username = localStorage.getItem("name");
    if (username) {
      setHasEnteredName(true);
    }
  }, []);

  if (!hasEnteredName) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="p-6 bg-gray-800 rounded-lg text-center">
          <h1 className="text-xl font-bold text-yellow-400">Enter Your Name</h1>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mt-3 p-2 text-lg bg-gray-700 border-2 border-transparent rounded-lg text-white text-center focus:border-yellow-400 outline-none"
          />
          <button
            onClick={() => {
              setHasEnteredName(true);
              localStorage.setItem("name", userName);
            }}
            disabled={!userName.trim()}
            className="mt-3 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500"
          >
            Start Typing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen py-5 bg-gray-900 text-white">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-yellow-400">
          Multiplayer Typing Game
        </h1>
        <div className="relative">
          <p
            ref={textContainerRef} // Add ref to the text container
            className="mt-4 p-3 bg-gray-700 rounded-lg text-lg"
          >
            {getStyledText()}
          </p>
          <div
            ref={cursorRef}
            className="absolute h-5 w-[2px] bg-yellow-400 transition-all duration-100 cursor"
            style={{ left: cursorPosition, top: 14 }} // Initial position
          ></div>
        </div>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          autoFocus
          className="w-full mt-3 p-3 text-lg bg-gray-700 border-2 border-transparent rounded-lg text-white text-center focus:border-yellow-400 outline-none"
        />

        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold mb-2">Live Progress</h2>
          {Object.entries(progress).map(([id, percent]) => (
            <div key={id} className="mb-2">
              <p className="text-sm">
                {id}: {percent.toFixed()}%
              </p>
              <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-400 h-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p className="text-sm">⏳ Time: {elapsedTime} sec</p>
          <p className="text-sm">⚡ Speed: {speed} WPM</p>
          <p className="text-sm">🎯 Accuracy: {accuracy.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}

export default Type;
