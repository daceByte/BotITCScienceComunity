module.exports = function isWheel(number) {
  const readData = require("./readData.js");
  let wheel = readData("./data/wheel.json");
  for (let i = 0; i < Object.keys(wheel).length; i++) {
    if (wheel[i] == number) {
      return true;
    }
  }
  return false;
};
