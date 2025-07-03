const useRandomColor = (num) => {
  const colorPalette = [
    "#FF9898",
    "#81E7AF",
    "#03A791",
    "#FFF100",
    "#B7E0FF",
    "#7C00FE",
    "#3AA6B9",
    "#9F70FD",
    "#FFCF96",
    "#5AB2FF",
    "#FF6363",
    "#FF9149",
    "#3468C0",
    "#CAD315",
    "#FEBA17",
    "#735557",
    "#9A7E6F",
    "#FF90BB",
    "#E90064",
    "#8D8DAA",
  ];

  const paletteCopy = [...colorPalette];
  const selected = [];

  for (let i = 0; i < num && paletteCopy.length > 0; i++) {
    const index = Math.floor(Math.random() * paletteCopy.length);
    selected.push(paletteCopy[index]);
    paletteCopy.splice(index, 1);
  }

  return selected;
};

export default useRandomColor;
// 