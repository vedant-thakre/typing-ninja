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

export const formatSmartDate = (dateString) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffMs = now - inputDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  const inputDateString = inputDate.toDateString();
  const nowDateString = now.toDateString();

  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  const shortMonthDay = { month: "short", day: "numeric" };
  const fullDate = { day: "2-digit", month: "short", year: "2-digit" };
  const weekday = { weekday: "short" };

  // Case 1: Less than a minute ago
  if (diffSec < 60) return "Just Now";

  // Case 2: Same day
  if (inputDateString === nowDateString) {
    return inputDate.toLocaleTimeString([], options).toUpperCase(); // 👈 added .toUpperCase()
  }

  // Case 3: Exactly yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (inputDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Case 4: Within the last 7 days
  if (diffDays < 7) {
    return inputDate.toLocaleDateString([], weekday);
  }

  // Case 5: Same year
  if (inputDate.getFullYear() === now.getFullYear()) {
    return inputDate.toLocaleDateString([], shortMonthDay);
  }

  // Case 6: Older than a year
  return inputDate.toLocaleDateString([], fullDate);
}

export const countEmojis = (str) => {
  const trimmedStr = str.trim();

  if (trimmedStr.length === 0) {
    return 0;
  }

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    const segments = [...segmenter.segment(trimmedStr)];

    const emojiRegex = /\p{Emoji}/u;
    const allSegmentsAreEmojis = segments.every((segment) =>
      emojiRegex.test(segment.segment)
    );

    if (allSegmentsAreEmojis) {
      return segments.length;
    } else {
      return 0;
    }
  } else {

    const emojiRegex =
      /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})(?:\u200D(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}))*|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu;

    const matches = trimmedStr.match(emojiRegex) || [];

    const nonEmojiContent = trimmedStr.replace(emojiRegex, "");

    if (nonEmojiContent.length > 0) {
      return 0;
    }

    return matches.length;
  }
};

export const homeButtons = [
  {
    title: "Quick Play",
    subTitle: "Play against others",
    className: "border-bdshadow",
    route: "/play",
  },
  {
    title: "Solo Play",
    subTitle: "Play on your own",
    className: "bg-success border-bsuccess",
    route: "/solo",
  },
  {
    title: "Group Play",
    subTitle: "Play against friends",
    className: "bg-ponky border-bmagenta",
    route: "/lobby",
  },
];

export const countries = [
  { label: "Not Set", value: "not set" },
  { label: "Afghanistan", value: "afghanistan" },
  { label: "Albania", value: "albania" },
  { label: "Algeria", value: "algeria" },
  { label: "Andorra", value: "andorra" },
  { label: "Angola", value: "angola" },
  { label: "Argentina", value: "argentina" },
  { label: "Armenia", value: "armenia" },
  { label: "Australia", value: "australia" },
  { label: "Austria", value: "austria" },
  { label: "Azerbaijan", value: "azerbaijan" },
  { label: "Bahamas", value: "bahamas" },
  { label: "Bahrain", value: "bahrain" },
  { label: "Bangladesh", value: "bangladesh" },
  { label: "Barbados", value: "barbados" },
  { label: "Belarus", value: "belarus" },
  { label: "Belgium", value: "belgium" },
  { label: "Belize", value: "belize" },
  { label: "Benin", value: "benin" },
  { label: "Bhutan", value: "bhutan" },
  { label: "Bolivia", value: "bolivia" },
  { label: "Bosnia and Herzegovina", value: "bosnia and herzegovina" },
  { label: "Botswana", value: "botswana" },
  { label: "Brazil", value: "brazil" },
  { label: "Brunei", value: "brunei" },
  { label: "Bulgaria", value: "bulgaria" },
  { label: "Burkina Faso", value: "burkina faso" },
  { label: "Burundi", value: "burundi" },
  { label: "Cambodia", value: "cambodia" },
  { label: "Cameroon", value: "cameroon" },
  { label: "Canada", value: "canada" },
  { label: "Cape Verde", value: "cape verde" },
  { label: "Central African Republic", value: "central african republic" },
  { label: "Chad", value: "chad" },
  { label: "Chile", value: "chile" },
  { label: "China", value: "china" },
  { label: "Colombia", value: "colombia" },
  { label: "Comoros", value: "comoros" },
  { label: "Costa Rica", value: "costa rica" },
  { label: "Croatia", value: "croatia" },
  { label: "Cuba", value: "cuba" },
  { label: "Cyprus", value: "cyprus" },
  { label: "Czech Republic", value: "czech republic" },
  { label: "Denmark", value: "denmark" },
  { label: "Djibouti", value: "djibouti" },
  { label: "Dominica", value: "dominica" },
  { label: "Dominican Republic", value: "dominican republic" },
  { label: "Ecuador", value: "ecuador" },
  { label: "Egypt", value: "egypt" },
  { label: "El Salvador", value: "el salvador" },
  { label: "Equatorial Guinea", value: "equatorial guinea" },
  { label: "Eritrea", value: "eritrea" },
  { label: "Estonia", value: "estonia" },
  { label: "Eswatini", value: "eswatini" },
  { label: "Ethiopia", value: "ethiopia" },
  { label: "Fiji", value: "fiji" },
  { label: "Finland", value: "finland" },
  { label: "France", value: "france" },
  { label: "Gabon", value: "gabon" },
  { label: "Gambia", value: "gambia" },
  { label: "Georgia", value: "georgia" },
  { label: "Germany", value: "germany" },
  { label: "Ghana", value: "ghana" },
  { label: "Greece", value: "greece" },
  { label: "Grenada", value: "grenada" },
  { label: "Guatemala", value: "guatemala" },
  { label: "Guinea", value: "guinea" },
  { label: "Guinea-Bissau", value: "guinea-bissau" },
  { label: "Guyana", value: "guyana" },
  { label: "Haiti", value: "haiti" },
  { label: "Honduras", value: "honduras" },
  { label: "Hungary", value: "hungary" },
  { label: "Iceland", value: "iceland" },
  { label: "India", value: "india" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Iran", value: "iran" },
  { label: "Iraq", value: "iraq" },
  { label: "Ireland", value: "ireland" },
  { label: "Israel", value: "israel" },
  { label: "Italy", value: "italy" },
  { label: "Jamaica", value: "jamaica" },
  { label: "Japan", value: "japan" },
  { label: "Jordan", value: "jordan" },
  { label: "Kazakhstan", value: "kazakhstan" },
  { label: "Kenya", value: "kenya" },
  { label: "Kiribati", value: "kiribati" },
  { label: "Kuwait", value: "kuwait" },
  { label: "Kyrgyzstan", value: "kyrgyzstan" },
  { label: "Laos", value: "laos" },
  { label: "Latvia", value: "latvia" },
  { label: "Lebanon", value: "lebanon" },
  { label: "Lesotho", value: "lesotho" },
  { label: "Liberia", value: "liberia" },
  { label: "Libya", value: "libya" },
  { label: "Liechtenstein", value: "liechtenstein" },
  { label: "Lithuania", value: "lithuania" },
  { label: "Luxembourg", value: "luxembourg" },
  { label: "Madagascar", value: "madagascar" },
  { label: "Malawi", value: "malawi" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Maldives", value: "maldives" },
  { label: "Mali", value: "mali" },
  { label: "Malta", value: "malta" },
  { label: "Marshall Islands", value: "marshall islands" },
  { label: "Mauritania", value: "mauritania" },
  { label: "Mauritius", value: "mauritius" },
  { label: "Mexico", value: "mexico" },
  { label: "Micronesia", value: "micronesia" },
  { label: "Moldova", value: "moldova" },
  { label: "Monaco", value: "monaco" },
  { label: "Mongolia", value: "mongolia" },
  { label: "Montenegro", value: "montenegro" },
  { label: "Morocco", value: "morocco" },
  { label: "Mozambique", value: "mozambique" },
  { label: "Myanmar", value: "myanmar" },
  { label: "Namibia", value: "namibia" },
  { label: "Nauru", value: "nauru" },
  { label: "Nepal", value: "nepal" },
  { label: "Netherlands", value: "netherlands" },
  { label: "New Zealand", value: "new zealand" },
  { label: "Nicaragua", value: "nicaragua" },
  { label: "Niger", value: "niger" },
  { label: "Nigeria", value: "nigeria" },
  { label: "North Korea", value: "north korea" },
  { label: "North Macedonia", value: "north macedonia" },
  { label: "Norway", value: "norway" },
  { label: "Oman", value: "oman" },
  { label: "Pakistan", value: "pakistan" },
  { label: "Palau", value: "palau" },
  { label: "Panama", value: "panama" },
  { label: "Papua New Guinea", value: "papua new guinea" },
  { label: "Paraguay", value: "paraguay" },
  { label: "Peru", value: "peru" },
  { label: "Philippines", value: "philippines" },
  { label: "Poland", value: "poland" },
  { label: "Portugal", value: "portugal" },
  { label: "Qatar", value: "qatar" },
  { label: "Romania", value: "romania" },
  { label: "Russia", value: "russia" },
  { label: "Rwanda", value: "rwanda" },
  { label: "Saint Kitts and Nevis", value: "saint kitts and nevis" },
  { label: "Saint Lucia", value: "saint lucia" },
  {
    label: "Saint Vincent and the Grenadines",
    value: "saint vincent and the grenadines",
  },
  { label: "Samoa", value: "samoa" },
  { label: "San Marino", value: "san marino" },
  { label: "Sao Tome and Principe", value: "sao tome and principe" },
  { label: "Saudi Arabia", value: "saudi arabia" },
  { label: "Senegal", value: "senegal" },
  { label: "Serbia", value: "serbia" },
  { label: "Seychelles", value: "seychelles" },
  { label: "Sierra Leone", value: "sierra leone" },
  { label: "Singapore", value: "singapore" },
  { label: "Slovakia", value: "slovakia" },
  { label: "Slovenia", value: "slovenia" },
  { label: "Solomon Islands", value: "solomon islands" },
  { label: "Somalia", value: "somalia" },
  { label: "South Africa", value: "south africa" },
  { label: "South Korea", value: "south korea" },
  { label: "South Sudan", value: "south sudan" },
  { label: "Spain", value: "spain" },
  { label: "Sri Lanka", value: "sri lanka" },
  { label: "Sudan", value: "sudan" },
  { label: "Suriname", value: "suriname" },
  { label: "Sweden", value: "sweden" },
  { label: "Switzerland", value: "switzerland" },
  { label: "Syria", value: "syria" },
  { label: "Taiwan", value: "taiwan" },
  { label: "Tajikistan", value: "tajikistan" },
  { label: "Tanzania", value: "tanzania" },
  { label: "Thailand", value: "thailand" },
  { label: "Togo", value: "togo" },
  { label: "Tonga", value: "tonga" },
  { label: "Trinidad and Tobago", value: "trinidad and tobago" },
  { label: "Tunisia", value: "tunisia" },
  { label: "Turkey", value: "turkey" },
  { label: "Turkmenistan", value: "turkmenistan" },
  { label: "Tuvalu", value: "tuvalu" },
  { label: "Uganda", value: "uganda" },
  { label: "Ukraine", value: "ukraine" },
  { label: "United Arab Emirates", value: "united arab emirates" },
  { label: "United Kingdom", value: "united kingdom" },
  { label: "United States", value: "united states" },
  { label: "Uruguay", value: "uruguay" },
  { label: "Uzbekistan", value: "uzbekistan" },
  { label: "Vanuatu", value: "vanuatu" },
  { label: "Vatican City", value: "vatican city" },
  { label: "Venezuela", value: "venezuela" },
  { label: "Vietnam", value: "vietnam" },
  { label: "Yemen", value: "yemen" },
  { label: "Zambia", value: "zambia" },
  { label: "Zimbabwe", value: "zimbabwe" },
];

export const genders = [
  { label: "Not Set", value: "not set" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
]

export const errorToast = {
  position: "top-center",
  duration: 3000,
  style: {
    background: "#f44336",
    color: "#fff",
    border: "3px solid #d73c42",
  },
};



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


// #FF9898
// #81E7AF
// #03A791
// #FFF100
// #B7E0FF
// #7C00FE
// #3AA6B9
// #9F70FD
// #FFCF96
// #5AB2FF
// #FF6363
// #FF9149
// #3468C0
// #CAD315
// #FEBA17
// #735557
// #9A7E6F
// #FF90BB
// #E90064
// #8D8DAA


