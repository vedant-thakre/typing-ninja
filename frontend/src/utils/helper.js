export const handleTabTitle = (title) => {
  document.title = "TyperX | " + title;
};

export const getRelativeTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let key in intervals) {
    const value = Math.floor(diffInSeconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export const homeButtons = [
  {
    title: "Quick Play",
    subTitle: "Play against others",
    className: "border-bdshadow",
  },
  {
    title: "Solo Play",
    subTitle: "Play on your own",
    className: "bg-success border-bsuccess",
  },
  {
    title: "Group Play",
    subTitle: "Play against friends",
    className: "bg-pinky border-bmagenta",
  },
];


// accept only letters and whitespaces
export const isKeyboardCodeAllowed = (code) => {
  return (
    code.startsWith("Key") || // Letters (A-Z)
    code.startsWith("Digit") || // Numbers (0-9)
    code.startsWith("Numpad") || // Numpad numbers
    code.startsWith("Bracket") || // Brackets ([] {})
    code.startsWith("Quote") || // Quote (', ")
    code.startsWith("Backquote") || // Backtick (`)
    code.startsWith("Semicolon") || // Semicolon (;)
    code.startsWith("Comma") || // Comma (,)
    code.startsWith("Period") || // Period (.)
    code.startsWith("Slash") || // Slash (/ ?)
    code.startsWith("Backslash") || // Backslash (\ |)
    code.startsWith("Minus") || // Minus (- _)
    code.startsWith("Equal") || // Equals (= +)
    code === "Backspace" || // Allow backspace
    code === "Space" // Allow space
  );
};


export const countErrors = (actual, expected) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors, total) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage) => {
  return percentage.toFixed(0) + "%";
};

export const debug = (str) => {
  if (process.env.NODE_ENV === "development") {
    console.debug(str);
  }
};
