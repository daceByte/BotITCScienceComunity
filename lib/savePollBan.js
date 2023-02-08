module.exports = function savePoll(msg) {
  const writeData = require("./writeData");
  const readData = require("./readData");

  let data = readData("./data/pollBanned.json");
  data.push(msg);
  writeData("./data/pollBanned.json", data);
  return Object.keys(data).length;
};
